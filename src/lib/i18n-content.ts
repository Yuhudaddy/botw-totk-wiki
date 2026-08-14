// 攻略內容的語言解析：把中文原文與日文疊加層合併成頁面實際要用的資料。
//
// 核心規則只有一條：**日文有填就用日文，沒填就退回中文**。
// 任何一層（頁面、分頁、區塊、單一欄位）都適用，所以翻譯可以只補一部分，
// 頁面永遠不會出現空白或 undefined。
//
// 合併時一律產生新物件，不修改 typeContent 原始資料——中文頁與日文頁在同
// 一次建置中都會用到同一份來源，就地修改會讓先建置的頁面污染後建置的頁面。

import { typeContent, type TypeContent, type TypeMethod } from "../data/type-content";
import { typeContentJa, type TypeContentJa, type TypeMethodJa } from "../data/type-content.ja";
import type { Lang } from "../data/ui-strings";

/** 取 ja 的值，沒有（undefined）就退回 zh */
function pick<T>(ja: T | undefined, zh: T): T {
  return ja === undefined ? zh : ja;
}

function mergeMethod(zh: TypeMethod, ja: TypeMethodJa | undefined): TypeMethod {
  if (!ja) return zh;

  const merged: TypeMethod = {
    ...zh,
    tab: pick(ja.tab, zh.tab),
    name: pick(ja.name, zh.name),
    intro: pick(ja.intro, zh.intro),
    tags: pick(ja.tags, zh.tags),
    steps: pick(ja.steps, zh.steps),
    bullets: pick(ja.bullets, zh.bullets),
    note: pick(ja.note, zh.note),
    principle: pick(ja.principle, zh.principle),
  };

  // sections 依索引對應；日文只翻了其中幾段時，其餘沿用中文
  if (zh.sections && ja.sections) {
    merged.sections = zh.sections.map((section, i) => {
      const jaSection = ja.sections?.[i];
      if (!jaSection) return section;
      return {
        ...section,
        title: pick(jaSection.title, section.title),
        intro: pick(jaSection.intro, section.intro),
        tags: pick(jaSection.tags, section.tags),
        steps: pick(jaSection.steps, section.steps),
        note: pick(jaSection.note, section.note),
      };
    });
  }

  if (zh.principleSections && ja.principleSections) {
    merged.principleSections = zh.principleSections.map((section, i) => {
      const jaSection = ja.principleSections?.[i];
      if (!jaSection) return section;
      return {
        ...section,
        title: pick(jaSection.title, section.title),
        text: pick(jaSection.text, section.text),
        items: pick(jaSection.items, section.items),
      };
    });
  }

  if (zh.principleExtra && ja.principleExtra) {
    merged.principleExtra = {
      title: pick(ja.principleExtra.title, zh.principleExtra.title),
      items: pick(ja.principleExtra.items, zh.principleExtra.items),
    };
  }

  // 子分頁遞迴合併，一樣以中文 tab 當 key
  if (zh.subTabs) {
    merged.subTabs = zh.subTabs.map((sub) => mergeMethod(sub, ja.subTabs?.[sub.tab]));
  }

  return merged;
}

function mergeContent(zh: TypeContent, ja: TypeContentJa): TypeContent {
  const merged: TypeContent = {
    ...zh,
    methodsTitle: pick(ja.methodsTitle, zh.methodsTitle),
    principleTitle: pick(ja.principleTitle, zh.principleTitle),
    notesTitle: pick(ja.notesTitle, zh.notesTitle),
    intro: pick(ja.intro, zh.intro),
    principle: pick(ja.principle, zh.principle),
    principleItems: pick(ja.principleItems, zh.principleItems),
    principleNote: pick(ja.principleNote, zh.principleNote),
    closing: pick(ja.closing, zh.closing),
  };

  if (zh.methods) {
    merged.methods = zh.methods.map((method) => mergeMethod(method, ja.methods?.[method.tab]));
  }

  if (zh.principleSections && ja.principleSections) {
    merged.principleSections = zh.principleSections.map((section, i) => {
      const jaSection = ja.principleSections?.[i];
      if (!jaSection) return section;
      return {
        ...section,
        title: pick(jaSection.title, section.title),
        text: pick(jaSection.text, section.text),
        items: pick(jaSection.items, section.items),
      };
    });
  }

  if (zh.notes && ja.notes) {
    merged.notes = zh.notes.map((note, i) => {
      const jaNote = ja.notes?.[i];
      if (!jaNote) return note;
      return { ...note, text: pick(jaNote.text, note.text), sub: pick(jaNote.sub, note.sub) };
    });
  }

  if (zh.faqLink && ja.faqLink) {
    merged.faqLink = { ...zh.faqLink, label: pick(ja.faqLink.label, zh.faqLink.label) };
  }

  return merged;
}

/**
 * 取得指定攻略頁在指定語言下實際要渲染的內容。
 * 中文直接回傳原始資料；日文回傳「日文疊加層合併中文原文」的結果。
 */
export function resolveTypeContent(id: string, lang: Lang): TypeContent | undefined {
  const zh = typeContent[id];
  if (!zh || lang !== "ja") return zh;

  const ja = typeContentJa[id];
  if (!ja) return zh; // 這頁還沒有任何日文翻譯，整頁沿用中文

  return mergeContent(zh, ja);
}
