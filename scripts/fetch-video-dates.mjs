// 一次性腳本：抓 src/data/type-content.ts 裡所有相關影片的上傳日期，
// 輸出成 { 影片ID: "YYYY-MM-DD" } 給 CI 當 artifact 存下來。
// 用完這次之後這支腳本連同呼叫它的工作流程都會被刪除，不留在專案裡。
import { writeFileSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const API_KEY = process.env.YOUTUBE_API_KEY;

if (!API_KEY) {
  console.error('缺少 YOUTUBE_API_KEY 環境變數');
  process.exit(1);
}

const contentPath = join(__dirname, '../src/data/type-content.ts');
const content = readFileSync(contentPath, 'utf8');

const ids = [...new Set([...content.matchAll(/\{\s*id:\s*"([\w-]{11})"/g)].map((m) => m[1]))];
console.log(`從 type-content.ts 找到 ${ids.length} 個不重複影片 ID`);

const dateOf = {};
const missing = [];

for (let i = 0; i < ids.length; i += 50) {
  const batch = ids.slice(i, i + 50);
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${batch.join(',')}&key=${API_KEY}`
  );
  if (!res.ok) {
    console.error('videos.list 批次失敗:', await res.text());
    process.exit(1);
  }
  const data = await res.json();
  const found = new Map(data.items.map((v) => [v.id, v.snippet.publishedAt]));
  for (const id of batch) {
    const publishedAt = found.get(id);
    if (publishedAt) {
      dateOf[id] = publishedAt.slice(0, 10);
    } else {
      missing.push(id);
    }
  }
  console.log(`已處理 ${Math.min(i + 50, ids.length)} / ${ids.length}`);
}

writeFileSync(join(__dirname, '../video-dates-output.json'), JSON.stringify(dateOf, null, 2));

if (missing.length) {
  console.warn(`⚠️ ${missing.length} 個 ID 查無資料（可能私人／已刪除）:`, missing.join(', '));
}
console.log(`✓ 已寫入 video-dates-output.json（${Object.keys(dateOf).length} 筆）`);
