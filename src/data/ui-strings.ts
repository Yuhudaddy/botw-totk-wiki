// 介面文字的中日對照。
//
// 這裡只收「網站外殼」的固定文字：導覽列、區塊標題、空狀態訊息、無障礙標籤、
// 操作說明等。攻略內文（type-content.ts 的 steps／principle／notes 等）不在此處，
// 那是階段 2 才處理的部分——在補上之前，日文頁的內文會沿用中文顯示。
//
// 新增文字時：在 zh 加一筆，ja 也要補上同名的 key（型別會強制檢查，漏了會編譯失敗）。

export type Lang = "zh" | "ja";

const zh = {
  // 導覽列（與 site.ts 的 navItems 對應，用 match 當 key）
  navTypes: "主題解說",
  navVideos: "影片索引",
  navResources: "資料網站",
  navAbout: "關於神廟",

  // 導覽列搜尋
  searchPlaceholder: "搜尋技巧…",
  searchLabel: "搜尋",

  // 語言切換
  langLabel: "切換語言",
  langZh: "中文",
  langJa: "日文",

  // 麵包屑
  breadcrumbHome: "首頁",

  // 區塊標題
  sectionMethods: "流程步驟",
  sectionPrinciple: "原理說明",
  sectionDemo: "快速示意",
  sectionNotes: "注意事項",
  sectionTerms: "名詞說明",
  sectionVideos: "相關影片 · Videos",
  sectionIntro: "簡介與說明",
  sectionModel: "地圖模型",
  sectionControls: "操作方式",

  // 空狀態
  emptyDemo: "示意內容準備中",
  emptyVideos: "影片整理中，敬請期待。",
  emptyTerms: "名詞說明整理中，敬請期待。",
  emptyPrinciple: "說明內容整理中，敬請期待。",
  emptyPrincipleShort: "說明整理中…",
  emptySteps: "⚠️ 步驟待補——Yuda 會陸續整理更新。",
  placeholderPage: "本頁說明為示意內容，正式攻略步驟尚在整理中。",
  // 尚未填入步驟時顯示的佔位項目
  stepPlaceholder1: "（步驟一）",
  stepPlaceholder2: "（步驟二）",
  stepPlaceholder3: "（步驟三）",

  // 無障礙標籤
  zoomDemoImage: "放大快速示意圖",
  zoomFlowImage: "放大流程圖解",
  closeAppList: "關閉應用一覽",
  closePreview: "關閉預覽",
  demoImageAlt: "快速示意圖",

  // 3D 模型操作說明
  model3dRotate: "拖曳（左鍵／單指）：旋轉視角",
  model3dPan: "右鍵拖曳（或雙指拖曳）：平移視角",
  model3dZoom: "滾輪／捏合：縮放",
  model3dButtons: "右上角圓形按鈕：總覽／俯視／重置視角",

  // 流程地圖操作說明
  flowMapPan: "拖曳（左鍵／單指）：平移地圖",
  flowMapZoom: "滾輪／捏合：縮放",
  flowMapLayers: "地圖上方按鈕：切換圖層（地面／空島）、「總覽」回到全圖",
  flowMapSteps:
    "點擊流程步驟前的圓形按鈕：地圖顯示該步驟的地點與移動軌跡（再點一次取消）",

  // 其他
  askOnYoutube: "如有疑問，歡迎前往 YouTube 頻道留言詢問。",
} as const;

// ja 必須涵蓋 zh 的每一個 key（型別強制），確保不會漏翻而在頁面上顯示 undefined
const ja: Record<keyof typeof zh, string> = {
  navTypes: "テーマ別解説",
  navVideos: "動画検索",
  navResources: "データベース",
  navAbout: "この祠について",

  searchPlaceholder: "テクニックを検索…",
  searchLabel: "検索",

  langLabel: "言語切り替え",
  langZh: "中国語",
  langJa: "日本語",

  breadcrumbHome: "ホーム",

  sectionMethods: "セットアップ",
  sectionPrinciple: "解説",
  sectionDemo: "クイックデモ",
  sectionNotes: "注意事項",
  sectionTerms: "用語解説",
  sectionVideos: "関連動画 · Videos",
  sectionIntro: "概要と解説",
  sectionModel: "マップモデル",
  sectionControls: "操作方法",

  emptyDemo: "デモ映像を準備中",
  emptyVideos: "動画を整理中です。しばらくお待ちください。",
  emptyTerms: "用語解説を整理中です。しばらくお待ちください。",
  emptyPrinciple: "解説を整理中です。しばらくお待ちください。",
  emptyPrincipleShort: "解説を整理中…",
  emptySteps: "⚠️ 手順は準備中です——Yuda が順次更新していきます。",
  placeholderPage: "このページはデモ内容です。正式な手順は現在整理中です。",
  stepPlaceholder1: "（手順1）",
  stepPlaceholder2: "（手順2）",
  stepPlaceholder3: "（手順3）",

  zoomDemoImage: "デモ画像を拡大",
  zoomFlowImage: "フロー図を拡大",
  closeAppList: "応用一覧を閉じる",
  closePreview: "プレビューを閉じる",
  demoImageAlt: "クイックデモ",

  model3dRotate: "ドラッグ（左クリック／1本指）：視点を回転",
  model3dPan: "右ドラッグ（または2本指ドラッグ）：視点を平行移動",
  model3dZoom: "ホイール／ピンチ：ズーム",
  model3dButtons: "右上の丸ボタン：全体／真上／視点リセット",

  flowMapPan: "ドラッグ（左クリック／1本指）：マップを移動",
  flowMapZoom: "ホイール／ピンチ：ズーム",
  flowMapLayers:
    "マップ上部のボタン：レイヤー切り替え（地上／空島）、「全体」で全体表示に戻る",
  flowMapSteps:
    "手順の前にある丸ボタンをクリック：その手順の地点と移動ルートをマップに表示（もう一度で解除）",

  askOnYoutube:
    "ご不明な点は YouTube チャンネルのコメントでお気軽にお尋ねください。",
};

export const uiStrings: Record<Lang, Record<keyof typeof zh, string>> = { zh, ja };
