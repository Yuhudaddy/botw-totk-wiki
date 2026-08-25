// 檢查 src/data/type-content.ja.ts 的翻譯疊加層是否跟中文原文對得上。
//
// 為什麼需要這支腳本：type-content.ja.ts 開頭的設計原則寫得很清楚——
// methods 用「中文 tab 字串」當 key，天生不怕位置錯位；但 sections／notes／
// mapFlow／principleSections／applications.groups[].items 這些沒有天然 key
// 的欄位，一律靠「陣列索引對應中文版」，翻不到的項目要填 null 佔位。
// TypeScript 的型別只檢查得出「這是不是一個陣列」，檢查不出「這個陣列的
// 長度有沒有跟中文版對齊」——一旦翻譯時漏填一個 null 佔位，或多加/刪掉一段，
// 後面所有項目的翻譯就會全部錯位到別的中文段落上，而且不會有任何錯誤訊息，
// 只會在瀏覽器裡看到牛頭不對馬嘴的內容（這正是先前 botw-28 發生過的問題）。
//
// 用法：node --experimental-strip-types scripts/verify-data.mjs
// 純檢查，不修改任何檔案；發現問題時印出來並以非零狀態結束。
// 沒有掛進 npm run build——資料一致性問題不該讓整個網站的部署卡住，
// 用這支腳本在改動翻譯資料後手動跑一次，或之後想掛進 CI 再另外接。

import { typeContent } from "../src/data/type-content.ts";
import { typeContentJa } from "../src/data/type-content.ja.ts";
import { typeGroups } from "../src/data/types.ts";

const problems = [];

function checkLen(zhArr, jaArr, where) {
  if (!zhArr || !jaArr) return; // 一邊沒填的話是「這段還沒翻」，不是錯誤
  if (zhArr.length !== jaArr.length) {
    problems.push(`${where}：中文 ${zhArr.length} 項，日文 ${jaArr.length} 項，長度對不上`);
  }
}

function checkMethod(zhMethod, jaMethod, where) {
  if (!jaMethod) return;
  checkLen(zhMethod.sections, jaMethod.sections, `${where} sections`);
  checkLen(zhMethod.principleSections, jaMethod.principleSections, `${where} principleSections`);
  checkLen(zhMethod.mapFlow, jaMethod.mapFlow, `${where} mapFlow`);

  // sections 底下各自的 mapFlow／popover.steps 也是索引對應，要逐段檢查
  if (zhMethod.sections && jaMethod.sections) {
    zhMethod.sections.forEach((zhSec, i) => {
      const jaSec = jaMethod.sections[i];
      if (!zhSec || !jaSec) return;
      checkLen(zhSec.mapFlow, jaSec.mapFlow, `${where} sections[${i}] mapFlow`);
      checkLen(zhSec.popover?.steps, jaSec.popover?.steps, `${where} sections[${i}] popover.steps`);
      // 「中文沒有 popover、日文卻有」代表兩邊的結構定義已經岔開：這種情況
      // checkLen 因為中文端是 undefined 會直接跳過，不會有任何警訊，但頁面
      // 上這段日文內容是不是真的該存在很可疑（中文版讀者永遠看不到它）。
      // 明確報出來，讓人決定是要補中文還是刪掉日文，而不是靜靜留著。
      if (!zhSec.popover && jaSec.popover) {
        problems.push(`${where} sections[${i}] popover：中文沒有這段、日文卻有，中日結構不一致`);
      }
    });
  }

  // subTabs 是用中文 tab 當 key，天生不會錯位，但底下還是要遞迴檢查
  if (zhMethod.subTabs && jaMethod.subTabs) {
    for (const sub of zhMethod.subTabs) {
      checkMethod(sub, jaMethod.subTabs[sub.tab], `${where} subTabs["${sub.tab}"]`);
    }
  }
}

// 攻略頁全站合法 id 集合，用來檢查 typeContentJa 裡有沒有打錯字的孤兒 id
const validIds = new Set(typeGroups.flatMap((g) => g.items.map((item) => `${g.game}-${item.no}`)));

for (const [id, ja] of Object.entries(typeContentJa)) {
  const zh = typeContent[id];
  if (!zh) {
    problems.push(`typeContentJa["${id}"]：這個 id 在 typeContent（中文原文）跟 typeGroups 裡都不存在，是打錯字還是孤兒資料？`);
    continue;
  }
  if (!validIds.has(id)) {
    problems.push(`typeContentJa["${id}"]：typeContent 裡有，但 typeGroups 沒有對應的攻略頁項目`);
  }

  checkLen(zh.notes, ja.notes, `typeContentJa["${id}"] notes`);
  checkLen(zh.principleSections, ja.principleSections, `typeContentJa["${id}"] principleSections`);

  if (zh.applications?.groups && ja.applications?.groups) {
    checkLen(zh.applications.groups, ja.applications.groups, `typeContentJa["${id}"] applications.groups`);
    zh.applications.groups.forEach((zhGroup, i) => {
      const jaGroup = ja.applications.groups[i];
      if (zhGroup?.items && jaGroup?.items) {
        checkLen(zhGroup.items, jaGroup.items, `typeContentJa["${id}"] applications.groups[${i}].items`);
      }
    });
  }

  if (zh.methods && ja.methods) {
    // ja.methods 是用中文 tab 當 key（TypeContentJa 的設計本身就防呆），
    // 但還是檢查一下有沒有 key 打錯字、對不到任何中文 tab、翻譯憑空消失的情況
    const zhTabs = new Set(zh.methods.map((m) => m.tab));
    for (const jaTab of Object.keys(ja.methods)) {
      if (!zhTabs.has(jaTab)) {
        problems.push(`typeContentJa["${id}"].methods["${jaTab}"]：這個 tab 字串在中文版找不到對應分頁，翻譯不會被顯示出來`);
      }
    }
    for (const zhMethod of zh.methods) {
      checkMethod(zhMethod, ja.methods[zhMethod.tab], `typeContentJa["${id}"].methods["${zhMethod.tab}"]`);
    }
  }
}

if (problems.length) {
  console.error(`❌ 資料一致性檢查發現 ${problems.length} 個問題：\n`);
  problems.forEach((p) => console.error(`  · ${p}`));
  process.exit(1);
}

console.log(`✅ 資料一致性檢查通過（${Object.keys(typeContentJa).length} 個日文翻譯頁）`);
