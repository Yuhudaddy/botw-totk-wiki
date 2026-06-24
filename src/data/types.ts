// 「常見類型」頁的資料：依遊戲分組的系列／播放清單。
export interface TypeItem {
  no: string;
  zh: string;
  en: string;
  videosOnly?: boolean; // 詳細頁只顯示「相關影片」區（隱藏流程／原理／注意事項）
  playlist?: string;  // YouTube 播放清單連結（待補）
  videos?: string[];  // 詳細頁底部顯示的 YouTube 影片 ID（待補）
}

export interface TypeGroup {
  game: "botw" | "totk" | "eow";
  label: string;
  en: string;
  items: TypeItem[];
}

export const typeGroups: TypeGroup[] = [
  {
    game: "botw",
    label: "曠野之息",
    en: "Breath of the Wild",
    items: [
      { no: "01", zh: "風彈", en: "Windbomb" },
      { no: "02", zh: "轉存格", en: "Inventory Slot Transfer" },
      { no: "03", zh: "萊尼爾", en: "Lynels" },
      { no: "04", zh: "月步", en: "Moonjump" },
      { no: "05", zh: "過場必殺劍", en: "Cutscene OHO" },
      { no: "06", zh: "盾擋重置", en: "Shield Block Reset" },
      { no: "07", zh: "偷襲機制", en: "Sneakstrike" },
      { no: "08", zh: "劍之考驗", en: "Trial of the Sword (DLC1)", videosOnly: true },
      { no: "09", zh: "新手學習", en: "Beginners", videosOnly: true },
      { no: "10", zh: "神廟特解", en: "Shrine Strategies", videosOnly: true },
      { no: "11", zh: "技巧指法", en: "Inputs", videosOnly: true },
      { no: "12", zh: "主線任務", en: "Main Story", videosOnly: true },
      { no: "13", zh: "裝備複製", en: "Equipment Duping" },
      { no: "14", zh: "回應觀眾", en: "Viewer Replies", videosOnly: true },
      { no: "15", zh: "不廢話系列", en: "Zero Fluff", videosOnly: true },
      { no: "16", zh: "合作戰鬥集", en: "Combat Montage", videosOnly: true },
      { no: "17", zh: "主動突擊", en: "Active Flurry Rush" },
    ],
  },
  {
    game: "totk",
    label: "王國之淚",
    en: "Tears of the Kingdom",
    items: [
      { no: "01", zh: "必備小程錯", en: "Glitches" },
      { no: "02", zh: "進階技巧", en: "Advanced Techniques" },
      { no: "03", zh: "神廟特解", en: "Shrine Strategies" },
      { no: "04", zh: "序章大師劍", en: "MsgNotFound Sword in Prologue" },
      { no: "05", zh: "西方高原", en: "Western Highlands" },
      { no: "06", zh: "黏手與並列", en: "Smuggle & Zuggle" },
      { no: "07", zh: "過載", en: "Overload" },
      { no: "08", zh: "虛化裝備", en: "Void-Dip & DI" },
      { no: "09", zh: "偷襲機制", en: "Sneakstrike" },
      { no: "10", zh: "進階餘料建造", en: "Advanced Fuse" },
      { no: "11", zh: "隱藏剔除", en: "Cull" },
      { no: "12", zh: "道具複製", en: "Item Duplication" },
    ],
  },
  {
    game: "eow",
    label: "智慧的再現",
    en: "Echoes of Wisdom",
    items: [
      { no: "01", zh: "大岩蛇", en: "Onix" },
      { no: "02", zh: "萊尼爾", en: "Lynel" },
      { no: "03", zh: "飛天技巧", en: "Skybound", videosOnly: true },
    ],
  },
];
