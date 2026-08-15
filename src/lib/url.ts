// 內部連結一律經過這裡，自動加上 base path（/dazotikuy）。
// 用法：href("/botw") → "/dazotikuy/botw"
const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export function href(path = "/"): string {
  if (!path.startsWith("/")) path = "/" + path;
  const out = BASE + path;
  return out === "" ? "/" : out;
}

// 示範影片／快速示意圖改由 Cloudflare R2（自訂網域）直接送給訪客，
// 不再打包進 GitHub Pages 的部署內容——建置時不下載、artifact 不含影片。
// 訪客瀏覽器直接連到這裡，繞過 GitHub Pages 只有 10 分鐘的快取上限，
// 改用 R2 物件本身的 Cache-Control（media:push 上傳時設定，見 package.json）。
export const MEDIA_BASE = "https://media.dazotikuy.com/type-videos";

// YouTube 縮圖與連結
export function ytThumb(id: string): string {
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}
export function ytWatch(id: string, at?: number): string {
  return at ? `https://youtu.be/${id}?t=${at}` : `https://youtu.be/${id}`;
}
