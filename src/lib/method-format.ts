// 流程步驟／原理說明文字的共用解析工具。
// 供 src/pages/types/[id].astro 與 src/components/MethodPanelBody.astro 共用，
// 避免同一套 __accent__ / 【name】/ [[連結]] 解析邏輯重複兩份。
import type { TypeStep } from "../data/type-content";

// 把 __文字__ 解析成可加橙色的片段
export function parseAccent(text: string) {
  return text.split("__").map((seg, i) => ({ text: seg, accent: i % 2 === 1 }));
}

// 把步驟正規化為 { text, sub }（純字串視為無子項目）
export function stepParts(s: TypeStep) {
  return typeof s === "string"
    ? { text: s, sub: [] as string[] }
    : { text: s.text, sub: s.sub ?? [] };
}

// 把 【人名】 解析成白色底線
export function parseName(text: string) {
  return text.split("【").map((part, i) => {
    if (i === 0) return { text: part, name: false };
    const [name, rest] = part.split("】");
    return [{ text: name, name: true }, { text: rest, name: false }];
  }).flat();
}

export function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// 把步驟文字解析成片段：[[文字|type-id]] 會變成連結（橙字＋底線）；[[文字|tab:分頁名]] 會變成同頁切換分頁的按鈕；其餘沿用 __文字__ 的橙色規則
export function parseStep(text: string) {
  const segments: { text: string; accent: boolean; href?: string; jumpTab?: string }[] = [];
  const linkRe = /\[\[([^\]|]+)\|([^\]]+)\]\]/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = linkRe.exec(text))) {
    if (m.index > last) segments.push(...parseAccent(text.slice(last, m.index)));
    const target = m[2];
    if (target.startsWith("tab:")) {
      segments.push({ text: m[1], accent: true, jumpTab: target.slice(4) });
    } else {
      segments.push({ text: m[1], accent: true, href: target });
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) segments.push(...parseAccent(text.slice(last)));
  return segments;
}

const PRINCIPLE_BASE = (import.meta as any).env?.BASE_URL?.replace(/\/$/, "") ?? "";

// 把原理說明文字轉成 HTML 字串（供分頁切換時的 data-principle 使用）。
// 套用 __accent__／【name】規則，並支援 [[文字|type-id]] 連結（同 parseStep，但輸出純 HTML 字串，
// 因為這段內容是用 innerHTML 動態塞入，不是走 Astro 的 JSX 渲染）。[[文字|tab:...]] 在這裡沒有
// 對應的點擊事件可綁定，因此僅以強調文字呈現，不做成按鈕。
export function principleHtml(text: string) {
  return parseName(text).map((seg) =>
    seg.name
      ? `<u style="text-decoration-color: white; text-underline-offset: 3px;">${escapeHtml(seg.text)}</u>`
      : parseStep(seg.text).map((s) =>
          s.href
            ? `<a href="${PRINCIPLE_BASE}/types/${s.href}" class="accent-link">${escapeHtml(s.text)}</a>`
            : s.accent
              ? `<span class="text-accent">${escapeHtml(s.text)}</span>`
              : escapeHtml(s.text)
        ).join("")
  ).join("");
}
