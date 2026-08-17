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

// 僅供本檔內部的 HTML 組字使用，未對外開放
function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// 把步驟文字解析成片段：[[文字|type-id]] 會變成連結（橙字＋底線）；[[文字|tab:分頁名]] 會變成同頁切換分頁的按鈕；
// [[文字|https://...]] 會變成外部連結（新分頁開啟，不套用站內 base path／語言前綴）；其餘沿用 __文字__ 的橙色規則
export function parseStep(text: string) {
  const segments: { text: string; accent: boolean; href?: string; external?: boolean; jumpTab?: string }[] = [];
  const linkRe = /\[\[([^\]|]+)\|([^\]]+)\]\]/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = linkRe.exec(text))) {
    if (m.index > last) segments.push(...parseAccent(text.slice(last, m.index)));
    const target = m[2];
    if (target.startsWith("tab:")) {
      segments.push({ text: m[1], accent: true, jumpTab: target.slice(4) });
    } else if (/^https?:\/\//.test(target)) {
      segments.push({ text: m[1], accent: true, href: target, external: true });
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
            ? s.external
              ? `<a href="${escapeHtml(s.href)}" class="accent-link" target="_blank" rel="noopener noreferrer">${escapeHtml(s.text)}</a>`
              : `<a href="${PRINCIPLE_BASE}/types/${escapeHtml(s.href)}" class="accent-link">${escapeHtml(s.text)}</a>`
            : s.accent
              ? `<span class="accent-text">${escapeHtml(s.text)}</span>`
              : escapeHtml(s.text)
        ).join("")
  ).join("");
}

// 把分頁專屬的原理小節轉成 HTML，供流程分頁切換時更新右欄內容。
export function principleSectionsHtml(
  sections?: { title?: string; text?: string; items?: TypeStep[]; collapsible?: boolean }[],
) {
  if (!sections?.length) return "";
  return sections.map((sec) => {
    const title = sec.title ? escapeHtml(sec.title) : "";
    const body = [
      sec.text ? `<p>${principleHtml(sec.text)}</p>` : "",
      sec.items?.length
        ? `<ul>${sec.items.map((item) => {
            const { text, sub } = stepParts(item);
            const subHtml = sub.length
              ? `<ul class="step-sub">${sub.map((detail) => `<li>${principleHtml(detail)}</li>`).join("")}</ul>`
              : "";
            return `<li>${principleHtml(text)}${subHtml}</li>`;
          }).join("")}</ul>`
        : "",
    ].join("");

    if (sec.collapsible) {
      return `<details class="principle-collapse"><summary class="principle-collapse-summary"><span class="principle-block-title principle-collapse-title">${title}</span><svg class="principle-collapse-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></summary><div class="principle-collapse-body">${body}</div></details>`;
    }
    return `<div class="principle-block">${title ? `<div class="principle-block-title">${title}</div>` : ""}${body}</div>`;
  }).join("");
}

// 把單一分頁的 principleExtra（{title, items}）轉成 HTML 字串，供 data-principle-extra 使用。
// 隨分頁切換一起換掉，因此和 principleHtml 一樣輸出純 HTML 字串而非 JSX；
// 沒有 items 時回傳空字串（切到沒有 principleExtra 的分頁時，區塊自然清空/不顯示）。
export function principleExtraHtml(extra?: { title?: string; items: TypeStep[] }) {
  if (!extra || !extra.items?.length) return "";
  const titleHtml = extra.title ? `<div class="principle-block-title">${escapeHtml(extra.title)}</div>` : "";
  const itemsHtml = extra.items.map((it) => {
    const { text, sub } = stepParts(it);
    const mainHtml = parseStep(text).map((s) =>
      s.href
        ? s.external
          ? `<a href="${escapeHtml(s.href)}" class="accent-link" target="_blank" rel="noopener noreferrer">${escapeHtml(s.text)}</a>`
          : `<a href="${PRINCIPLE_BASE}/types/${escapeHtml(s.href)}" class="accent-link">${escapeHtml(s.text)}</a>`
        : s.accent
          ? `<span class="accent-text">${escapeHtml(s.text)}</span>`
          : escapeHtml(s.text)
    ).join("");
    const subHtml = sub.length
      ? `<ul class="step-sub">${sub.map((d) => `<li>${escapeHtml(d)}</li>`).join("")}</ul>`
      : "";
    return `<li>${mainHtml}${subHtml}</li>`;
  }).join("");
  return `<div class="principle-block">${titleHtml}<ul>${itemsHtml}</ul></div>`;
}
