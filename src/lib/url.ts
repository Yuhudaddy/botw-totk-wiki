// 內部連結一律經過這裡，自動加上 base path（/botw-totk-wiki）。
// 用法：href("/botw") → "/botw-totk-wiki/botw"
const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export function href(path = "/"): string {
  if (!path.startsWith("/")) path = "/" + path;
  const out = BASE + path;
  return out === "" ? "/" : out;
}

// YouTube 縮圖與連結
export function ytThumb(id: string): string {
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}
export function ytWatch(id: string): string {
  return `https://youtu.be/${id}`;
}
