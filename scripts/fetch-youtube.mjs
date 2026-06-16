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

const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

// === 精選：30天內觀看數最高的 6 部 ===
const featuredSearchRes = await fetch(
  `https://www.googleapis.com/youtube/v3/search?part=id&channelId=${CHANNEL_ID}&order=viewCount&type=video&maxResults=10&publishedAfter=${thirtyDaysAgo}&key=${API_KEY}`
);
if (!featuredSearchRes.ok) {
  console.error('featured search.list 失敗:', await featuredSearchRes.text());
  process.exit(1);
}
const featuredSearchData = await featuredSearchRes.json();

let featured = [];
if (featuredSearchData.items?.length > 0) {
  const videoIds = featuredSearchData.items.map((item) => item.id.videoId).join(',');
  const videosRes = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIds}&key=${API_KEY}`
  );
  const videosData = await videosRes.json();
  featured = videosData.items
    .sort((a, b) => parseInt(b.statistics.viewCount) - parseInt(a.statistics.viewCount))
    .slice(0, 6)
    .map((v) => ({
      id: v.id,
      title: v.snippet.title,
      meta: formatViews(v.statistics.viewCount),
    }));
}

if (featured.length < 6) {
  console.warn(`30天內只找到 ${featured.length} 部影片`);
}

// === 最新：最近上傳的 4 部 ===
const latestSearchRes = await fetch(
  `https://www.googleapis.com/youtube/v3/search?part=id,snippet&channelId=${CHANNEL_ID}&order=date&type=video&maxResults=4&key=${API_KEY}`
);
if (!latestSearchRes.ok) {
  console.error('latest search.list 失敗:', await latestSearchRes.text());
  process.exit(1);
}
const latestSearchData = await latestSearchRes.json();

const latest = latestSearchData.items.map((item) => ({
  id: item.id.videoId,
  title: item.snippet.title,
  publishedAt: item.snippet.publishedAt,
}));

const out = { featured, latest, updatedAt: new Date().toISOString() };
writeFileSync(join(__dirname, '../src/data/youtube.json'), JSON.stringify(out, null, 2));
console.log(`已更新 youtube.json（精選 ${featured.length} 部、最新 ${latest.length} 部）`);
