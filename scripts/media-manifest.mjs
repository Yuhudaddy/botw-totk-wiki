// 示範影片的清單檔工具。影片本身不進版控（存放在 Cloudflare R2），
// 但「應該有哪些影片」這份清單要進版控，CI 才有辦法判斷下載回來的檔案是否齊全。
//
// 用法：
//   node scripts/media-manifest.mjs           產生／更新 media-manifest.txt（npm run media:push 會自動跑）
//   node scripts/media-manifest.mjs --verify   比對本機檔案是否與清單一致（CI 用，不符則以 exit 1 中止）
//
// 清單格式：每行「位元組大小 \t 相對於 public/type-videos/ 的路徑」，依路徑排序。
// 記錄大小是為了同時擋下「檔案在、但下載被截斷」這種比缺檔更難察覺的狀況。
import { readdirSync, statSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

const MEDIA_DIR = "public/type-videos";
const MANIFEST = "media-manifest.txt";

// macOS 會在每個資料夾留下 .DS_Store，它不是網站素材，一律排除。
const IGNORED = new Set([".DS_Store"]);

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (IGNORED.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.isFile()) out.push(full);
  }
  return out;
}

function collect() {
  return walk(MEDIA_DIR)
    .map((f) => ({ path: relative(MEDIA_DIR, f), size: statSync(f).size }))
    .sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0));
}

function serialize(files) {
  return files.map((f) => `${f.size}\t${f.path}`).join("\n") + "\n";
}

const files = collect();

if (!process.argv.includes("--verify")) {
  writeFileSync(MANIFEST, serialize(files));
  const total = files.reduce((s, f) => s + f.size, 0);
  console.log(`✅ 已更新 ${MANIFEST}：${files.length} 個檔案、${(total / 1024 ** 3).toFixed(2)} GiB`);
  process.exit(0);
}

// --verify：以版控中的清單為準，比對本機實際檔案
let expected;
try {
  expected = readFileSync(MANIFEST, "utf8");
} catch {
  console.error(`❌ 找不到 ${MANIFEST}，無法驗證。請先執行 node scripts/media-manifest.mjs`);
  process.exit(1);
}

const want = new Map(
  expected
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const [size, ...rest] = line.split("\t");
      return [rest.join("\t"), Number(size)];
    })
);
const have = new Map(files.map((f) => [f.path, f.size]));

const missing = [...want.keys()].filter((p) => !have.has(p));
const truncated = [...want.entries()].filter(([p, s]) => have.has(p) && have.get(p) !== s);
const extra = [...have.keys()].filter((p) => !want.has(p));

for (const p of missing) console.error(`❌ 缺少：${p}`);
for (const [p, s] of truncated) console.error(`❌ 大小不符：${p}（預期 ${s}、實際 ${have.get(p)}）`);
// 多出來的檔案只提醒、不算失敗：可能是剛加入還沒執行 npm run media:push。
for (const p of extra) console.warn(`⚠️  清單中沒有（尚未執行 npm run media:push？）：${p}`);

if (missing.length || truncated.length) {
  console.error(`\n❌ 影片素材不完整：缺少 ${missing.length} 個、大小不符 ${truncated.length} 個。`);
  console.error("   若是本機新增的影片尚未上傳，請執行：npm run media:push");
  process.exit(1);
}

console.log(`✅ 影片素材齊全：${have.size} 個檔案與清單一致`);
