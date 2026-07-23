// 站台層級的小型資料：導覽列、首頁的精選 / 最新 / 快速導覽 / 標籤群組。
export interface NavItem {
  label: string;
  path: string; // 已是站內路徑（未加 base）
  match: string; // 用於判斷 active 的前綴
}

export const navItems: NavItem[] = [
  { label: "主題解說", path: "/types", match: "types" },
  { label: "影片索引", path: "/videos", match: "videos" },
  { label: "資料網站", path: "/resources", match: "resources" },
  { label: "關於神廟", path: "/about", match: "about" },
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
  { title: "餘料儲存 Fuse Storage", sub: "王國之淚 · 儲存類", ver: "～1.4.3", path: "/article/fuse-storage" },
  { title: "過場必殺劍 Obliterator", sub: "曠野之息 · 必殺技類", ver: "NS2", path: "/article/cutscene-obliterator" },
  { title: "無限口袋火箭 Pocket Rockets", sub: "王國之淚 · 左納烏裝置", ver: "1.1.2～", path: "/videos?tag=左納烏裝置" },
];

export interface QuickNavItem {
  no: string;
  series: string; // 小字系列名
  title: string; // 主標題（問句）
  path?: string; // 單一連結卡片用（與 links 擇一）
  links?: { label: string; path: string }[]; // 多按鈕卡片用（與 path 擇一），例：物件地圖有兩個入口
}
export const quickNav: QuickNavItem[] = [
  { no: "01", series: "風彈系列", title: "風彈是 Bug 嗎？", path: "/types/botw-01" },
  { no: "02", series: "轉存格系列", title: "救救我的背包！", path: "/types/botw-02" },
  { no: "03", series: "萊尼爾系列", title: "打不贏人馬！", path: "/types/botw-03" },
  { no: "04", series: "被更新系列", title: "新版不能用了？", path: "/videos?search=差在哪裡" },
  {
    no: "05",
    series: "物件地圖",
    title: "東西在哪呢？",
    links: [
      { label: "Leo 曠野物件地圖", path: "/resources/object-map/botw" },
      { label: "Leo 王淚物件地圖", path: "/resources/object-map/totk" },
    ],
  },
  { no: "06", series: "藍圖分享", title: "有好用藍圖嗎？", path: "/resources/practical-schematics" },
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
  shortTitle: "Dazotikuy Shrine",
  description:
    "薩爾達傳說 曠野之息(BotW) / 王國之淚(TotK) 技巧與 Glitch 攻略，整理自 Yuhudaddy 的 YouTube 頻道。",
  youtube: "https://www.youtube.com/@zb_yuhudaddy",
  github: "https://github.com/Yuhudaddy",
  discord: "https://discord.com/invite/5V872Y8",
  x: "https://x.com/zb_yuhudaddy",
  instagram: "https://www.instagram.com/yuda_chc",
  threads: "https://www.threads.com/@yuda_chc",
  marshmallow: "https://marshmallow-qa.com/zb_yuhudaddy?utm_medium=url_text&utm_source=pr",
  line: "https://line.me/ti/g2/IKGasUeTgT9HmUPX2MtLCfJaYy1N7c9UtBEo6Q?utm_source=invitation&utm_medium=link_copy&utm_campaign=default",
  author: "Yuhudaddy",
};
