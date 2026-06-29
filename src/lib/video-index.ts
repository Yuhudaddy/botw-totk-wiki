// 影片索引頁的資料來源：把「主題解說」的教學頁與其相關影片彙整成可搜尋的索引。
// 完全衍生自 types.ts（教學頁）與 type-content.ts（相關影片），不需 API 或額外資料檔。
import { typeGroups } from "../data/types";
import { typeContent } from "../data/type-content";

export interface IndexGuide {
  id: string;        // 例：botw-02
  zh: string;
  en: string;
  game: string;      // botw / totk / eow
  gameLabel: string; // 曠野之息 / 王國之淚 / 智慧的再現
  search: string;    // 預先小寫化的可搜尋字串
}

export interface IndexVideo {
  ytId: string;
  title: string;
  desc: string;
  game: string;
  gameLabel: string;
  fromId: string;    // 來源教學頁 id
  fromZh: string;    // 來源教學頁中文名
  search: string;    // 預先小寫化的可搜尋字串（標題＋副標＋遊戲＋來源頁名）
}

export interface GameFacet {
  key: string;
  label: string;
}

function norm(s: string): string {
  return (s || "").toLowerCase();
}

export function buildVideoIndex(): {
  guides: IndexGuide[];
  videos: IndexVideo[];
  facets: GameFacet[];
} {
  const guides: IndexGuide[] = [];
  const facets: GameFacet[] = [];
  const idToSrc: Record<string, { zh: string; game: string; gameLabel: string }> = {};

  for (const group of typeGroups) {
    facets.push({ key: group.game, label: group.label });
    for (const item of group.items) {
      const id = `${group.game}-${item.no}`;
      idToSrc[id] = { zh: item.zh, game: group.game, gameLabel: group.label };
      const aliases = item.aliases ?? [];
      guides.push({
        id,
        zh: item.zh,
        en: item.en,
        game: group.game,
        gameLabel: group.label,
        search: norm([item.zh, item.en, group.label, group.game, ...aliases].join(" ")),
      });
    }
  }

  // 影片依 YouTube ID 去重；若同一支出現在多頁，合併來源頁名到搜尋字串。
  const seen = new Map<string, IndexVideo>();
  for (const [id, content] of Object.entries(typeContent)) {
    if (!content.videos) continue;
    const src = idToSrc[id];
    if (!src) continue;
    for (const v of content.videos) {
      const existing = seen.get(v.id);
      if (existing) {
        if (!existing.search.includes(norm(src.zh))) {
          existing.search += " " + norm(src.zh);
        }
        continue;
      }
      seen.set(v.id, {
        ytId: v.id,
        title: v.title,
        desc: v.desc ?? "",
        game: src.game,
        gameLabel: src.gameLabel,
        fromId: id,
        fromZh: src.zh,
        search: norm([v.title, v.desc ?? "", src.gameLabel, src.game, src.zh].join(" ")),
      });
    }
  }

  return { guides, videos: Array.from(seen.values()), facets };
}
