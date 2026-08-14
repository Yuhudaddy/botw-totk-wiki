// 由入口頁截圖產生社群分享縮圖（Open Graph image）：public/og-image.jpg
//
// 用法：
//   npm run og:gen -- "/path/to/截圖.png"
//
// ── 為什麼是「截圖」而不是程式合成 ──────────────────────────
// 入口頁的主視覺是 canvas 粒子動畫（YUDA 由星塵聚成），這個效果沒辦法用
// 靜態素材重現，只能實際跑一次頁面把它拍下來。
//
// ── 拍攝方式（重點是時機）──────────────────────────────────
// 粒子會持續飄散：載入後 0～2 秒 YUDA 最清晰，3 秒後就散成一片星塵。
// 所以要「重新整理後馬上截圖」，多拍幾張挑最好的。
//   1. 開 https://yuhudaddy.github.io/dazotikuy/
//   2. Cmd+R 重新整理
//   3. 立刻 Cmd+Shift+4 框選頁面內容（不要框到瀏覽器工具列）
//
// ── 這支腳本做什麼 ────────────────────────────────────────
// 把截圖裁成 Open Graph 的標準比例並縮到 1200×630。裁切時刻意往內收，
// 讓 YUDA 與「Dazotikuy Shrine」佔滿版面——社群預覽圖顯示得很小，
// 留太多空白邊會讓主體看不清楚。
//
// 輸出用 JPEG 而非 PNG：這是照片類素材，JPEG 小很多，而社群平台抓圖
// 有大小與逾時限制，圖太大反而可能不顯示。

import sharp from "sharp";
import { statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(root, "public/og-image.jpg");

const W = 1200;
const H = 630;
const RATIO = W / H;

const src = process.argv[2];
if (!src) {
  console.error("用法：npm run og:gen -- \"/path/to/截圖.png\"");
  console.error("（拍攝方式見本檔開頭的註解——重點是重新整理後馬上截圖）");
  process.exit(1);
}

const meta = await sharp(src).metadata();

// 往內收的比例：0.84 是實測出來的甜蜜點——再大會把頁尾版權列一起收進來，
// 再小則 YUDA 兩側的 Y 與 A 會被切到。
const CROP_SCALE = 0.84;
// 垂直起點偏下（0 = 貼齊上緣、1 = 貼齊下緣）。往下收才能同時甩掉頁首那行
// 小字 logo、又不會把下方的兩顆按鈕切一半——上下都切乾淨的位置在 0.65 附近。
const TOP_BIAS = 0.65;

const cropH = Math.round(meta.height * CROP_SCALE);
const cropW = Math.round(cropH * RATIO);

if (cropW > meta.width) {
  console.error(
    `❌ 截圖太窄：需要至少 ${cropW}px 寬才能裁出 ${W}×${H} 的比例，目前只有 ${meta.width}px。\n` +
      `   請把瀏覽器視窗拉寬一點再重拍。`
  );
  process.exit(1);
}

const left = Math.round((meta.width - cropW) / 2);
const top = Math.round((meta.height - cropH) * TOP_BIAS);

await sharp(src)
  .extract({ left, top, width: cropW, height: cropH })
  .resize(W, H)
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile(OUT);

const { size } = statSync(OUT);
console.log(
  `✅ 已產生 public/og-image.jpg（${W}×${H}，${Math.round(size / 1024)} KB）\n` +
    `   來源：${src}（${meta.width}×${meta.height}，裁切 ${cropW}×${cropH}）`
);
