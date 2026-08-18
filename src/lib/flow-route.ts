// 「參照流程地圖」的路線圖：把 objmap 匯出的存檔（OBJMAP_SV_VERSION 4）轉成
// FlowMapViewer 能直接畫的線段資料。在建置期讀檔（比照 [...schematicsPath].astro
// 讀藍圖資料夾的做法），前端不需要再 fetch，也不會出現 404。
//
// 檔案放在 public/totk-prologue escape route/，命名規則：
//   {分頁}_{階段}-{步驟}_{圖層}.json      例：ZN_02-03_depths、NZN_02-07_sky+surface
//   ・ZN／NZN＝有／無 Zelda Notes 分頁（只是給人看的，程式不解析）
//   ・尾端的圖層清單＝箭頭「100% 不透明」的圖層，用 + 分隔；切到清單外的圖層時
//     整條路線降到 20%，表示「這條路線不在這張地圖上」。
//
// ⚠️ 座標沿用 objmap 的**原始**座標（北為負），與本站流程地圖同一套，不需換算。
// objmap 網頁上顯示的南北值是原始值取負號後的結果，別拿畫面上的數字直接填。

import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const ROUTE_DIR = join(process.cwd(), "public", "totk-prologue escape route");

/** 單一段路線：一條折線，含它被畫在哪個圖層 */
export interface FlowRouteSegment {
  layer: string;                 // objmap 畫線當下的圖層（Surface／Sky／Depths）
  coords: [number, number][];    // [X, Z] 途經點，原始座標
}
// 註：objmap 存檔裡的 style.color 刻意不取用——那只是畫線當下的隨手顏色，
// 網站上的路線一律用主色，與 botw-28 的建議路線同一套視覺。

export interface FlowRoute {
  segments: FlowRouteSegment[];
  /** 這些圖層顯示 100%，其餘圖層降到 20%（取自檔名尾端） */
  fullLayers: string[];
  /** 終點（最後一段的最後一點），放可點擊的 pin */
  end: { x: number; z: number };
  /** 點擊終點 pin 後顯示的簡易步驟說明 */
  note?: string;
}

/** objmap 存檔的 GeoJSON 結構（只取用得到的欄位） */
interface ObjmapSave {
  drawData?: {
    features?: {
      properties?: { order?: number; map_layer?: string };
      geometry?: { type?: string; coordinates?: number[][] };
    }[];
  };
}

/**
 * 讀資料夾裡所有路線圖，以「不含 .json 的檔名」為 key。
 * 模組載入時跑一次（建置期），之後每次查詢都走記憶體。
 */
function loadRoutes(): Map<string, FlowRoute> {
  const map = new Map<string, FlowRoute>();
  let files: string[];
  try {
    files = readdirSync(ROUTE_DIR).filter((f) => f.endsWith(".json"));
  } catch {
    return map; // 資料夾不存在就當作沒有路線圖，不讓建置整個掛掉
  }

  for (const file of files) {
    // macOS 的檔名可能是 NFD 分解形式，統一成 NFC 才對得上程式碼裡的字串字面值
    const key = file.replace(/\.json$/, "").normalize("NFC");
    const save: ObjmapSave = JSON.parse(readFileSync(join(ROUTE_DIR, file), "utf-8"));

    // 依 order 排序，最後一段的最後一點才是真正的終點
    const features = [...(save.drawData?.features ?? [])].sort(
      (a, b) => (a.properties?.order ?? 0) - (b.properties?.order ?? 0)
    );
    const segments: FlowRouteSegment[] = features
      .filter((f) => f.geometry?.type === "LineString" && (f.geometry.coordinates?.length ?? 0) >= 2)
      .map((f) => ({
        layer: f.properties?.map_layer ?? "Surface",
        coords: f.geometry!.coordinates!.map(([x, z]) => [x, z] as [number, number]),
      }));
    if (segments.length === 0) continue;

    // 檔名尾端 "_sky+surface" → ["sky", "surface"]，對應 FlowMapViewer 的圖層 id
    const suffix = key.slice(key.lastIndexOf("_") + 1).toLowerCase();
    const fullLayers = suffix.split("+").filter(Boolean);

    const lastSeg = segments[segments.length - 1];
    const [x, z] = lastSeg.coords[lastSeg.coords.length - 1];

    map.set(key, { segments, fullLayers, end: { x, z } });
  }
  return map;
}

const ROUTES = loadRoutes();

/** 取得指定檔名的路線圖；查不到回傳 undefined（呼叫端會退回沒有路線的行為） */
export function getFlowRoute(name: string, note?: string): FlowRoute | undefined {
  const route = ROUTES.get(name.normalize("NFC"));
  if (!route) return undefined;
  return note ? { ...route, note } : route;
}
