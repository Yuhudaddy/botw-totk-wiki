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

// 首頁的「最近熱門」與「最新整理」改由 src/data/youtube.json 供應
// （CI 每日跑 scripts/fetch-youtube.mjs 更新），此處原本的手寫清單已移除。

export interface QuickNavItem {
  no: string;
  series: string; // 小字系列名
  seriesJa?: string;
  title: string; // 主標題（問句）
  titleJa?: string;
  path?: string; // 單一連結卡片用（與 links 擇一）
  // 多按鈕卡片用（與 path 擇一），例：物件地圖有兩個入口。
  // word/tone 供桌面版 hover 特效使用：word 是淡入的漸層短字，tone 決定漸層配色（botw 藍／totk 青綠）。
  links?: { label: string; labelJa?: string; path: string; word?: string; wordJa?: string; tone?: "botw" | "totk" }[];
}
export const quickNav: QuickNavItem[] = [
  { no: "01", series: "風彈系列", seriesJa: "ウインドボムシリーズ", title: "風彈是 Bug 嗎？", titleJa: "ウインドボムってバグ？", path: "/types/botw-01" },
  { no: "02", series: "轉存格系列", seriesJa: "引き継ぎ枠シリーズ", title: "救救我的背包！", titleJa: "アイテム欄を救って！", path: "/types/botw-02" },
  { no: "03", series: "萊尼爾系列", seriesJa: "ライネルシリーズ", title: "打不贏人馬！", titleJa: "ライネルに勝てない！", path: "/types/botw-03" },
  // path 的搜尋字串固定比對中文影片標題（見翻譯進度追蹤 Artifact），不隨語言切換
  { no: "04", series: "被更新系列", seriesJa: "アプデ潰されシリーズ", title: "新版不能用了？", titleJa: "最新版で使えない？", path: "/videos?search=差在哪裡" },
  {
    no: "05",
    series: "物件地圖",
    seriesJa: "オブジェクトマップ",
    title: "東西在哪呢？",
    titleJa: "アイテムはどこ？",
    links: [
      // labelJa 與 ui-strings.ts 的 objMapBotwTitle/objMapTotkTitle 保持同一套字串
      { label: "Léo 曠野物件地圖", labelJa: "Léo ブレワイ オブジェクトマップ", path: "/resources/object-map/botw", word: "曠野", wordJa: "ブレワイ", tone: "botw" },
      { label: "Léo 王淚物件地圖", labelJa: "Léo ティアキン オブジェクトマップ", path: "/resources/object-map/totk", word: "王淚", wordJa: "ティアキン", tone: "totk" },
    ],
  },
  { no: "06", series: "藍圖分享", seriesJa: "ブループリント共有", title: "有好用藍圖嗎？", titleJa: "使える設計図ある？", path: "/resources/practical-schematics" },
];

export const SITE = {
  title: "曠野・王國攻略 Wiki",
  // 日文頁的 <title> 後綴與預設 meta description；目前只有曠野之息／王國之淚
  // 有日文版站名，其餘遊戲名稱尚未翻譯（見 types.ts 的 TypeGroup.ja）。
  titleJa: "ブレワイ・ティアキン攻略Wiki",
  shortTitle: "Dazotikuy Shrine",
  description:
    "薩爾達傳說 曠野之息(BotW) / 王國之淚(TotK) 技巧與 Glitch 攻略，整理自 Yuhudaddy 的 YouTube 頻道。",
  descriptionJa:
    "ゼルダの伝説 ブレワイ／ティアキンのテクニック・グリッチ攻略。Yuhudaddy の YouTube チャンネルより編集。",
  youtube: "https://www.youtube.com/@zb_yuhudaddy",
  discord: "https://discord.com/invite/5V872Y8",
  x: "https://x.com/zb_yuhudaddy",
  instagram: "https://www.instagram.com/yuda_chc",
  threads: "https://www.threads.com/@yuda_chc",
  line: "https://line.me/ti/g2/IKGasUeTgT9HmUPX2MtLCfJaYy1N7c9UtBEo6Q?utm_source=invitation&utm_medium=link_copy&utm_campaign=default",
  author: "Yuhudaddy",
};
