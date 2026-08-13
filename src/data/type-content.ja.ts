// 攻略內文的日文翻譯疊加層。
//
// ── 設計原則 ────────────────────────────────────────────────
// 這裡「不是」type-content.ts 的完整日文複本，而是一層可以只填一部分的
// 覆蓋資料。每個欄位都是選填：有填就用日文，沒填就自動沿用中文原文。
//
// 這樣設計是為了讓翻譯可以逐頁、逐段慢慢補：翻到哪裡那裡就變日文，
// 其餘照常顯示中文，網站永遠處於可用狀態，不必等全部翻完才能上線。
//
// ── 對應方式 ────────────────────────────────────────────────
// ・methods 用「中文版的 tab 字串」當 key，不是用陣列索引——這樣中文版
//   日後調整分頁順序時，翻譯不會默默對錯位置。
// ・sections / notes 這種沒有天然 key 的才用陣列索引對應；不需要翻譯的
//   項目填 null 佔位即可。
//
// ── 不要放在這裡的東西 ──────────────────────────────────────
// videoFolder、影片檔名、model3d 座標、flowMap 座標、YouTube 影片 ID
// 等結構性資料中日共用，一律不放進來，避免兩邊各自維護而失去同步。

import type { TypeStep, TypeContent, TypeMethod } from "./type-content";

/** 原理說明分段的日文版（欄位與中文版同名） */
export interface PrincipleSectionJa {
  title?: string;
  text?: string;
  items?: TypeStep[];
}

/** TypeMethodSection 的日文版；以陣列索引對應中文版的 sections */
export interface TypeMethodSectionJa {
  title?: string;
  intro?: string;
  steps?: TypeStep[];
  note?: string | string[];
}

/** TypeMethod 的日文版；由 TypeContentJa.methods 以中文 tab 當 key 索引 */
export interface TypeMethodJa {
  /** 分頁按鈕上顯示的文字；不填則沿用中文版的 tab */
  tab?: string;
  name?: string;
  intro?: string;
  steps?: TypeStep[];
  bullets?: string[];
  /** 依索引對應中文版的 sections，不翻的填 null */
  sections?: (TypeMethodSectionJa | null)[];
  note?: string | string[];
  principle?: string;
  principleSections?: PrincipleSectionJa[];
  principleExtra?: { title?: string; items?: TypeStep[] };
  /** 子分頁，一樣以中文 tab 當 key */
  subTabs?: Record<string, TypeMethodJa>;
}

/** 注意事項的日文版；依索引對應中文版的 notes */
export interface TypeNoteJa {
  text?: string;
  sub?: string[];
}

/** 單一攻略頁的日文疊加層 */
export interface TypeContentJa {
  methodsTitle?: string;
  principleTitle?: string;
  notesTitle?: string;
  intro?: string;
  principle?: string;
  principleItems?: string[];
  principleSections?: PrincipleSectionJa[];
  principleNote?: string;
  closing?: string;
  /** key＝中文版的 tab 字串 */
  methods?: Record<string, TypeMethodJa>;
  /** 依索引對應中文版的 notes，不翻的填 null */
  notes?: (TypeNoteJa | null)[];
  faqLink?: { label?: string };
}

// ── 翻譯內容 ────────────────────────────────────────────────
// key 與 type-content.ts 相同（botw-01、totk-11 等）。
//
// ⚠️ 以下 totk-11 是「機制示範用」的樣本翻譯，由 Claude 撰寫、尚未經
//    母語者校對。正式上線前請找日本玩家確認，或直接整段刪除——刪掉之後
//    該頁會自動全部回到中文，不會出錯。

export const typeContentJa: Record<string, TypeContentJa> = {
  "totk-11": {
    methods: {
      Zuggle: {
        sections: [
          {
            title: "単純合成 / ザグル（Simple Zuggles）",
            steps: [
              "壁を背にして、L を押しながらスキルホイールでマップを選択",
              "スキルホイールが消えてマップが開くまでの間に、十字キーを連打して押し続け、武器（盾）のクイックメニューを開く",
              "装備中の武器（盾）を捨て、別のものに持ち替える",
              "十字キーを放してマップを開き、+ ボタンでポーチを開いて装備中の武器（盾）を捨てる",
              "手順 1～4 を合計 13+1 回行う（1.0.0 版では 9+1 回）",
            ],
            note: "※ マップザグルの操作は「ゴースト装備（DI）」にも応用できる（全バージョン対応）",
          },
          {
            title: "ボータカルインビザグル（Portacull Invizuggles）",
            steps: [
              "床抜け操縦桿の盾を用意し、装備する",
              "2つの浮遊石（または同じ高さの段差）を背にして、L を押しながらマップを選択",
              {
                text: "スキルホイールが消えてマップが開くまでの間に、クイックメニューを開いて以下を行う：",
                sub: [
                  "装備中の床抜け操縦桿の盾を捨てる",
                  "装備中の弓を捨てる",
                  "別の弓に持ち替える",
                  "装備中の武器を捨てる",
                  "別の武器に持ち替える",
                  "別の盾に持ち替える",
                ],
              },
              "マップが開いたら + でポーチに入り、装備中の武器と弓を捨てる",
              "盾を外し、床抜け操縦桿の盾を拾い、武器と弓も拾う",
              "手順 3 を 6 回繰り返し、武器 6 本 + 弓 6 本をインビザグルする",
              "もう一度手順 3 を行うが武器のみとし、合計 13 個の装備をインビザグルする",
              "ZR を軽く押して弓を構え、武器か盾を持ち替えるとオーバーロードドロップが確認できる",
            ],
          },
          {
            title: "連鎖ゴーストフロックス化（GDI Chain）",
            steps: [
              "ゴースト装備を用意する",
              "手順 1 の装備で武器 1 本を感染させ、ゴーストフロックス化した武器 W を得る",
              "W を捨て、任意の武器を装備して W に A を 3 回押して 3 本コピーし、そのうち通常の W’ を 1 本地面に置く",
              {
                text: "W を拾い、以下の操作を行う：",
                sub: [
                  "捨てる → 持ち替え → 外す で W をスマグルし、ポーズを閉じる",
                  "ポーズ中に別の通常の W’ を装備する",
                  "スクラビルドを起動し、地面の W’ に照準を合わせる",
                  "Y でスクビルの途中に + を押してポーズする",
                  "装備中の W’ を捨て、別の W’ に持ち替える",
                  "偽スクラビルドの W に向き直り、A を 2 回押してさらに 2 本コピーする",
                  "クイックメニューで X を押し、装備中の W’ を捨てる",
                ],
              },
              "手順 4 を 13 回繰り返すと、ザグルドロップ状態の W が 13 本になる",
              "ZR を軽く押して弓を構え、盾を持ち替えてオーバーロードドロップが起きることを確認する",
              "ウルトラハンドで地面に落ちたスクビル付きの W’ をすべてくっつけ、ロケットで運ぶ",
            ],
          },
        ],
      },
      // Fuse 單獨出現（分頁標籤）用スクラビルド；與其他字結合時用スクビル。
      // Overload 在王國之淚用オーバーロード（曠野之息才用過負荷）。
      Fuse: {
        tab: "スクラビルド",
        sections: [{ title: "スクビルオーバーロード（Fuse Overload）" }],
      },
    },
  },
};

/** 型別檢查用：確保疊加層的 key 都真的存在於中文版，避免翻譯掛在不存在的頁面上 */
export type TypeContentJaKeys = keyof typeof typeContentJa;
export type _AssertKeysExist = TypeContentJaKeys extends string ? true : never;

// 下面兩個 import 只是為了讓型別檢查抓得到 TypeContent／TypeMethod 的關聯，
// 實際的合併邏輯在 src/lib/i18n-content.ts
export type { TypeContent, TypeMethod };
