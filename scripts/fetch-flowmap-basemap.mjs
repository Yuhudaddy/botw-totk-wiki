// 從 objmap-totk（zeldamods，GPL-3.0）的圖磚伺服器下載「參照流程地圖」的真實底圖，
// 拼接成 FlowMapViewer.astro 用的單張大圖。座標系統、圖磚規則取自該專案原始碼
// （src/MapBase.ts、src/util/map.ts）：
//   ・遊戲座標範圍 X: -6000~6000、Z: -5000~5000（與本站 FlowMapViewer 的設定一致）
//   ・整張地圖原生尺寸 24000×20000px，每塊圖磚 256px，原生到 zoom 7
//   ・圖磚網址：{TILE_BASE}/{Ground|Sky}/maptex/{z}/{x}/{y}.webp
//
// 這裡選 zoom 5（每塊磚涵蓋原生 1024px，總格數 24×20＝480 塊／層），
// 拼出來約 6144×5120px，解析度夠用又不會讓網站背了太大的檔案。
//
// 用法：node scripts/fetch-flowmap-basemap.mjs
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const TILE_BASE = "https://objmap-totk.zeldamods.org/game_files/map";
const ZOOM = 5;
const NATIVE_ZOOM = 7;
const TILE_SIZE = 256;
const NATIVE_W = 24000, NATIVE_H = 20000;
const tileSpan = TILE_SIZE * 2 ** (NATIVE_ZOOM - ZOOM); // 每塊磚在原生解析度下涵蓋的像素
const COLS = Math.ceil(NATIVE_W / tileSpan);
const ROWS = Math.ceil(NATIVE_H / tileSpan);

const LAYERS = [
  { area: "Ground", out: "surface" },
  { area: "Sky", out: "sky" },
];

const CONCURRENCY = 6;
const RETRY = 2;

async function fetchTile(area, x, y) {
  const url = `${TILE_BASE}/${area}/maptex/${ZOOM}/${x}/${y}.webp`;
  for (let attempt = 0; attempt <= RETRY; attempt++) {
    try {
      const res = await fetch(url);
      if (res.status === 404) return null; // 該格沒有地形（海面外圍等），留空即可
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return Buffer.from(await res.arrayBuffer());
    } catch (err) {
      if (attempt === RETRY) {
        console.warn(`  ⚠️ ${area} ${x},${y} 下載失敗：${err.message}`);
        return null;
      }
      await new Promise((r) => setTimeout(r, 300));
    }
  }
}

async function pool(items, worker, concurrency) {
  const results = new Array(items.length);
  let next = 0;
  async function run() {
    while (next < items.length) {
      const i = next++;
      results[i] = await worker(items[i], i);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, run));
  return results;
}

async function fetchLayer({ area, out }) {
  console.log(`\n下載 ${area}（zoom ${ZOOM}，${COLS}×${ROWS} 塊磚）...`);
  const dir = new URL(`../.tmp-flowmap-tiles/${area}/`, import.meta.url);
  await mkdir(dir, { recursive: true });

  const coords = [];
  for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) coords.push([x, y]);

  let done = 0, missing = 0, skipped = 0;
  await pool(coords, async ([x, y]) => {
    const tilePath = new URL(`${x}_${y}.webp`, dir);
    if (existsSync(tilePath)) {
      skipped++;
      done++;
      return;
    }
    const buf = await fetchTile(area, x, y);
    done++;
    if (!buf) missing++;
    else await writeFile(tilePath, buf);
    if (done % 50 === 0 || done === coords.length) {
      process.stdout.write(`\r  ${done}/${coords.length}（缺 ${missing}，已存在跳過 ${skipped}）`);
    }
  }, CONCURRENCY);
  console.log("");
  return { dir, missing };
}

async function stitch(area, out, dir) {
  const pyPath = fileURLToPath(new URL("./_stitch.py", import.meta.url));
  const outPath = fileURLToPath(new URL(`../public/flow-map/totk/${out}.webp`, import.meta.url));
  execFileSync("python3", [pyPath, fileURLToPath(dir), String(COLS), String(ROWS), String(TILE_SIZE), outPath], {
    stdio: "inherit",
  });
  console.log(`  → ${outPath}`);
}

for (const layer of LAYERS) {
  const { dir, missing } = await fetchLayer(layer);
  if (missing > 0) console.log(`  （${missing} 塊為空白／下載失敗，拼接時補透明）`);
  await stitch(layer.area, layer.out, dir);
}

console.log("\n完成。");
