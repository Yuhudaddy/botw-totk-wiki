// 「常見類型」頁的資料：依遊戲分組的系列／播放清單。
export interface TypeItem {
  no: string;
  zh: string;
  en: string;
  ja?: string;      // 日文標題；未填則日文頁沿用 zh（主題解說列表卡片＋詳細頁自身的標題／麵包屑／h1 都用這個）
  shortZh?: string; // 主題索引卡片用的短中文（例：家族旗艦頁在外面列表用家族名顯示）；未填則使用 zh
  shortEn?: string; // 主題索引卡片用的短英文；未填則使用 en
  shortJa?: string; // 主題索引卡片用的短日文；未填則使用 ja
  videosOnly?: boolean; // 詳細頁只顯示「相關影片」區（隱藏流程／原理／注意事項）
  termsOnly?: boolean;  // 詳細頁只顯示「名詞說明」＋「相關影片」（大亂鬥用）
  family?: string;       // 技巧家族 id（同家族的項目在詳細頁會顯示彈道切換帶，例："launch"）
  hideFromGrid?: boolean; // 家族內非代表項目：不在主題解說列表顯示，只能透過切換帶進入
}

export type GameId = "botw" | "totk" | "eow" | "ssbu" | "aoc" | "aoi";

export interface TypeGroup {
  game: GameId;
  label: string;
  en: string;
  ja?: string; // 日文版標題用的簡稱（例：botw → ブレワイ）；未填的遊戲日文頁沿用 label
  shortLabel?: string; // 門扉卡片空間有限時使用的縮寫（未填則用 label）
  shortEn?: string; // 門扉卡片空間有限時使用的英文縮寫（未填則用 en）
  items: TypeItem[];
}

// 技巧家族的顯示名稱：詳細頁麵包屑與切換帶標頭用（成員各自的 zh/en/ja 維持自己的頁面身分不變）
export const typeFamilies: Record<string, { zh: string; en: string; ja: string }> = {
  launch: { zh: "擊飛", en: "Launch", ja: "ローンチ" },
};

export const typeGroups: TypeGroup[] = [
  {
    game: "botw",
    label: "曠野之息",
    en: "Breath of the Wild",
    ja: "ブレワイ",
    shortEn: "Zelda BoTW",
    items: [
      { no: "01", zh: "風彈", en: "Windbomb", ja: "ウインドボム", shortZh: "擊飛", shortEn: "Launch", shortJa: "ローンチ", family: "launch" },
      { no: "01-stasis", zh: "一般擊飛", en: "General Launch", ja: "ノーマルローンチ", family: "launch", hideFromGrid: true },
      { no: "01-super", zh: "擊飛加速", en: "Super Launch", ja: "スーパーローンチ", family: "launch", hideFromGrid: true },
      { no: "02", zh: "轉存格", en: "Inventory Slot Transfer", ja: "引き継ぎ枠" },
      { no: "03", zh: "萊尼爾", en: "Lynels", ja: "ライネル" },
      { no: "04", zh: "月步", en: "Moonjump", ja: "流鏑馬ホバー" },
      { no: "05", zh: "過場必殺劍", en: "Cutscene OHO (DLC2)", ja: "カットシーン一撃の剣" },
      { no: "06", zh: "盾擋重置", en: "Shield Block Reset", ja: "盾受け二段ジャンプ" },
      { no: "07", zh: "偷襲機制", en: "Sneakstrike", ja: "ふいうち" },
      { no: "08", zh: "劍之考驗", en: "Trial of the Sword (DLC1)", ja: "剣の試練" },
      { no: "09", zh: "新手學習", en: "Beginners", ja: "初心者向け", videosOnly: true },
      { no: "10", zh: "神廟特解", en: "Shrine Strategies", ja: "祠攻略", videosOnly: true },
      { no: "11", zh: "技巧指法", en: "Inputs", ja: "指運び", videosOnly: true },
      { no: "12", zh: "主線任務", en: "Main Story", ja: "メインストーリー", videosOnly: true },
      { no: "13", zh: "裝備複製", en: "Equipment Duping", ja: "装備増殖" },
      { no: "14", zh: "觀眾提問", en: "Viewer Replies", ja: "視聴者Q&A", videosOnly: true },
      { no: "15", zh: "不廢話系列", en: "Zero Fluff", ja: "前置きなし系列", videosOnly: true },
      { no: "16", zh: "合作戰鬥集", en: "Combat Montage", ja: "戦闘コンピレーション", videosOnly: true },
      { no: "17", zh: "主動突擊", en: "Active Flurry Rush", ja: "能動的なラッシュ" },
      { no: "18", zh: "穿牆", en: "Clipping", ja: "壁抜け" },
      { no: "19", zh: "子時彈翔", en: "Bullet Time Bounce", ja: "バレットタイムバウンズ" },
      { no: "20", zh: "天滑", en: "Bow Lift Smuggle Slide", ja: "弓持ちスライド" },
      { no: "21", zh: "硬直取消", en: "Endlag Cancel", ja: "硬直キャンセル" },
      { no: "22", zh: "過載與災禍", en: "Overload & Curse", ja: "オーバーロードと災い" },
      { no: "23", zh: "近廟入侵", en: "Shrine Coordinate Warp", ja: "祠座標ワープ" },
      { no: "24", zh: "重置靜止器", en: "Stasis Reset", ja: "ビタロックリセット" },
      { no: "25", zh: "裝置儲存", en: "Apparatus Storage", ja: "装置ストレージ" },
      { no: "26", zh: "下馬滑行", en: "Horse Slide", ja: "落馬スライド" },
      { no: "27", zh: "飛行礦車", en: "Flying Carts", ja: "飛行トロッコ" },
      { no: "28", zh: "無限古代素材", en: "Infinite Ancient Parts", ja: "無限古代素材" },
      { no: "29", zh: "選單儲存", en: "UI Storage", ja: "メニューストレージ" },
    ],
  },
  {
    game: "totk",
    label: "王國之淚",
    en: "Tears of the Kingdom",
    ja: "ティアキン",
    shortEn: "Zelda ToTK",
    items: [
      { no: "01", zh: "基礎小程錯", en: "Basic Glitches", ja: "基礎グリッチ", videosOnly: true },
      { no: "02", zh: "進階技巧", en: "Advanced Techniques", ja: "上級テクニック", videosOnly: true },
      { no: "03", zh: "萊尼爾", en: "Lynel", ja: "ライネル" },
      { no: "04", zh: "主線任務", en: "Main Story", ja: "メインストーリー", videosOnly: true },
      { no: "05", zh: "神廟特解", en: "Shrine Strategies", ja: "祠攻略", videosOnly: true },
      { no: "06", zh: "餘料機制", en: "Fuse Mechanics", ja: "スクビル機構" },
      { no: "07", zh: "纏桿", en: "Stick Desync Clipping", ja: "床抜け操縦桿" },
      { no: "08", zh: "隱藏(剔除)", en: "Cull", ja: "カリング" },
      { no: "09", zh: "黏手與並列", en: "Smuggle & Zuggle", ja: "スマグル＆ザグル" },
      { no: "10", zh: "道具繼承", en: "Item Transfer", ja: "アイテム引き継ぎ" },
      { no: "11", zh: "過載", en: "Overload", ja: "オーバーロード" },
      { no: "12", zh: "偷襲機制", en: "Sneakstrike", ja: "ふいうち" },
      { no: "13", zh: "恆動裝置", en: "Guard-less Active Shield", ja: "常時起動装置", shortEn: "GAS" },
      { no: "14", zh: "材料複製", en: "Item Duplication", ja: "素材増殖" },
      { no: "15", zh: "盾擋重置", en: "Shield Block Reset", ja: "盾受け二段ジャンプ" },
      { no: "16", zh: "虛化裝備", en: "Void Dip & Despawn Interrupt", ja: "フロックス化装備" },
      { no: "17", zh: "連噴火箭盾", en: "Pocket Rockets", ja: "ポケロケ" },
      { no: "18", zh: "序章大師劍", en: "MsgNotFound Sword in Prologue", ja: "バグマスターソード" },
      { no: "19", zh: "序章林克繼承", en: "Prologue Escape", ja: "プロローグリンク召喚" },
      { no: "20", zh: "硬直取消", en: "Endlag Cancel", ja: "硬直キャンセル" },
      { no: "21", zh: "沐彼", en: "Moobe", ja: "Moobe" },
      { no: "22", zh: "舉物定位傳送", en: "Lift Storage Warping", ja: "持ち上げ座標ワープ", shortEn: "LSW" },
    ],
  },
  {
    game: "eow",
    label: "智慧的再現",
    en: "Echoes of Wisdom",
    ja: "知恵のかりもの",
    shortEn: "Zelda EoW",
    items: [
      { no: "01", zh: "選單儲存", en: "Menu Storage", ja: "メニューストレージ" },
      { no: "02", zh: "萊尼爾", en: "Lynel", ja: "ライネル" },
      { no: "03", zh: "飛天技巧", en: "Skybound", ja: "飛行テクニック", videosOnly: true },
    ],
  },
  {
    game: "ssbu",
    label: "任天堂明星大亂鬥特別版",
    en: "SSB Ultimate",
    ja: "スマブラSP",
    shortLabel: "大亂鬥",
    items: [
      { no: "01", zh: "入門篇", en: "Beginner's Guide", ja: "入門編", termsOnly: true },
      { no: "02", zh: "初級篇", en: "Elementary Guide", ja: "初級編", termsOnly: true },
      { no: "03", zh: "中級篇", en: "Intermediate Guide", ja: "中級編", termsOnly: true },
      { no: "04", zh: "上級篇", en: "Advanced Guide", ja: "上級編", termsOnly: true },
      { no: "05", zh: "專業術語", en: "Terminology", ja: "専門用語", termsOnly: true },
      { no: "06", zh: "彈弓", en: "Slingshot", ja: "スリングショット" },
      { no: "07", zh: "個別角色", en: "Character Guides", ja: "キャラクター別", videosOnly: true },
      { no: "08", zh: "1分鐘快學", en: "1-Minute Tips", ja: "1分間Tips", videosOnly: true },
    ],
  },
  {
    game: "aoc",
    label: "災厄啟示錄",
    en: "Age of Calamity",
    ja: "厄災の黙示録",
    shortEn: "Zelda AoC",
    items: [
      { no: "01", zh: "主線攻略", en: "Main Story Walkthrough", ja: "メインストーリー攻略", videosOnly: true },
      { no: "02", zh: "進階技巧", en: "Advanced Techniques", ja: "上級テクニック" },
    ],
  },
  {
    game: "aoi",
    label: "封印戰記",
    en: "Age of Imprisonment",
    ja: "封印戦記",
    shortEn: "Zelda AoI",
    items: [
      { no: "01", zh: "攻略技巧", en: "Guide & Techniques", ja: "攻略テクニック" },
    ],
  },
];

// ── 遊戲中繼資料的單一來源 ────────────────────────────────────────────────
// 以下三個對照表一律由 typeGroups 衍生，不另外手寫清單。
// 新增遊戲時只要在 typeGroups 加一組，影片索引、篩選鈕、麵包屑會自動跟上。

/**
 * 依 typeGroups 順序排列的 { id, 中文名 }，供篩選鈕等需要固定順序的清單使用。
 * 用 shortLabel 優先：篩選鈕空間有限，「任天堂明星大亂鬥特別版」會撐破版面。
 */
export const gameList: { id: GameId; label: string }[] = typeGroups.map((g) => ({
  id: g.game,
  label: g.shortLabel ?? g.label,
}));

/** 依語言選字的遊戲名稱；缺 ja 的遊戲自動沿用中文 label（型別上選填，非強制每款都要有）。 */
export function gameLabelFor(g: TypeGroup, lang: "zh" | "ja", short = false): string {
  if (lang === "ja" && g.ja) return g.ja;
  return short ? (g.shortLabel ?? g.label) : g.label;
}

/** gameList 的語言感知版本，供篩選鈕等需要固定順序清單的地方使用。 */
export function gameListFor(lang: "zh" | "ja"): { id: GameId; label: string }[] {
  return typeGroups.map((g) => ({ id: g.game, label: gameLabelFor(g, lang, true) }));
}
