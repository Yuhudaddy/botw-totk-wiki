import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

if (!API_KEY || !CHANNEL_ID) {
  console.error('缺少 YOUTUBE_API_KEY 或 YOUTUBE_CHANNEL_ID 環境變數');
  process.exit(1);
}

function formatViews(count) {
  const n = parseInt(count, 10);
  if (n >= 10000) return `${(n / 10000).toFixed(1).replace(/\.0$/, '')} 萬次觀看`;
  return `${n.toLocaleString()} 次觀看`;
}

function matchTag(tags, ...keywords) {
  if (!Array.isArray(tags)) return false;
  return keywords.some((k) => tags.some((t) => t.toLowerCase() === k.toLowerCase()));
}

// ── 1. 取得 uploads playlist ID ──────────────────────────────────────────────
const channelRes = await fetch(
  `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`
);
if (!channelRes.ok) { console.error('channels.list 失敗:', await channelRes.text()); process.exit(1); }
const channelData = await channelRes.json();
const uploadsId = channelData.items[0].contentDetails.relatedPlaylists.uploads;

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

// ── 4. 依 tags 分類 ──────────────────────────────────────────────────────────
const toVideo = (v) => ({
  id: v.id,
  title: v.snippet.title,
  meta: formatViews(v.statistics.viewCount),
  publishedAt: v.snippet.publishedAt,
});

const botwAll = allVideos
  .filter((v) => matchTag(v.snippet.tags, '曠野之息', 'botw'))
  .map(toVideo);

const totkAll = allVideos
  .filter((v) => matchTag(v.snippet.tags, '王國之淚', 'totk'))
  .map(toVideo);

// 智慧的再現（Echoes of Wisdom）：tag 含「智慧的再現」/「eow」或標題含「智慧的再現」
const eowAll = allVideos
  .filter(
    (v) =>
      matchTag(v.snippet.tags, '智慧的再現', 'eow') ||
      v.snippet.title.includes('智慧的再現')
  )
  .map(toVideo);

// ── 5. 精選：30 天內觀看數最高的 6 部 ────────────────────────────────────────
const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
const recent = allVideos.filter((v) => v.snippet.publishedAt >= thirtyDaysAgo);
const featured = recent
  .sort((a, b) => parseInt(b.statistics.viewCount) - parseInt(a.statistics.viewCount))
  .slice(0, 6)
  .map(toVideo);

if (featured.length < 6) console.warn(`30天內只找到 ${featured.length} 部影片`);

// ── 6. 最新：最近上傳的 4 部 ─────────────────────────────────────────────────
const latest = allVideos.slice(0, 4).map(toVideo);

// ── 7. 寫入 ──────────────────────────────────────────────────────────────────
const out = {
  featured,
  latest,
  botw: botwAll,
  totk: totkAll,
  eow: eowAll,
  updatedAt: new Date().toISOString(),
};
writeFileSync(join(__dirname, '../src/data/youtube.json'), JSON.stringify(out, null, 2));
console.log(
  `已更新 youtube.json（精選 ${featured.length}、最新 ${latest.length}、BotW ${botwAll.length}、TotK ${totkAll.length}、EoW ${eowAll.length}）`
);
