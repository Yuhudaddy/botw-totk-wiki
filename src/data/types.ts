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
  game: "botw" | "totk";
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
      { no: "05", zh: "劍之考驗", en: "Trial of the Sword (DLC1)", videosOnly: true },
      { no: "06", zh: "新手學習", en: "Beginners", videosOnly: true },
      { no: "07", zh: "神廟特解", en: "Shrine Strategies", videosOnly: true },
      { no: "08", zh: "技巧指法", en: "Inputs", videosOnly: true },
      { no: "09", zh: "主線任務", en: "Main Story", videosOnly: true },
      { no: "10", zh: "動畫片頭曲", en: "Yuda's Openings", videosOnly: true },
      { no: "11", zh: "回應觀眾", en: "Viewer Replies", videosOnly: true },
      { no: "12", zh: "不廢話系列", en: "Zero Fluff", videosOnly: true },
    ],
  },
  {
    game: "totk",
    label: "王國之淚",
    en: "Tears of the Kingdom",
    items: [
      { no: "01", zh: "必備小程錯", en: "Glitches" },
      { no: "02", zh: "序章大師劍", en: "MsgNotFound Sword in Prologue" },
      { no: "03", zh: "進階技巧", en: "Advanced Techniques" },
      { no: "04", zh: "神廟特解", en: "Shrine Strategies" },
    ],
  },
];
