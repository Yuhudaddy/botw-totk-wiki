// 遊戲分類定義（示意資料，沿用原型）。
export type GameKey = "botw" | "totk";

export interface CategoryItem {
  no: string;
  title: string;
  desc: string;
  meta: string;
  status: "active" | "wip";
  // 連到哪：article slug 或 videos 篩選標籤
  articleSlug?: string;
  tag?: string;
}

export interface GameCategory {
  key: GameKey;
  game: string;
  en: string;
  desc: string;
  tip: string;
  cats: CategoryItem[];
}

export const totkCategory: GameCategory = {
  key: "totk",
  game: "王國之淚",
  en: "Tears of the Kingdom",
  desc: "《薩爾達傳說：王國之淚》技巧與 Glitch 攻略。分類涵蓋虛化、儲存、左納烏裝置、跨檔繼承、速通錯傳等。每篇都標註適用版本與難度。",
  tip: "王國之淚常見版本：NS1 的 1.2.1、NS2 的 1.4.3。許多 glitch 只在特定版本可用，操作前務必確認頁面標註的適用版本。",
  cats: [
    { no: "01", title: "虛化裝備 Void Dip / DI", desc: "虛空次元歸來的虛化裝備：無限耐久、複製、無限彈簧火箭盾。", meta: "2 篇 · 1.2.1～", status: "active", articleSlug: "void-dip-di" },
    { no: "02", title: "餘料儲存 Fuse Storage", desc: "將餘料狀態儲存以達成各種效果的基礎技巧。", meta: "1 篇 · ～1.4.3", status: "active", articleSlug: "fuse-storage" },
    { no: "03", title: "跨檔繼承 PSLOT", desc: "永久跨檔繼承（Permanent Save Load Object Transfer）。", meta: "敬請期待", status: "wip" },
    { no: "04", title: "速通 / 錯傳", desc: "序章大師劍（MsgNotFound）、指標錯傳（Index Wrong Warp）等。", meta: "敬請期待", status: "wip" },
    { no: "05", title: "左納烏裝置 Zonai", desc: "口袋火箭、GAS、ARAZ、米涅魯相關技巧。", meta: "敬請期待", status: "wip" },
    { no: "06", title: "並列 Zuggle", desc: "再同步並列、米涅魯地圖並列等並列技巧。", meta: "敬請期待", status: "wip" },
  ],
};

export const botwCategory: GameCategory = {
  key: "botw",
  game: "曠野之息",
  en: "Breath of the Wild",
  desc: "《薩爾達傳說：曠野之息》技巧與 Glitch 攻略。必殺技、盾擋、移動位移等技巧分類整理。",
  tip: "曠野之息常見版本：NS1 的 1.6.0、NS2 的 1.8.2 / 1.9.0。操作前請確認頁面標註的適用版本。",
  cats: [
    { no: "01", title: "過場必殺劍 Obliterator", desc: "過場動畫觸發的一擊必殺劍 (Cutscene One-Hit Obliterator)。", meta: "1 篇 · 番外58 · NS2", status: "active", articleSlug: "cutscene-obliterator" },
    { no: "02", title: "盾擋類 Shield", desc: "轉向盾擋重置 Turnaround SBR 等盾擋相關技巧。", meta: "1 篇 · 番外10.5 · NS2", status: "active", articleSlug: "turnaround-sbr" },
    { no: "03", title: "版本比較", desc: "NS1 vs NS2 必看技巧與版本差異整理。", meta: "ED01 / ED02", status: "active", tag: "版本比較" },
  ],
};

export const gameCategories: Record<GameKey, GameCategory> = {
  totk: totkCategory,
  botw: botwCategory,
};
