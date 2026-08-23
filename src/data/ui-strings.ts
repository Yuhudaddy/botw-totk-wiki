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

  // 手機版濃縮導覽（三角力量鈕）
  navGo: "前往",
  navGoLabel: "開啟分頁選單",

  // 語言切換：彈窗裡顯示「另一個語言」的名稱，故意不用「日文」而用「日本語」——
  // 語言選單通常用該語言自己的寫法標示自己，讀者找起來比翻譯過的名稱更直覺
  langLabel: "切換語言",
  themeToggleLabel: "切換深淺主題",
  langZh: "中文",
  langJa: "日本語",

  // 麵包屑
  breadcrumbHome: "首頁",
  /** 詳細頁右上角「回到系列」連結；{game} 會被替換成遊戲名稱 */
  backToGameSeries: "← 回到{game}系列",

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
  /** {item.zh} 之後的固定字尾，組成「○○ 相關影片」這種標題；技巧名稱本身不翻譯 */
  relatedVideosSuffix: "相關影片",
  sectionIntro: "簡介與說明",
  /** 沒有填寫 principle 時的預設說明句；{name} 會被替換成技巧中文名稱 */
  principleFallbackTemplate: "本系列說明「{name}」的基本概念與適用範圍。操作前請確認遊戲版本，部分技巧僅限特定版本可用。",
  sectionModel: "地圖模型",
  sectionControls: "操作方式",
  /** 流程地圖下方的操作說明改成可收合的下拉選單，用獨立字串跟 3D 模型那組的 sectionControls 區隔，不影響它 */
  flowMapSectionControls: "操作方式一覽",
  sectionFlowMap: "參照流程地圖",
  flowMapToggleLayers: "切換地圖圖層",
  flowMapToolsMenu: "地圖工具選單",
  flowMapStatusDefault: "點擊步驟前的圓形按鈕，在地圖上顯示該步驟的行為",
  /** {n} 會被替換成步驟編號 */
  flowMapStatusStepTemplate: "目前顯示：步驟 {n}",
  flowMapStatusSelected: "目前顯示：選取的步驟",
  flowMapOverview: "總覽",
  flowMapClear: "清除",
  flowMapClearHint: "清除地圖上點出來的標記與路線",
  flowMapDemoImage: "示意圖",
  flowMapDemoImageHint: "先點地圖上的標記，才能查看該地點的示意圖",
  flowMapGrid: "格線",
  flowMapLayerSurface: "地面",
  flowMapLayerSky: "空島",
  flowMapLayerDepths: "地底",
  /** {n} 會被替換成標記編號 */
  flowMapPinAriaTemplate: "查看標記 {n} 的建議路線",
  flowMapPinClose: "關閉照片",
  flowMapGoalAria: "查看這個步驟的說明",

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
  /** 上面兩個帶箭頭的是「看得到的按鈕文字」；影片索引頁的翻頁鈕只有一個
   *  箭頭符號，可及名稱會變成「←」，所以另外給不含箭頭的純文字版本。 */
  videoPrevPageLabel: "上一頁",
  videoNextPageLabel: "下一頁",
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
  /** 點到東西之後的前綴；{name} 會被替換成該處名稱 */
  model3dPickedTemplate: "選取：{name}",
  model3dTransparencyLabel: "透明化",

  // 流程地圖操作說明
  flowMapPan: "拖曳（左鍵／單指）：平移地圖",
  flowMapZoom: "滾輪／捏合：縮放",
  flowMapLayers: "地圖上方按鈕：切換圖層（地面／空島／地底）、「總覽」回到全圖",
  flowMapSteps:
    "點擊流程步驟前的圓形按鈕：地圖顯示該步驟的地點與移動軌跡（再點一次取消）",

  // 兩個手寫攻略專頁（Q&A／Zuggle 深入解說）
  // 同樣只收容器層：內文是深度技術問答與機制解說，翻錯比不翻更糟，
  // 交由站長本人補上，目前日文頁的問答內容沿用中文。
  faqTitle: "轉存格常見問題 Q&A",
  faqDescription: "《轉存格》IST、DIC、WMC、PE 37個常見問題與 Yuda 的解答，整理自會員質問箱。",
  zuggleTitle: "深入了解 Zuggle",
  zuggleDescription: "Zuggle 系列技巧的原理、變體與實務應用深入解說。",

  // 資料網站的三個子頁（IST 模擬器／藍圖分享／物件地圖）
  // 只收「容器層」：標題、麵包屑、回上頁按鈕。工具本身的操作說明與教學內容
  // 是攻略知識（含 PE／Smuggle 等社群專有名詞），翻錯比不翻更糟，
  // 交由站長本人補上日文版，目前日文頁的教學內文沿用中文。
  breadcrumbLabel: "麵包屑",
  subpageBackToResources: "回到資料網站",
  istTitle: "轉存格(IST)模擬器",
  istDescription: "轉存格（IST）模擬器的繁體中文快速使用指南：腳本輸入方式、常用指令、物品語法與可直接複製的範例。",
  schematicsTitle: "藍圖分享",
  schematicsDescription: "《薩爾達傳說 王國之淚》藍圖 QR Code 分享庫，依實用與有趣分類整理。",
  schematicsBackToTotk: "回到王國之淚資料",
  objMapBotwTitle: "Léo 曠野物件地圖",
  objMapBotwDescription: "BotW Object Map 搜尋語法、欄位篩選與地圖工具使用指南。",
  objMapTotkTitle: "Léo 王淚物件地圖",
  objMapTotkDescription: "TotK Object Map 搜尋語法、欄位篩選與地圖工具使用指南。",

  // 資料網站頁（/resources）
  resourcesDescription: "曠野之息與王國之淚的地圖、數據表、文件與工具連結總整理。",
  resourcesEyebrow: "Resource Library · 資料庫",
  resourcesIntro: "攻略本上找不到、最完整的遊戲資料庫。",
  resourcesSearchPlaceholder: "搜尋資源…",
  resourcesKindRecommended: "站長推薦",
  resourcesKindMap: "互動地圖",
  resourcesKindData: "數據表格",
  resourcesKindDoc: "機制文件",
  resourcesKindSite: "攻略網站",
  resourcesEmptyTitle: "資源整理中",
  /** {game} 會被替換成遊戲名稱 */
  resourcesEmptyHintTemplate: "{game}的地圖與資料連結還在蒐集彙整，敬請期待。",
  /** 搜尋結果計數（client script 用，透過 data 屬性傳遞）；{n} 為符合筆數 */
  resourcesCountTemplate: "{n} 筆符合",
  /** 搜尋／篩選後一筆都不符合時顯示（與 resourcesEmptyTitle 不同：那個是整個遊戲還沒有資源） */
  resourcesNoMatch: "沒有符合的資源，換個關鍵字試試。",
  resourcesLangZh: "中文",
  resourcesLangJa: "日文",
  resourcesLangEn: "英文",

  // 首頁（/home）
  homeEyebrow: "技巧索引 · The Technique & Glitch Index",
  homeHeadingLine1: "Yuda頻道的",
  homeHeadingLine2: "攻略百科",
  /** 這句後面會接 YouTube 頻道連結，因此拆成前後兩段，不是單一字串 */
  homeHeroLeadPrefix: "攻略來源和解說出自 Yuda 的 YouTube 頻道",
  homeQuickBrowseLabel: "快速瀏覽系列",
  homeBrowseTotk: "瀏覽王國之淚",
  homeBrowseBotw: "瀏覽曠野之息",
  homeSeriesLabel: "收錄遊戲系列",
  homeLatestHeading: "最新整理",
  homeLatestAll: "全部影片",
  homeSectionNavLabel: "首頁段落",
  homeNavFeatured: "最近熱門",
  homeNavExplore: "從哪開始",
  homeNavAbout: "關於本站",
  homeFeaturedKicker: "近期整理 · Featured",
  homeFeaturedTitle: "最近熱門",
  homeFeaturedAll: "查看全部影片",
  homeExploreKicker: "快速導覽 · Explore",
  homeExploreTitle: "從哪開始",
  homeExploreIntro: "依遊戲、主題與操作目的挑一個入口；每一頁都會持續補上實作步驟與對應影片。",
  homeAboutKicker: "關於本站 · Note",
  homeAboutBadge: "持續整理中",
  /** 這段中間夾著 YouTube 連結，故拆成前後兩半 */
  homeAboutCopyBefore:
    "本站為個人攻略筆記，內容會持續補充。技巧多與特定遊戲版本相關，請務必確認每篇頁面標註的「適用版本」。歡迎到",
  homeAboutYoutubeLink: "YouTube 頻道",
  homeAboutCopyAfter: "訂閱與留言交流。",

  // 術語對照頁（/types/glossary）
  glossaryDescription: "對照本站六款遊戲的縮寫、英文原名、日文與中文譯名。",
  glossaryEyebrow: "Reference Index · 術語對照",
  glossaryIntro: "對照各遊戲的縮寫、英文原名、日文與中文譯名；點開條目可看說明與對應的主題頁。",
  glossaryFilterLabel: "依遊戲篩選術語",
  glossaryFilterAll: "全部",
  glossarySearchPlaceholder: "搜尋縮寫、英文、日文或中文…",
  /** 搜尋框的螢幕閱讀器標籤（視覺上隱藏） */
  glossarySearchLabel: "搜尋術語",
  /** {n} 會被替換成條目數量 */
  glossaryCountTemplate: "共 {n} 條",
  /** 篩選後的計數；{shown} 為符合筆數、{total} 為總筆數 */
  glossaryCountFilteredTemplate: "{shown} / {total} 條",
  glossaryColAbbr: "縮寫",
  glossaryColZh: "中文",
  glossaryEmpty: "找不到符合條件的術語，請改用其他關鍵字或遊戲標籤。",
  glossaryRailLabel: "字母跳轉",

  // 關於頁（/about）
  // 只收「容器層」的標題：自我介紹的內文是站長本人的語氣與人格，
  // 交由本人親自撰寫日文版，不由翻譯代筆（頁面上那段內文目前中日共用）。
  aboutEyebrow: "關於神廟 · About Dazotikuy",
  aboutHeading: "關於 達妯・提庫依神廟",
  aboutSectionProfile: "本站簡介 · Profile",
  aboutSectionGames: "主要遊玩 · Main Games",
  aboutSectionLanguages: "語言 · Languages",
  aboutSectionYuhu: "關於 Yuhu",
  aboutSectionShoutouts: "特別感謝 SHOUTOUTS",
  aboutSectionLinks: "連結 · Links",

  // 主題解說列表頁（/types）
  typesDescription: "依系列瀏覽 Yuda 頻道的曠野之息與王國之淚攻略內容。",
  typesEyebrow: "Browse by Series · 系列索引",
  typesIntro: "各遊戲的各種主題的攻略、原理、步驟說明。",
  typesGlossaryLink: "術語對照",
  typesAllVideos: "全部影片 →",
  typesEmptyTitle: "內容整理中",
  /** {game} 會被替換成遊戲名稱 */
  typesEmptyHintTemplate: "{game}的主題解說還在整理，敬請期待。",

  // 影片索引頁（/videos）
  videosEyebrow: "影片索引 · Video Index",
  videosHeading: "搜尋影片",
  videosIntro: "輸入關鍵字搜尋教學頁與相關影片。多個關鍵字以空格分隔可疊加篩選，例如「偷襲 曠野」。",
  videosSearchPlaceholder: "搜尋教學或影片，例如「轉存格」「偷襲 曠野」…",
  videosFilterAll: "全部",
  videosEmptyTitle: "找不到符合的內容",
  videosEmptyHint: "換個關鍵字，或清除篩選試試。",
  /** 動態渲染用（透過 define:vars 傳進 client script）；{n} 會被替換成影片總數 */
  videosTotalHintTemplate: "共 {n} 支影片，輸入關鍵字開始搜尋。",
  videosFilterLabel: "目前篩選：",
  /** {n} 會被替換成搜尋結果數量 */
  videosResultCountTemplate: "影片（{n}）",
  videosViewList: "列表",
  videosViewGrid: "格狀",

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

  navGo: "移動",
  navGoLabel: "ページメニューを開く",

  langLabel: "言語切り替え",
  themeToggleLabel: "テーマ切り替え",
  langZh: "繁体中国語",
  langJa: "日本語",

  breadcrumbHome: "ホーム",
  backToGameSeries: "← {game}シリーズに戻る",
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
  relatedVideosSuffix: "関連動画",
  sectionIntro: "概要と解説",
  principleFallbackTemplate: "このシリーズでは「{name}」の基本概念と適用範囲を解説する。操作前にゲームのバージョンを確認すること。一部のテクニックは特定のバージョンでのみ使用可能。",
  sectionModel: "マップモデル",
  sectionControls: "操作方法",
  flowMapSectionControls: "操作方法一覧",
  sectionFlowMap: "参照フローマップ",
  flowMapToggleLayers: "マップレイヤーを切り替える",
  flowMapToolsMenu: "マップツールメニュー",
  flowMapStatusDefault: "手順の前にある丸いボタンを押すと、マップ上にその手順の内容が表示されます",
  flowMapStatusStepTemplate: "現在の表示：手順 {n}",
  flowMapStatusSelected: "現在の表示：選択中の手順",
  flowMapOverview: "全体表示",
  flowMapClear: "クリア",
  flowMapClearHint: "マップ上に表示したマーカーとルートを消去",
  flowMapDemoImage: "実景写真",
  flowMapDemoImageHint: "マップ上のマーカーを選ぶと、その地点の実景写真を確認できます",
  flowMapGrid: "グリッド",
  flowMapLayerSurface: "地上",
  flowMapLayerSky: "空島",
  flowMapLayerDepths: "地底",
  flowMapPinAriaTemplate: "マーカー {n} の推奨ルートを表示",
  flowMapPinClose: "写真を閉じる",
  flowMapGoalAria: "この手順の説明を表示",

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
  videoPrevPageLabel: "前のページ",
  videoNextPageLabel: "次のページ",
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
  model3dPickedTemplate: "選択：{name}",
  model3dTransparencyLabel: "透明化",

  flowMapPan: "ドラッグ（左クリック／1本指）：マップを移動",
  flowMapZoom: "ホイール／ピンチ：ズーム",
  flowMapLayers:
    "マップ上部のボタン：レイヤー切り替え（地上／空島／地底）、「全体」で全体表示に戻る",
  flowMapSteps:
    "手順の前にある丸ボタンをクリック：その手順の地点と移動ルートをマップに表示（もう一度で解除）",

  faqTitle: "インベントリ転送 よくある質問 Q&A",
  faqDescription: "インベントリ転送（IST・DIC・WMC・PE）に関する37件のよくある質問と Yuda の回答。メンバー質問箱より。",
  zuggleTitle: "Zuggle 詳細解説",
  zuggleDescription: "Zuggle 系テクニックの仕組み・派生・実践的な応用の詳細解説。",

  breadcrumbLabel: "パンくずリスト",
  subpageBackToResources: "資料一覧に戻る",
  istTitle: "インベントリ転送（IST）シミュレーター",
  istDescription: "インベントリ転送（IST）シミュレーターの使い方ガイド：スクリプトの入力方法、よく使うコマンド、アイテム記法、コピーして使えるサンプル。",
  schematicsTitle: "ブループリント共有",
  schematicsDescription: "『ゼルダの伝説 ティアーズ オブ ザ キングダム』のブループリント QR コード集。実用・おもしろの分類で整理。",
  schematicsBackToTotk: "ティアキンの資料に戻る",
  objMapBotwTitle: "Léo ブレワイ オブジェクトマップ",
  objMapBotwDescription: "BotW Object Map の検索記法・フィールド絞り込み・マップツールの使い方ガイド。",
  objMapTotkTitle: "Léo ティアキン オブジェクトマップ",
  objMapTotkDescription: "TotK Object Map の検索記法・フィールド絞り込み・マップツールの使い方ガイド。",

  resourcesDescription: "ブレワイ・ティアキンのマップ、データ表、解析資料、ツールのリンク集。",
  resourcesEyebrow: "Resource Library · 資料庫",
  resourcesIntro: "攻略本には載っていない、最も充実したゲームデータベース。",
  resourcesSearchPlaceholder: "資料を検索…",
  resourcesKindRecommended: "管理人おすすめ",
  resourcesKindMap: "インタラクティブマップ",
  resourcesKindData: "データ表",
  resourcesKindDoc: "解析資料",
  resourcesKindSite: "攻略サイト",
  resourcesEmptyTitle: "準備中",
  resourcesEmptyHintTemplate: "{game}のマップ・資料リンクは収集中です。しばらくお待ちください。",
  resourcesCountTemplate: "{n} 件該当",
  resourcesNoMatch: "該当する資料がありません。別のキーワードでお試しください。",
  resourcesLangZh: "中国語",
  resourcesLangJa: "日本語",
  resourcesLangEn: "英語",

  homeEyebrow: "テクニック索引 · The Technique & Glitch Index",
  homeHeadingLine1: "Yuda チャンネルの",
  homeHeadingLine2: "攻略事典",
  homeHeroLeadPrefix: "攻略の出典と解説は Yuda の YouTube チャンネルより",
  homeQuickBrowseLabel: "シリーズをすばやく閲覧",
  homeBrowseTotk: "ティアキンを見る",
  homeBrowseBotw: "ブレワイを見る",
  homeSeriesLabel: "収録シリーズ",
  homeLatestHeading: "最新の整理",
  homeLatestAll: "すべての動画",
  homeSectionNavLabel: "ページ内セクション",
  homeNavFeatured: "最近の人気",
  homeNavExplore: "どこから始める",
  homeNavAbout: "このサイトについて",
  homeFeaturedKicker: "最近の整理 · Featured",
  homeFeaturedTitle: "最近の人気",
  homeFeaturedAll: "すべての動画を見る",
  homeExploreKicker: "クイックナビ · Explore",
  homeExploreTitle: "どこから始める",
  homeExploreIntro:
    "ゲーム・テーマ・目的から入口を選んでください。各ページには手順と対応する動画を順次追加していきます。",
  homeAboutKicker: "このサイトについて · Note",
  homeAboutBadge: "随時更新中",
  homeAboutCopyBefore:
    "当サイトは個人の攻略ノートで、内容は随時追加していきます。テクニックはゲームのバージョンに依存するものが多いため、各ページに記載の「対応バージョン」を必ずご確認ください。ご質問は",
  homeAboutYoutubeLink: "YouTube チャンネル",
  homeAboutCopyAfter: "の登録・コメントでお気軽にどうぞ。",

  glossaryDescription: "当サイトで扱う6作品の略称・英語名・日本語名・中国語名の対照表です。",
  glossaryEyebrow: "Reference Index · 用語対照",
  glossaryIntro: "各ゲームの略称・英語名・日本語名・中国語名の対照表。項目を開くと解説と対応するテーマページを表示します。",
  glossaryFilterLabel: "ゲームで絞り込む",
  glossaryFilterAll: "すべて",
  glossarySearchPlaceholder: "略称・英語・日本語・中国語で検索…",
  glossarySearchLabel: "用語を検索",
  glossaryCountTemplate: "全 {n} 件",
  glossaryCountFilteredTemplate: "{shown} / {total} 件",
  glossaryColAbbr: "略称",
  glossaryColZh: "中国語",
  glossaryEmpty: "条件に合う用語が見つかりません。別のキーワードやゲームタグをお試しください。",
  glossaryRailLabel: "アルファベット移動",

  aboutEyebrow: "この祠について · About Dazotikuy",
  aboutHeading: "ダゾ・ティクイの祠について",
  aboutSectionProfile: "サイト紹介 · Profile",
  aboutSectionGames: "主なプレイ作品 · Main Games",
  aboutSectionLanguages: "言語 · Languages",
  aboutSectionYuhu: "Yuhu について",
  aboutSectionShoutouts: "スペシャルサンクス SHOUTOUTS",
  aboutSectionLinks: "リンク · Links",

  typesDescription: "Yuda チャンネルのブレワイ・ティアキン攻略をシリーズ別に閲覧できます。",
  typesEyebrow: "Browse by Series · シリーズ索引",
  typesIntro: "各ゲームのテーマ別攻略・仕組み・手順の解説。",
  typesGlossaryLink: "用語対照",
  typesAllVideos: "すべての動画 →",
  typesEmptyTitle: "準備中",
  typesEmptyHintTemplate: "{game}のテーマ解説は準備中です。しばらくお待ちください。",

  videosEyebrow: "動画検索 · Video Index",
  videosHeading: "動画を探す",
  videosIntro:
    "キーワードで解説ページと関連動画を検索できます。スペース区切りで複数指定すると絞り込みが重なります（例：「不意打ち ブレワイ」）。",
  videosSearchPlaceholder: "解説や動画を検索（例：「インベントリ転送」「不意打ち ブレワイ」）…",
  videosFilterAll: "すべて",
  videosEmptyTitle: "該当する内容が見つかりません",
  videosEmptyHint: "キーワードを変えるか、絞り込みを解除してみてください。",
  videosTotalHintTemplate: "全 {n} 本の動画があります。キーワードを入力して検索してください。",
  videosFilterLabel: "絞り込み中：",
  videosResultCountTemplate: "動画（{n}）",
  videosViewList: "リスト",
  videosViewGrid: "グリッド",

  askOnYoutube:
    "ご不明な点は YouTube チャンネルのコメントでお気軽にお尋ねください。",
};

export const uiStrings: Record<Lang, Record<keyof typeof zh, string>> = { zh, ja };
