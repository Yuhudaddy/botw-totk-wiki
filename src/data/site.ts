// 站台層級的小型資料：導覽列、首頁的精選 / 最新 / 快速導覽 / 標籤群組。
export interface NavItem {
  label: string;
  path: string; // 已是站內路徑（未加 base）
  match: string; // 用於判斷 active 的前綴
}

export const navItems: NavItem[] = [
  { label: "首頁", path: "/", match: "home" },
  { label: "曠野之息", path: "/botw", match: "botw" },
  { label: "王國之淚", path: "/totk", match: "totk" },
  { label: "影片總覽", path: "/videos", match: "videos" },
  { label: "標籤", path: "/tags", match: "tags" },
];

export interface FeaturedItem {
  id: string;
  title: string;
  meta: string;
}
export const featured: FeaturedItem[] = [
  { id: "MWBVJsLTA0c", title: "虛化裝備 Void Dip & DI", meta: "王國之淚 · 虛化類" },
  { id: "AdwFCk77JsE", title: "永久跨檔繼承 PSLOT", meta: "王國之淚 · 跨檔繼承" },
  { id: "siBcEvxr1Y0", title: "過場必殺劍 Obliterator", meta: "曠野之息 · 必殺技類" },
  { id: "MzbtzsGB34A", title: "餘料儲存 Fuse Storage", meta: "王國之淚 · 儲存類" },
  { id: "HmocgDZFVdk", title: "序章大師劍 MsgNotFound", meta: "王國之淚 · 速通/錯傳" },
  { id: "h7MpbgUvizw", title: "無限／究極口袋火箭", meta: "王國之淚 · 左納烏裝置" },
];

export interface LatestItem {
  title: string;
  sub: string;
  ver: string;
  path: string;
}
export const latest: LatestItem[] = [
  { title: "虛化裝備 Void Dip & DI", sub: "王國之淚 · 虛化類", ver: "1.2.1～", path: "/article/void-dip-di" },
  { title: "餘料儲存 Fuse Storage", sub: "王國之淚 · 儲存類", ver: "～1.4.3", path: "/videos?tag=儲存類" },
  { title: "過場必殺劍 Obliterator", sub: "曠野之息 · 必殺技類", ver: "NS2", path: "/videos?tag=必殺技類" },
  { title: "無限口袋火箭 Pocket Rockets", sub: "王國之淚 · 左納烏裝置", ver: "1.1.2～", path: "/videos?tag=左納烏裝置" },
];

export interface QuickNavItem {
  no: string;
  title: string;
  desc: string;
  path: string;
}
export const quickNav: QuickNavItem[] = [
  { no: "01", title: "曠野之息 BotW", desc: "必殺技、盾擋、移動位移等技巧分類整理。", path: "/botw" },
  { no: "02", title: "王國之淚 TotK", desc: "虛化、儲存、左納烏裝置、跨檔繼承、速通錯傳。", path: "/totk" },
  { no: "03", title: "影片總覽", desc: "所有攻略影片的縮圖牆，一頁瀏覽、直接點開。", path: "/videos" },
  { no: "04", title: "標籤索引", desc: "依類型、難度、版本交叉檢索每篇攻略。", path: "/tags" },
];

export interface TagGroup {
  label: string;
  tags: string[];
}
export const tagGroups: TagGroup[] = [
  { label: "遊戲 · Game", tags: ["王國之淚", "曠野之息"] },
  { label: "分類 · Category", tags: ["虛化類", "儲存類", "左納烏裝置", "跨檔繼承", "速通/錯傳", "必殺技類", "盾擋類", "並列"] },
  { label: "其他 · Misc", tags: ["版本比較"] },
];

// 影片總覽頁的篩選籌碼
export const filterChips: string[] = [
  "王國之淚",
  "曠野之息",
  "虛化類",
  "儲存類",
  "左納烏裝置",
  "跨檔繼承",
  "速通/錯傳",
  "必殺技類",
  "並列",
  "版本比較",
];

export const SITE = {
  title: "曠野・王國攻略 Wiki",
  shortTitle: "曠野・王國攻略",
  description:
    "薩爾達傳說 曠野之息(BotW) / 王國之淚(TotK) 技巧與 Glitch 攻略，整理自 Yuhudaddy 的 YouTube 頻道。",
  youtube: "https://www.youtube.com/@zb_yuhudaddy",
  github: "https://github.com/Yuhudaddy",
  author: "Yuhudaddy",
};
