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

  // 「適合」標籤：分頁／區塊標題旁邊列出適用版本的小標籤（例：適合 ～Ver.1.1.1）
  tagsLabel: "適合",
  difficultyLabel: "難易度：",
  timeCostLabel: "耗時度：",
  tutorialVideoLink: "教學影片",
  /** 流程地圖步驟單選鈕的 aria-label；${n} 會被替換成步驟編號 */
  mapStepAriaLabelTemplate: "在參照流程地圖上顯示步驟 {n}",
  mapStepTitle: "在地圖上顯示此步驟",

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
  sectionFlowMap: "參照流程地圖",
  flowMapToggleLayers: "切換地圖圖層",
  flowMapStatusDefault: "點擊步驟前的圓形按鈕，在地圖上顯示該步驟的行為",
  /** {n} 會被替換成步驟編號 */
  flowMapStatusStepTemplate: "目前顯示：步驟 {n}",
  flowMapStatusSelected: "目前顯示：選取的步驟",
  flowMapOverview: "總覽",
  flowMapLayerSurface: "地面",
  flowMapLayerSky: "空島",

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
  applicationsLabel: "應用一覽",
  toolCtaKicker: "相關工具",
  closeAppList: "關閉應用一覽",
  closePreview: "關閉預覽",
  demoImageAlt: "快速示意圖",
  flowImageAlt: "流程圖解",
  model3dLegend: "色彩圖例",
  videoPrevPage: "← 上一頁",
  videoNextPage: "下一頁 →",
  /** {page}／{total} 會被替換成目前頁碼／總頁數 */
  videoPageLabel: "第 {page} 頁，共 {total} 頁",

  // 頁尾
  footerTagline: "薩爾達傳說 BotW / TotK 技巧與 Glitch 攻略",
  footerCredit: "內容整理自個人 YouTube 頻道",
  footerYoutube: "YouTube 頻道",
  footerDiscord: "Discord 社群",

  // 贊助按鈕
  supportToggle: "支持本站",
  supportSubscribeHint: "好用就給個訂閱吧！",
  supportSubscribeTitle: "訂閱 Yuda 的 YouTube 頻道",
  supportSubscribe: "訂閱 Yuda",
  supportSponsorHint: "幫 Yukito 買奶粉！",
  supportSponsorTitle: "贊助 Yuda",
  supportSponsor: "贊助 Yuda",

  // 3D 模型操作說明
  model3dRotate: "拖曳（左鍵／單指）：旋轉視角",
  model3dPan: "右鍵拖曳（或雙指拖曳）：平移視角",
  model3dZoom: "滾輪／捏合：縮放",
  model3dButtons: "右上角圓形按鈕：總覽／俯視／重置視角",
  model3dOverviewLabel: "總覽",
  model3dTopLabel: "俯視",
  model3dResetLabel: "重置視角",
  model3dPickInfo: "點擊模型中的房間或地標，可顯示名稱",

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
  navTypes: "テーマ別",
  navVideos: "動画検索",
  navResources: "資料",
  navAbout: "この祠",

  searchPlaceholder: "テクニックを検索…",
  searchLabel: "検索",

  langLabel: "言語切り替え",
  langZh: "中国語",
  langJa: "日本語",

  breadcrumbHome: "ホーム",
  tagsLabel: "対応",
  difficultyLabel: "難易度：",
  timeCostLabel: "所要時間：",
  tutorialVideoLink: "チュートリアル動画",
  mapStepAriaLabelTemplate: "参照フローマップで手順 {n} を表示",
  mapStepTitle: "マップでこの手順を表示",

  sectionMethods: "セットアップ",
  sectionPrinciple: "解説",
  sectionDemo: "クイックデモ",
  sectionNotes: "注意事項",
  sectionTerms: "用語解説",
  sectionVideos: "関連動画 · Videos",
  sectionIntro: "概要と解説",
  sectionModel: "マップモデル",
  sectionControls: "操作方法",
  sectionFlowMap: "参照フローマップ",
  flowMapToggleLayers: "マップレイヤーを切り替える",
  flowMapStatusDefault: "手順の前にある丸いボタンを押すと、マップ上にその手順の内容が表示されます",
  flowMapStatusStepTemplate: "現在の表示：手順 {n}",
  flowMapStatusSelected: "現在の表示：選択中の手順",
  flowMapOverview: "全体表示",
  flowMapLayerSurface: "地上",
  flowMapLayerSky: "空島",

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
  applicationsLabel: "応用一覧",
  toolCtaKicker: "関連ツール",
  closeAppList: "応用一覧を閉じる",
  closePreview: "プレビューを閉じる",
  demoImageAlt: "クイックデモ",
  flowImageAlt: "フロー図",
  model3dLegend: "カラー凡例",
  videoPrevPage: "← 前へ",
  videoNextPage: "次へ →",
  videoPageLabel: "{page} / {total} ページ",

  footerTagline: "ゼルダの伝説 BotW / TotK テクニック・グリッチ攻略",
  footerCredit: "個人 YouTube チャンネルの内容をまとめたものです",
  footerYoutube: "YouTube チャンネル",
  footerDiscord: "Discord コミュニティ",

  supportToggle: "このサイトを応援する",
  supportSubscribeHint: "役に立ったらチャンネル登録を！",
  supportSubscribeTitle: "Yuda の YouTube チャンネルを登録",
  supportSubscribe: "チャンネル登録",
  supportSponsorHint: "Yukito にミルクを買ってあげる！",
  supportSponsorTitle: "Yuda を支援する",
  supportSponsor: "支援する",

  model3dRotate: "ドラッグ（左クリック／1本指）：視点を回転",
  model3dPan: "右ドラッグ（または2本指ドラッグ）：視点を平行移動",
  model3dZoom: "ホイール／ピンチ：ズーム",
  model3dButtons: "右上の丸ボタン：全体／真上／視点リセット",
  model3dOverviewLabel: "全体表示",
  model3dTopLabel: "真上から",
  model3dResetLabel: "視点をリセット",
  model3dPickInfo: "モデル内の部屋やランドマークをクリックすると名前が表示されます",

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
