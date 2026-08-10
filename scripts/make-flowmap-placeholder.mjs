// 產生流程地圖的「示意置底圖」SVG（地面／空島各一張）。
// 真實底圖（WebP 大圖）備妥後直接換掉 public/flow-map/totk/ 下的檔案即可，
// 檔名與涵蓋範圍（X: -6000~6000, Z: -5000~5000）不變就不用動程式。
// 用法：node scripts/make-flowmap-placeholder.mjs
import { writeFileSync } from "node:fs";

const W = 1200, H = 1000; // 1px = 10 遊戲單位

function makeSvg({ bg, gridMajor, gridMinor, label, tint }) {
  const lines = [];
  // 次格線：每 500 單位（50px）
  for (let x = 0; x <= W; x += 50) lines.push(`<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${gridMinor}" stroke-width="0.5"/>`);
  for (let y = 0; y <= H; y += 50) lines.push(`<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${gridMinor}" stroke-width="0.5"/>`);
  // 主格線＋座標標籤：每 1000 單位（100px）
  const labels = [];
  for (let x = 0; x <= W; x += 100) {
    lines.push(`<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${gridMajor}" stroke-width="1"/>`);
    const gx = x * 10 - 6000;
    if (x > 0 && x < W) labels.push(`<text x="${x + 4}" y="16" fill="${tint}" font-size="12" font-family="monospace">${gx}</text>`);
  }
  for (let y = 0; y <= H; y += 100) {
    lines.push(`<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${gridMajor}" stroke-width="1"/>`);
    const gz = y * 10 - 5000; // 上北下南：畫面上緣 z=-5000
    if (y > 0 && y < H) labels.push(`<text x="4" y="${y - 4}" fill="${tint}" font-size="12" font-family="monospace">${gz}</text>`);
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
<rect width="${W}" height="${H}" fill="${bg}"/>
${lines.join("\n")}
${labels.join("\n")}
<text x="${W / 2}" y="${H / 2 - 10}" fill="${tint}" font-size="34" font-family="sans-serif" text-anchor="middle" opacity="0.75">${label}</text>
<text x="${W / 2}" y="${H / 2 + 26}" fill="${tint}" font-size="18" font-family="sans-serif" text-anchor="middle" opacity="0.55">示意底圖——待換成實際地圖（X -6000~6000／Z -5000~5000）</text>
</svg>`;
}

writeFileSync(new URL("../public/flow-map/totk/surface.svg", import.meta.url),
  makeSvg({ bg: "#1c2318", gridMajor: "#39442f", gridMinor: "#272f21", tint: "#8aa07a", label: "地面（Surface）" }));
writeFileSync(new URL("../public/flow-map/totk/sky.svg", import.meta.url),
  makeSvg({ bg: "#141c26", gridMajor: "#2b3a4e", gridMinor: "#1e2a39", tint: "#7f9ab8", label: "空島（Sky）" }));
console.log("done: public/flow-map/totk/{surface,sky}.svg");
