// 由 docs/glossary-terms-tracker.xlsx 產生，請勿手改；
// 要新增或修改術語請改試算表後重新產生。

export type GlossaryGameId = "botw" | "totk" | "eow" | "ssbu" | "aoc" | "aoi";

export interface GlossaryGame {
  id: GlossaryGameId;
  tag: string;
  label: string;
  title: string;
  aliases: string[];
}

export interface GlossaryEntry {
  id: string;
  games: GlossaryGameId[];
  kind: "game" | "abbr" | "concept" | "object" | "term";
  abbr: string;        // 索引主鍵：縮寫、原文或中文詞
  en?: string;         // 英文全名（站內未提供者省略）
  ja?: string;         // 日文（目前僅大亂鬥術語有）
  zh: string;          // 中文名稱
  aliases?: string[];
  family?: string;     // 技巧家族 id，對應 glossaryFamilies
  description?: string;
  sources?: string[];
}

// 技巧家族：站內多數術語成組出現，索引頁用來分組與交叉篩選
export const glossaryFamilies: Record<string, string> = {
  clip: "穿牆",
  cull: "隱藏",
  curse: "災禍",
  dupe: "複製",
  endlag: "硬直取消",
  flurry: "突擊",
  fuse: "餘料",
  launch: "擊飛",
  overload: "過載",
  purgatory: "懲戒",
  sbr: "盾擋重置",
  zuggle: "並列",
};

export const glossaryGames: GlossaryGame[] = [
  { id: "botw", tag: "BotW", label: "曠野之息", title: "Breath of the Wild", aliases: ["BoTW", "Zelda BotW", "薩爾達傳說 曠野之息"] },
  { id: "totk", tag: "TotK", label: "王國之淚", title: "Tears of the Kingdom", aliases: ["ToTK", "Zelda TotK", "薩爾達傳說 王國之淚"] },
  { id: "eow", tag: "EoW", label: "智慧的再現", title: "Echoes of Wisdom", aliases: ["Zelda EoW", "薩爾達傳說 智慧的再現"] },
  { id: "ssbu", tag: "SSBU", label: "任天堂明星大亂鬥 特別版", title: "Super Smash Bros. Ultimate", aliases: ["SSB Ultimate", "大亂鬥 SP", "Smash Ultimate"] },
  { id: "aoc", tag: "AoC", label: "災厄啟示錄", title: "Age of Calamity", aliases: ["Zelda AoC", "Hyrule Warriors: Age of Calamity"] },
  { id: "aoi", tag: "AoI", label: "封印戰記", title: "Age of Imprisonment", aliases: ["Zelda AoI", "Hyrule Warriors: Age of Imprisonment"] },
];

export const glossaryEntries: GlossaryEntry[] = [
  { id: "botw", games: ["botw"], kind: "game", abbr: "BotW", en: "Breath of the Wild", zh: "曠野之息", aliases: ["BoTW", "Zelda BotW", "薩爾達傳說 曠野之息"], description: "《曠野之息》的常用英文縮寫。" },
  { id: "totk", games: ["totk"], kind: "game", abbr: "TotK", en: "Tears of the Kingdom", zh: "王國之淚", aliases: ["ToTK", "Zelda TotK", "薩爾達傳說 王國之淚"], description: "《王國之淚》的常用英文縮寫。" },
  { id: "eow", games: ["eow"], kind: "game", abbr: "EoW", en: "Echoes of Wisdom", zh: "智慧的再現", aliases: ["Zelda EoW", "薩爾達傳說 智慧的再現"], description: "《智慧的再現》的常用英文縮寫。" },
  { id: "ssbu", games: ["ssbu"], kind: "game", abbr: "SSBU", en: "Super Smash Bros. Ultimate", zh: "任天堂明星大亂鬥 特別版", aliases: ["SSB Ultimate", "大亂鬥 SP", "Smash Ultimate"], description: "《任天堂明星大亂鬥 特別版》的常用英文縮寫。" },
  { id: "aoc", games: ["aoc"], kind: "game", abbr: "AoC", en: "Age of Calamity", zh: "災厄啟示錄", aliases: ["Zelda AoC", "Hyrule Warriors: Age of Calamity"], description: "《災厄啟示錄》的常用英文縮寫。" },
  { id: "aoi", games: ["aoi"], kind: "game", abbr: "AoI", en: "Age of Imprisonment", zh: "封印戰記", aliases: ["Zelda AoI", "Hyrule Warriors: Age of Imprisonment"], description: "《封印戰記》的常用英文縮寫。" },
];
