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
  kind: "game-name" | "abbreviation" | "term";
  label: string;
  title: string;
  description: string;
  aliases?: string[];
  source?: { label: string; path: string };
}

// 術語索引的長期資料來源。首版僅收錄六款遊戲名稱縮寫，
// 後續術語先在追蹤試算表統整，再一次加入這裡。
export const glossaryGames: GlossaryGame[] = [
  {
    id: "botw",
    tag: "BotW",
    label: "曠野之息",
    title: "Breath of the Wild",
    aliases: ["BoTW", "Zelda BotW", "薩爾達傳說 曠野之息"],
  },
  {
    id: "totk",
    tag: "TotK",
    label: "王國之淚",
    title: "Tears of the Kingdom",
    aliases: ["ToTK", "Zelda TotK", "薩爾達傳說 王國之淚"],
  },
  {
    id: "eow",
    tag: "EoW",
    label: "智慧的再現",
    title: "Echoes of Wisdom",
    aliases: ["Zelda EoW", "薩爾達傳說 智慧的再現"],
  },
  {
    id: "ssbu",
    tag: "SSBU",
    label: "任天堂明星大亂鬥 特別版",
    title: "Super Smash Bros. Ultimate",
    aliases: ["SSB Ultimate", "大亂鬥 SP", "Smash Ultimate"],
  },
  {
    id: "aoc",
    tag: "AoC",
    label: "災厄啟示錄",
    title: "Age of Calamity",
    aliases: ["Zelda AoC", "Hyrule Warriors: Age of Calamity"],
  },
  {
    id: "aoi",
    tag: "AoI",
    label: "封印戰記",
    title: "Age of Imprisonment",
    aliases: ["Zelda AoI", "Hyrule Warriors: Age of Imprisonment"],
  },
];

export const glossaryEntries: GlossaryEntry[] = glossaryGames.map((game) => ({
  id: game.id,
  games: [game.id],
  kind: "game-name",
  label: game.tag,
  title: game.title,
  description: `《${game.label}》的常用英文縮寫。`,
  aliases: [game.label, ...game.aliases],
}));
