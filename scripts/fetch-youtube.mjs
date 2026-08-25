import { writeFileSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// 遊戲清單與 src/data/types.ts 的 typeGroups 對應。這裡沒辦法直接 import 那支
// TypeScript（本檔以純 node 執行，加 --experimental-strip-types 會綁死呼叫端的
// 指令，而正式建置指令在 Cloudflare 後台、改不到），所以維持手寫一份，
// 但緊接著補一道對照檢查：typeGroups 加了新遊戲卻忘了加這裡時會出聲，
// 不會再只是靠註解提醒。純警告不中斷——影片資料不該擋住整個網站部署。
// 放在檔案最前面（早於 API 金鑰檢查）是刻意的：沒有金鑰時腳本會提早結束，
// 擺在後面的話本機永遠跑不到這段。
const GAME_IDS = ['botw', 'totk', 'eow', 'ssbu', 'aoc', 'aoi'];

try {
  const typesSrc = readFileSync(join(__dirname, '../src/data/types.ts'), 'utf8');
  const declared = [...typesSrc.matchAll(/^\s{4}game: "(\w+)",/gm)].map((m) => m[1]);
  const missing = declared.filter((id) => !GAME_IDS.includes(id));
  const extra = GAME_IDS.filter((id) => !declared.includes(id));
  if (missing.length || extra.length) {
    console.warn(
      '⚠️  GAME_IDS 與 src/data/types.ts 的 typeGroups 不一致' +
        (missing.length ? `；types.ts 有但這裡缺少：${missing.join(', ')}` : '') +
        (extra.length ? `；這裡有但 types.ts 沒有：${extra.join(', ')}` : '')
    );
  }
} catch {
  // 讀不到 types.ts 就跳過檢查，不影響抓取本身
}

const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_HANDLE = 'zb_yuhudaddy'; // 頻道 handle，無需 secret

// YouTube 熱門影片只是首頁的一小塊裝飾內容，不該讓它拖累整個網站的部署——
// API 配額用盡、金鑰失效、暫時性錯誤，都不是「今天不能更新網站」的理由。
// src/data/youtube.json 已經在版控裡，抓取失敗時直接沿用舊資料、正常結束
// （exit 0），讓建置繼續往下走；下次抓取成功時自然會更新回最新資料。
function giveUpAndKeepExisting(reason) {
  console.warn(`⚠️  YouTube 抓取失敗，沿用既有 youtube.json，不影響本次部署：${reason}`);
  process.exit(0);
}

if (!API_KEY) giveUpAndKeepExisting('缺少 YOUTUBE_API_KEY 環境變數');

// 15 秒逾時，避免 DNS／連線異常時建置卡住不動；HTTP 層級的錯誤（配額用盡、
// 金鑰失效等）已經由呼叫端各自檢查 res.ok 處理，這裡只補網路層級的例外。
const FETCH_TIMEOUT_MS = 15_000;
const timeoutSignal = () => AbortSignal.timeout(FETCH_TIMEOUT_MS);

function formatViews(count) {
  const n = parseInt(count, 10);
  if (n >= 10000) return `${(n / 10000).toFixed(1).replace(/\.0$/, '')} 萬次觀看`;
  return `${n.toLocaleString()} 次觀看`;
}

// 只依標題判斷所屬遊戲，不讀 YouTube 影片的 Tags 中繼資料
// （頻道內大量影片的 Tags 誤植/複製貼上錯誤，會導致分類錯亂）
function matchKeyword(text, ...keywords) {
  const lower = text.toLowerCase();
  return keywords.some((k) => {
    const kl = k.toLowerCase();
    // 短英文縮寫（eow / totk / botw / ssbu）用單字邊界比對，避免命中其他英文字內的子字串
    if (/^[a-z]{2,5}$/.test(kl)) return new RegExp(`\\b${kl}\\b`, 'i').test(text);
    return lower.includes(kl);
  });
}

// 標題開頭的【】主題標記，例：【曠野Short】【封印戰記】【真三國無雙・起源】
// 簡稱（曠野／王淚）只在這個標記內比對，避免內文順帶提及造成誤判，例如
// 「《禦天之劍》用曠野的心態玩」「等不了王淚手滑買了寶可夢」都不該算本傳影片
function leadingTag(title) {
  const m = title.match(/^\s*【([^】]*)】/);
  return m ? m[1] : '';
}

// 依序比對六款遊戲。useAlias=true 時額外接受頻道慣用簡稱（曠野／王淚），
// 只在【】標記內開啟——內文的簡稱不可信，例如
// 「《禦天之劍》用曠野的心態玩」「等不了王淚手滑買了寶可夢」都不是本傳影片。
// 兩款無雙一律比對全名：「災厄」「無雙」單獨出現會誤中洛克人的「災厄機器人」
// 與頻道上大量的《真三國無雙》。
function pickGame(text, useAlias) {
  if (!text) return '';
  if (matchKeyword(text, '封印戰記', 'age of imprisonment')) return 'aoi';
  if (matchKeyword(text, '災厄啟示錄', '薩爾達無雙', 'age of calamity')) return 'aoc';
  if (matchKeyword(text, '智慧的再現', 'eow', 'echoes of wisdom')) return 'eow';
  if (matchKeyword(text, '王國之淚', 'totk', 'tears of the kingdom')) return 'totk';
  if (matchKeyword(text, '曠野之息', 'botw', 'breath of the wild')) return 'botw';
  if (useAlias) {
    // ── 跨兩款本傳的影片：以標記中「先出現」的那款為準 ──────────────────
    // 一支影片只能掛一個 game，因此像【曠野&王淚】這種同時涵蓋兩款的，
    // 只能擇一。規則是看誰在【】裡排前面，所以【曠野&王淚】→ 曠野之息。
    //
    // 目前受此規則影響的有 3 支（皆為【曠野&王淚】開頭）：
    //   Glitch測試月步／版本更新比較／Bug 是怎麼被發現的
    //
    // 影響範圍僅止於「影片索引頁的遊戲標籤」與「該影片會被哪顆篩選鈕撈到」。
    // 關鍵字搜尋不受影響——搜尋比對的字串含標題原文，標題本身就有「曠野&王淚」，
    // 所以搜「王淚」仍然找得到這幾支。
    //
    // 若想改判給王國之淚，把下面兩行的 'botw' / 'totk' 對調即可。
    const iBotw = text.indexOf('曠野');
    const iTotk = text.indexOf('王淚');
    if (iBotw >= 0 && iTotk >= 0) return iBotw < iTotk ? 'botw' : 'totk';
    if (iBotw >= 0) return 'botw';
    if (iTotk >= 0) return 'totk';
  }
  if (matchKeyword(text, '大亂鬥', 'ssbu', 'smash bros', 'super smash bros')) return 'ssbu';
  return '';
}

function detectGame(v) {
  const title = v.snippet.title;
  // 開頭【】是作者自己標定的主題，優先於內文順帶提及
  // （例：【王國之淚】⋯#封印戰記 應算王淚，而非封印戰記）
  return pickGame(leadingTag(title), true) || pickGame(title, false);
}

// ── 1. 取得 uploads playlist ID（用 forHandle，不需要 Channel ID secret）────
let channelRes;
try {
  channelRes = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=${CHANNEL_HANDLE}&key=${API_KEY}`,
    { signal: timeoutSignal() }
  );
} catch (err) {
  giveUpAndKeepExisting(`channels.list 連線失敗: ${err.message}`);
}
if (!channelRes.ok) giveUpAndKeepExisting(`channels.list 失敗: ${await channelRes.text()}`);
const channelData = await channelRes.json();
if (!channelData.items?.length) giveUpAndKeepExisting(`找不到頻道: ${CHANNEL_HANDLE}`);
const uploadsId = channelData.items[0].contentDetails.relatedPlaylists.uploads;
console.log(`uploads playlist: ${uploadsId}`);

// ── 2. 分頁取得所有影片 ID（最新在前）───────────────────────────────────────
const allVideoIds = [];
let pageToken = '';
do {
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsId}&maxResults=50${pageToken ? `&pageToken=${pageToken}` : ''}&key=${API_KEY}`;
  let res;
  try {
    res = await fetch(url, { signal: timeoutSignal() });
  } catch (err) {
    giveUpAndKeepExisting(`playlistItems.list 連線失敗: ${err.message}`);
  }
  if (!res.ok) giveUpAndKeepExisting(`playlistItems.list 失敗: ${await res.text()}`);
  const data = await res.json();
  allVideoIds.push(...data.items.map((item) => item.snippet.resourceId.videoId));
  pageToken = data.nextPageToken || '';
} while (pageToken);
console.log(`找到 ${allVideoIds.length} 支影片 ID`);

// ── 3. 批次取得 snippet（含 tags）與 statistics ───────────────────────────────
const allVideos = [];
for (let i = 0; i < allVideoIds.length; i += 50) {
  const batch = allVideoIds.slice(i, i + 50).join(',');
  let res;
  try {
    res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${batch}&key=${API_KEY}`,
      { signal: timeoutSignal() }
    );
  } catch (err) {
    giveUpAndKeepExisting(`videos.list 批次連線失敗: ${err.message}`);
  }
  if (!res.ok) giveUpAndKeepExisting(`videos.list 批次失敗: ${await res.text()}`);
  const data = await res.json();
  allVideos.push(...data.items);
}

// ── 4. 建立分類陣列（六款遊戲各一）──────────────────────────────────────────
const toVideo = (v) => ({
  id: v.id,
  title: v.snippet.title,
  meta: formatViews(v.statistics.viewCount),
  publishedAt: v.snippet.publishedAt,
});

const gameOf = new Map(allVideos.map((v) => [v.id, detectGame(v)]));

const byGame = Object.fromEntries(
  GAME_IDS.map((id) => [id, allVideos.filter((v) => gameOf.get(v.id) === id).map(toVideo)])
);

// ── 5. all：所有影片 + 遊戲標記，供影片索引頁使用 ───────────────────────────
const all = allVideos.map((v) => ({
  id: v.id,
  title: v.snippet.title,
  publishedAt: v.snippet.publishedAt,
  game: gameOf.get(v.id),
}));

// ── 6. 精選：90 天內觀看數最高的 10 部 ────────────────────────────────────────
// 原本用 30 天窗、門檻 3 部，但頻道發片頻率沒那麼高，幾乎每次都不足額，
// 導致精選長期卡在 oldFeatured（見下方 8.）。放寬時間窗、降低門檻，
// 讓「這次確實有抓到新片」時就採用新結果，減少觸發 fallback 的機率。
const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString();
const recent = allVideos.filter((v) => v.snippet.publishedAt >= ninetyDaysAgo);
const featured = recent
  .sort((a, b) => parseInt(b.statistics.viewCount) - parseInt(a.statistics.viewCount))
  .slice(0, 10)
  .map(toVideo);

if (featured.length < 10) console.warn(`90天內只找到 ${featured.length} 部影片，精選不足 10 部（展示帶會照實際筆數循環）`);

// ── 7. 最新：最近上傳的 4 部 ─────────────────────────────────────────────────
const latest = allVideos.slice(0, 4).map(toVideo);

// ── 8. 寫入（保留 featured 若 90 天內完全沒有影片時改用舊值）──────────────────
const outPath = join(__dirname, '../src/data/youtube.json');
let oldFeatured = [];
try {
  const old = JSON.parse(readFileSync(outPath, 'utf8'));
  oldFeatured = old.featured || [];
} catch {}

const out = {
  featured: featured.length >= 1 ? featured : oldFeatured,
  latest,
  ...byGame,
  all,
  updatedAt: new Date().toISOString(),
};
writeFileSync(outPath, JSON.stringify(out, null, 2));

const unclassified = all.filter((v) => !v.game).length;
console.log(
  `✓ 已更新 youtube.json（全部 ${all.length}｜` +
    GAME_IDS.map((id) => `${id} ${byGame[id].length}`).join('｜') +
    `｜未分類 ${unclassified}｜精選 ${out.featured.length}）`
);
