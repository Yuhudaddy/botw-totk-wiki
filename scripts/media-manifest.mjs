// 示範影片的清單檔工具。影片本身不進版控（存放在 Cloudflare R2），
// 但「應該有哪些影片」這份清單要進版控，CI 才有辦法判斷下載回來的檔案是否齊全、
// 以及 type-content.ts 裡引用的影片是否真的存在。
//
// 用法：
//   node scripts/media-manifest.mjs                 產生／更新 media-manifest.txt（npm run media:push 會自動跑）
//   node scripts/media-manifest.mjs --verify         比對本機檔案是否與清單一致（CI 下載完 R2 後跑，不符則 exit 1）
//   node --experimental-strip-types scripts/media-manifest.mjs --verify-references
//                                                     比對 type-content.ts 實際引用的影片/圖片是否都在清單裡
//                                                     （不需要網路，CI 一開始就能跑，比下載 R2 快很多）
//
// 清單格式：每行「位元組大小 \t 相對於 public/type-videos/ 的路徑」，依路徑排序。
// 記錄大小是為了同時擋下「檔案在、但下載被截斷」這種比缺檔更難察覺的狀況。
import { readdirSync, statSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";

// 用 import.meta.url 推導專案根目錄，不依賴執行時的工作目錄（cwd）——
// 從子目錄下執行這支腳本時，路徑一樣會算對。
const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const MEDIA_DIR = join(ROOT, "public/type-videos");
const MANIFEST = join(ROOT, "media-manifest.txt");

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

function collectLocal() {
  if (!existsSync(MEDIA_DIR)) {
    console.error(`❌ 找不到 ${relative(ROOT, MEDIA_DIR)}/，本機還沒有影片檔案。`);
    console.error("   全新 clone 或換了電腦？請先執行：npm run media:pull");
    process.exit(1);
  }
  return walk(MEDIA_DIR)
    .map((f) => ({ path: relative(MEDIA_DIR, f), size: statSync(f).size }))
    .sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0));
}

function serialize(files) {
  return files.map((f) => `${f.size}\t${f.path}`).join("\n") + "\n";
}

function readManifest() {
  let text;
  try {
    text = readFileSync(MANIFEST, "utf8");
  } catch {
    console.error(`❌ 找不到 ${relative(ROOT, MANIFEST)}，無法驗證。請先執行 node scripts/media-manifest.mjs`);
    process.exit(1);
  }
  return new Map(
    text
      .split("\n")
      .map((line) => line.replace(/\r$/, "")) // 容忍 CRLF（Windows checkout 或編輯器造成的行尾差異）
      .filter(Boolean)
      .map((line) => {
        const [size, ...rest] = line.split("\t");
        return [rest.join("\t"), Number(size)];
      })
  );
}

// 遞迴走訪 typeContent，收集每一筆實際被引用的影片／圖片相對路徑。
// 會鑽進 subTabs（例如合併分頁底下的 In Bound／Out of Bound），不會漏掉巢狀項目。
function collectReferences(typeContent) {
  const refs = []; // { kind: "video"|"image"|"extraImage", path: string|null, contentId, tab }

  function walkMethods(methods, content, contentId) {
    for (const m of methods ?? []) {
      if (m.video) {
        refs.push({
          kind: "video",
          contentId,
          tab: m.tab,
          path: content.videoFolder ? `${content.videoFolder}/${m.video}` : null,
        });
      }
      for (const v of m.videos ?? []) {
        refs.push({
          kind: "video",
          contentId,
          tab: m.tab,
          path: content.videoFolder ? `${content.videoFolder}/${v.video}` : null,
        });
      }
      for (const [kind, filename] of [
        ["image", m.image],
        ["extraImage", m.extraImage],
      ]) {
        if (filename) {
          refs.push({
            kind,
            contentId,
            tab: m.tab,
            path: content.imageFolder ? `${content.imageFolder}/${filename}` : null,
          });
        }
      }
      if (m.subTabs) walkMethods(m.subTabs, content, contentId);
    }
  }

  for (const contentId in typeContent) {
    const content = typeContent[contentId];
    walkMethods(content.methods, content, contentId);
  }
  return refs;
}

const hasVerify = process.argv.includes("--verify");
const hasVerifyReferences = process.argv.includes("--verify-references");

if (hasVerify && hasVerifyReferences) {
  console.error("❌ --verify 和 --verify-references 不能同時使用，請擇一執行。");
  process.exit(1);
}

const mode = hasVerify ? "verify" : hasVerifyReferences ? "verify-references" : "write";

if (mode === "write") {
  const files = collectLocal();
  writeFileSync(MANIFEST, serialize(files));
  const total = files.reduce((s, f) => s + f.size, 0);
  console.log(`✅ 已更新 ${relative(ROOT, MANIFEST)}：${files.length} 個檔案、${(total / 1024 ** 3).toFixed(2)} GiB`);
  process.exit(0);
}

if (mode === "verify") {
  // 以版控中的清單為準，比對本機實際檔案（CI 從 R2 下載完之後跑）。
  const want = readManifest();
  const have = new Map(collectLocal().map((f) => [f.path, f.size]));

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
  process.exit(0);
}

if (mode === "verify-references") {
  // 以 type-content.ts 實際引用的內容為準，比對清單（不摸網路、不摸本機影片，只看資料本身有沒有對齊）。
  // 用意：擋下「加了 method.video 卻忘記 npm run media:push」這種清單根本沒記錄、
  // 光比對清單抓不到的漏洞。
  const want = readManifest();
  const { typeContent } = await import("../src/data/type-content.ts");
  const refs = collectReferences(typeContent);

  const noFolder = refs.filter((r) => r.path === null);
  const notInManifest = refs.filter((r) => r.path !== null && !want.has(r.path));

  for (const r of noFolder) {
    console.error(`❌ ${r.contentId}／${r.tab}：設了 ${r.kind}，但對應的 ${r.kind === "video" ? "videoFolder" : "imageFolder"} 沒填`);
  }
  for (const r of notInManifest) {
    console.error(`❌ ${r.contentId}／${r.tab}：引用了 ${r.path}，但清單裡沒有這個檔案`);
  }

  if (noFolder.length || notInManifest.length) {
    console.error(`\n❌ type-content.ts 引用的影片／圖片有 ${noFolder.length + notInManifest.length} 筆對不上清單。`);
    console.error("   若是本機新增的素材尚未上傳，請執行：npm run media:push");
    process.exit(1);
  }

  console.log(`✅ type-content.ts 引用的 ${refs.length} 筆影片／圖片都在清單裡`);
  process.exit(0);
}
