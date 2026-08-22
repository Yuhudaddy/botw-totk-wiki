// 從 scripts/sheikah-language.svg（粉絲重繪的希卡文字母表）拆出獨立字形，
// 產生 src/data/sheikah-glyphs.json 供 SheikahField 背景脈衝場使用。
//
// 原始檔的整套字母（a-z、-!.?、0-9）是「一條」大複合路徑（fill #2991FF），
// 排成 6 欄 × 7 列的網格。這裡把路徑依 M 指令拆成子路徑、算出各自的
// bounding box，再依中心點聚類到網格格子——同一格的子路徑合成一個字形。
// 不重寫座標：每個字形直接記下自己的 viewBox（原始座標系的 bbox），
// SVG 端用 viewBox 平移即可，避免手動平移路徑數字出錯。
//
// 用法：node scripts/extract-sheikah.mjs
import { readFileSync, writeFileSync } from "node:fs";

const SRC = new URL("./sheikah-language.svg", import.meta.url);
const OUT = new URL("../src/data/sheikah-glyphs.json", import.meta.url);

const svg = readFileSync(SRC, "utf8");

// 字母表那條路徑：fill="#2991FF" 的 path（黑色的那些是拉丁字母對照，不要）
const m = svg.match(/fill="#2991FF"\s+d="([^"]+)"/);
if (!m) throw new Error("找不到 fill #2991FF 的字母表路徑");
const d = m[1];

// ── 極簡 path parser：這條路徑只用 M/L/H/V/z 的大小寫（無曲線），
//    邊走邊記目前點，逐子路徑收集頂點算 bbox ──────────────────
const tokens = d.match(/[MmLlHhVvZz]|-?\d*\.?\d+/g);
let i = 0;
let x = 0;
let y = 0;
let startX = 0;
let startY = 0;
const subpaths = []; // { d, minX, minY, maxX, maxY }
let cur = null;

const num = () => parseFloat(tokens[i++]);
const isNum = () => i < tokens.length && /^-?[\d.]/.test(tokens[i]);

function open(px, py) {
  cur = { parts: [], minX: px, minY: py, maxX: px, maxY: py };
  subpaths.push(cur);
}
function pt(px, py) {
  if (!cur) return;
  if (px < cur.minX) cur.minX = px;
  if (py < cur.minY) cur.minY = py;
  if (px > cur.maxX) cur.maxX = px;
  if (py > cur.maxY) cur.maxY = py;
}

while (i < tokens.length) {
  const cmd = tokens[i++];
  switch (cmd) {
    case "M":
      x = num(); y = num();
      startX = x; startY = y;
      open(x, y);
      cur.parts.push(`M${x},${y}`);
      // M 後面多餘的座標對視為隱含 L
      while (isNum()) { x = num(); y = num(); pt(x, y); cur.parts.push(`L${x},${y}`); }
      break;
    case "m":
      x += num(); y += num();
      startX = x; startY = y;
      open(x, y);
      cur.parts.push(`M${x},${y}`);
      while (isNum()) { x += num(); y += num(); pt(x, y); cur.parts.push(`L${x},${y}`); }
      break;
    case "L":
      while (isNum()) { x = num(); y = num(); pt(x, y); cur.parts.push(`L${x},${y}`); }
      break;
    case "l":
      while (isNum()) { x += num(); y += num(); pt(x, y); cur.parts.push(`L${x},${y}`); }
      break;
    case "H":
      while (isNum()) { x = num(); pt(x, y); cur.parts.push(`L${x},${y}`); }
      break;
    case "h":
      while (isNum()) { x += num(); pt(x, y); cur.parts.push(`L${x},${y}`); }
      break;
    case "V":
      while (isNum()) { y = num(); pt(x, y); cur.parts.push(`L${x},${y}`); }
      break;
    case "v":
      while (isNum()) { y += num(); pt(x, y); cur.parts.push(`L${x},${y}`); }
      break;
    case "Z":
    case "z":
      x = startX; y = startY;
      cur.parts.push("Z");
      break;
    default:
      throw new Error(`未支援的指令 ${cmd}（此字母表路徑理論上只有 M/L/H/V/Z）`);
  }
}

// ── 依網格聚類：6 欄 × 5 列（只取字母與標點列）────────────────
// 數字兩列的字形跨在等分格線上、無法用固定網格乾淨聚類，而背景
// 脈衝場只需要字母，直接捨棄 y ≥ 500 的數字列。
const COLS = 6;
const ROWS = 5;
const X0 = 23, X1 = 458;
const Y0 = 19, Y1 = 480;
const colW = (X1 - X0) / COLS;
const rowH = (Y1 - Y0) / ROWS;

// 網格的字元排列（原檔 layer id 命名即為此順序）
const CHARS = [
  "a", "b", "c", "d", "e", "f",
  "g", "h", "i", "j", "k", "l",
  "m", "n", "o", "p", "q", "r",
  "s", "t", "u", "v", "w", "x",
  "y", "z", "-", "!", ".", "?",
];

const cells = new Map(); // index → { parts, bbox }
for (const sp of subpaths) {
  const cx = (sp.minX + sp.maxX) / 2;
  const cy = (sp.minY + sp.maxY) / 2;
  if (cy >= 500) continue; // 數字列捨棄（見上）
  const col = Math.min(COLS - 1, Math.max(0, Math.floor((cx - X0) / colW)));
  const row = Math.min(ROWS - 1, Math.max(0, Math.floor((cy - Y0) / rowH)));
  const idx = row * COLS + col;
  if (!cells.has(idx)) cells.set(idx, { parts: [], minX: sp.minX, minY: sp.minY, maxX: sp.maxX, maxY: sp.maxY });
  const c = cells.get(idx);
  c.parts.push(sp.parts.join(""));
  c.minX = Math.min(c.minX, sp.minX);
  c.minY = Math.min(c.minY, sp.minY);
  c.maxX = Math.max(c.maxX, sp.maxX);
  c.maxY = Math.max(c.maxY, sp.maxY);
}

const glyphs = {};
for (const [idx, c] of [...cells.entries()].sort((a, b) => a[0] - b[0])) {
  const ch = CHARS[idx];
  if (!ch) continue; // 數字列的空格子
  const r = (n) => Math.round(n * 100) / 100;
  glyphs[ch] = {
    d: c.parts.join(""),
    viewBox: `${r(c.minX)} ${r(c.minY)} ${r(c.maxX - c.minX)} ${r(c.maxY - c.minY)}`,
    w: r(c.maxX - c.minX),
    h: r(c.maxY - c.minY),
  };
}

writeFileSync(OUT, JSON.stringify(glyphs, null, 1));
console.log(`拆出 ${Object.keys(glyphs).length} 個字形 → src/data/sheikah-glyphs.json`);
console.log("字元：", Object.keys(glyphs).join(" "));
