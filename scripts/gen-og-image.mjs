// 產生社群分享縮圖（Open Graph image）：public/og-image.jpg
//
// 用法：npm run og:gen
//
// ── 為什麼要用腳本產、而不是手動存一張圖 ─────────────────────
// 社群卡片是網站在 Discord／Line／X 上的門面，日後改站名、改品牌色、
// 換主視覺都得跟著重做。把合成過程寫成腳本，改一個字重跑一次就好，
// 也留下「這張圖是怎麼來的」的紀錄，不會變成一張沒人知道怎麼改的黑盒圖。
//
// ── 尺寸與格式的選擇 ────────────────────────────────────────
// 1200×630 是 Open Graph 的通用標準（Facebook／Discord／Line／X 都吃這個
// 比例）。輸出用 JPEG 而非 PNG：這張圖是照片類素材，JPEG 檔案小很多，
// 而社群平台抓圖有大小與逾時限制，圖太大反而可能不顯示。

import sharp from "sharp";
import { statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(root, "public/og-image.jpg");

const W = 1200;
const H = 630;

// 站上的品牌色（src/styles/global.css 的 --brand / --accent）
const BRAND = "#c96442";
const ACCENT = "#d97757";

// 字體用 macOS 內建的等價字體：網站本身的 Noto Serif TC / Spectral 是走
// Google Fonts CDN，librsvg 取不到，改用系統字體渲染出來的視覺相當接近。
const SANS = "PingFang TC, Heiti TC, sans-serif";
const SERIF = "Songti TC, Noto Serif TC, serif";
const LATIN_SERIF = "Georgia, Spectral, serif";

/** 背景：神廟夜景（首頁 hero 同一張），裁成 og 比例並壓暗，讓左側文字讀得清楚 */
async function buildBackground() {
  return sharp(join(root, "public/logo/dark.png"))
    .resize(W, H, { fit: "cover", position: "center" })
    .modulate({ brightness: 0.72 })
    .toBuffer();
}

/** 左側壓一層由深到透的漸層，避免背景亮部吃掉白字 */
function scrimSvg() {
  return Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="scrim" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%"   stop-color="#0d0906" stop-opacity="0.92"/>
        <stop offset="45%"  stop-color="#0d0906" stop-opacity="0.72"/>
        <stop offset="72%"  stop-color="#0d0906" stop-opacity="0.22"/>
        <stop offset="100%" stop-color="#0d0906" stop-opacity="0.05"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#scrim)"/>
  </svg>`);
}

/** 林克去背圖：靠右、稍微出血到畫面外，做出「跳進畫面」的動勢 */
async function buildLink() {
  return sharp(join(root, "public/logo/55AFA7FA-20B1-4351-B645-454C89FE30C7-Photoroom.png"))
    .resize({ width: 760 })
    .toBuffer();
}

/** 文字層。SVG 的 text 不會自動換行，所以每一行都各自定位 */
function textSvg() {
  return Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <!-- 眉標：跟站上 hero 的 "技巧索引 · THE TECHNIQUE & GLITCH INDEX" 同一套語彙 -->
    <line x1="72" y1="171" x2="112" y2="171" stroke="${BRAND}" stroke-width="2"/>
    <text x="124" y="178" font-family="${SANS}" font-size="21" fill="${ACCENT}"
          letter-spacing="3.5">技巧索引 · GLITCH INDEX</text>

    <!-- 主標：站名 -->
    <text x="72" y="266" font-family="${SERIF}" font-size="66" font-weight="600"
          fill="#faf9f5" letter-spacing="1">曠野・王國</text>
    <text x="72" y="348" font-family="${SERIF}" font-size="66" font-weight="600"
          fill="#faf9f5" letter-spacing="1">攻略 Wiki</text>

    <!-- 副標：說清楚這是什麼站 -->
    <text x="72" y="412" font-family="${SANS}" font-size="25" fill="#d8d2c8">
      薩爾達傳說 BotW / TotK 技巧與 Glitch</text>

    <!-- 頻道署名 -->
    <text x="72" y="516" font-family="${LATIN_SERIF}" font-size="31" font-style="italic"
          fill="#f0ebe3">Dazotikuy Shrine</text>
    <text x="72" y="556" font-family="${SANS}" font-size="20" fill="#a89e92"
          letter-spacing="1.5">@zb_yuhudaddy</text>
  </svg>`);
}

const [bg, link] = await Promise.all([buildBackground(), buildLink()]);

await sharp(bg)
  .composite([
    // 順序就是疊放順序：林克先進去，再蓋漸層（讓他左半邊融進暗部），最後放字
    { input: link, top: 96, left: 596 },
    { input: scrimSvg(), top: 0, left: 0 },
    { input: textSvg(), top: 0, left: 0 },
  ])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(OUT);

const { size } = statSync(OUT);
console.log(`✅ 已產生 public/og-image.jpg（${W}×${H}，${Math.round(size / 1024)} KB）`);
