// 「參照流程地圖」真實底圖產生工具：把地圖圖磚（tiles）拼接成單張大圖。
//
// ※ 圖磚素材請自行準備（從遊戲檔案萃取，或先向圖磚站方確認可以取用），
//   本腳本只負責「拼接」，不會去抓任何遠端資料。
//
// 用法：
//   1. 把某一個縮放層級的圖磚放到一個資料夾，檔名為 {x}_{y}.png
//      （x 由西到東、y 由北到南，從 0 開始；objmap 系的圖磚多為 256px 或 512px 見方）
//   2. node scripts/stitch-flowmap.mjs <圖磚資料夾> <每列磚數> <每欄磚數> <輸出檔>
//      例：node scripts/stitch-flowmap.mjs ./tiles-surface-z5 24 20 surface.png
//   3. 轉成 WebP 壓小（macOS 可用內建 sips 先轉、或裝 cwebp）：
//      cwebp -q 80 surface.png -o public/flow-map/totk/surface.webp
//   4. 更新 FlowMapViewer.astro 預設 layers 的 image 路徑（.svg → .webp）
//
// 拼接靠 macOS 內建的 sips 逐磚貼上太慢，這裡改用 HTML Canvas 概念的替代方案：
// 由於不想引入 node canvas 依賴，本腳本實際上是產生一個 ImageMagick 指令
// （montage）並執行。需要先安裝 ImageMagick：brew install imagemagick
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";

const [dir, colsArg, rowsArg, out] = process.argv.slice(2);
if (!dir || !colsArg || !rowsArg || !out) {
  console.error("用法：node scripts/stitch-flowmap.mjs <圖磚資料夾> <每列磚數> <每欄磚數> <輸出檔>");
  process.exit(1);
}
const cols = Number(colsArg);
const rows = Number(rowsArg);

// 依 y 再依 x 排序組出 montage 的輸入順序（montage 由左到右、由上到下鋪磚）
const files = [];
let missing = 0;
for (let y = 0; y < rows; y++) {
  for (let x = 0; x < cols; x++) {
    const f = `${dir}/${x}_${y}.png`;
    if (existsSync(f)) {
      files.push(f);
    } else {
      files.push("xc:black"); // 缺磚補黑，避免整張圖錯位
      missing++;
    }
  }
}
if (missing > 0) console.warn(`⚠️ 缺 ${missing} 塊圖磚，以黑色補位`);

execFileSync("magick", ["montage", ...files, "-tile", `${cols}x${rows}`, "-geometry", "+0+0", "-background", "black", out], { stdio: "inherit" });
console.log(`done: ${out}（${cols}x${rows} 磚）`);
