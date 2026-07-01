import { writeFileSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_HANDLE = 'zb_yuhudaddy'; // 頻道 handle，無需 secret

if (!API_KEY) {
  console.error('缺少 YOUTUBE_API_KEY 環境變數');
  process.exit(1);
}

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

function detectGame(v) {
  const title = v.snippet.title;
  if (matchKeyword(title, '智慧的再現', 'eow', 'echoes of wisdom')) return 'eow';
  if (matchKeyword(title, '王國之淚', 'totk', 'tears of the kingdom')) return 'totk';
  if (matchKeyword(title, '曠野之息', 'botw', 'breath of the wild')) return 'botw';
  if (matchKeyword(title, '大亂鬥', 'ssbu', 'smash bros', 'super smash bros')) return 'ssbu';
  return '';
}

// ── 1. 取得 uploads playlist ID（用 forHandle，不需要 Channel ID secret）────
const channelRes = await fetch(
  `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=${CHANNEL_HANDLE}&key=${API_KEY}`
);
if (!channelRes.ok) { console.error('channels.list 失敗:', await channelRes.text()); process.exit(1); }
const channelData = await channelRes.json();
if (!channelData.items?.length) { console.error('找不到頻道:', CHANNEL_HANDLE); process.exit(1); }
const uploadsId = channelData.items[0].contentDetails.relatedPlaylists.uploads;
console.log(`uploads playlist: ${uploadsId}`);

// ── 2. 分頁取得所有影片 ID（最新在前）───────────────────────────────────────
const allVideoIds = [];
let pageToken = '';
do {
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsId}&maxResults=50${pageToken ? `&pageToken=${pageToken}` : ''}&key=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) { console.error('playlistItems.list 失敗:', await res.text()); process.exit(1); }
  const data = await res.json();
  allVideoIds.push(...data.items.map((item) => item.snippet.resourceId.videoId));
  pageToken = data.nextPageToken || '';
} while (pageToken);
console.log(`找到 ${allVideoIds.length} 支影片 ID`);

// ── 3. 批次取得 snippet（含 tags）與 statistics ───────────────────────────────
const allVideos = [];
for (let i = 0; i < allVideoIds.length; i += 50) {
  const batch = allVideoIds.slice(i, i + 50).join(',');
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${batch}&key=${API_KEY}`
  );
  if (!res.ok) { console.error('videos.list 批次失敗:', await res.text()); process.exit(1); }
  const data = await res.json();
  allVideos.push(...data.items);
}

// ── 4. 建立分類陣列（botw / totk / eow）─────────────────────────────────────
const toVideo = (v) => ({
  id: v.id,
  title: v.snippet.title,
  meta: formatViews(v.statistics.viewCount),
  publishedAt: v.snippet.publishedAt,
});

const gameOf = new Map(allVideos.map((v) => [v.id, detectGame(v)]));

const botwAll = allVideos.filter((v) => gameOf.get(v.id) === 'botw').map(toVideo);
const totkAll = allVideos.filter((v) => gameOf.get(v.id) === 'totk').map(toVideo);
const eowAll = allVideos.filter((v) => gameOf.get(v.id) === 'eow').map(toVideo);

// ── 5. all：所有影片 + 遊戲標記，供影片索引頁使用 ───────────────────────────
const all = allVideos.map((v) => ({
  id: v.id,
  title: v.snippet.title,
  publishedAt: v.snippet.publishedAt,
  game: gameOf.get(v.id),
}));

// ── 6. 精選：30 天內觀看數最高的 6 部 ────────────────────────────────────────
const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
const recent = allVideos.filter((v) => v.snippet.publishedAt >= thirtyDaysAgo);
const featured = recent
  .sort((a, b) => parseInt(b.statistics.viewCount) - parseInt(a.statistics.viewCount))
  .slice(0, 6)
  .map(toVideo);

if (featured.length < 6) console.warn(`30天內只找到 ${featured.length} 部影片，精選可能不足`);

// ── 7. 最新：最近上傳的 4 部 ─────────────────────────────────────────────────
const latest = allVideos.slice(0, 4).map(toVideo);

// ── 8. 寫入（保留 featured 若 30 天內影片不足時改用舊值）──────────────────────
const outPath = join(__dirname, '../src/data/youtube.json');
let oldFeatured = [];
try {
  const old = JSON.parse(readFileSync(outPath, 'utf8'));
  oldFeatured = old.featured || [];
} catch {}

const out = {
  featured: featured.length >= 3 ? featured : oldFeatured,
  latest,
  botw: botwAll,
  totk: totkAll,
  eow: eowAll,
  all,
  updatedAt: new Date().toISOString(),
};
writeFileSync(outPath, JSON.stringify(out, null, 2));
console.log(
  `✓ 已更新 youtube.json（全部 ${all.length}｜BotW ${botwAll.length}｜TotK ${totkAll.length}｜EoW ${eowAll.length}｜精選 ${out.featured.length}）`
);
