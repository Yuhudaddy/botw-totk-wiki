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

// 搜尋頻道觀看數最高的影片（多抓幾部再排序，避免 search API 順序不穩定）
const searchRes = await fetch(
  `https://www.googleapis.com/youtube/v3/search?part=id&channelId=${CHANNEL_ID}&order=viewCount&type=video&maxResults=10&key=${API_KEY}`
);
if (!searchRes.ok) {
  console.error('search.list 失敗:', await searchRes.text());
  process.exit(1);
}
const searchData = await searchRes.json();
const videoIds = searchData.items.map((item) => item.id.videoId).join(',');

// 取得標題與觀看數
const videosRes = await fetch(
  `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIds}&key=${API_KEY}`
);
if (!videosRes.ok) {
  console.error('videos.list 失敗:', await videosRes.text());
  process.exit(1);
}
const videosData = await videosRes.json();

const featured = videosData.items
  .sort((a, b) => parseInt(b.statistics.viewCount) - parseInt(a.statistics.viewCount))
  .slice(0, 6)
  .map((v) => ({
    id: v.id,
    title: v.snippet.title,
    meta: formatViews(v.statistics.viewCount),
  }));

const out = { featured, updatedAt: new Date().toISOString() };
writeFileSync(join(__dirname, '../src/data/youtube.json'), JSON.stringify(out, null, 2));
console.log(`已更新 youtube.json（${featured.length} 部影片）`);
