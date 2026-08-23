// 內部連結一律經過這裡，自動加上 base path。
// 用法：href("/botw") → "/botw"；href("/botw", "ja") → "/ja/botw"
//
// 語言前綴集中在這裡處理，是因為日文頁若各自拼字串，只要有一頁忘記加 /ja，
// 訪客一點連結就會掉回中文站——這種漏接不會編譯失敗、也不容易一眼看出來。
// 頁面端只要老實把自己的 lang 傳進來，就不可能漏。
const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export function href(path = "/", lang: "zh" | "ja" = "zh"): string {
  if (!path.startsWith("/")) path = "/" + path;
  // 中文是預設語言，不帶前綴；日文統一走 /ja/ 開頭（語言擺路徑最前面，
  // 一條規則吃遍全站，也是 hreflang／搜尋引擎辨識語言版本最容易處理的形式）。
  const prefix = lang === "ja" ? "/ja" : "";
  const out = BASE + prefix + path;
  return out === "" ? "/" : out;
}

// 示範影片／快速示意圖改由 Cloudflare R2（自訂網域）直接送給訪客，
// 不再打包進 GitHub Pages 的部署內容——建置時不下載、artifact 不含影片。
// 訪客瀏覽器直接連到這裡，繞過 GitHub Pages 只有 10 分鐘的快取上限，
// 改用 R2 物件本身的 Cache-Control（media:push 上傳時設定，見 package.json）。
export const MEDIA_BASE = "https://media.dazotikuy.com/type-videos";

// YouTube 縮圖與連結
//
// maxresdefault 是 1280×720 的 16:9 原圖，但**只有上傳解析度達 720p 的影片才有**，
// 其餘一律 404——而 <img> 載入失敗不會自己退回別的來源，就是一塊空白。
// hqdefault 每支影片都有，所以拿它當保底。兩者都要用，因此成對匯出：
// 呼叫端把 ytThumbFallback() 掛在 onerror 上，讓瀏覽器自己換手。
export function ytThumb(id: string): string {
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}
export function ytThumbFallback(id: string): string {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}
export function ytWatch(id: string, at?: number): string {
  return at ? `https://youtu.be/${id}?t=${at}` : `https://youtu.be/${id}`;
}
