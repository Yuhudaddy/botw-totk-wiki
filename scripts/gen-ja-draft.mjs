// 產生 type-content.ja.ts 的翻譯草稿骨架。
//
// 用法：
//   node --experimental-strip-types scripts/gen-ja-draft.mjs totk-11
//   node --experimental-strip-types scripts/gen-ja-draft.mjs totk-11 > /tmp/draft.ts
//
// ── 這支腳本做什麼、不做什麼 ────────────────────────────────
// 做：
//   ・照著中文版的實際結構，產出對應的 ja 疊加層骨架（key／索引都對好）
//   ・把每段中文原文放在註解裡，方便對照著翻
//   ・掃出該段文字裡出現的術語，附上 glossary.ts 已登錄的日文譯名當提示
// 不做：
//   ・不會自動把整句翻成日文。機器代換出來的日文語序一定是壞的，
//     只會產生「看起來像日文但讀不通」的內容，反而更難校對。
//
// 所以輸出是「給人填的骨架＋術語小抄」，不是可以直接上線的翻譯。
// 填完之後貼進 src/data/type-content.ja.ts，沒填的欄位會自動沿用中文。

import { typeContent } from "../src/data/type-content.ts";
import { glossaryEntries } from "../src/data/glossary.ts";

const id = process.argv[2];
if (!id) {
  console.error("用法：node --experimental-strip-types scripts/gen-ja-draft.mjs <頁面 id>");
  console.error("例：  node --experimental-strip-types scripts/gen-ja-draft.mjs totk-11");
  process.exit(1);
}

const content = typeContent[id];
if (!content) {
  console.error(`❌ type-content.ts 裡找不到 "${id}"`);
  process.exit(1);
}

// 術語表：只取中日都有的，長詞優先比對，避免「風彈」先吃掉「子時彈翔」這種情形
const terms = glossaryEntries
  .filter((e) => e.zh && e.ja)
  .map((e) => ({ zh: e.zh, ja: e.ja }))
  .sort((a, b) => b.zh.length - a.zh.length);

/** 找出一段中文裡出現過、且術語表有日文的詞 */
function hintsFor(text) {
  if (typeof text !== "string") return [];
  const found = [];
  const seen = new Set();
  for (const t of terms) {
    if (text.includes(t.zh) && !seen.has(t.zh)) {
      seen.add(t.zh);
      found.push(`${t.zh} → ${t.ja}`);
    }
  }
  return found;
}

/** 步驟可能是字串，也可能是 { text, sub } */
function stepText(step) {
  return typeof step === "string" ? step : step?.text ?? "";
}

const out = [];
const allHints = new Set();

function collectHints(text) {
  for (const h of hintsFor(text)) allHints.add(h);
}

/** 原理說明區：principle／principleSections／principleExtra，佔頁面篇幅很大，漏掉等於整區沒翻 */
function emitPrinciple(m, indent) {
  const pad = " ".repeat(indent);
  if (m.principle) {
    collectHints(m.principle);
    out.push(`${pad}// principle：`);
    out.push(`${pad}//   ${m.principle}`);
    out.push(`${pad}// principle: "",`);
  }
  if (m.principleSections?.length) {
    out.push(`${pad}// principleSections（共 ${m.principleSections.length} 段）：`);
    m.principleSections.forEach((s, i) => {
      collectHints(s.title ?? "");
      collectHints(s.text ?? "");
      out.push(`${pad}//   [${i}] ${s.title ?? "（無標題）"}`);
      if (s.text) out.push(`${pad}//       ${s.text}`);
      (s.items ?? []).forEach((it) => {
        const text = stepText(it);
        collectHints(text);
        out.push(`${pad}//       - ${text}`);
      });
    });
    out.push(`${pad}// principleSections: [],`);
  }
  if (m.principleExtra) {
    out.push(`${pad}// principleExtra「${m.principleExtra.title}」：`);
    (m.principleExtra.items ?? []).forEach((it) => {
      const text = stepText(it);
      collectHints(text);
      out.push(`${pad}//   - ${text}`);
    });
    out.push(`${pad}// principleExtra: { title: "", items: [] },`);
  }
}

/** note 可能是字串或字串陣列；漏掉它翻譯者就會跟著漏翻步驟下方的灰色備註 */
function emitNote(note, indent) {
  if (!note) return;
  const pad = " ".repeat(indent);
  const lines = Array.isArray(note) ? note : [note];
  out.push(`${pad}// note：`);
  lines.forEach((n) => {
    collectHints(n);
    out.push(`${pad}//   ${n}`);
  });
  out.push(`${pad}// note: "",`);
}

function emitSteps(steps, indent) {
  if (!steps?.length) return;
  const pad = " ".repeat(indent);
  out.push(`${pad}// steps（共 ${steps.length} 條）：`);
  steps.forEach((s, i) => {
    const text = stepText(s);
    collectHints(text);
    out.push(`${pad}//   ${i + 1}. ${text}`);
    if (typeof s === "object" && s?.sub) {
      s.sub.forEach((x) => {
        collectHints(x);
        out.push(`${pad}//      - ${x}`);
      });
    }
  });
  out.push(`${pad}// steps: [],`);
}

out.push(`// ${id} 的日文翻譯草稿（由 scripts/gen-ja-draft.mjs 產生）`);
out.push(`// 把需要翻譯的欄位取消註解、填入日文即可；沒填的自動沿用中文。`);
out.push(`"${id}": {`);

// 頁面層級的原理說明（TypeContent.principle／principleItems／principleSections／
// principleNote／intro／closing）。這些只存在於頁面層級、不在任何 method 底下，
// 之前的版本完全沒有輸出這一塊——像 totk-06 的 principleSections 就整段落在這個缺口。
if (content.intro) {
  collectHints(content.intro);
  out.push(`  // intro：${content.intro}`);
  out.push(`  // intro: "",`);
}
if (content.principle) {
  collectHints(content.principle);
  out.push(`  // principle：`);
  out.push(`  //   ${content.principle}`);
  out.push(`  // principle: "",`);
}
if (content.principleItems?.length) {
  out.push(`  // principleItems（共 ${content.principleItems.length} 條）：`);
  content.principleItems.forEach((it) => {
    collectHints(it);
    out.push(`  //   - ${it}`);
  });
  out.push(`  // principleItems: [],`);
}
if (content.principleSections?.length) {
  out.push(`  // principleSections（共 ${content.principleSections.length} 段）：`);
  content.principleSections.forEach((s, i) => {
    collectHints(s.title ?? "");
    collectHints(s.text ?? "");
    out.push(`  //   [${i}] ${s.title ?? "（無標題）"}`);
    if (s.text) out.push(`  //       ${s.text}`);
    (s.items ?? []).forEach((it) => {
      const text = stepText(it);
      collectHints(text);
      out.push(`  //       - ${text}`);
    });
  });
  out.push(`  // principleSections: [],`);
}
if (content.principleNote) {
  collectHints(content.principleNote);
  out.push(`  // principleNote：${content.principleNote}`);
  out.push(`  // principleNote: "",`);
}
if (content.closing) {
  collectHints(content.closing);
  out.push(`  // closing：${content.closing}`);
  out.push(`  // closing: "",`);
}

if (content.methods?.length) {
  out.push(`  methods: {`);
  for (const m of content.methods) {
    out.push(`    // ── 分頁：${m.tab}${m.name ? `（${m.name}）` : ""} ──`);
    out.push(`    ${JSON.stringify(m.tab)}: {`);
    if (m.name) {
      collectHints(m.name);
      out.push(`      // name: ${m.name}`);
      out.push(`      // name: "",`);
    }
    if (m.tags?.length) {
      m.tags.forEach((tag) => collectHints(tag));
      out.push(`      // tags（適合標籤，逐條對應）：${JSON.stringify(m.tags)}`);
    }
    if (m.sections?.length) {
      out.push(`      sections: [`);
      m.sections.forEach((s, i) => {
        collectHints(s.title ?? "");
        out.push(`        // [${i}] ${s.title ?? "（無標題）"}`);
        if (s.tags?.length) {
          s.tags.forEach((tag) => collectHints(tag));
          out.push(`        // tags（適合標籤，逐條對應）：${JSON.stringify(s.tags)}`);
        }
        emitSteps(s.steps, 8);
        emitNote(s.note, 8);
        out.push(`        null,  // ← 不翻這段就留 null；要翻改成 { title: "", steps: [...] }`);
      });
      out.push(`      ],`);
    }
    emitSteps(m.steps, 6);
    emitNote(m.note, 6);
    emitPrinciple(m, 6);
    out.push(`    },`);
  }
  out.push(`  },`);
}

/** 「應用一覽」彈出視窗：label／title／intro／groups[].items[].name+desc，佔頁面篇幅可觀，漏掉等於整塊沒翻 */
if (content.applications) {
  const app = content.applications;
  out.push(`  // ── 應用一覽（applications）──`);
  if (app.label) {
    collectHints(app.label);
    out.push(`  // label：${app.label}`);
    out.push(`  // label: "",`);
  }
  if (app.title) {
    collectHints(app.title);
    out.push(`  // title：${app.title}`);
    out.push(`  // title: "",`);
  }
  if (app.intro) {
    collectHints(app.intro);
    out.push(`  // intro：${app.intro}`);
    out.push(`  // intro: "",`);
  }
  if (app.groups?.length) {
    out.push(`  // groups（共 ${app.groups.length} 組）：`);
    out.push(`  groups: [`);
    app.groups.forEach((g, i) => {
      collectHints(g.title ?? "");
      out.push(`    // [${i}] ${g.title ?? "（無標題）"}`);
      out.push(`    {`);
      out.push(`      // title: "",`);
      if (g.intro) {
        collectHints(g.intro);
        out.push(`      // intro：${g.intro}`);
        out.push(`      // intro: "",`);
      }
      emitNote(g.note, 6);
      out.push(`      items: [`);
      (g.items ?? []).forEach((it, j) => {
        collectHints(it.name ?? "");
        collectHints(it.desc ?? "");
        out.push(`        // [${j}] ${it.name ?? ""}`);
        if (it.desc) out.push(`        //     ${it.desc}`);
        out.push(`        // { name: "", desc: "" },`);
      });
      out.push(`      ],`);
      out.push(`    },`);
    });
    out.push(`  ],`);
  }
}

if (content.notes?.length) {
  out.push(`  notes: [`);
  content.notes.forEach((n, i) => {
    collectHints(n.text);
    out.push(`    // [${i}] ${n.text}`);
    if (n.sub?.length) {
      out.push(`    //   sub（縮排子清單，共 ${n.sub.length} 條）：`);
      n.sub.forEach((s) => {
        collectHints(s);
        out.push(`    //     - ${s}`);
      });
    }
    out.push(`    null,`);
  });
  out.push(`  ],`);
}

out.push(`},`);

console.log(out.join("\n"));

if (allHints.size) {
  console.log("\n// ── 這頁出現的術語（glossary.ts 已登錄的日文）─────────────");
  // 依中文詞長度由長到短：越長的詞越具體，命中通常越可信；
  // 「身體」「讀取」這類兩字通用詞常常只是字串剛好包含到，排在最後方便略過。
  [...allHints]
    .sort((a, b) => a.split(" → ")[0].length - b.split(" → ")[0].length)
    .reverse()
    .forEach((h) => console.log(`//   ${h}`));
  console.log(`// 共 ${allHints.size} 個術語（上面較長的通常較可信）。`);
  console.log(`// ※ 這是單純的字串比對，短詞可能只是剛好被包含到、與上下文無關，`);
  console.log(`//    請自行判斷取捨。未收錄在術語表的專有名詞請保留英文原文。`);
} else {
  console.log("\n// （這頁沒有比對到術語表裡有日文的詞）");
}
