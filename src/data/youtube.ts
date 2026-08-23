// youtube.json 的型別與讀取入口。
//
// 為什麼需要這一層：那份 JSON 有「兩種形狀」，直接 import 會逼得每個呼叫端
// 自己用 as any 硬轉，型別檢查形同虛設。
//   ・版控裡的種子檔：featured / latest / <遊戲 id>[] / updatedAt，**沒有 all**
//   ・Cloudflare 建置時 scripts/fetch-youtube.mjs 打 YouTube API 覆寫後：
//     多一個 all[]（每筆帶 game 欄位），涵蓋全頻道影片
//
// 抓取結果只存在建置容器、不會 commit 回 repo，所以版控裡那份的 updatedAt
// 永遠是舊的——不能拿它判斷更新流程有沒有在跑（要看線上站的實際內容）。
// 抓取失敗時 fetch-youtube.mjs 會保留既有檔案並正常結束，此時走種子那條路。
import raw from "./youtube.json";

export interface YouTubeVideo {
  id: string;
  title: string;
  /** 觀看數字樣。featured／latest／分遊戲桶子都有；all[] 沒有（見 fetch-youtube.mjs 第 5 節） */
  meta?: string;
  publishedAt: string;
  /** 只有 all[] 的項目會帶，標示屬於哪一款遊戲 */
  game?: string;
}

// 分遊戲的桶子是動態 key（botw / totk / …），型別上只能開一個索引簽章；
// 把 as unknown 的窄化集中在這一行，呼叫端就不必再各自轉型。
const data = raw as unknown as {
  featured?: YouTubeVideo[];
  latest?: YouTubeVideo[];
  all?: YouTubeVideo[];
  updatedAt?: string;
  [key: string]: unknown;
};

/** 首頁「最近熱門」 */
export const featuredVideos: YouTubeVideo[] = data.featured ?? [];
/** 首頁「最新整理」 */
export const latestVideos: YouTubeVideo[] = data.latest ?? [];
/** 資料抓取時間（僅供除錯參考，見檔案開頭的說明） */
export const youtubeUpdatedAt: string = data.updatedAt ?? "";

function gameBucket(id: string): YouTubeVideo[] {
  const bucket = data[id];
  return Array.isArray(bucket) ? (bucket as YouTubeVideo[]) : [];
}

/**
 * 影片索引頁用的完整清單。建置時抓取成功就直接用 all[]；
 * 只有種子資料時，退回把各遊戲的桶子合併起來（並補上 game 欄位）。
 */
export function allVideos(gameIds: readonly string[]): YouTubeVideo[] {
  if (Array.isArray(data.all)) return data.all;
  return gameIds.flatMap((id) => gameBucket(id).map((v) => ({ ...v, game: id })));
}
