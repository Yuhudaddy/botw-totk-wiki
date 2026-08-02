// 「常見類型」詳細頁的結構化內容。
// 步驟字串中以 __文字__ 包住的片段會在頁面上顯示為橙色。
// 單一步驟：純字串，或附帶巢狀子項目的物件（子項目不影響主編號）
export type TypeStep = string | { text: string; sub: string[] };

export interface TypeMethodSection {
  title: string;      // 子章節標題，例："K+1 法（通用版）"
  tags?: string[];    // 標籤陣列（顯示為「適合 + badge」），例：["～Ver.1.1.2"]
  intro?: string;     // 該區塊步驟上方的灰色說明句（選填）
  steps: TypeStep[];  // 該區塊的編號步驟
  note?: string | string[]; // 該區塊步驟下方的灰色備註（可多行）
  videoUrl?: string;  // 該區塊專屬的外部教學影片連結（YouTube 等），顯示於標題列右側
  collapsible?: boolean; // 標題與適合版本可收合為手風琴列，展開後才顯示步驟；用於單一分頁內方法數過多時避免過長捲動
}

export interface TypeMethod {
  tab: string;        // 分頁名稱，例：前跳
  group?: string;     // 分頁分組標籤（同組的分頁按鈕會排在同一行，並在最前面顯示此標籤），例："無過載（Overload-less）"
  tags?: string[];    // 標籤陣列（顯示為「適合 + badge」），例：["先圓後方"]
  difficulty?: string; // 難易度星等 badge（顯示在 tags 右側），例："★★★☆☆"
  timeCost?: string;    // 耗時度星等 badge（顯示在 difficulty 右側），例："★★★☆☆"
  name?: string;      // 方法中文全名（白色字，與 tags 擇一），例："轉存格（Inventory Slot Transfer）"
  intro?: string;     // 步驟上方的灰色說明句（選填），例："此方法需要配合...技巧："
  steps?: TypeStep[]; // 單一編號步驟（與 sections / bullets 擇一）
  bullets?: string[]; // 無序條列（圓點，與 steps / sections 擇一），用於並列分類
  sections?: TypeMethodSection[]; // 多區塊步驟，每區塊各自從 1 開始編號
  video?: string;     // 快速示意影片檔名，例："前跳.MP4"
  image?: string;     // 快速示意圖片檔名（與 video 擇一），例："IST.png"
  note?: string | string[]; // 步驟下方的灰色備註（可多行）
  principle?: string;       // 此分頁的原理說明（覆蓋 TypeContent.principle）
  principleSections?: { title?: string; text?: string; items?: TypeStep[]; collapsible?: boolean }[];
                            // 此分頁的原理說明分段；可隨流程分頁切換，並支援可收合小節
  principleExtra?: { title?: string; items: TypeStep[] };
                            // 此分頁原理說明下方的固定附加小節（例："延伸"），只在切到這個分頁時顯示，
                            // 切到其他分頁會跟著 principle 一起換掉（僅用於 hasDynamicPrinciple 的頁面，
                            // 即 methods 有設定 principle 的頁面；一般走 content.principleSections 的頁面
                            // 請直接把「延伸」加進 principleSections 陣列，不要用這個欄位）
  subTabs?: TypeMethod[];   // 子分頁（例：合併後的「R0 Cull Zuggle」底下的 In Bound／Out of Bound）。
                            // 有值時，此分頁本身不直接顯示 tags/sections/steps，改為顯示子分頁按鈕，
                            // 點擊後才顯示對應子分頁的內容（子分頁沿用同一套欄位，不支援巢狀 subTabs）。
}

export interface RelatedVideo {
  id: string;    // YouTube 影片 ID
  title: string; // 顯示標題（已移除開頭的【…】）
  desc?: string; // 副標題（選填），顯示於標題下方
  at?: number;   // 指定播放起始秒數（選填），例：1233
}

export interface TypeNote {
  text: string;   // 注意事項文字
  sub?: string[]; // 縮排子清單，例：["(1) …", "(2) …"]
}

export interface TermEntry {
  zh: string;    // 中文術語
  en?: string;   // 英文術語或補充說明（選填）
  ja?: string;   // 對應的日文專有名詞（選填，顯示於括號內）
  desc?: string; // 說明文字（選填，展開時顯示）
}

export interface TermGroup {
  title: string;       // 分組標題，例："入門技巧 EX01"
  terms: TermEntry[];  // 術語列表
}

export interface VideoGroup {
  title: string;         // 分組標題，例：角色名稱「皮丘」
  videos: RelatedVideo[];
}

export interface TypeContent {
  heroEn?: string;            // 覆蓋 Hero 區的英文副標（types.ts 的 item.en 仍用於主題解說列表按鈕與 meta 說明，兩者可不同）
  videoFolder?: string;       // public/type-videos/ 下的子資料夾名稱（影片用）
  imageFolder?: string;       // public/type-videos/ 下的子資料夾名稱（圖片用）
  methodsTitle?: string;      // A 區左欄標題，預設「流程步驟」
  principleTitle?: string;    // B 區右欄標題，預設「原理說明」
  intro?: string;             // videosOnly 頁的簡介文字（顯示於影片區上方）
  notesTitle?: string;        // 注意事項區標題（預設「注意事項」）
  principle?: string;         // B 區內文（段落式，與 principleItems 擇一）
  principleItems?: string[];  // B 區內文（條列式，有值則覆蓋 principle）
  principleSections?: { title?: string; text?: string; items?: TypeStep[]; collapsible?: boolean }[]; // B 區依副標題分段（例："歷史"／"原理"），text 為段落、items 為條列（擇一）；collapsible 為 true 時該段落預設收合，點擊標題展開（同「轉存格 Q&A」的手風琴樣式）。有值則覆蓋 principle／principleItems

  principleNote?: string;     // B 區備註（灰色小字，顯示於 principle/principleItems 下方）
  showEmptyMedia?: boolean;   // 沒有示意媒體時仍顯示「快速示意」空狀態（先開頁、後補內容用）
  model3d?: {
    src: string;           // public/ 下的 .glb 路徑
    alt: string;
    poster?: string;       // 低解析度封面圖路徑（public/ 下）
    posterAlt?: string;
    cameraOrbit?: string;  // 初始視角 "方位角 仰角 距離"，例："15deg 45deg auto"
    cameraTarget?: string; // 初始注視點 "Xm Ym Zm"（glTF 座標，Y 朝上）
    overviewOrbit?: string;  // 「總覽」按鈕視角／注視點（見 Model3DViewer 的 Props 註解）
    overviewTarget?: string;
    topOrbit?: string;       // 「俯視」按鈕視角；不給 topTarget 則沿用 overviewTarget
    topTarget?: string;
    layoutSrc?: string;    // 點擊互動座標表 JSON 路徑（public/ 下），點擊房間顯示名稱
    legend?: { color: string; label: string }[]; // 色彩圖例（顯示於模型下方）
    transparencyMaterials?: string[]; // 「透明化」開關鈕要調整的材質名稱（不含 "ToTS_" 前綴），
                                       // 有給值才顯示按鈕，只影響這些材質，其餘（含樓層文字）不受影響
    transparencyOpacity?: number;     // 透明化後的不透明度（0～1），預設 0.2
  }; // C 區改放可拖曳旋轉的 3D 模型（取代快速示意）
  methods?: TypeMethod[];     // A 區流程步驟（分頁）
  notes?: TypeNote[];         // 注意事項
  closing?: string;           // 注意事項下方的結語
  faqLink?: { label: string; path: string }; // Q&A 頁面連結（選填）
  toolCta?: {
    kicker?: string;
    title: string;
    description: string;
    primary: { label: string; path: string };
    secondary?: { label: string; url: string };
  }; // 右欄工具導引卡片（例：模擬器、互動地圖）
  applications?: TypeApplications; // 原理說明下方的「應用一覽」按鈕與彈出視窗
  videos?: RelatedVideo[];    // 相關影片
  termGroups?: TermGroup[];   // termsOnly 頁的名詞說明分組（大亂鬥用）
  videoGroups?: VideoGroup[]; // videosOnly 頁依分類（例如角色）分組的相關影片
}

// 「應用一覽」彈出視窗：把一個程錯衍生出的大量效果集中在一個 modal，
// 不佔用主頁面篇幅。群組可選兩種呈現：
//   ・不給 columns → 定義清單（名稱＋說明），適合單一情境的效果列表
//   ・有給 columns → 對照表（例：["快讀", "慢讀"]），用 marks 標示各效果適用於哪一欄，
//     可一眼看出哪些是共通效果、哪些是單一模式限定，避免重複列兩份清單
export interface TypeApplications {
  label?: string;   // 按鈕文字，預設「應用一覽」
  title?: string;   // 視窗標題，預設同 label
  intro?: string;   // 視窗標題下方的說明句
  groups: {
    title: string;
    intro?: string;
    note?: string | string[]; // 群組末尾的灰色備註
    columns?: string[];       // 有值時渲染成對照表
    items: {
      name: string;
      desc?: string;
      marks?: boolean[];      // 對照表用，順序對應 columns
    }[];
  }[];
}

export const typeContent: Record<string, TypeContent> = {
  "botw-01": {
    videoFolder: "botw-windbomb",
    principleSections: [
      {
        text: "2019/9/6 【さとう菓子】玩家發展出的擊飛方法，而後由 【Yuda】, 【Kleric】 等玩家相繼協助改良得穩定且快速的風彈。依曠野之息的物理機制，利用子彈時間降低第二顆炸彈被引爆的機率，使第一顆爆炸時的推進力足以推進第二顆炸彈來撞擊林克，同時解除子彈時間讓林克高速擊飛出去的技巧。「風彈（ㄉㄢˋ）」本身就是一個撞球的概念，兩顆炸彈和林克在撞擊時呈一直線，引爆第一顆推動第二顆炸彈，第二顆炸彈的動力撞到林克時解除子彈時間，林克呈現布偶狀態，又加上子時動量增幅，進而讓林克能夠高速被擊飛。",
      },
      {
        title: "為何第二顆不會被引爆？",
        collapsible: true,
        text: "遙控炸彈在爆炸時分成兩個判定：__衝擊波__（吹飛受炸彈波及的物體，如魔物被炸飛、推飛林克）與__傷害波__（產生破壞或傷害的判定，如鐵箱被破壞、林克受傷）。在特定距離下，在沒有子彈時間的時候仍然能吹飛第二顆而非引爆；而子彈時間下波長接觸物理演算和一般狀況不同，衝擊波到達並將物體吹飛，物體位移後傷害波並沒有追上物體，因此就會達成只將第二顆炸彈炸飛，但不引爆的情形。最終林克只需要承受被第二顆炸彈衝撞，只扣一顆心就能高速擊飛。",
      },
      {
        title: "風彈到底算不算是 Bug？",
        collapsible: true,
        text: "那就要看你對 Bug 的定義是什麼。對本站導師而言，只要是非原創團隊的原意，且不影響遊戲劇情和遊玩正常運行，都屬於良性的程序錯誤（簡稱「程錯（Glitch）」）。風彈本身能成功的原因，是由炸彈波長時間差與子彈時間的引擎演算達成的物理效果，就此觀點來說風彈是一種遊戲「技巧」並非一種 Bug；但就這樣的演算引擎，原設計是希望第二顆會被第一顆引爆的，本身不該存在於原設計的觀點來看，屬於一種 Glitch。",
      },
      {
        title: "風彈有時候會停下來的原因是？",
        collapsible: true,
        text: "林克在高速的布偶狀態（__Ragdoll State__），演算模型碰撞和位置的「靈魂(Soul)」和模型本身的「身體(Body)」會分離，當兩者的距離超過遊戲能夠穩定處理的範圍，系統會優先將兩者重新同步。畫面上看起來，就像林克在空中突然失去所有動量並停下來。會造成這種現象的角度就稱為風彈的「擊停角（Dead Angle）」。「擊停」不一定是因為風彈碰到了固定的速度上限，而可能是高速位移造成身體與靈魂的距離過大。特定方向、角度，以及遊戲發生短暫卡頓或物理更新不同步時，都可能讓這個現象更容易發生。",
      },
    ],
    methods: [
      {
        tab: "前跳",
        tags: ["先圓後方"],
        video: "前跳.MP4",
        steps: [
          "裝備好弓(有箭)、希卡道具設定為__圓形__炸彈，林克__前方__地勢較低",
          "按住 ZL",
          "往前 Ｘ → L → ZR，離地後放出__圓形__炸彈，跳到高點進入子彈時間",
          "十字鍵▲切換到另一種__方形__炸彈",
          "按 L 放出__方形__炸彈",
          "十字鍵▲切換回原本的__圓形__炸彈",
          "按 L 引爆__圓形__炸彈",
        ],
      },
      {
        tab: "後跳",
        tags: ["先方後圓"],
        video: "後跳.MP4",
        steps: [
          "裝備好弓(有箭)、希卡道具設定為__方形__炸彈，林克__後方__地勢較低且平穩",
          "在起跳位置後方兩個後空翻的距離往前放置一個__方形__炸彈",
          "希卡道具切換到__圓形__炸彈",
          "站在起跳位置按住 ZL → X 往後跳",
          "高度約達起跳時的高度前按下 ZR 進入子彈時間",
          "十字鍵▲切換到__方形__炸彈",
          "按 L 引爆__方形__炸彈",
        ],
      },
      {
        tab: "擊上",
        tags: ["先方後圓"],
        video: "擊上.MP4",
        steps: [
          "在樹幹等等高低差及腰的位置，在起跳位置__後方__放置一個__方形__炸彈",
          "裝備好弓(有箭)、希卡道具設定為__圓形__炸彈",
          "站在高處往後緊貼邊緣按住 ZL",
          "往後 X 跳的瞬間林克呈__倒立__時，同時按下 L 和 ZR 放出炸彈並進入子彈時間，並瞬間按住十字鍵▲",
          "切換到__方形__炸彈",
          "放開十字鍵後瞬間按 L 引爆",
        ],
      },
      {
        tab: "空中",
        tags: ["先圓後方"],
        video: "空中.MP4",
        steps: [
          "裝備好弓(有箭)、希卡道具設定為__圓形__炸彈",
          "滑翔翼往前滑行",
          "放開左搖桿後按 L 丟出圓形炸彈",
          "圓形炸彈落到林克後下方 45 度處後按 ZR 進入子彈時間",
          "十字鍵▲切換到另一種__方形__炸彈",
          "按 L 放出__方形__炸彈",
          "十字鍵▲切換回原本的__圓形__炸彈",
          "按 L 引爆__圓形__炸彈",
        ],
      },
      {
        tab: "跑跳",
        tags: ["先方後圓", "Switch 2 Editions 版"],
        video: "跑跳.MP4",
        steps: [
          "裝備好弓(有箭)、希卡道具設定為__方形__炸彈，林克__前方__地勢較低",
          "按住 B 往前奔跑",
          "在高地差邊緣按 X → L → ZR，離地後放出__方形__炸彈，跳到高點進入子彈時間。",
          "十字鍵▲切換到另一種__圓形__炸彈",
          "按 L 放出__圓形__炸彈",
          "十字鍵▲切換回原本的__方形__炸彈",
          "按 L 引爆__方形__炸彈",
        ],
      },
    ],
    notes: [
      { text: "Nintendo Switch 1 版須注意「擊停角」。方位不是 45 度倍數時，風彈的高速位移較容易讓身體與靈魂距離拉開，觸發重新同步；畫面上會看起來像林克突然停住，導致無法正常擊飛。" },
      { text: "Nintendo Switch 2 Edition 版讀取與更新速度較快，身體與靈魂距離不容易被拉得太遠，因此受「擊停角」影響較小；但風彈擊飛後的速度會些微下降。若第二炸彈放出後不馬上引爆，成功率大幅下降。" },
    ],
    closing: "風彈有很多種變形 (variations)，詳細請參考下方相關影片。",
    videos: [
      { id: "dgcopMBlrhk", title: "番外42 - 靜止擊飛過時了？「木箱擊飛(Kibako Launch)」與「爆風炸彈(Windbomb)」（中文解說）", desc: "全網最早的風彈教學" },
      { id: "pHRRwj1bFRM", title: "回應13 -「風彈」的各種形式（Windbomb Setups）", desc: "其他不同種類的風彈" },
      { id: "EYYCye4Qfak", title: "指法11 - 擊上風彈（Vertical Windbomb, 撃ち上げウインドボム）", desc: "往上飛高型的風彈" },
      { id: "PlakwPcfJjM", title: "指法16 -「風彈」與「導向風彈」(Windbomb & Directional Windbomb)", desc: "慢動作拆解風彈的指法" },
      { id: "uJJlD5Xs6I0", title: "番外47 - 抵抗地心引力！「風彈與靜彈的物理機制(Windbomb & Stasis Bounce Tutorial)」", desc: "風彈的原理與失敗原因解說" },
      { id: "qPErvMa0hC4", title: "初學者適用！畫面暫停一下輕鬆學會最常用的「風彈」- 自己檢查風彈失敗的原因！" },
      { id: "dOVAzYGLwoU", title: "不廢話！畫面暫停一下快速檢查「空中風彈」失敗的原因！" },
    ],

  },

  "botw-01-stasis": {
    videoFolder: "botw-launch",
    methods: [
      {
        tab: "撞擊飛",
        name: "撞擊飛（Impact Launch）",
        video: "撞擊飛.mp4",
        sections: [
          {
            title: "靜止擊飛（Stasis Launch）",
            tags: ["All Versions"],
            steps: [
              "靜止要擊飛的物體（箱子、樹等）",
              "將其打至需要的動量（橙色、紅色等）",
              "攀爬至物體上方",
              "在靜止器要結束前往前跳，受到物體撞擊而擊飛",
            ],
            note: "※ 必要時可在步驟 2 用弓箭調整擊飛方向。",
          },
          {
            title: "木箱擊飛（Kibako Launch）",
            tags: ["Nintendo Switch 1"],
            steps: [
              "將方形炸彈放在木箱前方貼緊木箱",
              "爬到木箱按住 ZL 貼近炸彈另一端的邊緣",
              "按下 L 引爆炸彈把林克擊飛",
            ],
          },
        ],
      },
      {
        tab: "隨物飛",
        video: "隨物飛.mp4",
        sections: [
          {
            title: "隨物飛（Attaching Launch）",
            tags: ["All Versions"],
            steps: [
              "靜止要擊飛的物體（箱子、樹等）",
              "將其打至需要的動量（橙色、紅色等）",
              "站在物體上，或是攀爬在物體上",
              "靜止器結束後隨物體一起移動（攀爬時可在目的地按 B 取消攀爬）",
            ],
          },
        ],
      },
    ],
    principle: "被大動量的物體（靜止後累積到紅色、炸彈）擊中，或是隨著物體移動，可讓林克高速在空中移動。",
    notes: [{ text: "攀爬飛的時候在攀爬物體上移動時容易解除攀爬而墜落。" }],
    videos: [
      { id: "dgcopMBlrhk", title: "番外42 - 靜止擊飛過時了？「木箱擊飛(Kibako Launch)」與「爆風炸彈(Windbomb)」（中文解說）" },
      { id: "iCRbLZKrgrI", title: "技巧32 - 再也不想走路！「擊飛技巧(Launches)」全攻略" },
      { id: "8V4Nz71HUVs", title: "番外34 - 忽視導師的考驗！「炸彈彈射(Bomb Launch)」", desc: "風彈出現後較為少用" },
      { id: "8biCvDxKw1o", title: "54秒教你怎麼「逆攀擊飛(Instant Climb Launch)」（不廢話系列）" },
    ],
  },

  "botw-01-super": {
    videoFolder: "botw-super launch",
    methods: [
      {
        tab: "共通",
        video: "擊飛加速.mp4",
        sections: [
          {
            title: "擊飛加速（Super Launch）",
            tags: ["Nintendo Switch 1"],
            steps: [
              "以「擊飛」的技巧讓林克呈現在空中癱軟的__布偶狀態（Ragdoll）__",
              "擊飛拋物線快達頂點時點擊一下快速選單，放開後快速按 + 打開暫停保留延遲幀",
              "關閉暫停之後再打開暫停確認有延遲",
              "輸入 B → X，關閉暫停後瞬間在延遲幀上開滑翔翼",
            ],
          },
        ],
      },
    ],
    principleSections: [
      {
        text: "2018 年 【Wolhaiksong】、【rasenu】 在實況時發生的現象。",
      },
      {
        text: "無論是風彈或是靜止擊飛，造成高速布偶狀態的擊飛都能觸發加速。",
      },
      {
        title: "身體與靈魂的分離",
        collapsible: true,
        text: "林克呈__布偶狀態（Ragdoll State）__高速飛行時，暫時會出現「身體」與「靈魂」不同步的狀態。身體是實際會被物理力推動的角色模型；靈魂則是負責位置、碰撞與遊戲邏輯的不可見判定核心。兩者平時會維持在相近位置。",
      },
      {
        title: "開傘如何轉換成額外速度",
        collapsible: true,
        text: "開啟滑翔傘時會解除布偶狀態，並重新校正身體與靈魂的位置。若兩者原本相距很遠，靈魂在重新同步時就必須快速移動較長的距離。這段重新同步產生的位移，會轉換成林克額外的水平動量，畫面延遲時身體與靈魂分離得越遠，開傘時可能產生的回彈效果就越明顯。",
      },
      {
        title: "延遲與第一個影格",
        collapsible: true,
        text: "玩家可以透過快速開關選單製造短暫的延遲（Lag），使遊戲的畫面更新、物理運算與角色狀態更新出現時間差。當延遲結束時，遊戲通常會準備重新處理林克的速度與減速。如果玩家在恢復運算後、系統開始施加減速的第一個影格（第一幀）開啟滑翔傘，開傘所觸發的身體與靈魂重新同步，可能會先於減速指令生效。結果就是保留原本極高的速度，並繼續滑翔前進。",
      },
      {
        text: "風彈的「擊停」是__重新同步阻止了高速移動__；「擊飛加速」則是__在正確的時機利用重新同步來取得額外加速__。",
      },
    ],
    notes: [
      { text: "只有從「布偶狀態」→「打開滑翔翼」的流程加速效果。" },
      { text: "Switch 2 Edition 版效能提升，幾乎無法產生延遲。" },
    ],
    videos: [],
  },

  "botw-02": {
    imageFolder: "botw-ist",
    principle:
      "2022/6/17 有程式背景的玩家 【zxrobbin】 觀看 【Yuda】 的番外 51「物品置換」影片，並參照 【leoetlino】 反編譯出的程式碼後，發現其中存在一個程式編譯上的問題。利用「手持材料(Hold)」將材料獨立出來，接著在販賣時把該材料賣光並移除該材料欄位，之後再把手上的捆包丟棄，以上動作會造成遊戲誤判實際的道具格數。當玩家讀檔後，正常系統認知的道具格數會和玩家背包中所看見、顯示的道具格數同步，但由於上述動作導致的不同步(Desync)，遊戲用誤判的較少格數依序移除該存檔的道具，最右邊原本應被刪除的道具沒有被清掉，因而被保留到下一個存檔中，進而達成繼承的效果。",
    methods: [
      {
        tab: "IST",
        name: "轉存格（Inventory Slot Transfer）",
        image: "IST.png",
        steps: [
          "準備多把多發弓和電箭，並確認要繼承的道具在倒數第 n 格",
          "裝備多發弓和電箭，並按 ZR 將弓箭放到前面",
          "暫停丟棄裝備中的多發弓 → 裝備另一把多發弓",
          "關閉暫停讓另一把電箭多發弓的模型顯現",
          "重複__步驟 3 ～ 4__，直到暫停選單的林克出現模組缺陷的「選單過載(Menu Overload)」，__NS2 版必須關閉暫停 B → ZR 將弓收起再拿出來釋放負載__",
          "嘗試手持材料 m 種不同的材料(m ≦ 4)，並確認模型__沒有正常顯示__",
          "撿起 1 ～ 2 把多發弓解除選單過載",
          "找商店賣光__步驟 6__ 手持的材料",
          "暫停再多手持與__步驟 6__ 不同的材料",
          "關閉暫停按 A 將材料丟在地上，觸發 m 格轉存格",
          "重複__步驟 3 ～ 10__，直到轉存格數達 n 格為止。",
        ],
      },
      {
        tab: "FDIC",
        name: "向前數值訛轉（Forward Direct Inventory Corruption）",
        image: "FDIC.png",
        steps: [
          "重新開始遊戲，依照要訛轉的目標種類，準備撿過蘋果或烤蘋果，並把它吃掉",
          "撿取「樵夫斧頭」，前往時之神殿觸發__斧頭裝備中、開過目標(材料或料理)頁籤__的自動存檔 A → 讀取舊存檔",
          "使用掉或清除重要物品中所有可堆疊的道具（克洛格果實、考驗通過證等等）",
          "參考 IST 分頁觸發 k + 1 格轉存格（k = 重要道具格數）",
          "將要訛轉的目標材料放在材料(料理)頁籤的最後一格（丟在地上撿起來，數量太多可以賣）",
          "讀取自動存檔 A",
          "開關暫停等待 30 秒",
          "往前走一步靠近時之神殿觸發自動存檔 B，並讀取檔案 B",
          "__不要有任何動作等待 30 秒__",
          "往前走一步靠近時之神殿觸發自動存檔 C，並讀取檔案 C",
          "確認目標在該種類頁籤的最後一格後讀取舊檔案",
          "暫停確認有繼承過來後，關閉一次暫停或和 Y 整理背包後，暫停手動存檔",
        ],
      },
      {
        tab: "BDIC",
        name: "向後數值訛轉（Backward Direct Inventory Corruption）",
        image: "BDIC.png",
        steps: [
          "將最高耐久度的弓放在該頁籤__最後一格並裝備它__後，手動存檔",
          "確認想要訛轉的屬性箭在第 n 格，如持有 6 種屬性箭時，電箭固定在第 n = 4 格",
          "合計在武器和弓的頁籤中空出 n 格（譬如武器 3 格＋弓箭 1 格，n = 4）",
          "使用掉或清除重要物品中所有可堆疊的道具（克洛格果實、考驗通過證等等）",
          "參考 IST 分頁觸發 k + n 格轉存格（k = 重要道具格數）",
          "進入「野外的考驗」或「劍之考驗(DLC1)」",
          "合計撿取 n 把武器和弓",
          "確認背包變成完全空的時(mCount = 0)，讀取手動存檔",
          "打開暫停直接手動存檔（不得關閉暫停或整理背包）",
        ],
      },
      {
        tab: "WMC",
        name: "訛植料理詞綴（Weapon Modifier Corruption）",
        image: "WMC.png",
        steps: [
          "準備好目標詞綴的 60 個料理 或 一格 500 個以上的可堆疊料理",
          "利用 BDIC 準備超過 500 發的各種屬性箭，手動存檔",
          "參考 IST 分頁觸發 k + 60 + S 或 k + 1 + S 格轉存格（k = 重要道具格數，S = 目標～料理之間所有道具格數）",
          "清空所有衣服、材料，該頁籤必須全部空格。若步驟 1 是準備可堆疊料理，則賣掉它以外的其他料理",
          "將目標（武器或盾牌）至於該頁籤最後一格。目標為武器的情形，弓和盾的頁籤須放滿不得有空格",
          "觸發自動存檔之後讀取該自動存檔",
          "暫停確認目標裝備獲得料理詞綴之後，吃掉或賣掉 1 格料理，讀取舊的手動存檔",
          "暫停確認目標繼承過來，關閉一次暫停或和 Y 整理背包後，暫停手動存檔",
        ],
      },
      {
        tab: "DC & PE",
        name: "脫頁游標與同位操作（Desync Cursor & Prompt Entanglement）",
        image: "DC&PE.png",
        sections: [
          {
            title: "K+1 法（通用版，NS2 版須關閉 Zelda Notes）",
            steps: [
              "準備 3 頁以上的材料與料理，確保背包內有可以食用或手持的物品",
              "觸發等同於「重要物品數量 + 1」格的轉存格（無效格）",
              "回到遊戲標題畫面",
              "開啟「新遊戲」，並觸發一次自動存檔",
              "讀取剛剛獲得的自動存檔",
              "讀檔後，重複輸入兩次以下指令：「暫停(+)」 ➔ 「按 L 鍵切回背包」 ➔ 「右搖桿往右切換頁籤」 ➔ 「按 B 鍵退出暫停」",
              "在系統存檔頁籤將左搖桿往左推，若游標消失即表示成功觸發無效格",
              "不回標題的情形下直接讀取需要進行同位操作的舊存檔",
              "游標停留的位置與借視窗操作的流程請參考番外56進行同位操作",
            ],
          },
          {
            title: "NS2 Editions 版：單格偏移法（One-Offset Setup）",
            steps: [
              "先觸發 1 格轉存格",
              "開啟 Zelda Notes，並確保 Zelda Notes 的道具排在重要道具頁的「最後面」，若沒有在最後面關閉再重開 Zelda Notes",
              "回到遊戲標題畫面，開啟「新檔案」",
              "開始新遊戲，可操作後故意開關一次暫停選單",
              "前往控制台獲得希卡石",
              "隨意打開選單，確認衣服出現在希卡石的右側",
              "讀取剛才剛醒來時的自動存檔",
              "再次前往拿取希卡石，「獲得希卡石」提示視窗時按＋號進入背包",
              "右搖桿往左推，確認游標停在重要道具頁的「星號（幻星頁籤）」上",
              "切換到系統選單，不回標題的情形下讀取原本的舊檔案",
              "游標停留的位置與借視窗操作的流程請參考番外56進行同位操作",
            ],
          },
        ],
      },
    ],
    notes: [
      { text: "除非是要用「單格偏移法」準備「脫頁游標」，不然通常會關閉 Zelda Notes 減少 2 格轉存格。" },
      { text: "轉存格的邏輯非常活，流程步驟有幾百種，上述僅為其中一種應用例，並未提及連鎖訛轉、訛植等連續作業。" },
      {
        text: "數值訛轉的「數值」是指道具資料中可被系統拿來運算或顯示的基本底層數值。不同道具類型會用不同方式解讀同一個 raw value 做運算，裝備則使用定點數運算（Fixed-point Arithmetic）處理：",
        sub: [
          "(1) 裝備（武器／弓／盾）：耐久度 × 100",
          "(2) 可堆疊道具：堆疊數",
          "(3) 重要道具：通常為 1",
          "(4) 套裝：對應 0～15，每個值代表一種染料顏色。",
        ],
      },
      { text: "料理詞綴的種類由料理的「售價」轉為二進位後決定；每一個 bit 位置對應一種詞綴（影片表格中共列出 10 個可對應的位置）。" },
      { text: "料理詞綴的數值由料理的「恢復心數」決定：詞綴數值 = 4 × 恢復心數，最大為 120。" },
      { text: "料理詞綴會覆蓋裝備原本對應詞綴欄位的數值，而不是與原數值疊加。因此得到料理詞綴的裝備不一定會變比較好。例如「投擲」原本的標準數值為 1000，料理詞綴最大只有 120，覆蓋後反而會丟得更近。「防滑」的摩擦力數值＝0.01 × 詞綴數值，反而是越低越滑（如：太陽盾摩擦力 = 0.1）。" },
      { text: "轉存格繼承堆疊物品時，若總數合計未超過 999，則會出現兩格相同的材料格位，並以第一個出現的材料格做運算處理。" },
      { text: "轉存格數＝道具總數（mCount = 0）時，道具欄位視覺會變空的，但實際上還是有道具在裡面。" },
      { text: "進度有完成神獸任務時，繼承「英傑能力＋」不會覆蓋原本的能力（會增殖）。" },
    ],
    closing: "轉存格有很多種變形 (variations)，詳細請參考下方相關影片。",
    faqLink: { label: "轉存格常見問題 Q&A", path: "/types/botw-02-faq" },
    toolCta: {
      kicker: "實測工具",
      title: "用模擬器先跑一次",
      description: "把流程改成腳本，先確認背包狀態、讀檔結果與轉存格數，再回到實機操作。",
      primary: { label: "查看 IST 模擬器教學", path: "/resources/ist-simulator" },
      secondary: { label: "開啟 Piston IST", url: "https://ist.pistonite.app" },
    },
    videos: [
      { id: "RMkXbRgf4NQ", title: "回應29 - 聖經級《轉存格(IST)》原理動態詳解｜你的問題解答都在這裡！（IST Guidebook Video）", desc: "轉存格、數值訛轉、料理詞綴最完整的原理都在這！" },
      { id: "Fia85vBcq0I", title: "番外52 - 再見薩爾達！最簡單的光弓繼承！「轉存格繼承（Inventory Slot Transfer）」詳解與流程解說", desc: "受發現者委託製作、最早的轉存格教學！" },
      { id: "GBa_AlYrDR8", title: "番外52.5 - 完美繼承光弓！不需開新檔的繼承方法！(各模式通用的流程文字說明)", desc: "即便沒有「野外的考驗」也可以讓既有檔案獲得光弓！" },
      { id: "JUQPXB5sBdw", title: "番外53(上) - 不死之身(999妖精) + 無限火力(8萬箭)！「向後訛轉(BDIC)」原理解說", desc: "沒有強迫症要八萬發的話，用劍之考驗向後訛轉就超夠用！" },
      { id: "eD8ikC1TzW0", title: "番外53(下) - 用溢出格刷出8萬箭！「向前訛轉(FDIC)」原理解說", desc: "用超出可見格位的道具往前訛轉數值" },
      { id: "pkm-lpHmolE", title: "番外54 - 最強裝備與10發弓箭！「武器加成訛植 - 擠出法(Weapon Modifier Corruption - OSM)」論文級解說", desc: "用料理格位上限來阻止料理讀入以便訛植詞綴" },
      { id: "4biy5mhbpeI", title: "番外54.5 - 330盾和10發(連)弓到底怎麼獲得的？《加成訛植(WMC)》教科書級詳解！", desc: "用堆疊上限來降低轉存格數來訛植料理詞綴" },
      { id: "n32P1K0vcUk", title: "番外56 - 吃掉卓拉鎧甲！處理黑格！煮冰獸肉！「同位操作（Prompt Entanglement）」詳細解說", desc: "解決你多出來的黑格、克洛格果實和屬性箭！" },
      { id: "K1px5KFeo5E", title: "EX6 - 初學者8分鐘搞懂「純光弓繼承」！新檔｜舊檔｜普通｜大師｜沒DLC全適用！" },
      { id: "lyBKVUkx59s", title: "EX7 - 有了光弓沒了電箭？讓『轉存格醫生』來拯救你壞掉箭格吧！", desc: "電箭不見了怎麼辦！轉存格醫生來拯救你的背包吧！" },
      { id: "SOQrIwNqoQo", title: "簡單快速增殖妖精/巨大核心！「轉存格增殖」！(不廢話系列)", desc: "用轉存格重複繼承材料來增殖" },
      { id: "oJ8bo2Nltcg", title: "竊取未來的道具回來吧！穿越時空的技能 -《IST》的應用(不廢話系列)", desc: "把未來才會拿到的道具繼承到現在時間點" },
      { id: "W5fmXiwnM3Y", title: "轉存格害我一堆克洛格果實怎麼辦？(不廢話系列 - 通過證也適用)", desc: "流程示範過多「克洛格果實」格位的問題" },
      { id: "Okv-0so2jys", title: "6分鐘$500000｜吃(用)不完的料理與素材 -「新檔訛轉」的可怕！（不廢話系列）", desc: "借用初始檔案來訛轉材料和料理" },
    ],
  },

  "botw-03": {
    videoFolder:    "botw-lynel",
    methodsTitle:   "攻擊模式",
    principleTitle: "對應策略",
    principleItems: [
      "曠野人馬的動作模式很固定，按住 ZL 鎖定人馬並保持冷靜隨時觀察人馬動向",
      "人馬吐火點燃草地時，可藉由上升氣流升空進入「子彈時間」補輸出",
      "見到仰天大吼，立刻拉開距離，或趁機爆頭打斷範圍大爆炸",
      "持大劍人馬的手舉高下砸衝擊波時建議拉開距離，近距離完美迴避會受傷",
      "待在持大劍人馬側面或背面時，務必提防迴旋斬、拉開距離",
      "持槍人馬落地的衝擊波太近盾擋會受傷，事先拉開距離迴避",
      "爆頭後，可趁暈眩空檔補幾刀",
      "依照不同等級的人馬，注意靜止器的時間長度不同",
      "熟悉子彈時間、盾反的玩家，以上重點都可以忽略...",
    ],
    methods: [
      {
        tab:   "共通",
        name:  "所有武器的人馬皆會使用的攻擊",
        video: "共通.mp4",
        steps: [
          "__三階段進攻模式__：3 次近距離招式 或 2次掃斬 → 衝刺型招式 → 火球",
          "__突進__：收起武器，以四足直接衝撞玩家。若不想進入子彈時間，__舉炸彈按 ZL 往後跳會無傷__",
          "__火球__：往後跳後連續吐出 3 顆火球，草地上吐火可產生上升氣流",
          "__掃斬__：距離人馬較遠時會側向揮動武器掃擊",
          "__射箭 / 箭雨__：玩家距離過遠、有高地差時，會鎖定林克射箭",
          "__範圍爆炸__（白髮以上限定）：仰天大吼集氣後砸地，周圍產生大範圍屬性爆炸",
          "__跳躍攻擊__：人馬位置地勢較高時，會躍起後落下攻擊，並造成衝擊波",
        ],
      },
      {
        tab:   "持劍",
        name:  "持劍人馬（單手劍＋盾）",
        video: "持劍.mp4",
        steps: [
          "__3 連斬__：近距離會使出連續揮出三刀",
          "__交叉斬__：中距離會使出交叉斬",
          "__衝斬__：快速衝刺橫掃斬擊",
        ],
      },
      {
        tab:   "持槍",
        name:  "持槍人馬（長槍）",
        video: "持槍.mp4",
        steps: [
          "__跳刺__：高躍起後向下突刺，落地產生__衝擊波__範圍傷害",
          "跳刺是持槍人馬唯一的近距離攻擊",
        ],
      },
      {
        tab:   "持雙手劍",
        name:  "持雙手劍人馬（雙手大劍 / 獸神大劍）",
        video: "持大劍.mp4",
        steps: [
          "__迴旋斬__：玩家待在側面或背面時極易觸發，可蹲在人馬下方迴避",
          "__3 連錘__：近距離時回連續揮下重錘",
          "__重錘__：中距離時會將武器舉高蓄力，下砸造成衝擊波",
          "__衝錘__：衝刺後接重擊，一樣會後砸在林克後方的衝擊波",
        ],
      },
    ],
    notes: [
      {
        text: "騎背砍（Mountable Back Slash）不消耗武器耐久度，是對人馬最高效的輸出方式，建議優先掌握騎乘時機。",
      },
      {
        text: "可騎乘的 5 種時機：",
        sub: [
          "(1) 爆頭 / 射臉 ── 射中人馬臉部使其單膝跪地（真暈眩）",
          "(2) 烏魯波薩的憤怒 ── 解完神獸後的英傑電擊可強制暈眩",
          "(3) 突進結束後的空檔 ── 人馬衝刺停下、重新起身前",
          "(4) 林克位置較高 ── 從空中直接落騎（跳馬、地形、技巧皆可）",
          "(5) 人馬脫離戰鬥範圍 ── 走回原地途中、或傳送紅光前",
        ],
      },
      {
        text: "無法騎乘的 2 種情形：靜止器假暈眩期間；另外人馬掏弓時 / 剛被騎下的 1 秒左右爆頭不會暈眩。",
      },
    ],
    videos: [
      { id: "ChdbQCjaTCo", title: "EX04 - 新手絕對適用！曠野第一隻人馬的「雷獸山『紅髮人馬』」攻略", desc: "最對症下藥的人馬攻略！" },
      { id: "QLcx-svQpco", title: "技巧03 - 強敵對策・DLC 2最終試煉skip指法（中文解說）" },
      { id: "QGtFTN75YvQ", title: "技巧12 - 新手專用！初學者人馬對戰詳細攻略（教學中不使用盾反等太難技巧）", desc: "早期最人氣的人馬攻略！" },
      { id: "yST2Nm11GHA", title: "技巧12.5 - 騎上人馬的5種方法（中文解說）", desc: "為什麼我騎不上去？看這片就對了！" },
      { id: "D-2S_KcD-3k", title: "技巧18 - 純操作擊倒「大劍人馬」的3種方法 -「馬下迴避」介紹（示範短片/Q&A詳見敘述）" },
      { id: "esJ4FAg34CI", title: "技巧18(補) - 讓「大劍人馬」看到你都怕（合集解說）", desc: "最多樣化的大劍人馬攻略" },
      { id: "mNdzGlDqWDQ", title: "番外09 - 限制按鈕的人馬戰(\"No ZL\" or \"No L Stick\" v.s Lynel)" },
      { id: "W6eb08aCMXQ", title: "番外44 - 人馬站著給你打！「歸祠現象(Shrine Storage)」（中文解說）" },
      { id: "dXb-jqvf0EU", title: "打不贏「台地人馬(DLC)」？初學者也能輕鬆打贏的懶人打法！（流程解說）" },
      { id: "0qcXVqlWFgw", title: "2個冰柱就能打爆台地人馬？(Kill Great Plateau Lynel with 2 Cryonis Blocks?)" },
      { id: "1y_FZb9cWvw", title: "15秒內解決黃金人馬（BoTW: Golden Lynel Speed Kill sub 15 seconds）" },
      { id: "l5l70AaGxCg", title: "回應21 - 8秒內解決黃金人馬！「騎乘擊點殘留(Permanent Active Hitbox on a Horse/Zero Cycle)」" },
      { id: "3qPsBJpPiTU", title: "常見的18種人馬戰鬥狂你是哪一種？(18 Types of Lynel Slayers - Which One Are You?)" },
      { id: "voH5iBOR5kk", title: "番外45.5(進階) - 騎完人馬後的飛雷神！「落馬閃擊(Jump-off Thunderclap Rush)」" },
      { id: "gva5ZCkuRlE", title: "指法15 -「跳馬盾擋」與「落馬閃擊」(Jump-off Shield Block & Thunderclap Rush, 簡易說明)" },
    ],
  },
  "botw-04": {
    videoFolder: "botw-moonjump",
    principleItems: [
      "2019/7/8 由 【メレシスト】 玩家發現，異常結束騎馬射箭小遊戲，可以將林克的位置卡在馬背上，解除林克的跳躍動作和硬直的同步，提早結束跳躍硬直以達成連續跳躍。除此之外林克的位置座標會被固定在上一次最後讀取的位置，在地上移動時會不停拉扯實際座標位置。2019/7/26 【Yuda】找出固定座標的邏輯，利用該邏輯成功第一次在未完成初始台地的狀態下離開初始台地。",
      "__MWW重生（Respawn）的邏輯__：當林克落水或掉入深淵時，遊戲不會把你放回岸邊，而是會將你傳送到「傳送標記器的座標值」",
      "__MWW再現（Restart）的邏輯__：當林克死亡或「讀取存檔」時，遊戲會將你傳送到「傳送到傳送標記器前的上一個最後讀取位置（傳送點座標或讀檔的位置）」",
    ],
    methods: [
      {
        tab:  "月步",
        name: "月步（Moonjump）",
        video: "月步.mp4",
        steps: [
          "前往費羅尼草原的「騎射演武報名處(Mounted Archery Camp)」，與 NPC 對話並開始騎馬射箭小遊戲",
          "遊戲開始後，轉身騎馬前往後方山丘上",
          "在倒數計時剩下約 10 ～ 12 秒時，從馬上跳下，並飛到一匹__非斑紋的野生馬（或者人馬）__身上",
          "不要安撫牠，保持馬的掙扎狀態直到時間結束",
          "送回 NPC 處結束對話，用炸彈箭將野生馬擊殺，或是傳送、讀檔觸發月步",
          "連打跳躍即可持續月步跳躍",
        ],
      },
      {
        tab:  "地滑",
        name: "地滑（Grounded Slide）",
        video: "地滑.mp4",
        sections: [
          {
            title: "法一：力巴爾勇猛",
            steps: [
              "觸發月步",
              "長按跳躍鍵使用「力巴爾的勇猛（Revali's Gale）」起飛",
            ],
          },
          {
            title: "法二：空中迴避斬",
            steps: [
              "觸發月步",
              "連打跳躍鍵在空中距離地面一段距離",
              "按住 ZL，方向鍵往後同時按下 X+Y",
              "後跳後往前跳斬，落地前在空中連打 X 迅速打開滑翔翼",
            ],
          },
          {
            title: "法三：經過讀取畫面後保持鎖定",
            steps: [
              "觸發月步",
              "傳送或讀檔",
              "按住 ZL 往前後按 X 跳",
            ],
          },
        ],
      },
      {
        tab:  "定位月傳",
        name: "定位月步傳送（Mww, Moonjump Wrong Warp）",
        video: "MWW.mp4",
        steps: [
          "將「傳送標記器（TM）」放置在你想要利用其座標的目的地",
          "觸發月步",
          "傳送到神廟、移動，或讀檔到目標位置",
          "傳送到傳送標記器",
          "觸發自動或手動存檔後讀取該檔案",
        ],
        note: "應用場景：傳送到神獸，經過讀取畫面後進入神獸內部，接著傳送到 TM，此時「上一個最後讀取位置」就是神獸入口。接著你無論讀取哪一個普通模式的存檔（傳送後才建立的），遊戲都會把你直接傳送回神獸內部。這個邏輯常被用來將進度帶入大師模式，或是用來突破系統限制強行進入劇情無法到達，或已被封鎖的區域。",
      },
    ],
    notes: [
      { text: "未開滑翔翼落地的情形，放開 ZL 林克就會恢復成原本的「月步狀態」" },
      { text: "月步狀態下爬上樓梯或接觸牆壁會變得只能緩慢走路，手持材料可以解除" },
      { text: "再次正常騎乘（馬、機車、萊尼爾等等）可以解除月步" },
    ],
    videos: [
      { id: "hM23UzbUkII", title: "番外37(上) - 3分鐘學會「無限跳躍法」（簡易流程示範）" },
      { id: "x0y9v_QpbD4", title: "番外37(中) -「騎射程錯『月步篇』(Mounted Archery Glitch - Moonjump)」（中文解說）" },
      { id: "sGxoHBm9viQ", title: "番外37(下) -「騎射程錯『地滑篇』(Mounted Archery Glitch - Grounded Slide)」" },
      { id: "kIuvvisfXAA", title: "番外38 - 逃出海拉魯！「地圖邊界穿牆法(Clip out of Hyrule Barriers)」（中文語音）" },
      { id: "t8D6hblY3ss", title: "番外39 - 誰說月步只能跳？「定位月步傳送（Moonjump Wrong Warp）」（原理解說版）" },
      { id: "D5fL3TLcuzY", title: "番外40 - 開場DLC任務！未出台地解「必殺之劍」與「最終試煉」！(適用進階玩家)" },
      { id: "2zHiRnhdMk8", title: "番外41 - 海拉魯最夯坐騎！與「希多王子」馳騁海拉魯（MWW的應用之一）" },
    ],
  },

  "botw-05": {
    videoFolder: "botw-cOHO",
    methods: [
      {
        tab: "步驟",
        name: "過場必殺劍（Cutscene One-Hit Obliterator）",
        video: "過場必殺劍.mp4",
        steps: [
          "解完 3 個必殺之劍的神廟",
          "觸發轉存格，數量須達隨時可以「轉存格數 ≧ 道具格的總數」的狀態（身上的道具可以先保留著，到導師面前再丟棄即可）",
          "前往第 4 個神廟，並且來到導師前方",
          "丟棄步驟2為了保險起見保留的材料或裝備，直到「轉存格數 ≧ 道具格的總數」（撿起道具時出現在重要物品頁籤的右側，或是背包外觀為空的）",
          "和導師對話，離開神廟",
          "動畫結束後確認背包有「過場必殺劍（cOHO）」",
          "再利用轉存格的方式將過場必殺劍繼承回舊檔案",
        ],
      },
    ],
    principleSections: [
      {
        text: "在滿早以前 【leoetlino】 就有說明過過場必殺劍的存在，而 2024/9 【LegendofLinkk】 玩家嘗試並成功獲得過場必殺劍。",
      },
      {
        items: [
          {
            text: "為什麼會有「過場必殺劍」？",
            sub: ["①這是遊戲官方為了確保 DLC 結尾過場動畫順利演出，而特製的動畫專用複製品。它和考驗中的必殺劍不同，具備不會吸血、可以自由切換的特色，正常情況下會在動畫結束時被系統強制回收。"],
          },
          {
            text: "成功拿走「過場必殺劍」的原理是什麼？",
            sub: ["②當系統道具認知格數(mCount)小於等於 0 時，進入背包的道具會出現在重要物品右側的「未歸類道具頁籤」。而過場動畫只會掃描正常在背包序列裡面的「必殺劍」做刪除，當動畫結束系統執行刪除指令時，會因為不在掃描路徑上而無法將它刪除，玩家便能順利將其卡進存檔帶走。"],
          },
        ],
      },
    ],
    notes: [
      {
        text: "若離開第 4 個神廟的時候，滿足以下條件，會獲得一把卡在手上的白色「神聖過場必殺劍(Holy cOHO)」：",
        sub: [
          "(1) 手上已經有一把「過場必殺劍」",
          "(2) mCount = 0 且裝備著在正常武器頁籤的過場必殺劍，或 mCount ≧ 1 的情形下解完必殺之劍任務（仍也有其他條件，但不明確）",
        ],
      },
    ],
    videos: [
      {
        id: "siBcEvxr1Y0",
        title: "番外58 - 遊戲中唯一不會壞的單手劍！獲得「過場必殺劍(Cutscene One-Hit Obliterator)」的詳細原理與步驟說明！",
      },
    ],
  },

  "botw-06": {
    videoFolder: "botw-sbr",
    methods: [
      {
        tab: "SBR",
        name: "盾擋重置（Shield Block Reset）",
        video: "SBR.mp4",
        steps: [
          "裝備耐久度夠高、不會因為格擋而損壞的盾牌",
          "按住 ZL 舉盾，「左搖桿 ←/↑/→ ＋ X」鎖定跳的同時在空中盾擋傷害",
          "在空中「左搖桿 ←/↑/→ ＋ X」第二段跳 → ZR 或 ZR＋Y",
        ],
      },
      {
        tab: "SSBR",
        name: "舉炸彈盾擋重置（Slip Shield Block Reset）",
        video: "SSBR.mp4",
        steps: [
          "裝備__耐久度高於 30 的盾牌、單手劍__，希卡石為遙控炸彈",
          "按 L 舉起炸彈",
          "按住 ZL 鎖定，「左搖桿 ↓ ＋ Y」，拔出單手劍並後退",
          "按 L ＋「左搖桿 ←/↑/→/↓ ＋ X」引爆炸彈並起跳",
          "在空中「左搖桿 ←/↑/→ ＋ X」第二段跳 → ZR 或 ZR＋Y",
        ],
      },
      {
        tab: "DSBR",
        name: "達爾克爾盾擋重置（Daruk Shield Block Reset）",
        video: "DSBR.mp4",
        steps: [
          "裝備任意盾牌、啟動__達爾克爾的守護__",
          "按住 ZL 舉盾並開啟達爾克爾的守護",
          "「左搖桿 ←/↑/→ ＋ X」鎖定跳",
          "輸入 X 起跳後瞬間放開 ZL 解除達爾克爾",
          "在空中格擋傷害後，「左搖桿 ←/↑/→ ＋ X」第二段跳 → ZR 或 ZR＋Y",
        ],
        note: "※ 亦可配合 SSBR 操作。",
      },
      {
        tab: "TSBR",
        name: "轉身盾擋重置（Turnaround Shield Block Reset）",
        video: "TSBR.mp4",
        steps: [
          "裝備耐久度 30 以上的盾牌（炸彈給盾的傷害），希卡石為遙控炸彈",
          "左搖桿↓＋ZL＋X 後空翻，在空中放開 ZL 並保持左搖桿往 ↓ 後推",
          "後空翻角色呈水平時按下 L 丟出炸彈",
          "角色落地並且轉身向後的瞬間，__精準按下 L+X__ 引爆炸彈的同時向後鎖定跳格擋炸彈",
          "在空中「左搖桿 ↑ ＋ X」第二段跳 → ZR 或 ZR＋Y",
        ],
      },
    ],
    principle: "2017/3/10 發售後第八天由 【Pewable】 首度發現並應用於神廟特解，由於太傷盾牌（耐久-30）被棄用。2018/6/17 【Yuda】 得知此技巧後首度使用於戰鬥上。盾擋非因重擊而後撤型的傷害會重置跳躍判定，因此在空中盾擋此類型傷害時可以在空中進行第二段跳，由於存在足夠的高低差，按 ZR 拉弓可以進入子彈時間，是大部分戰鬥風格或技巧的祖先級程錯。",
    notes: [
      { text: "鎖定跳必須帶有「方向」，原地跳雖然可以第二段跳，但通常高度不足無法進入子彈時間，此種 SBR 僅有弊無利。" },
      { text: "炸彈箭觸發的 BSBR 或炸彈箭轉身的 BABSBR 需要相當多的抓幀技巧，屬於高成本低報酬的 SBR，除非製作 Combat Montage 或炫技，不然較少被使用。" },
    ],
    videos: [
      { id: "9d1ks1E_a3A", title: "番外00「災厄之路(The way to \"Calamity\")」- 戰鬥技巧詳解" },
      { id: "yyJroBo6oWc", title: "番外10 -「盾擋重置(Shield Block Reset／盾受けリセット)」" },
      { id: "CTycsi72RlE", title: "番外12 - 瞬盾翔(PDPL)／光劍硬直取消／盾擋重置(SBR)應用" },
      { id: "zmz4dSZybRA", title: "指法03 - 盾擋重置與二段跳射箭（SBR）" },
      { id: "O8afIFdhb18", title: "番外22 自燃火把／完美盾擋重置(DSBR)／烏魯波薩突擊(Urbosa Rush)" },
      { id: "5-h3TNlXaLk", title: "番外10.5 - 閃擊(TCR)不標記也能打中！「轉向盾擋重置（Turnaround SBR）」" },
    ],
  },

  "botw-07": {
    videoFolder: "botw-sneakstrike",
    methods: [
      {
        tab: "低聲潛行",
        video: "低聲潛行.mp4",
        steps: [
          "裝備__潛行裝__、吃__寧靜料理__，或蹲下靠近、極緩慢速行走等等",
          "在魔物視線 60 度以外的位置，以極低音量靠近魔物背後",
          "按下 Y 進行偷襲",
        ],
      },
      {
        tab: "限定敵意",
        video: "限定敵意.mp4",
        steps: [
          "攻擊魔物",
          "在魔物受到攻擊、面向攻擊來源之前抵達魔物的背後",
          "按下 Y 進行偷襲",
        ],
      },
      {
        tab: "炸彈轉移",
        video: "炸彈轉移.mp4",
        steps: [
          "在__無敵意__的情形下放置一個炸彈讓魔物去踢",
          "繞到魔物背後按下 Y 進行偷襲",
        ],
      },
    ],
    principleItems: [
      "魔物的意識狀態（或稱仇恨值）：",
      "① 無警戒",
      "② 困惑（？）",
      "③ __限定__（受傷或被干擾）",
      "④ 敵意（！）",
      "在「__限定狀態__」下，怪物會完全失去聽覺，是絕佳的偷襲時機；但如果「？」號正在累積填滿或怪物「原地困惑未移動」，則無法觸發偷襲。",
      "連鎖偷襲：偷襲將怪物擊倒後，怪物起身時會轉向「最後被攻擊的來源點」。因此在偷襲成功後，立刻跑到怪物的反方向，等牠起身面向攻擊來源時，就能在背後進行下一次偷襲。",
      "拖延時間工具：",
      "① __靜止器__ — 鎖定怪物時完全凍結視線與聽覺，在靜止器結束前都不得發出聲音",
      "② __屬性箭__ — 利用火（3秒）、雷（3秒）、冰（30秒）的定身效果可爭取繞背時間",
    ],
    notes: [
      {
        text: "如果怪物在觸發「困惑（？號）」狀態時沒有產生移動（原地困惑），即使之後對牠爆頭使其進入限制狀態，也會觸發「無法偷襲」的狀態，此時必須等待牠走回原位、意識重置後才能再次偷襲。",
      },
    ],
    videos: [
      { id: "46EcbtMQ9V8", title: "技巧31 - 無寧靜也能暗殺！偷襲方法與敵意機制詳解" },
    ],
  },

  "botw-08": {
    model3d: {
      src: "/tots-model/model/tots-model.glb",
      alt: "劍之考驗地圖參照模型",
      // 初始視角：注視高原房間群中心（glTF 座標，Blender (x,y,z) → glTF (x,z,-y)）。
      // 方位角 60°／極角 55°：極角 45° 時中級盆地的凹陷幾乎看不出深度（視角太接近正上方，
      // 只剩地板顏色差異，看起來像被「填平」了），55° 才能露出盆地邊坡的落差；
      // 方位角從 15° 轉到 60° 是為了閃開導師之塔——15° 時攝影機到房間群的視線幾乎與
      // 塔正對，塔會直接擋在房間群前面，60° 時塔完全在畫面外。
      // 距離必須明寫成 1400m，不能用 auto——auto 是依「整個場景」（含外圍很大一圈的海面）
      // 自動抓縮放，算出來的距離會把整張地圖都塞進畫面，導致房間群變得很小、
      // 塔反而在近景顯得巨大，等於白做了方位角閃塔的調整。
      cameraOrbit: "60deg 55deg 1400m",
      cameraTarget: "-515m 80m -330m",
      // 「總覽」：拉遠到同時看見高原、平原與導師之塔，注視點改用整個實體地形（不含外圍海面）
      // 的重心，而不是房間群中心，距離／極角都要明寫（理由同上，auto 會把海面也框進去）。
      overviewOrbit: "25deg 62deg 2200m",
      overviewTarget: "-284m 60m 43m",
      // 「俯視」：極角壓到接近 0（正上方往下看），方便看清楚房間排版；沿用總覽的注視點，
      // 距離加大一點確保接近垂直俯視時仍能框住整個地形範圍。
      topOrbit: "0deg 90deg 3200m",
      poster: "/tots-model/model/poster.jpg",
      posterAlt: "劍之考驗地圖模型載入中的預覽圖",
      layoutSrc: "/tots-model/model/tots-layout.json",
      // 色彩圖例：對應 blender-tots/generate_tots_model.py 的 PALETTE 房間屬性色
      legend: [
        { color: "#d8d4c8", label: "一般房間" },
        { color: "#46d2e0", label: "水域" },
        { color: "#242a6e", label: "奈落（中級1-4F）" },
        { color: "#17161a", label: "黑暗（中級6-10F）" },
        { color: "#f2d43d", label: "雷雨（頂級1-5F）" },
        { color: "#f0801f", label: "火山（頂級7-11F）" },
        { color: "#a8dde6", label: "寒冷（頂級13-17F）" },
        { color: "#22c55e", label: "起點" },
        { color: "#9fd6c8", label: "休息平台" },
        { color: "#34b8a0", label: "綠洲" },
        { color: "#b09a78", label: "盆地地標" },
        { color: "#4a4d52", label: "導師之塔" },
      ],
      // 「透明化」開關鈕：只調整戰鬥房間（一般房間／水域／奈落／黑暗／雷雨／火山／寒冷）
      // 的材質透明度，起點／休息平台／綠洲／盆地地標等非戰鬥房間、地面與樓層文字都不受影響。
      transparencyMaterials: [
        "normal", "normal_side",
        "water", "water_side",
        "void", "void_side",
        "dark", "dark_side",
        "storm", "storm_side",
        "volcano", "volcano_side",
        "frigid", "frigid_side",
      ],
      transparencyOpacity: 0.2,
    },
    methods: [
      {
        tab: "Normal",
        intro: "詳細流程請參考「相關影片」區。",
        sections: [
          {
            title: "大師模式攻略重點技巧",
            steps: [
              "了解敵意機制與連續偷襲的模式",
              "單挑的部分可以多使用「靜止器＋觀看回憶重置冷卻時間」增加戰鬥容錯率",
              "頂級模式可從寶箱獲得共 9 發的古代箭已降低難度",
              "蒐集休息區妖精、木柴可以煮食物",
              "進入關卡前可以準備 30 分鐘 3 攻的料理（高傷害才是重點，增加防禦只增加一點點容錯率，拉長戰鬥時間更危險）",
            ],
          },
        ],
        principle: "本節為一般攻略重點提示，不涉及穿牆等程錯技巧，詳細操作請觀看「相關影片」區的實戰示範。",
      },
      {
        tab: "Clip",
        sections: [
          {
            title: "鐵箱冰柱穿牆法（Metal Box & Cryonis Clipping）",
            steps: [
              { text: "通關到有鐵箱的樓層，清掉鐵箱周圍的魔物", sub: ["初級：4F", "中級：1F", "頂級：4F"] },
              "用磁吸將鐵箱拉到靠牆，距離牆壁一個林克寬度的距離",
              "對著牆壁靜止鐵箱，將鐵箱打至紅色動量",
              "站在牆壁和鐵箱之間，往反方向推鐵箱，直到靜止的 10 秒結束",
              "撞出牆外之後移動到初級 12F 建築的西南側",
              "用冰柱製造小小的掉落空間，往該空間衝刺擠進初級 12F 內",
              "拉鐵箱重複敲擊西諾克斯的底部或腋下將其擊倒",
              "於最終的導師之間和大師劍對話",
            ],
          },
        ],
        principle: "結合[[靜止衝撞|botw-18#Stasis]]（鐵箱打出紅色動量後反向卡出牆外）與[[冰柱擠壓|botw-18#Cryonis]]（在初級 12F 外側製造缺口鑽入）兩種穿牆技巧，跳過中後段樓層直達終點。",
      },
      {
        tab: "Skew",
        sections: [
          {
            title: "扭曲穿牆法（Skew Clipping）",
            steps: [
              { text: "進入劍之考驗前，先存取扭曲(Skew)", sub: ["初級：東側扭曲", "中級：北側扭曲", "頂級：北側扭曲"] },
              "對著較薄的牆面踩盾跳，在空中卸掉盾牌",
              "穿出牆外之後移動到初級 12F 建築的西南側",
              "用冰柱製造小小的掉落空間，往該空間衝刺擠進初級 12F 內",
              "拉鐵箱重複敲擊西諾克斯的底部或腋下將其擊倒",
              "於最終的導師之間和大師劍對話",
            ],
            note: [
              "※ NS2版必須 ESC 或 ISC。",
              "※ 多半在移動，因此可先準備 30 分鐘 3 速的料理減少通關時間。",
            ],
          },
        ],
        principle: "利用[[盾跳扭曲穿牆|botw-18#Skew]]先穿到考驗地圖外側，再接上與 Clip 分頁相同的冰柱擠壓路線進入初級 12F 直達終點。",
      },
      {
        tab: "MWW",
        sections: [
          {
            title: "定位月傳法（Moonjump Wrong Warp）",
            steps: [
              "到（-3020, 1500）左右的位置，放置一個傳送標記器(DLC)",
              "到騎馬射箭小遊戲觸發月步，直接傳送到傳送標記器(DLC)",
              {
                text: "進入劍之考驗，在短平台牆面操作相機穿牆之後，手持材料解除慢走狀態，走到水區溺斃",
                sub: [
                  "初級：先拿雞蛋或木柴，1F入口往右高處短平台穿牆",
                  "中級：1F可直接掉入深淵",
                  "頂級：先炸樹拿木柴，2F入口往右高處短平台穿牆",
                ],
              },
              "按住 ZL 連打 X 跳至少 40 秒",
              "放開 ZL 往導師之劍的巨塔跳走，走到對應等級的終點結束試驗",
            ],
          },
        ],
        principle: "先用月步（Moonjump）搭配地底傳送標記器製造[[錯誤的著陸點判定|botw-04]]（Wrong Warp）直接進入劍之考驗地圖，再用[[相機穿牆|botw-18#Viewpoint]]卡入水域溺斃來重新初始化位置，最後長按跳躍導向終點觸發過關，跳過中間所有樓層。",
      },
    ],
    notes: [
      { text: "DLC1「考驗的霸者」收錄的考驗挑戰，清空既有進度的裝備進入考驗，連續通過各個樓層擊敗魔物。本系列包含普通模式和大師模式的初級、中級、頂級的重點攻略，以及大師模式更需要學習的「偷襲」技巧，適合在試煉中卡關或想省時完成的玩家參考。" },
    ],
    videoGroups: [
      {
        title: "正常挑戰",
        videos: [
          { id: "4lZpCR8OyzY", title: "高效率3心無傷！『劍之考驗 - 頂級(大師模式)』重點攻略！（2022 Guide of DLC1 Trial of the Sword - Final）" },
          { id: "N3QVfzHn-ps", title: "高效率3心無傷！『劍之考驗 - 中級(大師模式)』重點攻略！（2022 Guide of DLC1 Trial of the Sword - Middle）" },
          { id: "EjX0-Pj6wG0", title: "高效率3心無傷！『劍之考驗 - 初級(大師模式)』重點攻略！（2022 Guide of DLC1 Trial of the Sword - Beginning）" },
          { id: "ce21Z79Zbtc", title: "破除夢魘！詳解《劍之考驗 - 初級地下10樓》！（ToTS B10 Tutorial）" },
          { id: "5nzrj_5-FNM", title: "劍試01 - 簡單無傷通過「劍之試煉（一般模式）- 初級」攻略（2018年版）" },
          { id: "Dxh3W_sQmmo", title: "劍試02 - 簡單無傷通過「劍之試煉（一般模式）- 中級」攻略（2018年版）" },
          { id: "pjix1ZahVQ4", title: "劍試03 - 簡單無傷通過「劍之試煉（一般模式）- 頂級」攻略（2018年版）" },
          { id: "jC-mr7ZJhoc", title: "劍試04 - 無傷「劍之試煉（大師模式）- 初級」攻略流程（2018年版）" },
          { id: "IJElnqcy-ok", title: "劍試05 - 無傷「劍之試煉（大師模式）- 中級」攻略流程（2018年版）" },
          { id: "5080qSOLtNg", title: "劍試06 - 無傷「劍之試煉（大師模式）- 頂級」攻略流程（2018年版）" },
          { id: "FHMarfPxVhY", title: "技巧21 - 劍之試煉的 14 個攻略重點與技巧（大師模式・中文解說）" },
        ],
      },
      {
        title: "程錯通關",
        videos: [
          { id: "9AM19fJ7mSo", title: "回應07「劍之考驗(ToTS)」的穿牆重點講解（人聲解說）" },
          { id: "g8eqZ6LaK10", title: "番外23 - 在劍之試煉騎機車（Cycle Zero in ToTS）" },
          { id: "QlJw8N7cMyo", title: "劍試07 - 劍之試煉 -「靜止衝撞法(Stasis Clipping)」（大師／一般模式皆通用．新方法請見敘述）" },
          { id: "wPsT2Ienj9k", title: "劍試08 - 牆外路線(Oob Route)初級12F冰柱放置教學（中文解說）" },
          { id: "OYu_vHdo2wo", title: "劍試09 - 劍之試煉OOB -「盾跳穿牆法（Shield Skew Clipping）」（示範影片）" },
          { id: "QixAsgjcgvA", title: "劍試10(NS2) - 劍之考驗太難？用 MWW 直接走去拿劍吧！" },
        ],
      },
    ],
  },

  "botw-18": {
    videoFolder: "botw-clip",
    methods: [
      {
        tab: "Stasis",
        video: "impact clip.mp4",
        sections: [
          {
            title: "靜止衝撞（Stasis Clipping）",
            steps: [
              "將可靜止的物體移動到牆壁前，預留一個林克寬度的空間",
              "靜止物體並將其打到紅色動量（需要的話用箭調整方向）",
              "站在物體與牆壁之間（可以的話反向推物體）",
              "待靜止結束把林克撞出去",
            ],
          },
        ],
        principle: "將靜止中的物體打到紅色動量，撞擊林克使其靈體和模型分開，再次同步座標時穿出牆面。",
      },
      {
        tab: "Cryonis",
        video: "cryonis clip.mp4",
        sections: [
          {
            title: "冰柱擠壓法（Cryonis Clipping）",
            steps: [
              "大多只用在劍之考驗 12F 的穿牆，請參考[[劍之考驗|botw-08#Clip]]。",
            ],
          },
        ],
        principle: "利用冰柱限制移動空間，讓林克穿出牆面。",
      },
      {
        tab: "Skew",
        video: "skew clip.mp4",
        sections: [
          {
            title: "盾跳扭曲穿牆（Shield Jump / Skew Clipping）",
            steps: [
              "踩盾跳落地在斜坡上，落地只有頓點一下沒有任何滑動，就會獲得該上坡方向的扭曲（skew），建議 45° 的斜坡為佳",
              "對著與上坡方位相同方向的牆壁，往前踩盾跳，並在空中卸掉盾牌",
              "扭曲發生後有機會穿進牆壁內",
              "(ESC)在扭曲的恢復幀上再次裝備盾牌 → 盾跳 → 卸盾，在空中重複動作",
            ],
            note: [
              "※ 其他還有 ESC, ISC, RSC, SPC 等等進階穿牆法，詳見相關影片。",
              "※ NS2 版若沒有反向的推擠物，一般扭曲盾跳無法輕易穿牆，必須用 ESC。",
            ],
          },
        ],
        principle: "踩盾跳本身是一個讓遊戲能夠讓演算碰撞和座標的「靈魂」和實際模型的「身體」能夠稍微脫離的動作。而盾跳在斜面上儲存的__扭曲(Skew)__，會暫時讓遊戲誤解林克的位置，再次「踩盾跳」時會將林克的座標計算到上一個儲存的相對位置，因而與模型本身產生分離，也就是「扭曲（Skew）」，並且靈魂會在空中試圖重新同步和模型的位置，當靈魂和身體分離得夠遠，重新同步時就有機會穿到牆壁裡面，而成功再次完成「踩盾跳」後，模型和靈魂就會再次同步。若在空中卸盾讓踩盾跳不完整，就可以重複使用上一次儲存的扭曲，不過重複使用座標仍然會漸漸同步位置，扭曲會越來越小。",
      },
      {
        tab: "Horse Jump",
        video: "horse jump clip.mp4",
        sections: [
          {
            title: "跳馬 S/L 法（Horse Jump Clipping）",
            steps: [
              "騎馬背對擠進要穿的牆壁",
              "擠進的過程中按 X 從馬上跳起來",
              "在空中存檔之後讀檔",
            ],
          },
        ],
        principle: "騎著馬擠進地圖模型或牆面內，從馬上跳起來存檔，讓遊戲將落地位置紀錄在牆內，讀檔後就可以載入到牆內的位置。",
      },
      {
        tab: "Viewpoint",
        video: "Viewpoint Displacement Clip.mov",
        sections: [
          {
            title: "相機穿牆法（Camera Clipping）",
            steps: [
              "站在要穿的牆壁前面，牆壁前只有非常短的站立平台",
              "視角背對牆壁，左搖桿往後往牆壁方向走",
              "快速按下 2 次 L 開關相機",
            ],
          },
          {
            title: "望遠鏡穿牆法（Scope Clipping）",
            steps: [
              "站在要穿的牆壁角落，牆壁前只有非常短的站立平台",
              "視角背對牆壁，左搖桿往後往牆壁方向走",
              "連打 R3 切換望遠鏡視角",
            ],
            note: "※ 通常用在低角度、兩向牆壁夾在一起的角落，如復甦神廟希卡石的房間右上角。",
          },
        ],
        principle: "這是所謂的「錯位視角（Camera Displacement）」產生的問題。啟動相機或望遠鏡時會改變林克的站位，而開啟相機或望遠鏡時被設定會卡在高低差的邊緣，若林克能夠站立的空間不多，啟動相機或望遠鏡時會被邊緣推回來，當遊戲試圖重新同步林克的位置時就可以將林克錯位同步到牆內達到穿牆的效果。",
      },
      {
        tab: "Unload",
        sections: [
          {
            title: "未加載穿門法（Unload Clipping）",
            steps: [
              "用 Super Launch / BTB 高速移動到想要穿的「門」物件",
              "快速走進門內",
            ],
          },
        ],
        principle: "高速移動讓門來不及加載，進而比門的出現更早進入門內。",
      },
    ],
    notes: [
      {
        text: "由於 Nintendo Switch 2 Edition 版效能提升，扭曲產生的身體與靈魂不同步的時間變短，導致重新同步位置時林克的模型尚未進入牆內就被同步座標了，因此必須藉由地圖物件，讓靈魂先撞到地圖物件，反作用力加速推進牆內的速度，此時同步座標才有辦法穿進牆內。",
      },
    ],
    videos: [
      { id: "Zpc6r4T8Wwk", title: "ED02 - NS2才知道也不遲！絕對不能錯過的技巧！（下）" },
      { id: "Au6TMo0H_sE", title: "回應03 -「扭曲」的儲存法（Skew Storage）" },
      { id: "llbIv0QoWbk", title: "指法13 - 側盾跳穿牆（ISPC, Instant Shield Pull Clip）" },
      { id: "4bPY98FmdXQ", title: "回應11 - 盾跳穿不了牆？教你「進階穿牆法（ESC/ISC/RSC/SPC）」！" },
      { id: "kIuvvisfXAA", title: "番外38 - 逃出海拉魯！「地圖邊界穿牆法(Clip out of Hyrule Barriers)」" },
      { id: "9AM19fJ7mSo", title: "回應07 -「劍之考驗(ToTS)」的穿牆重點講解" },
      { id: "VQecWgNQbZE", title: "番外21 -「多段式盾穿(ESC)」與「逆向盾跳存取」" },
      { id: "-QzHTgTT0mM", title: "番外20 -「翱驪遁地法」與「扭曲彈跳」" },
      { id: "o5PCUiESSEw", title: "番外15 -「光牆穿越法與光之弓箭」" },
      { id: "eKac8miVWAQ", title: "10.5(補) - 20秒速解依蓋隊任務", desc: "內容：盾跳扭曲法" },
      { id: "OYu_vHdo2wo", title: "劍試09 - 劍之試煉Oob -「盾跳穿牆法（Shield Skew Clipping）」" },
      { id: "-T3C92T-WHc", title: "番外16 -「穿牆法(Clipping Methods)」介紹" },
      { id: "wPsT2Ienj9k", title: "劍試08 - 牆外路線(Oob Route)初級12F冰柱放置教學" },
      { id: "96ZrqqpELqU", title: "番外15(舊) - 衝撞穿光牆法取得「光之弓箭」" },
      { id: "QlJw8N7cMyo", title: "劍試07 - 劍之試煉 -「靜止衝撞法(Stasis Clipping)」" },
      { id: "95ZeIyckScw", title: "回應06(new) - 22個冷知識與小技巧" },
      { id: "vGKFz0Gke2Y", title: "回應22 - 1000小時也未必知道的玩法！" },
    ],
  },

  "botw-10": {
    intro: "收錄全地圖各個區域的解謎神廟。以早期無風彈、無天滑的方式，單靠「操作」來通過神廟。",
    videos: [
      { id: "eKNFTJVV85c", title: "神特01 - 初始台地區域（Shrine Strategies in Great Plateua Area）" },
      { id: "wKRYj0hMy18", title: "神特02 - 塔邦撻地區（Shrine Strategies in Tabantha region）" },
      { id: "-ulpjJecjVM", title: "神特03 - 森林之塔地區（Shrine Strategies in Woodland Tower region）" },
      { id: "QtECOMOfHPM", title: "神特04 - 丘陵之塔地區（Shrine Strategies in Ridgeland Tower region）" },
      { id: "9aqRXjRdxz4", title: "神特05 - 哈特諾之塔地區（Shrine Strategies in Hateno Tower region）" },
      { id: "k1_spfqit_w", title: "神特06 - 平原之塔地區（Shrine Strategies in Central Tower region）" },
      { id: "yLjG8q9M5zk", title: "神特07 - 拉聶爾之塔地區（Shrine Strategies in Lanayru Tower region）" },
      { id: "f5gXuOBRWRw", title: "神特08 - 阿卡萊之塔地區（Shrine Strategies in Akkala Tower region）" },
      { id: "T-IPtYWB9Jc", title: "神特09 - 格魯德地區（Shrine Strategies in Gerudo region）" },
      { id: "_7B4TZ1Z4-w", title: "神特10 - 海布拉之塔地區（Shrine Strategies in Hebra Tower region）" },
      { id: "MX2JtbRsf2U", title: "神特11 - 荒野之塔地區（Shrine Strategies in Wasteland Tower region）" },
      { id: "ADEWHdqgbSM", title: "神特15 - 雙子山之塔地區（Shrine Strategies in Dueling Peaks Tower region）" },
      { id: "LgqZjLm9_S8", title: "神特16 - DLC2英傑之詩神廟（Shrine Strategies in DLC2 Champions' Ballad）" },
    ],
  },

  "botw-12": {
    intro: "主線流程的攻略影片集，包含四座神獸的破解步驟、加儂多夫的實戰攻略，以及 DLC 追加任務的完整走法。如果在主線特定關卡卡關，找到對應的影片即可直接參考。",
    videos: [
      { id: "2vL2TXpLh7U", title: "EX5 - 新手怎麼潛入依蓋隊基地？Yuda教你直接闖空門！(Area Clearing)" },
      { id: "1y-BGwQ0_zs", title: "DLC2《虛幻空間》的四咒加儂 - 快速重點攻略(Walkthrough of Blight Ganons in Illusory Realm)（2022年版）" },
      { id: "qttzw1yxKUU", title: "鼓隆的絕對防禦！《火之神獸》重點攻略 - 瓦・魯達尼亞(Divine Beast Vah Rudania)（2022年版）" },
      { id: "0Sc9ZEIXAdQ", title: "格魯德的綠色閃電！《雷之神獸》重點攻略 - 瓦・娜波力斯(Divine Beast Vah Naboris)（2022年版）" },
      { id: "JFTL_9GRCOU", title: "青梅竹馬的祝福！《水之神獸》重點攻略 - 瓦・露塔(Divine Beast Vah Ruta)（2022年版）" },
      { id: "4cKUAZS9wjM", title: "傲嬌的勁敵！《風之神獸》重點攻略 - 瓦・梅德(Divine Beast Vah Meloh)（2022年版）" },
      { id: "VMvBroSNM04", title: "依蓋隊基地戒備森嚴？「弓鎖」讓你如入無人之境！（Sneak into Yiga Clan with Bow Lock glitch）" },
      { id: "2ipanD0eQ_o", title: "攻略09 - 速解「風」「水」神獸內部流程（中文解說）" },
      { id: "K9g-q4tBVL0", title: "攻略10.5 - 依蓋團速解流程 - 雷鳴兜奪還任務（中文解說）" },
      { id: "N9gqAwdA7G8", title: "初學者的夢魘：「使其停止方為上策/以靜制動」DLC神廟安全解法" },
      { id: "LgHgYaZn8NE", title: "DLC必殺之劍神廟「平常心」：第二輪就該不一樣！(Yowaka Ita Shrine Strategies)" },
      { id: "iGcDvFbTq2g", title: "幾個神廟前置任務的特殊解法（Complete Shrine Quests in Special Ways）" },
      { id: "Jjjgo8oLUHk", title: "到底該怎麼解「野外的考驗」呢？(無Mic)" },
      { id: "eKac8miVWAQ", title: "攻略10.5(補) - 20秒速解依蓋隊任務（中文解說）" },
      { id: "ewAYrlnrmMk", title: "攻略11 - 速解「雷」「炎」神獸內部流程（中文解說）" },
      { id: "FYU9Xn2yZ7I", title: "攻略22 -〖DLC 2〗英傑之詩：一擊之劍（大師模式・CHC流程・中文解說）" },
      { id: "Hvg92UXrz3o", title: "攻略23 -〖DLC 2〗英傑之詩：力巴爾篇（大師模式・CHC流程・中文解說）" },
      { id: "OgsCtBHpXZc", title: "攻略24 -〖DLC 2〗英傑之詩：烏魯波薩篇（大師模式・CHC流程・中文解說）" },
      { id: "xkmmww_PGG0", title: "攻略25 -〖DLC 2〗英傑之詩：米法篇（大師模式・CHC流程・中文解說）" },
      { id: "Plo2BjuWTNA", title: "攻略26 -〖DLC 2〗英傑之詩：達爾凱爾篇（大師模式・CHC流程・中文解說）" },
      { id: "yS3CS9r21c4", title: "攻略27 -〖DLC 2〗英傑之詩：最終試煉篇（大師模式・CHC流程・中文解說）" },
      { id: "xMe208vzezo", title: "攻略27.5 -〖DLC 2〗「略過『最終試煉』(Final Trial Skip)」（中文解說）" },
    ],
  },

  "botw-15": {
    intro: "不廢話，直接給步驟。每集針對單一技巧或訛轉做快速示範，沒有背景介紹、沒有原理分析，只有你需要的操作流程。適合已有基礎、只想快速查閱特定技巧的玩家。",
    videos: [
      { id: "Okv-0so2jys", title: "6分鐘$500000｜吃(用)不完的料理與素材 -「新檔訛轉」的可怕！（不廢話系列）" },
      { id: "JtSHil_1AYM", title: "不用洗箭！快速全屬性80000箭｜無原理快速示範「連鎖向前訛轉(FDIC Chain)」！（不廢話系列）" },
      { id: "M7BPZmuS0Do", title: "整天愁武器太快壞？開個新檔就能複製一把800耐久的武器！（不廢話系列）" },
      { id: "hPp7mvGvJPc", title: "無敵＋無限精力！「溺水儲存／阿姆斯狀態(ARMS, Aqua Reverse Memory Storage)」（不廢話系列）" },
      { id: "K1px5KFeo5E", title: "EX6 - 初學者8分鐘搞懂「純光弓繼承」！新檔｜舊檔｜普通｜大師｜沒DLC全適用！(不廢話語音＋新手適用版)" },
      { id: "oJ8bo2Nltcg", title: "竊取未來的道具回來吧！穿越時空的技能 -《IST》的應用(不廢話系列)" },
      { id: "SOQrIwNqoQo", title: "簡單快速增殖妖精/巨大核心！「轉存格增殖」！(不廢話系列)" },
      { id: "W5fmXiwnM3Y", title: "轉存格害我一堆克洛格果實怎麼辦？(不廢話系列 - 通過證也適用)" },
      { id: "8g8htS8hy0g", title: "不廢話系列！新手照做也能輕鬆「物品置換」！(Item Transmutation for Beginners)" },
      { id: "luZrf-E1N8Y", title: "不廢話！1分鐘學會如何觸發「無機車第一人稱視角」！(1-Minute Tutorial of How to Trigger FPS View without Cycle Zero)" },
      { id: "dOVAzYGLwoU", title: "不廢話！畫面暫停一下快速檢查「空中風彈」失敗的原因！" },
      { id: "z_3QuSgUc1g", title: "只要有水有機車就能飛！冰柱機車擊飛（Cryonis Master-Cycle Launch, 不廢話系列）" },
      { id: "8biCvDxKw1o", title: "54秒教你怎麼「逆攀擊飛(Instant Climb Launch)」（不廢話系列）" },
      { id: "y__ia85ppwM", title: "英傑投降！45秒「元氣彈姿勢」教學（不廢話系列）" },
      { id: "8QaUm9pJEY0", title: "超遠距離丟物品！1分鐘「原點釋放(Cycle Return Throw/Origin Throw)」教學（不廢話系列）" },
    ],
  },

  "botw-09": {
    intro: "專為初學者設計的入門與進階攻略系列，想要跳脫新手的思維，還是想補強某個環節的老手，都能找到對應的影片。",
    videos: [
      { id: "ewnlB6jK7M8", title: "番外04(新) - 原來不只有「完美迴避的突擊」？Yuda教你所有「進階突擊(Advanced Flurry Rush, TCR/PDR/ATR)」" },
      { id: "K5JjZHBTC9c", title: "ED01 - NS2才入手的必看！絕對不能錯過的小知識（上）" },
      { id: "Zpc6r4T8Wwk", title: "ED02 - NS2才知道也不遲！絕對不能錯過的技巧！（下）" },
      { id: "eCKsWlOQzrA", title: "EX00 -《大師模式》新手實用技巧！別讓大師台地勸退你（字幕解說）" },
      { id: "cgqAOlvubVQ", title: "EX01 -「從初學者畢業的13堂技巧課」 - 遊戲攻略技巧精華（人聲解說）" },
      { id: "0A6dkkeEtQo", title: "EX02 - 初學者一定用得到的小技巧和小知識（中文解說）" },
      { id: "pi2w0KLnO1U", title: "EX03 - 缺武器？初學者也能複製魔物手上的武器！（初學者適用）" },
      { id: "ChdbQCjaTCo", title: "EX04 - 新手絕對適用！曠野第一隻人馬的「雷獸山『紅髮人馬』」攻略" },
      { id: "2vL2TXpLh7U", title: "EX5 - 新手怎麼潛入依蓋隊基地？Yuda教你直接闖空門！(Area Clearing)" },
      { id: "K1px5KFeo5E", title: "EX6 - 初學者8分鐘搞懂「純光弓繼承」！新檔｜舊檔｜普通｜大師｜沒DLC全適用！(不廢話語音＋新手適用版)" },
      { id: "9d1ks1E_a3A", title: "番外00「災厄之路(The way to \"Calamity\")」- 戰鬥技巧詳解" },
      { id: "kO0dD9NF8U0", title: "技巧06 - 新手也能變達人！取消動畫硬直（中文解說）" },
      { id: "QGtFTN75YvQ", title: "技巧12 - 新手專用！初學者人馬對戰詳細攻略（教學中不使用盾反等太難技巧）" },
      { id: "tDvHvBp3WpY", title: "技巧29 - 無限靜止！「重置靜止器(Stasis Resetting)」（中文解說）" },
      { id: "pcMbBoBD64g", title: "為什麼「雷龍」都沒出現？為什麼Yuda都有用不完的30分鐘料理？(Where's my Farosh? Why does Yuda have infinite Level-3 food?)" },
      { id: "dXb-jqvf0EU", title: "打不贏「台地人馬(DLC)」？初學者也能輕鬆打贏的懶人打法！（流程解說）" },
      { id: "8Ue5WQGP6S4", title: "初學者適用！正當獲得2個海利亞盾的方法大公開！" },
      { id: "00N40ZXRSRw", title: "58秒示範「無限礦石獲得法」流程(Infinite Ore Method)" },
      { id: "N9gqAwdA7G8", title: "初學者的夢魘：「使其停止方為上策/以靜制動」DLC神廟安全解法" },
      { id: "9WWn9T660a0", title: "10個「曠野新手」和「曠野老手」的差異（Top 10 Differences between a BoTW Beginner & Veteran）" },
      { id: "rv8b5ltFuW8", title: "再10個「曠野新手」和「曠野老手」的差異（10 Differences AGAIN between a BoTW Beginner & Veteran）" },
    ],
  },

  "botw-11": {
    intro: "分解操作到按鍵層級的指法解說系列。每集聚焦在單一技術，慢動作示範操作與按鈕的時機。適合想把特定技巧練得更穩定、或想不知道為什麼某個操作會失敗的玩家。",
    videos: [
      { id: "qxRxWDyohMI", title: "指法01 - 強制子彈時間／完美達爾克爾突擊（PDR）" },
      { id: "2Q_KbMJ1d6Q", title: "指法02 - 烏魯波薩炸彈盾反（UBP）" },
      { id: "zmz4dSZybRA", title: "指法03 - 盾擋重置與二段跳射箭（SBR）" },
      { id: "AvS1nBtXidk", title: "指法04 - 卸盾垂直炸彈跳（S.R. VBJ）" },
      { id: "CL1bppn6Zeg", title: "指法05 - 雙彈盾反（2 Bomb Parry）" },
      { id: "y9xzZtNvbE8", title: "指法06 - 炸箭盾反（Bomb Arrow Parry）" },
      { id: "Vt-NhxATWcA", title: "指法07 - 無限襲步／馬的體力重置法（Infinite Horse Stamina）" },
      { id: "xcybVn2tCs0", title: "指法08 - 跳炸迴避（Bomb Dodge Jump）" },
      { id: "PElLfMZX1Fs", title: "指法09 - 爆頭炸彈盾反（Headshot Bomb Parry）" },
      { id: "7zs5Vt8Xoa4", title: "指法10 -「二段式強制子彈時間（Shield Block Reset + Perfect Daruk Rush）」" },
      { id: "EYYCye4Qfak", title: "指法11 - 擊上風彈（Vertical Windbomb, 撃ち上げウインドボム）" },
      { id: "x5HAWCtBhoE", title: "指法12 - 天跳（Skyjump, スカイジャンプ）" },
      { id: "llbIv0QoWbk", title: "指法13 - 側盾跳穿牆（ISPC, Instant Shield Pull Clip）" },
      { id: "jOofy1OH9M0", title: "指法14 - 光弓繼承的前置動作！「回憶儲存(Memory Storage)」" },
      { id: "gva5ZCkuRlE", title: "指法15 -「跳馬盾擋」與「落馬閃擊」(Jump-off Shield Block & Thunderclap Rush, 簡易說明)" },
      { id: "PlakwPcfJjM", title: "指法16 -「風彈」與「導向風彈」(Windbomb & Directional Windbomb)" },
      { id: "meteDHOBaTQ", title: "指法17 -「天滑｜手持炸彈版」(Bow Lift Smuggling Slide with a Bomb) (Ver.1.6.0以下限定）" },
      { id: "KlBJPZ8LoGA", title: "指法18 - 不需月步！「連續蹬牆跳（Wall Jump Chain）」" },
    ],
  },

  "botw-13": {
    videoFolder: "botw-equipment duplication",
    principleItems: [
      "觸發__選單過載__或是__座標偏移造成裝備來不及加載__的時候切換裝備，會讓選單和實際裝備不同步，此時將脫離同步、實際裝備在身上的武器、弓、盾牌與林克分離（掛牆壁、受電擊、投擲等等）就能增殖道具。",
    ],
    methods: [
      {
        tab: "選單過載",
        name: "落弓過載法（Multi-shot Bow Overload）",
        video: "落弓過載法.mp4",
        steps: [
          "準備 4 ～ 7 把多發弓（如獸神弓、二連弓）以及 1 發以上的電箭",
          "裝備多連弓與電箭，並輕點 ZR 將弓拿到前面",
          "打開選單，丟棄裝備中的多發弓",
          "切換另一把多發弓後關閉暫停",
          "確認多發弓和電箭模型有確實顯現",
          "重複步驟 3～5",
          "暫停畫面的林克模型出現異常時，切換裝備",
          "確認選單和實際裝備不同步時，掛在家裡、投擲丟棄、電擊掉切換的裝備",
        ],
      },
      {
        tab: "裝備未加載",
        video: "未加載複製法.mp4",
        sections: [
          {
            title: "盾跳馬複製法（Shield Jump Dismount Duplication）",
            steps: [
              "在馬的前方準備一個高台，高台高度約為林克騎馬時的高度高一點",
              "騎上馬後，移動至前後腳呈現前低後高的狀態",
              "按住 ZL + A，接著按 X 從馬上踩盾跳",
              "踩盾跳後盾牌落在高台上，林克開始逆時針旋轉，方向正對大約__ 8 點半方向__時卸盾，將觸發高程座標錯亂",
              "系統尚未將武器讀取完成時，投擲武器、或舉盾/弓時受電擊後，馬上切換該類型的裝備",
            ],
          },
          {
            title: "馬滑複製法（Horse Slide Duplication）",
            steps: [
              "馬放在前低後高的斜坡上，按住 ZL 從側邊往前按 X 跳上馬",
              "筆直地往前跑一段距離，直到馬的精力用完的瞬間按下跳躍鍵",
              "跳下馬的瞬間，馬上按住 R 鍵後再快速放開",
              "武器丟出去後，立刻按十字鍵▶︎切換武器",
            ],
          },
        ],
        note: "※ 馬滑複製法時機不好抓，也可以利用「快速選單」來抓幀。",
      },
    ],
    notes: [
      { text: "NS2版落弓過載法在步驟 7 出現模型異常時，須先關閉暫停，點擊 B → ZR 釋放負載，再執行步驟 7 ～ 8 才能確實過載。" },
      { text: "落弓過載法若弓數不足，把法杖、章魚氣球丟在地上，也能增加選單的負載量。" },
      { text: "由於多發弓的過載在最後一次丟棄時，無法正常切換到單發弓來複製。因此單發弓的複製法可以借用法杖、章魚氣球來新增最後一次的負載，並且可以掛在家裡來避免用被電的方式複製裝備。" },
      { text: "其餘也有其他複製法，可以參考相關影片。" },
    ],
    videos: [
      { id: "cHtxD-IQ_OQ", title: "番外13.5 - 武器複製/耐久移植和維修！「落弓過載法(Multi-Shot Bow Method)」（適用：~ver.1.9.0）", desc: "最常使用的複製方法和選單過載法！" },
      { id: "pnUMPB2kyvk", title: "番外13 - 魔物觸發的「電箭過載法」", desc: "最早被發現的複製武器盾牌法！" },
      { id: "YxPHU-FFeto", title: "番外25 - 手骨武器複製法（Weapon Duplication with a Skeleton Arm）" },
      { id: "8ujsCX4GQMQ", title: "回應08 -「手骨複製法」補充（Other Tips of Bone Arm Weapon Duplication）" },
      { id: "pi2w0KLnO1U", title: "EX03 - 缺武器？初學者也能複製魔物手上的武器！（初學者適用）" },
      { id: "VSOgkio5Ojw", title: "番外32 - (NS1限定)不需人馬弓複製劍/盾/弓！「盾跳馬複製法(Shield Jump Dismount Duplication)」" },
      { id: "n4895SGurGs", title: "「雙弓過載法」- 2把多發弓就能複製武器！？(NS2版必須地上已經有部分落弓過載)" },
      { id: "erkGAtF2QnY", title: "番外36.5 - (NS1限定)下了初始台地就能複製武器！「馬滑武器複製法(Horse Slide Duplication)」" },
    ],
  },

  "botw-14": {
    intro: "觀眾在留言或社群中提出的疑問，以影片形式逐一回答。內容橫跨各種技巧、神廟、任務，問題形式多樣。",
    videos: [
      { id: "yoQ_Gywq7Qs", title: "回應01「沃托里漁村的克洛格」該怎麼解？" },
      { id: "khj7UDxoFIA", title: "回應02 該怎麼穿越「迷途森林」？" },
      { id: "Au6TMo0H_sE", title: "回應03「扭曲」的儲存法（Skew Storage）" },
      { id: "GwboKzvPWNs", title: "回應04 這是什麼「子彈時間／突擊」？" },
      { id: "E3kvoR9Us6Y", title: "回應05「瓦希・遼科神廟」旁的克洛格該怎麼解？" },
      { id: "95ZeIyckScw", title: "回應06(new) - 22個冷知識與小技巧（22 Trivia & Tips）" },
      { id: "9AM19fJ7mSo", title: "回應07「劍之考驗(ToTS)」的穿牆重點講解（人聲解說）" },
      { id: "8ujsCX4GQMQ", title: "回應08「手骨複製法」補充（Other Tips of Bone Arm Weapon Duplication）" },
      { id: "3sl8_BCRiQg", title: "回應09「增殖的心心精力上哪去了？」- 失敗的原因和其他問題（中文解說）" },
      { id: "O-dCDmzOPk0", title: "回應10「BTB好難，到底該怎麼飛？」- 5分鐘學會BTB（有聲解說）" },
      { id: "4bPY98FmdXQ", title: "回應11 - 盾跳穿不了牆？教你「進階穿牆法（ESC/ISC/RSC/SPC）」！" },
      { id: "0YQGhRosZWw", title: "回應12 - 一擊必殺最終Boss！「過場傷害(Damage During Cutscene)」（有聲解說）" },
      { id: "pHRRwj1bFRM", title: "回應13 -「風彈」的各種形式（Windbomb Setups）" },
      { id: "0QLD2ghh3gg", title: "回應14 - 最強防護罩！「環繞型衛星迴力鏢（Circling/Satellite Boomerangs）」" },
      { id: "x3BFyllrlSU", title: "你知道「大師劍的耐久度」到底是多少嗎？（短片解說）" },
      { id: "lsoCKhfkNG4", title: "回應15 - 玩500小時也未必知道的事(Might not know even if playing over 500 hours)" },
      { id: "8PQyyKXQBrM", title: "回應16(番外48前導) - 程錯檔中死亡的旗標繼承(Flag Transfer after Dying in the No-Save File)" },
      { id: "BfzKKYbufws", title: "回應17 - 對人馬％％％！「超級狀態過載(Papapa by Super Menu Overload)」" },
      { id: "kqB25V83tYE", title: "回應18 - 危險！不要當低頭族！「希卡石鎖（Slate Lock）」(程錯解說)" },
      { id: "wXCd6NzsvqM", title: "回應19 - 寶可夢入侵！「烈焰馬與寒冰馬」(Rapidash and Snow Horse)" },
      { id: "96QrIaDLJj8", title: "回應20 - 怕當機？絕不失敗的「無限古代素材」！(「完成度100%速通」路線使用)" },
      { id: "l5l70AaGxCg", title: "回應21 - 8秒內解決黃金人馬！「騎乘擊點殘留(Permanent Active Hitbox on a Horse/Zero Cycle)」" },
      { id: "vGKFz0Gke2Y", title: "回應22 - 1000小時也未必知道的玩法！（Still Didn't Know until 1000 Hours Play Time）" },
      { id: "hJUXuiik_ek", title: "回應23 - 1500小時也未必知道的30種玩法！（Still Didn't Know until 1500 Hours Play Time (2)）" },
      { id: "8gj_qXCXme8", title: "回應24 - 為什麼要這樣呢？觀眾經常感到困惑的10個動作細節解說（Top 10 Puzzled Details of Action）" },
      { id: "cPfCNO1c4tM", title: "回應25 - ＜流氓 × 猩猩 × 優雅＞ 林克的3種特殊姿勢！" },
      { id: "SFD98gxTevk", title: "回應26 - 突破天際！炸向30000公尺高的海拉魯宇宙！(Hyrule Outer Space)" },
      { id: "AafoAXELEZA", title: "回應27 - 不再只能遠望！飛到「西方高原(West Plateau)」！(Ver.1.6.0以下限定）" },
      { id: "G-5C_Z4CNh4", title: "回應28 -「零耐久移植」&「手持視窗殘留(Residual Hold Prompt)」（舊方法 - 新方法詳見「同位操作」）" },
      { id: "RMkXbRgf4NQ", title: "回應29 - 聖經級《轉存格(IST)》原理動態詳解｜你的問題解答都在這裡！（IST Guidebook Video）" },
      { id: "TFUlaJAya-A", title: "回應30 - 一次盾跳三樓高？「阿庫亞扭彈(Aqua Bounce, Enhanced Skew Bounce, ESB)」(中文語音解說)" },
      { id: "KAIneT70j2g", title: "回應31 - 怎麼觸發「鬥技場2隻人馬」呢？跳過原理按照步驟說明也能成功！（Guide for 2 Lynels in Coliseum Ruins）" },
    ],
  },

  "botw-16": {
    intro: "和海外玩家合作，以微電影的手法呈現的戰鬥合輯，包含「The Four」與「Will of the Sword」兩部作品。純欣賞性質，展示《曠野之息》戰鬥系統在極限操作下的美學呈現。",
    videos: [
      { id: "UJRURurOp3M", title: "「The Four」：曠野之息戰鬥合輯微電影 - 預告(BoTW Combat Montage Trailer)", desc: "Trailer of The Four（預告片）" },
      { id: "QIzqy4KVY6c", title: "「The Four」：曠野之息戰鬥合輯微電影(BoTW Cinematic Combat Montage)", desc: "RinHara5aki、Kleric、Peco、Yuda 曠野界首度跨國合作的戰鬥微電影" },
      { id: "2Aa60Q0vBxE", title: "『Will of the Sword』：曠野之息 - 戰鬥合輯微電影｜預告", desc: "Trailer of Will of the Sword（預告片）" },
      { id: "twOHhBIR1bY", title: "Will Of The Sword - BOTW Cinematic Combat Montage", desc: "Firefly、Jhent、Shibainu、RinHara5aki、A.xk、Kleric、Breneko、Yuda 多位戰鬥玩家攜手合作的戰鬥微電影" },
    ],
  },

  "botw-17": {
    videoFolder: "botw-active rush",
    methods: [
      {
        tab: "DR",
        name: "(完美)達爾克爾突擊（(Perfect) Daruk Rush）",
        video: "DR.mp4",
        steps: [
          "開啟達爾克爾的守護，按住 ZL 啟動守護，並且__鎖定到對象__",
          {
            text: "受到攻擊觸發「達爾克爾的守護（破開或完美彈反）」的慢動作期間，做出「迴避跳（「ZL+X+→/←/↓」）」",
            sub: [
              "・一般可以分做「先迴避跳再空中觸發守護」或「先觸發守護再迴避跳」，前者較常見。",
              "(1) 空中觸發：刻意做出「迴避跳」，並且尚未落地前觸發「達爾克爾的守護」（特殊例：追擊型達爾克爾突擊 LDR）",
              "(2) 子時觸發：刻意先觸發「達爾克爾的守護」，子彈時間期間做出「迴避跳」（特殊例：淺灘突擊 SDR）",
            ],
          },
          "落地前點擊 Y 觸發落地突擊",
          "落地時出現「突擊 Y」判定時，按住 ZL 的情形下連打 Y",
        ],
      },
      {
        tab: "TCR",
        name: "閃擊（Thunderclap Rush）",
        video: "TCR.mp4",
        steps: [
          "未觸發過盾反、完美迴避的情形下，從地勢較高處往低處做出「迴避跳（ZL+X+→/←/↓）」",
          "一定高度以上，保持按住 ZL 同時按下 ZR + Y",
          "落地時出現「突擊 Y」判定時，按住 ZL 的情形下連打 Y",
        ],
        note: [
          "※ 閃擊的追擊(Chase)條件：進入過一次「能觸發完美迴避」的攻擊範圍內（包含受傷、盾擋），期間不能再觸發盾反或完美迴避",
          "※ 拿出武器的情形下出現水平拉弓的情形時，點擊 B 或 R 可以解除子彈時間",
          "※ 先點擊 ZR 進入子彈時間，按 R 瞬間同時按下 ZR + Y，可以藉由投擲動作來做「閃擊轉換」，從一般拉弓轉成閃擊的拉弓",
        ],
      },
      {
        tab: "ATR",
        name: "絕對閃擊（Absolute Thunderclap Rush）",
        video: "ATR.mp4",
        steps: [
          "開啟達爾克爾的守護",
          "在空中按住 ZL，點擊 ZR 拉弓進入子彈時間",
          "在子彈時間期間受到攻擊觸發「達爾克爾的守護（破開或完美彈反）」",
          "執行「閃擊(TCR)」步驟 1～3 的操作",
        ],
      },
      {
        tab: "QFR",
        name: "快速突擊（Quick Flurry Rush）",
        video: "QFR.mp4",
        bullets: [
          "・物理型：舉炸彈之後__後跳__進行完美迴避 → 連打 Y 突擊",
          "・系統型：執行一次「無鎖定的不完全跳躍」後，__側跳__進行完美迴避 → 連打 Y 突擊",
          "・護盾型：ZL 鎖定目標，落地前才觸發達爾克爾守護，且在慢動作判定期間落地 → 連打 Y 突擊（即 LDR）",
        ],
        note: "※ 細節請參考下方相關連結的「番外28 - 快速突擊（Quick Rush）」",
      },
    ],
    principleSections: [
      {
        text: "正常的「突擊(Flurry Rush)」，是部分種類的傷害接近林克時，林克做出「迴避跳（ZL+X+→/←/↓）」就能「完美迴避」，並且在成功完美迴避時的子彈時間內觸發突擊。而在達爾克爾的守護破開或完美守護、空中 ZR 拉弓等等的子彈時間內做出能觸發完美迴避的「迴避跳（ZL+X+→/←/↓）」，也可以主動觸發突擊。",
      },
      {
        title: "閃擊（Thunderclap Rush）",
        collapsible: true,
        text: "2020/02/11 【GoldheartOdyssey】 玩家發現主動進入子彈時間並突擊的觸發方式，最初被命名為地下樂團的名稱不易理解技巧內容，因此 【Yuda】、【RinHara5aki】 仿《鬼滅之刃》「霹靂一閃」的技能名稱，將其命名為「閃擊（Thunderclap Rush）」。而後 【LegendofLinkk】、【surasura】 確認穩定觸發的方式、追擊條件。2020/06/16 【OVERSKY】 & 【IVEO】 配合達爾克爾的技能，發現能夠追擊守護者的「絕對閃擊（ATR, Absolute Thunderclap Rush）」。",
      },
      {
        title: "達爾克爾突擊（Daruk Rush）",
        collapsible: true,
        text: "2018 年初 【Kico】、【Yuda】 相繼在意外在戰鬥時發現消耗達爾克爾時，意外進入子彈時間而發展出第一個主動突擊的方法。搭配 【RinHara5aki】 發現的無盾反(DPP)，可完全無消耗地觸發「完美達爾克爾突擊（Perfect Daruk Rush）」。",
      },
    ],
    notes: [
      {
        text: "若沒有鎖定目標，落地出現「突擊 Y」判定時會無法啟動突擊。__左搖桿繞一圈點打 Y__或__直接連打 A__可以觸發不需要鎖定的突擊（不穩定）。",
      },
      {
        text: "「雙手武器」側跳的達爾克爾突擊，在空中必須只輸入一次 Y，落地按住 ZL 連打 Y 就好。若在空中就連打 Y，會被一般攻擊取代，不會觸發突擊。",
      },
      {
        text: "「盾反後的瞬間切換裝備解除盾反的特效」，或「林克前面放炸彈，若魔物先攻擊到炸彈才擊中林克」，這種情形下的盾反不會解除閃擊的追擊判定。",
      },
    ],
    videos: [
      {
        id: "ewnlB6jK7M8",
        title: "番外04(新) - 原來不只有「完美迴避的突擊」？Yuda教你所有「進階突擊(Advanced Flurry Rush, TCR/PDR/ATR)」",
        desc: "最完整的「主動式突擊（Active Flurry Rush）」教學！",
      },
      {
        id: "JsMFQVpUJcI",
        title: "番外04(補) - 極限距離的超遠突擊！「無鎖定突擊」與「雙手武器的側跳PDR」（中文解說）",
      },
      {
        id: "pZWqxIHxweA",
        title: "番外45 - 當英傑學會飛雷神之術！「閃擊(Thunderclap Rush)」（非詳盡解說）",
        desc: "最早的「閃擊（Thunderclap Rush）」教學！",
      },
      {
        id: "voH5iBOR5kk",
        title: "番外45.5(進階) - 騎完人馬後的飛雷神！「落馬閃擊(Jump-off Thunderclap Rush)」",
      },
      {
        id: "gva5ZCkuRlE",
        title: "指法15 -「跳馬盾擋」與「落馬閃擊」(Jump-off Shield Block & Thunderclap Rush, 簡易說明)",
      },
      {
        id: "BZtJ2BzjkDw",
        title: "番外28 -「快速突擊（Quick Rush）」（中文解說）",
      },
      {
        id: "O8afIFdhb18",
        title: "番外22 自燃火把／完美盾擋重置(DSBR)／烏魯波薩突擊(Urbosa Rush)（補充教學）",
      },
      {
        id: "7zs5Vt8Xoa4",
        title: "指法10「二段式強制子彈時間（Shield Block Reset + Perfect Daruk Rush）」",
      },
      {
        id: "qxRxWDyohMI",
        title: "指法01 強制子彈時間／完美達爾克爾突擊（PDR）",
      },
      {
        id: "mK-hlDjgfjs",
        title: "番外04 強制子彈時間(Daruk Rush / 強制ダルケルラッシュ)",
      },
      {
        id: "WJhWim4S-KI",
        title: "28 遊戲攻略技巧（五）- Advanced Techniques（中文解說）",
      },
    ],
  },

  "botw-19": {
    videoFolder: "botw-btb",
    principle:
      "2018/4~11月由 【柿子】（偷襲版）、【性冷淡の泰迪】（最早）、【のっぺさん】（廣傳）相繼發現魔物的布偶狀態和踩盾跳有著能讓林克彈飛的功能。林克在踩盾跳的時候會是一個輕物件的狀態模型，當魔物失去平衡呈現布偶狀態時會有一個反作用力把東西彈開，而子彈時間是正常時間的1/20，在子彈時間內踩盾跳與發生布偶狀態的魔物產生碰撞時，彈開的反作用力和動量會按照正常時間做計算，在子彈時間內按照時間比例將 20 倍的力量回推回正常的物理狀態。若玩家在發生初始極大動量的情形下解除子彈時間，就可以在正常時間下獲得近 20 倍的反作用力，即「__子時動量增幅（BTMA, Bullet Time Momentum Amplification）__」。",
    methods: [
      {
        tab: "BTB",
        name: "子彈時間彈翔 / 踩怪飛（Bullet Time Bounce）",
        tags: ["All Versions"],
        video: "BTB.mp4",
        steps: [
          "將三類小魔物（波克布林、蜥蜴戰士、莫力布林）結凍",
          "踩盾跳落在結凍的魔物上",
          "破冰後按 B（收弓）、Y（旋盾）或十字鍵卸掉弓箭，就可以釋放該 20 倍的反彈動量",
        ],
        note: [
          "※ 紅色波克布林不需要結凍，踩盾跳擊中會直接呈現布偶狀態。",
          "※ 不結凍，用靜止器靜止後給予傷害，等待靜止快結束的時候踩盾跳接觸魔物，魔物解開靜止的瞬間呈現布偶狀態時也能將林克彈飛。",
        ],
      },
    ],
    notes: [
      { text: "除了三類小魔物外也是有能夠 BTB 的魔物，但穩定性沒有這三者來得高。" },
      { text: "踩盾跳落在西諾克斯會起來的路徑上，進入子彈時間時射他眼睛，他一瞬間起來的動量撞擊踩盾跳的林克也能觸發 BTB。" },
    ],
    videos: [
      { id: "BdhXkiT6ri8", title: "技巧33 -「子時彈翔(BTB)」與「子時動量增幅(BTMA)」" },
      { id: "O-dCDmzOPk0", title: "回應10 -「BTB好難，到底該怎麼飛？」5分鐘學會BTB" },
      { id: "z_3QuSgUc1g", title: "只要有水有機車就能飛！冰柱機車擊飛（Cryonis Master-Cycle Launch, 不廢話系列）", desc: "Switch 2 Edition 版效能提升的關係無法使用。" },
    ],
  },

  "botw-20": {
    videoFolder: "botw-blss",
    principleSections: [
      {
        text: "2021/08 【びりかんてん】玩家研究不少黏手、黏物等 Smuggle 相關的程錯，於 2021/09/04 【LegendofLink】發現物品黏弓配合弓鎖會讓林克漂浮在空中，經過不少研究之後被應用於速通（Speedrun）。",
      },
      {
        title: "分離的上下半身的機制",
        collapsible: true,
        text: "遊戲的「動作狀態機制（Animation State/Layer）」，林克模組的上半身和下半身是分開的物理行為，通常都會同步運作。當玩家在「黏弓（Bow Smuggle）」的過程中，放下可舉物品的瞬間卸掉盾牌，會導致「弓鎖（Bow Lock, B-Lock）」這個動作會卡住林克上半身的動作。當林克接近要上樓的地形，嘗試要做出「跨步（Step-up）」的動作時，下半身會發出指令要求上半身一起配合動作，但因為上半身被弓鎖卡住，導致整個人物的動畫狀態被卡在一個跨步，卻又未完成這個動作的狀態。",
      },
      {
        title: "浮空與滑行",
        collapsible: true,
        text: "Ver.1.6.0 以下遊戲的「物理演算（Physics Rate）」和「幀率（Framerate）」是同步連結的。在林克「跳躍（Jump）」「跨步（Step-up）」會暫時關閉林克身上的垂直落下判定，即「重力（Gravity）」。跨步給了林克前進和上升的動量，但是因為動畫行為尚未完成，遊戲未將「重力」還給林克，只要該狀態下就會導致林克浮在空中滑行。",
      },
      {
        title: "1.8.0版以後",
        collapsible: true,
        text: "Ver.1.8.0 任天堂配合 Switch 2 向下相容與效能優化，間接修正並讓「幀率」和「物理演算」脫鉤（Desync），除非手持曠野唯一黏手會有碰撞判定的裝備「神聖必殺劍（Holy cOHO）」，水平動量的演算不再受該幀率判定的動畫狀態影響。",
      },
    ],
    methods: [
      {
        tab: "BLSS",
        name: "天滑（Bow Lift Smuggle Slide）",
        video: "BLSS.mp4",
        tags: ["～Ver.1.6.0"],
        intro: "適合：～Ver.1.6.0",
        steps: [
          "裝備弓箭和盾牌，按住 ZL 舉盾",
          "移動到可以舉起（如：炸彈、石頭）的物品前，顯示「手持」判定",
          "按下 ZR 後快速按 A，林克拿著弓箭把物品舉起",
          "按 X 跳起來",
          "在空中按 B 後瞬間按 + 號暫停，確認暫停背景林克將物品手持於右側",
          "卸掉盾牌後關閉暫停",
          "按住 ZR（可按 B 取消拉弓），將物品移到右手",
          "移動時按住 B 走到階梯或稍微比較高的斷層觸發上樓動作",
          "開始浮空後背對前進方向左搖桿快速左右撥動可高速前進",
        ],
      },
    ],
    notes: [
      { text: "天滑過程中 B 鍵不能放開，放開就會解除浮空。" },
      { text: "箭數為 0 時的天滑為「零矢天滑」，物理推擠判定只有半邊，移動時搖桿必須要用繞的。" },
    ],
    videos: [
      { id: "_cKZUrVLQTs", title: "番外49 - 走累了乾脆不走了！「天滑(BLSS)」相關操作詳解！", desc: "Ver.1.6.0 以下限定" },
      { id: "meteDHOBaTQ", title: "指法17 -「天滑｜手持炸彈版」(Bow Lift Smuggling Slide with a Bomb)", desc: "Ver.1.6.0 以下限定" },
      { id: "jiwz7ztQJLs", title: "為什麼不用跳就能黏手？1分鐘分解「無跳天滑(Jumpless BLSS)」！", desc: "Ver.1.6.0 以下限定" },
    ],
  },

  "botw-21": {
    videoFolder: "botw-endlag cancel",
    principle: "盾反、投擲、高空落地攻擊、後空翻等等__後硬直（Endlag）__較長，會讓林克比較有破綻，硬直期間林克比較沒有防備，可以靠一些內建操作來取消掉這些硬直。",
    methods: [
      {
        tab: "Swap",
        video: "Swap Cancel.mp4",
        sections: [
          {
            title: "切換取消（Swap / Switch Cancel）",
            tags: ["All Versions"],
            steps: ["盾反成功判定或是投擲動作發生後，切換武器或盾牌"],
          },
        ],
      },
      {
        tab: "Crouch",
        video: "Crouch Cancel.mp4",
        sections: [
          {
            title: "蹲下取消（Crouch Cancel）",
            tags: ["All Versions"],
            steps: ["盾反成功判定或是投擲動作發生後，左搖桿按下蹲下"],
            note: "※ 通常會連續按兩次恢復站立姿態，但較傷左搖桿。",
          },
        ],
      },
      {
        tab: "Jump",
        video: "Jump Cancel.mp4",
        sections: [
          {
            title: "跳躍取消（Jump Cancel）",
            tags: ["All Versions"],
            steps: ["按 Y 或按住 Y，攻擊過程或結束時，在硬直期間按下 X 跳"],
            note: "※ X 和 B 有設定切換時按 B。",
          },
        ],
      },
      {
        tab: "Item Hold",
        video: "Item Hold Cancel.mp4",
        sections: [
          {
            title: "持物取消（Item Hold Cancel）",
            tags: ["All Versions"],
            steps: [
              "空中攻擊落地硬直期間，或突擊（Flurry Rush）結束時的硬直期間，暫停手持物品",
              "按 B 取消手持",
            ],
          },
        ],
      },
      {
        tab: "Turnaround",
        video: "Landing Cancel.mp4",
        sections: [
          {
            title: "轉身取消（Turnaround Cancel / Quick Backflip）",
            tags: ["All Versions"],
            steps: [
              "按住 ZL + 左搖桿往▼ + 輸入 X，執行後空翻",
              "在空中放開 ZL，保持左搖桿往 ▼",
              "落地瞬間林克完全轉身前輸入 ZL + X",
            ],
            note: "※ 只是後空翻比較長使用，基本上鎖定跳（按住 ZL 的跳躍）都可以。",
          },
        ],
      },
      {
        tab: "Stasis",
        video: "Stasis Cancel.mp4",
        sections: [
          {
            title: "靜止取消（Stasis Cancel）",
            tags: ["All Versions"],
            steps: [
              "希卡道具選到靜止器",
              "按住 ZR 放開射箭",
              "射箭瞬間按 L 再按 A 靜止",
            ],
          },
        ],
      },
    ],
    notes: [
      { text: "可以用在「衛星迴力鏢（Rotating Boomerang）」，迴力鏢向上投擲之後可以快速移動，讓迴力鏢產生迴轉。" },
    ],
    videos: [
      { id: "9d1ks1E_a3A", title: "番外00「災厄之路(The way to \"Calamity\")」- 戰鬥技巧詳解", at: 207 },
      { id: "cgqAOlvubVQ", title: "EX01 -「從初學者畢業的13堂技巧課」 - 遊戲攻略技巧精華（人聲解說）" },
      { id: "0RlLTe3FRvE", title: "番外14 布偶程錯／布偶跳與無硬直後空翻（Ragdoll Glitch／Ragdoll Jump／Quick Backflips）" },
      { id: "CTycsi72RlE", title: "番外12 瞬盾翔(PDPL)／光劍硬直取消／盾擋重置(SBR)應用（示範短片）" },
    ],
  },

  "botw-22": {
    showEmptyMedia: true,
    methods: [
      {
        tab: "Menu",
        sections: [
          {
            title: "選單過載（Menu Overload）",
            tags: ["All Versions"],
            steps: [
              "裝備多發弓(2 發以上)，並裝備電箭",
              "點擊 ZR 將弓拿到林克前方",
              "暫停丟棄裝備中的多發弓，裝備另一把多發弓",
              "關閉暫停待電箭模型顯現",
              "重複步驟 3 ～ 4，直到下次打開暫停人物模組出現缺陷",
              "切換裝備後退出暫停，確認是否選單和實際裝備不同步(Desync)；或選單手持材料退出暫停時出現「選單手持（Hold Smuggle）」的現象，表示成功選單過載",
            ],
            note: [
              "※ 裝備或丟棄「屬性杖」、丟棄八爪怪氣球亦可增加負載。",
              "※ 裝備不同步的情形下投擲、電擊、放在家裡的裝備框上可以複製裝備。",
            ],
          },
        ],
      },
      {
        tab: "Environment",
        sections: [
          {
            title: "環境過載（Environment Overload）",
            tags: ["All Versions"],
            steps: [
              "利用[[選單過載|tab:Menu]]讓武器裝備不同步，重複投擲武器（或將電擊陷阱放置手持武器魔物的重生預設座標，重複消磨時間讓魔物回到原點電掉手上的武器）",
              "重複步驟 1 直到林克原地跳起來按 ZR 就能進入子彈時間",
            ],
            note: "※ 傷害判定、游泳判定都會消失，跳起來拉弓就能進入子彈時間。",
          },
        ],
      },
      {
        tab: "SEO",
        sections: [
          {
            title: "超級環境過載（Super Environment Overload）",
            tags: ["All Versions"],
            steps: [
              "利用[[選單過載|tab:Menu]]重複投擲非屬性的武器（建議有綁帶的近衛武器）",
              "重複步驟 1 約 600 ± 50 支，直到丟出去的武器變成透明後，再多丟 6 ～ 12 把武器",
              "把觸發選單過載的弓箭撿起來",
            ],
            note: "※ 引誘魔物到過載的區域，如人馬，人馬在使用大爆炸時會發現爆炸未發生而固定不動。此時在他身旁讓武器裝備不同步下丟在他身上，重複幾十次後，故意卸掉武器、盾牌等等裝備降低負載量，此時爆炸和投擲的武器會顯現，進而達到一口氣出現所有投擲的爆擊傷害。",
          },
        ],
      },
      {
        tab: "Curse",
        name: "災禍（Curse）",
        sections: [
          {
            title: "西諾克斯災禍（Hinox's Curse）",
            tags: ["～Ver.1.6.0"],
            steps: [
              "將(骷髏)西諾克斯引導戰鬥判定範圍的邊界（林克超出邊界會失去敵意回到原位）",
              "磁吸鐵製武器或寶箱將其引出戰區",
              "讓(骷髏)西諾克斯接觸瀑布，直到他浮空消失為止",
            ],
            note: "※ 效果同「蜥蜴災禍（Lizalfo's Curse）」，但很少玩家有 Ver.1.5.0 故省略。",
          },
          {
            title: "迴力鏢災禍（Boomerang Curse）",
            tags: ["All Versions"],
            steps: [
              "利用[[選單過載|tab:Menu]]重複投擲武器（建議雷屬性武器丟到水裡），直到發生[[環境過載|tab:Environment]]",
              "武器切換成迴力鏢，走到水裡面投擲迴力鏢，讓迴力鏢接觸附近牆壁",
            ],
            note: [
              "※ 通常會找卓拉領地西南邊的西諾克斯(Hinox)，以及雙子驛站南方的骷髏西諾克斯 (Stalnox)。",
              "※ 觸發災禍當下周圍的可移動物件都會感染災禍，離開一段距離災禍部分效果會漸漸消失，可以靠移動在災禍區內的寶箱、炸彈，將災禍效果帶離災禍發生地點。",
              "※ 當下周圍環境會開始嚴重延遲，將災禍道具接觸地圖物件（如：神廟），可將其拆除解體。",
            ],
          },
          {
            title: "營火災禍（Campfire Curse）",
            tags: ["All Versions"],
            steps: [
              "在大妖精的水池上建立一個冰柱",
              "在冰柱上放置 5 個木柴，並將其點燃為營火堆",
              "重複步驟 2 直到冰柱上有 20 個木柴",
              "解除冰柱讓 20 個木柴同時掉入水裡",
              "走進水裡投擲迴力鏢，讓迴力鏢接觸水中的牆壁",
              "想辦法離開水池，重複拿出炸彈丟出去將災禍帶離大妖精池可延續災禍",
            ],
            note: "※ 在林克家裡角落製造 20 個火堆也會有短暫的災禍現象。",
          },
        ],
      },
    ],
    principle:
      "最早由 Reddit 上的玩家 【versat13】 在地圖最西南端的魔物基地，將多發弓給會射電箭的魔物後，當他們同時射出電箭時，過多的電箭讓畫面產生過多特效進而觸發選單的過載現象。2019/11/27 【Kleric】 玩家則是利用重複電擊手持法杖的魔物，地圖出現 25 把以上的火杖也能觸發選單過載。2019/12/5 【のほほほほ】 等玩家於 日本 Discord 提出裝備電箭丟出多把多發弓亦可觸發選單過載，也是目前為止最方便的選單過載法。",
    notes: [
      { text: "選單過載（Menu Overload）有分做「淺過載」與「深過載」，明顯的差異是「淺過載(半過載)」第一次切換裝備會不同步，但是第二次後會成功同步；「深過載(全過載)」則是無論怎麼切換都無法同步。" },
      { text: "超級環境過載（SEO）要注意不能超過 700 件武器，遊戲容易無法負荷而當機。" },
    ],
    videos: [
      { id: "4gEYuQ5uQLk", title: "番外13.5+29.5 - 解DLC必殺之劍不用1滴血？強制丟棄大師劍？「半過載狀態拿必殺之劍（Pick up OhO in Semi-Overload State）」！" },
      { id: "n4895SGurGs", title: "「雙弓過載法」- 2把多發弓就能複製武器！？（Only on Switch 1, Duplicate Weapons with Only 2 Multi-Shot Bows!?）", desc: "Nintendo Switch 2 Edition 版效能提升，不太容易成功。" },
      { id: "cHtxD-IQ_OQ", title: "番外13.5 - 武器複製／耐久移植和維修！「落弓過載法（Multi-Shot Bow Method）」（最新1.9.0版適用）" },
      { id: "2t_0T05rlKk", title: "26秒示範「耐久度移植」流程（Short Tutorial about Durability Transfer）" },
      { id: "_oWY1m696h0", title: "28秒增殖武器流程簡易示範（BoTW: Short Tutorial about Weapon Duplication in 28 seconds）" },
      { id: "Cg4lFjZSCvw", title: "番外43 - 捨不得打加儂？試試「過載世界（Overloaded World）」吧！" },
      { id: "_TM2MjbcEPI", title: "西諾克斯災禍（Hinox's Curse）與奇行種林克" },
      { id: "95ZeIyckScw", title: "回應06(new)－22 個冷知識與小技巧" },
    ],
  },

  "botw-23": {
    methods: [
      {
        tab: "共通",
        steps: [
          "站在神廟電梯入口圓盤上面向外面按住 R",
          "左搖桿往左按 X 向左跳",
          "接觸牆壁的瞬間執行「__蹬牆跳（Fall Damage Cancel / 落下傷害取消）__」的操作，即__放開 R，投擲出去之前切換盾牌或武器__",
          "在一瞬間的落地判定按住 ZL 左搖桿往前按 X 向前鎖定跳",
          "依照以下方式離開神廟平台",
          "⋆ 連打 L 自炸把林克炸出平台",
          "⋆ 按住 ZL 在空中按 A 踩盾跳出去落地卸盾讓林克跌出平台",
          "⋆ 按住 ZL 在空中按 A 踩盾跳出去落地前按 X 再次跳起來開傘離開平台",
          "移動到另一個神廟的判定範圍後觸發電梯動畫",
        ],
        note: [
          "※ 步驟 1 ～ 5 在不穩定的地面上觸發電梯判定後用上升氣流也能離開平台。",
          "※ 若兩神廟判定範圍沒有重疊，必須按照節奏打開快速選單來避免選單查詢林克的真實座標（Pause Buffer），讓系統誤以為林克在神廟 B 時，人還在神廟 A 的電梯動畫判定範圍內，才有辦法重新觸發動畫。",
        ],
      },
    ],
    principleSections: [
      {
        text: "2019/12/31 【LegendofLinkk】 玩家利用模擬器確認神廟電梯的過場邏輯，而後用實際操作成功在神廟 A 進入神廟 B。",
      },
      {
        text: "SCW 利用儲存「進入神廟的過場動畫」，當林克離開原本神廟 A，並於另一座神廟 B 的進入判定範圍內落地，重新觸發原本儲存的過場動畫，藉著 A 的過場動畫進入 B 神廟的程錯。",
      },
      {
        title: "過場動畫的釋放條件",
        collapsible: true,
        items: [
          {
            text: "已儲存的神廟過場動畫，不會單純因為林克碰到地面就播放。必須同時滿足兩個條件：",
            sub: [
              "(1) 林克處於接地狀態",
              "(2) 原本神廟電梯的物理模型仍處於載入狀態",
            ],
          },
          "當兩個條件同時成立時，系統才會釋放並播放儲存中的神廟過場動畫。",
        ],
      },
      {
        title: "為什麼上升氣流會讓過場立即觸發？",
        collapsible: true,
        text: "營火或炸彈產生的上升氣流，會持續與附近的神廟電梯產生物理互動，使電梯的物理模型維持在載入狀態。因此，使用上升氣流儲存後，只要林克一落地，就同時滿足「接地」與「電梯物理模型已載入」這兩個條件，過場動畫便可能立即觸發。若用炸彈破壞營火、停止上升氣流，電梯與氣流之間的物理互動也會停止，電梯物理模型便可能卸載。此時即使林克在地面上移動，也不會立即釋放儲存的過場動畫。不過，轉動鏡頭直視原本的神廟電梯，或讓箭矢、武器、炸彈等物件持續與電梯產生碰撞，也可能重新讓電梯的物理模型載入，意外觸發過場。",
      },
      {
        title: "盾滑儲存與上升氣流儲存",
        collapsible: true,
        text: "盾滑與上升氣流只是建立過場動畫儲存的不同操作方式，並不是兩種不同的儲存狀態。著地後是否立即觸發，關鍵在於原本神廟電梯的物理模型是否仍被載入。上升氣流會透過持續的物理互動維持電梯載入，因此較容易在落地時立即觸發；盾滑儲存則可能因為物理模型已卸載，而暫時保留儲存狀態，讓林克可以離開原本神廟後再執行遠距離 SCW。",
      },
    ],
    notes: [
      { text: "離開原本神廟的物理非讀取(Unload)範圍後，應避免在途中觸地，否則可能重新滿足過場釋放條件。" },
      { text: "跨越山地或長距離移動時，需要在空中使用[[空中風彈|botw-01#空中]]維持高度。" },
      { text: "接近目標神廟時，可利用選單緩衝逐幀調整林克的位置（Pause Buffering）與慣性。" },
      { text: "最後必須讓林克在落地瞬間位於目標神廟的進入判定範圍內。" },
      { text: "落地時，遊戲會依照林克目前所在的位置重新判定神廟，讓原本儲存的過場動畫在目標神廟執行，形成 SCW。" },
    ],
    videos: [
      { id: "yJtjmIrvTvo", title: "番外46 - 無視任務闖入神廟！「近廟入侵(Shrine Coordinate Warp)」" },
    ],
  },

  "botw-24": {
    videoFolder: "botw-stasis reset",
    methods: [
      {
        tab: "SR",
        name: "重置靜止器（Stasis Reset）",
        video: "Stasis Reset.mp4",
        steps: [
          "靜止物體或魔物",
          "靜止解除後觀看回憶、打開寶箱、消磨時間（對魔物無法）",
        ],
      },
    ],
    principleSections: [
      {
        text: "2018/5 由 【Paradox_Gaming(Guardian)】 玩家發現靜止器可以重置並用在地圖移動上重複在空中飛行。希卡道具的冷卻時間可以由__觀看回憶__、觸發對話（消磨時間、開寶箱等）來重置。",
      },
    ],
    notes: [
      {
        text: "若靜止的是移動中的物體，解除靜止時物體仍會先發生 1 幀物體原有的動量之後才會釋放累積後的動量。因此如果是站在物體上面靜止擊飛，到最高點沒有向上慣性時再靜止，才不會被靜止解除後突然的向上動量給擊飛。",
      },
    ],
    videos: [
      { id: "K5JjZHBTC9c", title: "ED01 - NS2才入手的必看！絕對不能錯過的小知識（上）" },
      { id: "0A6dkkeEtQo", title: "EX02 - 初學者一定用得到的小技巧和小知識（中文解說）" },
      { id: "iCRbLZKrgrI", title: "技巧32 - 再也不想走路！「擊飛技巧(Launches)」全攻略" },
      { id: "FHMarfPxVhY", title: "技巧21 - 劍之試煉的 14 個攻略重點與技巧（大師模式・中文解說）" },
      { id: "VgLU1-nYBQc", title: "技巧29.5 重置靜止器「寶箱法」- 災厄Amiibo（中文解說）" },
      { id: "tDvHvBp3WpY", title: "技巧29 - 無限靜止！「重置靜止器(Stasis Resetting)」（中文解說）" },
    ],
  },

  "botw-25": {
    videoFolder: "botw-apparatus storage",
    methods: [
      {
        tab: "慢讀",
        name: "慢讀（Repause Loading）",
        video: "慢讀.mp4",
        tags: ["Ver.1.5.0+"],
        steps: [
          "希卡道具選到相機",
          "按住 ZL 舉盾、或 R 投擲動作、或按 ZR 把弓拿出來，同時按下 L + L3（左搖桿）",
          "靠近神廟的陀螺儀裝置會出現調查判定，按 A 調查",
          "儲存或刪除照片，視角拉回去之前暫停",
          "手持材料",
          "觀看回憶",
          "關閉暫停，旋轉搖桿確認前方陀螺儀裝置能夠被操控",
          "暫停，並讀取檔案",
        ],
        note: [
          "※ 如果要在神廟內移動，步驟 5 完成後，快速關開暫停（仍然還沒回到正常視角）。",
          "※ 步驟 7 若為可移動狀態時，會有「神廟內儲存」的效果（詳見「應用一覽」），直到再次開啟暫停或快速選單才會解除程錯。",
        ],
      },
      {
        tab: "快讀",
        name: "快讀（Direct Loading）",
        video: "快讀.mp4",
        tags: ["Ver.1.5.0+"],
        steps: [
          "希卡道具選到相機",
          "按住 ZL 舉盾、或 R 投擲動作、或按 ZR 把弓拿出來，同時按下 L + L3（左搖桿）",
          "靠近神廟的陀螺儀裝置會出現調查判定，按 A 調查",
          "儲存或刪除照片，視角拉回去之前暫停",
          "讀取檔案",
        ],
        note: "※ 步驟 5 讀取到裝置的存檔，再做一次快讀，則效果會延續到關閉遊戲為止。",
      },
    ],
    principle:
      "2019/3/22 【オカメいんこさん】的提出此程錯。用相機視角調查陀螺儀裝置，會延遲裝置鎖定林克的判定，在這時間差內手持物品可以讓林克移動、觀看回憶來固定林克的狀態。Zoom out 前讀檔只繼承部分物理／屬性狀態、Zoom out 後讀檔則完整繼承整個角色數值。",
    applications: {
      title: "應用一覽",
      intro:
        "裝置儲存衍生的效果分成兩類：程錯進行中（人還在神廟內）能享有的狀態，以及讀檔之後被帶到新存檔的繼承效果。後者依讀檔時機不同，快讀與慢讀能拿到的東西不完全一樣。",
      groups: [
        {
          title: "神廟內儲存",
          intro: "程錯進行中的效果，直到再次開啟暫停或快速選單才會解除。",
          items: [
            { name: "無落下判定", desc: "人物會繼續掉到深淵，直到解除程錯為止（讀檔會繼承落下判定）" },
            { name: "無限精力", desc: "精力耗盡仍然可以衝刺、空中拉弓子彈時間" },
            { name: "心心不會耗損", desc: "受到攻擊不會損血，但是一樣會有受傷的物理判定" },
            { name: "屬性效果免疫", desc: "林克不會燃燒、電擊、結凍影響" },
            { name: "武器可持續帶電", desc: "金屬武器接觸電擊陷阱，武器會帶電直到取消程錯" },
            { name: "冷卻時間暫停", desc: "料理時間、大師劍 / 英傑能力的冷卻時間會暫停" },
            { name: "A 判定凍結", desc: "按 A 的判定都會失效" },
          ],
        },
        {
          title: "讀檔後繼承",
          intro: "讀檔時機決定能繼承哪些狀態，四項共通效果兩種讀法都拿得到。",
          columns: ["快讀", "慢讀"],
          items: [
            { name: "屬性效果免疫", desc: "林克不會燃燒、電擊、結凍影響", marks: [true, true] },
            { name: "破傘狀態", desc: "重力效果被固定，開滑翔翼仍然會下墜", marks: [true, true] },
            { name: "體感溫度鎖定", desc: "溫度鎖定在神廟內，不會感到寒冷、炎熱", marks: [true, true] },
            {
              name: "錯誤傳送",
              desc: "讀檔到騎著動物的檔案之後傳送到地圖遠端，傳送後會從傳送的位置拉回當初騎乘位置，周圍會來不及加載，最早用於 3 心大師劍的拿法（現在為視角往上消磨時間連打 A 撿大師劍）",
              marks: [true, true],
            },
            { name: "料理效果降級", desc: "高等級料理效果會將成低等級", marks: [true, false] },
            { name: "回滿血量", desc: "心心會回滿", marks: [true, false] },
            { name: "大師劍冷卻狀態變化", desc: "大師劍的冷卻時間會有所變化", marks: [true, false] },
            { name: "火山狀態", desc: "接觸岩漿後會儲存在火山區域的狀態，譬如拿出炸彈箭會爆炸", marks: [true, false] },
            {
              name: "容器繼承",
              desc: "讀檔前的心心、精力狀態會繼承到讀檔後的狀態，變動一次心心或精力的最大值可固定該繼承的狀態",
              marks: [false, true],
            },
            { name: "料理效果繼承", desc: "可將讀檔前的料理效果繼承到讀取後的檔案", marks: [false, true] },
            {
              name: "冷卻時間繼承",
              desc: "英傑能力的冷卻時間或可使用的狀態可繼承到讀檔後的檔案",
              marks: [false, true],
            },
            {
              name: "落下判定繼承",
              desc: "在神廟內的落下判定會繼承到讀檔後的檔案（※ 不能回到標題，會錯誤而閃退）",
              marks: [false, true],
            },
          ],
          note: [
            "※ 快讀：連續做兩次可保持程錯狀態。",
            "※ 慢讀：經過讀取畫面會取消程錯。",
          ],
        },
      ],
    },
    notes: [
      { text: "慢讀等到視角幾乎拉回來才觀看回憶，林克會卡死（Softlock），只能關閉遊戲。" },
      { text: "慢讀和快讀的效果不完全一致，可以參考「應用一覽」。" },
      { text: "直接回標題跨模式不會有裝置儲存的效果，只有快讀第二次才有效果。" },
      { text: "有其他不需要裝置的特殊觸發方式，可以參考相關影片。" },
    ],
    videos: [
      { id: "3-6TP1gQEws", title: "技巧34 - 裝置程錯/終端失控（Apparatus Glitch）", at: 895 },
      { id: "sMBU9UB0Grw", title: "20秒示範「無相機裝置程錯」(Cameraless Apparatus Glitch)" },
      { id: "Srb1h7_6J9U", title: "2分鐘教你怎麼讓導師站著給你打！「裝置程錯 - 布偶鎖(Apparatus Glitch - Ragdoll Lock)」" },
      { id: "uogIlCqAsFw", title: "3分鐘教你「不需要相機就增殖心心精力＋3心撿大師劍(僅Switch可)」" },
      { id: "Rlbv1s-5mEY", title: "番外26「心心／精力增殖法（Hearts & Stamina Duplication）」" },
      { id: "3sl8_BCRiQg", title: "回應09「增殖的心心精力上哪去了？」- 失敗的原因和其他問題" },
    ],
  },

  "botw-26": {
    videoFolder: "botw-horse slide",
    methods: [
      {
        tab: "水平",
        name: "下馬滑行 / 水平馬滑（Horse Slide）",
        video: "horizontal horse slide.mp4",
        tags: ["All Versions"],
        steps: [
          "讓馬呈現下坡狀態，前腳較低、後腳較高（後腳在階梯上也可以）",
          "按住 ZL 往前按 X 跳騎上馬",
          "往馬的下坡方向移動，或讀取在馬的下坡方向上騎著馬的檔案",
          "按 X 跳離馬之後，快速按住 ZL 重複連打 A → X，直到速度足夠快",
        ],
      },
      {
        tab: "垂直",
        name: "垂直馬滑（Vertical Horse Slide）",
        video: "vertical horse slide.mp4",
        tags: ["All Versions"],
        steps: [
          "準備好一個騎著馬的檔案",
          "用靜止器將物體打至紅色，並用弓箭讓動量朝上",
          "站在物體上方",
          "靜止器解除、物體往上飛的瞬間讀取騎著馬的檔案",
          "按 X 跳離馬",
        ],
      },
    ],
    principle:
      "2017/09/23 【Pseudo Twili】 玩家在朋友家玩曠野之息的時候發生下馬之後滑行的現象。幾年後 【filofaxi】、【SilicatYT】與多位玩家共同找出穩定觸發的方法。讓馬呈現下坡狀態，林克以鎖定跳的方式上馬，會異常固定林克的座標，離開一段距離之後下馬會讓林克高速返回上馬位置的程錯。",
    principleNote: "Credit to: setup discoverers, filofaxi and SilicatYT.",
    notes: [
      { text: "水平馬滑若讀取神廟內的檔案，電梯動畫期間林克就會滑行。" },
      { text: "水平馬滑在 Switch 1 可用於未加載型的複製武器。" },
    ],
    videos: [
      { id: "khIZfyCDWks", title: "番外36 脫離騎乘狀態後的高速移動！-「下馬滑行(Horse Slide/Zip)」", at: 12 },
      {
        id: "erkGAtF2QnY",
        title: "番外36.5 - 下了初始台地就能複製武器！「馬滑武器複製法(Horse Slide Duplication)」",
        desc: "加載速度較快的 Switch 2 Edition 版不適用。",
        at: 1,
      },
    ],
  },

  "botw-27": {
    videoFolder: "botw-flying machine",
    methods: [
      {
        tab: "飛行礦車",
        name: "飛行礦車（Flying Carts）",
        video: "flying carts.mp4",
        steps: [
          "將兩個礦車垂直交疊",
          "站在最上面的礦車中央",
          "用希卡磁鐵吸取下方的礦車往上移動",
        ],
      },
    ],
    principle:
      "2017/3/31 【Hot_Diggity_Damn】 玩家在 Reddit 上提出的飛行方法，交疊兩個金屬礦車，藉由用磁鐵拖動下方的礦車產生的反作用力讓礦車能夠向上飛行。",
    notes: [
      { text: "上面的礦車可以用鐵箱代替，但穩定性不如礦車好。" },
    ],
    videos: [
      { id: "bllXJh2TsiY", title: "技巧07 - 飛行礦車／長距離飛行的方法", at: 29 },
      { id: "bBhdV8gglEA", title: "番外17 - 飛行礦車（Flying Machine）" },
      { id: "x5HAWCtBhoE", title: "指法12 - 天跳（Skyjump, スカイジャンプ）" },
      {
        id: "95ZeIyckScw",
        title: "回應06(new) - 22個冷知識與小技巧（22 Trivia & Tips）",
        desc: "礦車上坡時會輕量化！調整重量適合天跳！",
        at: 127,
      },
    ],
  },

  "totk-01": {
    intro: "收錄《王國之淚》各種必備的小程錯，許多大型的程錯都是由這些小程錯拼湊而成的路線流程，從餘料糾纏、纏桿、隱藏，到並列裝備與各式繼承技術，每集針對單一技術做示範。每支影片標注適用版本，查詢前請確認你的遊戲版本。",
    videos: [
      { id: "sSEDfRdcbmI", title: "不廢話01 -「餘料糾纏(FE, Fuse Entanglement)」(適用：～Ver.1.1.2)" },
      { id: "O0mY1o3Pb04", title: "不廢話02 -「餘存型餘料糾纏(FSFE, Fuse Storage Fuse Entanglement)」(適用：全版本)" },
      { id: "MzbtzsGB34A", title: "不廢話02(NS2) -「餘料儲存(Fuse Storage)」(適用：～ver.1.4.3)" },
      { id: "EG9qwZXSAOI", title: "不廢話03 -「米涅魯糾纏(Mineru FE)」(適用：全版本)" },
      { id: "41ARX3F0I9M", title: "不廢話03(NS2) -「米涅魯糾纏(Mineru FE)」(適用：1.4.0~)" },
      { id: "lA7el-E2YoA", title: "不廢話04 -「冷餘料(Cold Fuse, CF)」(適用：全版本)" },
      { id: "bVnFIYKHMZg", title: "不廢話05 -「纏桿(Stick Desync Clip, SDC)」(適用：全版本)" },
      { id: "qnq6E_8b9rU", title: "不廢話06 -「纏桿隱藏(SDC Culling)」(適用：全版本)" },
      { id: "rGCvHgch9jI", title: "不廢話07 -「萊克吞桿隱藏(LLSC, Like-Like Stick Culling)」(適用：全版本)" },
      { id: "GZLuq0Xh8Dg", title: "不廢話08 -「攜帶式隱藏(Portable Culling)」(適用：Ver.1.2.0～)" },
      { id: "FYrrFcB40uE", title: "不廢話09 -「米涅魯纏桿糾纏(YeeFE)」(適用：全版本)" },
      { id: "sfw0n6ywqjg", title: "不廢話10 -「閃藏糾纏(Portacull FE)」(適用：Ver.1.2.0～)" },
      { id: "YGSfZsvz-Tc", title: "不廢話11 -「丟棄大師劍(Drop Normal Master Sword)」(適用：Ver.1.2.0～)" },
      { id: "mAx3ox3fOYQ", title: "不廢話12 -「無框相機(Frameless Camera/Scope)」(適用：全版本)" },
      { id: "BhOnDZf5kV8", title: "不廢話13 -「投擲複製法(MTD, Midair Throw Duplication)」(適用：全版本)" },
      { id: "AXHn-WTZh8E", title: "不廢話14 -「並列裝備(Zuggle)」(適用：全版本)" },
      { id: "wUL-pHB2P7Q", title: "不廢話15 -「存讀繼承(Save Load Duping, SLD)」(適用：全版本)" },
      { id: "fQ1WwnusSXk", title: "不廢話16 -「並列繼承(Zuggle Load Object Transfer)」與「乾坤鎖(Recall Lock)」(適用：全版本)" },
      { id: "3B3f77u_TOI", title: "不廢話17 -「隱藏儲存(Cull Storage)」(適用：全版本)" },
      { id: "_XG5lYJzSpk", title: "不廢話18 -「黏足(Drop Smuggle)」與「足下並列(Drop Zuggle)」(適用：1.2.X)" },
      { id: "BhagRZoBQRE", title: "不廢話19 -「隱存無形並列(Cull Area Invizuggle)」(適用：全版本)" },
      { id: "Ne1vx1SA_Sk", title: "不廢話20 -「深穴延遲並列(Chasm Delay Zuggle)」(適用：Ver.1.2.0～)" },
      { id: "95RPAqAllJo", title: "不廢話21 -「沐彼並列/繼承/掉落/幽體繼承(Advanced Moobe glitches)」(適用：Ver.1.2.0～)" },
      { id: "kxGm05yjyM8", title: "不廢話22 -「暴打彈簧 - ARAZ（Attached Rangeless Active Zonai）」(適用：1.2.X)" },
      { id: "eXGglGGWwO4", title: "不廢話23 -「恆動餘料左納烏 - GAS（Guard-less Active Shield）」(適用全版本｜但本片為針對1.2.X的流程)" },
      { id: "zaSkPSgXmn8", title: "不廢話24 -「米涅魯地圖並列(Mineru Map Zuggle)」(適用：全版本)" },
    ],
  },

  "totk-02": {
    intro: "超越基本操作的實用技巧彙整，包含右手能力的進階應用、NS1 與 NS2 版本的差異解說、無限火箭與虛化裝備等高階技術的完整步驟，以及各種容易被忽略的細節與機制。",
    videos: [
      { id: "zFLuHyITm00", title: "番外01 - 實用技巧攻略(一)｜王國之淚也通用的曠野之息技巧解說！（ver.1.2.0版｜#八位堂）" },
      { id: "R4WyZineaDI", title: "番外02 - 無軌道無裝置！初學者也能順利搭乘「翼」的７種方法！（ver.1.2.0版）" },
      { id: "oXODBhMDS5Q", title: "番外04 - 實用技巧攻略(二)｜14個小知識與小技巧（ver.1.2.1版）" },
      { id: "Y3AUNIheO84", title: "番外05 - 實用技巧攻略(三)｜王淚戰鬥系統的精髓（～ver.1.2.1版）" },
      { id: "rdXxd7kU9xs", title: "番外06 - 實用技巧攻略(四)｜初學者適用的右手能力應用解說(上)（～ver.1.2.1版）" },
      { id: "1Ppx8LOBPjA", title: "番外07 - 實用技巧攻略(五)｜你確定你了解「倒轉乾坤(Recall)」嗎？初學者適用的右手能力應用解說(下)（～ver.1.2.1版）" },
      { id: "QWevjL_rbE8", title: "番外08(舊) - 300小時還不知道的12種玩法（~ver.1.2.1, Still Don't Know Until 300 Hours Play-Time）" },
      { id: "8oVnBYqYJL4", title: "番外09 - 雪兔號無敵的秘密！「傷害無效化(Damage Invalidation)」" },
      { id: "MTnMDNy8hxE", title: "回應05 - 只會叫的人馬連新手都躺著打！各版本專虐人馬的藍圖組合！" },
      { id: "7HeUApBT2Ng", title: "NS1(1.2.1)版和NS2(1.4.3)版差在哪裡？有哪些新的方法呢？" },
      { id: "h7MpbgUvizw", title: "番外22 - 永久連噴、不會消耗的「無限/究極口袋火箭（Infinite/Ultimate Pocket Rockets）」！百科級流程說明（適用ver.1.1.2～）" },
      { id: "aELlly95zCk", title: "番外20 - 全屬性大師劍！並列多把裝備在手上的「再同步並列(Swap Resync Zuggle)」步驟與原理解說" },
      { id: "MWBVJsLTA0c", title: "番外21 - 無限耐久＆複製＆無限彈簧火箭盾！虛空次元歸來的「虛化裝備(Void Dip & DI)」原理解說與常用步驟示範（適用ver.1.2.1～）" },
      { id: "AdwFCk77JsE", title: "番外20.5 - 和林克無關聯的繼承！「永久跨檔繼承(PSLOT, Permanent Save Load Object Transfer)」(適用：All Versions)" },
    ],
  },

  "totk-03": {
    videoFolder:    "totk-lynel",
    methodsTitle:   "攻擊模式",
    principleTitle: "對應策略",
    principleItems: [
      "王淚人馬的動作相對不完全固定，會依林克的站位、視角，有不同的攻擊次數，按住 ZL 鎖定人馬並保持冷靜隨時觀察人馬動向",
      "人馬吐火點燃草地時，可藉由上升氣流升空進入「子彈時間」補輸出",
      "見到仰天大吼，立刻拉開距離，或趁機爆頭打斷範圍大爆炸。若左納烏組合在旁邊，有時也會吼叫消滅（依照不同版本，有些道具不會被叫掉）",
      "持雙手劍人馬的手舉高下砸衝擊波時建議拉開距離，近距離完美迴避會受傷",
      "待在持雙手劍人馬側面或背面時，務必提防迴旋斬、拉開距離",
      "持槍人馬落地的衝擊波太近盾擋會受傷，事先拉開距離迴避",
      "爆頭後，可趁暈眩空檔補幾刀",
      "熟悉子彈時間、盾反的玩家，以上重點都可以忽略...",
    ],
    methods: [
      {
        tab:   "共通",
        name:  "所有武器的人馬皆會使用的攻擊",
        video: "人馬_共通.mp4",
        steps: [
          "__掃角__：一般近距離模式的攻擊完常常會以這個招式收尾，盾擋會後撤",
          "__突進__：收起武器，以四足直接衝撞玩家",
          "__火球__：往後跳後連續吐出 3 顆火球，草地上吐火可產生上升氣流，青髮人馬以上限定",
          "__掃斬__：距離人馬較遠時會側向揮動武器掃擊",
          "__射箭 / 箭雨__：玩家距離過遠、有高地差時，會鎖定林克射箭",
          "__範圍爆炸__（白髮以上限定）：仰天大吼集氣後砸地，周圍產生大範圍屬性爆炸",
          "__跳躍攻擊__：人馬位置地勢較高時，會躍起後落下攻擊，並造成衝擊波",
        ],
      },
      {
        tab:   "持劍",
        name:  "持劍人馬（單手劍＋盾）",
        video: "人馬_持劍.mp4",
        steps: [
          "__3 連斬__：近距離會使出連續揮出三刀",
          "__交叉斬__：中距離會使出交叉斬",
          "__衝斬__：快速衝刺橫掃斬擊",
        ],
      },
      {
        tab:   "持槍",
        name:  "持槍人馬（長槍）",
        video: "人馬_持槍.mp4",
        steps: [
          "__跳刺__：高躍起後向下突刺，落地產生__衝擊波__範圍傷害",
          "跳刺是持槍人馬唯一的近距離攻擊",
        ],
      },
      {
        tab:   "持雙手劍",
        name:  "持雙手劍人馬（雙手大劍 / 獸神大劍）",
        video: "人馬_持雙手劍.mp4",
        steps: [
          "__迴旋斬__：玩家待在側面或背面時極易觸發，可蹲在人馬下方迴避",
          "__3 連錘__：近距離時回連續揮下重錘",
          "__重錘__：中距離時會將武器舉高蓄力，下砸造成衝擊波",
          "__衝錘__：衝刺後接重擊，一樣會後砸在林克後方的衝擊波",
        ],
      },
      {
        tab:   "無傷打法",
        name:  "可無傷打法的藍圖（No-Damage Autobuild）",
        tags:  ["任意攻擊模式"],
        video: "人馬_無傷打法.mp4",
        steps: [
          {
            text: "放置藍圖組合（向下相容）：",
            sub: [
              "Ver.1.1.1 以下：金屬寶箱",
              "Ver.1.1.2：右腳工坊鉤環",
              "Ver.1.2.0：右腳工坊電梯柵欄",
              "Ver.1.2.1+：帆",
            ],
          },
          "誘導人馬靠近組合並開始吼叫",
        ],
      },
    ],
    notes: [
      {
        text: "騎背砍（Mountable Back Slash）不消耗武器耐久度，是對人馬最高效的輸出方式，建議優先掌握騎乘時機。第一次騎背砍必定 6 下，短時間內再次騎背砍會降低為 3 下，經過一段時間會繼續往上累積（最高 6 下）。",
      },
      {
        text: "可騎乘的 4 種時機：",
        sub: [
          "(1) 爆頭 / 射臉 ── 射中人馬臉部使其單膝跪地",
          "(2) 突進結束後的空檔 ── 人馬衝刺停下、重新起身前",
          "(3) 林克位置較高 ── 從空中直接落騎（跳馬、地形、技巧皆可）",
          "(4) 人馬脫離戰鬥範圍 ── 走回原地途中、或傳送紅光前",
        ],
      },
      {
        text: "人馬掏弓時 / 剛被騎下的 1 秒左右爆頭不會暈眩。",
      },
      {
        text: "與《曠野之息》不同，暈眩爬起時仍有可騎乘判定，整體判定較為寬鬆。",
      },
    ],
    videos: [
      { id: "Yw3V-9jiVAg", title: "番外03 - 曠野雙人馬還不滿足？讓王淚三人馬滿足你的戰鬥慾吧！", at: 14 },
      { id: "-QfT7akiyVc", title: "番外03.5 - 水上競技場再戰三人馬！(1.2.0版)" },
      { id: "MTnMDNy8hxE", title: "回應05 - 只會叫的人馬連新手都躺著打！各版本專虐人馬的藍圖組合！" },
    ],
  },

  "totk-04": {
    intro: "依主線進度整理的攻略影片集，涵蓋四座神殿的高效率破解流程，以及自製的沈浸式全主線劇情影片。若在特定神殿或劇情關卡卡關，找到對應的影片即可直接參考。",
    videos: [
      { id: "XQkeh2MbwUM", title: "高效率主線攻略01｜『風之神殿(Wind Temple)』- 利特村暴風雪的元兇原來是！？（無bug流程）" },
      { id: "WUA_1fGac8I", title: "高效率主線攻略02｜『水之神殿(Water Temple)』- 和希多王子解決卓拉河水污染的問題！（無bug流程）" },
      { id: "Tx_wCpq8WHU", title: "高效率主線攻略03｜『火之神殿(Fire Temple)』- 深入火山解決可口岩問題！（無bug流程）" },
      { id: "HDE4l-MqrgU", title: "高效率主線攻略04｜『雷之神殿(Lightning Temple)』- 格魯德地區沙塵暴的元兇！（無bug流程）" },
      { id: "A_D-FiEnp2c", title: "高效率主線攻略05｜『魂之神殿(Spirit Temple)』- 尋找第五賢者的去處！（無bug流程）" },
      { id: "ZIijIyUU4Tc", title: "高效率主線攻略06｜『封印遺跡(Imprisoning Chamber)』- 跨越時空的最終決戰！（無bug流程）" },
      { id: "bV7KIMDd4ks", title: "自製沈浸式全主線劇情(Immersive Main Story)｜『曠野之息 ➡︎ 王國之淚』(BoTW → ToTK『巨雷(Spoiler)』)" },
    ],
  },

  "totk-05": {
    intro: "依地區分類的神廟特解集，不動腦、純靠玩家操作通過所有需要解謎的神廟。",
    videos: [
      { id: "nQVypHKJKGY", title: "神特01(新) -『格魯德峽谷』地區神廟特解（Shrine Strategies in Gerudo Canyon）" },
      { id: "HOs8LqVKzBc", title: "神特02 -『泡泡拉高地』地區神廟特解（Shrine Strategies in Popla Foothills）" },
      { id: "26YjpvH_iVc", title: "神特03 -『撒哈斯拉平原』地區神廟特解（Shrine Strategies in Sahasra Slope）" },
      { id: "Vncrwztk1v0", title: "神特04 -『拉聶爾山』地區神廟特解（Shrine Strategies in Mount Lanayra）" },
      { id: "yqRyCZZfvE4", title: "神特05 -『烏爾利山』地區神廟特解（Shrine Strategies in Ulra Mountain）" },
      { id: "cfaBC9BlqUI", title: "神特06 -『奧爾汀峽谷』地區神廟特解（Shrine Strategies in Eldin Canyon）" },
      { id: "eUb4l9Naiaw", title: "神特07 -『卓拉台地』地區神廟特解（Shrine Strategies in Upland Zorana）" },
      { id: "58FYdV9vDig", title: "神特08 -『格魯德高地』地區神廟特解（Shrine Strategies in Gerudo Highlands）" },
      { id: "mucxdW5tgc0", title: "神特09 -『茨茨齊齊雪原』地區神廟特解（Shrine Strategies in Pikida Stonegrove）" },
      { id: "wCFXe8Rm-ds", title: "神特10 -『德依布朗遺跡』地區神廟特解（Shrine Strategies in Thyphlo Ruins）" },
      { id: "HJQOvlZPD4c", title: "神特11 -『拉布拉山』地區神廟特解（Shrine Strategies in Lindor's Brow）" },
      { id: "doEx5HnjGng", title: "神特12 -『卡爾加嶺』地區神廟特解（Shrine Strategies in Rospro Pass）" },
      { id: "f8PBQ0SeIaw", title: "神特13 -『監視堡壘』地區神廟特解（Shrine Strategies in Lookout Landing）(1/2)" },
      { id: "KDZcchuNqSw", title: "神特14(End) -『海拉魯平原』地區神廟特解（Shrine Strategies in Hyrule Field）" },
    ],
  },

  "totk-06": {
    videoFolder: "totk-fuse mechanics",
    methods: [
      {
        tab: "FE",
        name: "餘料糾纏（Fuse Entangle）",
        video: "Fuse Entangle.mp4",
        sections: [
          {
            title: "冷切盾糾纏（Shield Swap FE）",
            collapsible: true,
            tags: ["～Ver.1.1.2"],
            steps: [
              "啟動餘料建造對準目標物品",
              "按住 L，在打開技能輪盤前按下 ZL(盾牌) / Y(武器)",
              "放開 L 成功連打十字鍵切換盾牌(武器)",
              "選單上目標物品會附著在切換的裝備上，但實際模型上並沒有附著在裝備上",
            ],
          },
          {
            title: "餘料儲存糾纏（Fuse Storage FE, FSFE）",
            collapsible: true,
            tags: ["All Versions"],
            steps: [
              "將目標物品放在隱藏區內，啟動餘料建造對準目標物品",
              "在目標隱藏前的瞬間按下 ZL(盾牌) / Y(武器)，試圖餘料目標但被隱藏中斷（操作方式詳見影片）",
              "進入隱藏區後按住 L 選到地圖",
              "放開 L 進入地圖，按 + 號打開背包",
              "切換盾牌(武器)，或卸掉裝備中的盾牌(武器)再裝備",
              "退出暫停",
            ],
            note: "※ 步驟 5 若改為「切換 → 卸掉」，則會變成「零糾纏（Null FE）」，只會餘料糾纏在黏手(Smuggled)或並列(Zuggled)的裝備上。",
          },
          {
            title: "第二類餘料儲存糾纏（Fuse Storage 2 FE, FS2FE）",
            collapsible: true,
            tags: ["All Versions"],
            steps: [
              "將目標物品放在隱藏區內，啟動餘料建造對準目標物品",
              "在目標隱藏前的瞬間按下 ZL(盾牌) / Y(武器)，試圖餘料目標但被隱藏中斷（操作方式詳見影片）",
              "快速進出隱藏區，讓目標物品顯示 1 幀又被隱藏",
              "在隱藏區外切換步驟 2 的裝備，或丟棄之後並裝備另一個同類型的裝備",
              "進入隱藏區",
            ],
          },
          {
            title: "米涅魯裝備糾纏（Mineru FE for Equipment）",
            collapsible: true,
            tags: ["All Versions"],
            steps: [
              "丟棄裝備中的盾牌(武器)",
              "騎上米涅魯，按 R 打開餘料對準步驟 1 的裝備",
              "點擊 L, Y, R 之後，3 幀內打開快速選單或暫停，依背景特效的種類觀看 0～2 次回憶（詳見影片）",
              "關閉暫停，裝備會餘料糾纏在米涅魯上",
            ],
          },
          {
            title: "米涅魯裝置糾纏（Mineru FE for Zonai Device）",
            collapsible: true,
            tags: ["Ver.1.2.0+"],
            steps: [
              "裝備纏桿盾或纏桿武器",
              "騎上米涅魯，按 R 打開餘料對準目標左納烏裝置",
              "點擊 L, Y, R 之後，3 幀內打開快速選單或暫停，丟棄並切換裝備中的纏桿盾(武器)觸發[[閃藏（Portacull）|totk-08#Portacull]]",
            ],
          },
          {
            title: "米涅魯隱藏糾纏（Mineru Cull FE / YeeFE）",
            collapsible: true,
            tags: ["All Versions"],
            steps: [
              "準備[[纏桿|totk-07]]，並將纏桿餘料到米涅魯上",
              "啟動餘料建造對準目標",
              "米涅魯魂魄回到林克手上，林克要隱藏的瞬間按下 ZL(盾牌) / Y(武器)，試圖餘料目標",
              "重複步驟 3 直到有餘料特效，且目標物品並未被實際附著在裝備上",
            ],
          },
          {
            title: "過載餘料糾纏（Overload FE）",
            collapsible: true,
            tags: ["All Versions"],
            steps: [
              "觸發[[並列過載|totk-11#Zuggle]]",
              "[[並列（Zuggle）|totk-09#Zuggle]]一個武器",
              "過載掉落一個武器，並把它餘料建造在盾牌上",
              "丟出要糾纏的目標道具，將它餘料建造在武器上",
              "丟棄裝備中的武器，目標道具會和被丟出來的 Zuggle 武器糾纏",
            ],
            note: [
              "※ 若要糾纏在盾牌上，將上述流程的武器和盾牌對調。",
              "※ 若沒有 Zuggle 裝備，單純執行步驟 3～4，則為「冷餘料(CF)」，對著操縱桿使用可用來製作「纏桿(SDC)」。",
            ],
          },
        ],
      },
      {
        tab: "CF",
        name: "冷餘料（Cold Fuse）",
        video: "Cold Fuse.mp4",
        sections: [
          {
            title: "有特效冷餘料（Animated Cold Fuse）",
            tags: ["All Versions"],
            steps: [
              "米涅魯糾纏一個武器(盾)",
              "啟動餘料對準目標物品",
              "米涅魯魂魄回到林克手上前，林克要隱藏前的瞬間按下 ZL(盾牌) / Y(武器)，試圖餘料目標物品",
              "目標物品飛到林克身邊、出現餘料特效、選單上裝備並沒有附著該物品",
            ],
            note: "※ 過載餘料糾纏的流程中沒有先 Zuggle 裝備的話，就是單純冷餘料。",
          },
          {
            title: "無特效冷餘料（Non-Animated Cold Fuse）",
            tags: ["All Versions"],
            steps: [
              "米涅魯糾纏一個武器(盾)",
              "啟動餘料對準目標物品",
              "米涅魯魂魄回到林克手上前，林克要隱藏前的瞬間按下 ZL(盾牌) / Y(武器)，試圖餘料目標物品",
              "目標物品飛到林克身邊、沒有餘料特效、選單上裝備並沒有附著該物品",
            ],
            note: "※ 餘料儲存的方法必須在糾纏的前 1 幀中斷餘料程序。",
          },
        ],
      },
      {
        tab: "PF",
        video: "Pseudo Fuse.mp4",
        sections: [
          {
            title: "假餘料（Pseudo Fuse）",
            tags: ["All Versions"],
            steps: [
              "餘料糾纏一個盾牌或武器（子物件）",
              "用另一個裝備冷餘料該糾纏的子物件",
              "子物件會附著在步驟 2 的裝備上，但選單上附著的對象會是步驟 1 的母物件",
            ],
            note: "※ 若在「餘料儲存」期間，用餘料建造對準過「炸彈花」「電流果」等 Replacement Actor 的物品，則子物件的對象會變成 Replacement Actor（真餘料），但是原本要餘料的目標仍然附著上來（假餘料）。",
          },
        ],
      },
    ],
    principleSections: [
      {
        text: "「餘料建造（Fuse）」的作業流程玩家是全程__同步硬直__的，也就是「直到餘料建造完成的期間，玩家沒有任何操作可以中斷餘料建造（～Ver.1.1.2版有__冷切盾__，強制打開快速選單切換裝備來中止餘料的動作）」。而「餘料儲存（Fuse Storage）」能讓玩家先__向系統發起餘料建造的要求__，但是不執行餘料建造，只是先儲存了「餘料要求的申請」，之後玩家可以自由控制要在哪個餘料的程序時中斷，進而產生「餘料糾纏(FE)」「冷餘料(CF)」等行為。",
      },
      {
        title: "Frame 0 - 輸入餘料指令",
        collapsible: true,
        text: "林克會向系統發出「執行餘料建造的申請」，並且檢查要餘料的目標物品是否非死亡(Dead)、隱藏(Paused)、附著(Attached)，「餘料儲存（Fuse Storage）」會在此幀中斷。",
      },
      {
        title: "Frame 1 - 餘料程序的第１幀",
        collapsible: true,
        text: "要餘料的目標物品會向系統發出「建立依賴的申請（子 → 母）」，依賴關係的對象會設定在「物品要附著的裝備（Parent）」上，並將物品移動到林克的裝備上準備執行附著（Attaching）。若於此幀執行「丟棄→再裝備並卸掉」，由於系統找不到「附著對象（Owner）」，因此只會看到物品飛到被丟棄裝備的位置、保留最初的依賴關係，但是選單上和視覺上都不會有附著在裝備的外觀（即「無特效冷餘料（Non-Animated Cold Fuse）」）。此幀也可以利用快速進出隱藏區的方式，讓程序往前推 1 幀，在 Frame 1 的狀態儲存下來（即「第二類餘料儲存（FS2）」），此狀態已經進入餘料和建立依賴的程序，只差還沒附著，因此更好靠操作中斷餘料建造的流程。",
      },
      {
        title: "Frame 2 - 餘料程序的第２幀",
        collapsible: true,
        text: "觸發餘料特效，並且將要餘料的目標物品正式附著在依賴對象（要附著的裝備）上，物品的狀態更新為「已附著（Attached）」，並完成「模型結合（Model Bind）」。若於此幀執行「丟棄→再裝備並卸掉」（FS2 則是丟棄），「附著對象（Owner）」會失效，因此會看到有餘料特效、物品飛到被丟棄裝備的位置、保留最初的依賴關係，但是選單上和視覺上都不會有附著在裝備的外觀（即「有特效冷餘料（Animated Cold Fuse）」）。若於此幀執行「切換裝備」或「卸掉再重新裝備」（FS2 則是切換），改變了「附著對象（Owner）」，因此會看到有餘料特效、物品附著到被切換的裝備上。",
      },
      {
        title: "Frame 3 - 餘料程序的第３幀",
        collapsible: true,
        text: "依賴對象更新狀態為「有附著東西」並「建立依賴的申請（母 → 子）」，目標物品會檢查「當初的附著對象（Owner）」和「目前附著的裝備（Parent）」是否相同。「餘料糾纏(FE)」的子物件會分離就是在此幀上，裝備認為它自己是 Parent、有附著物品，但物品發現 Owner 無效、自己不屬於目前的裝備而「分離（Detached）」，但是保留依賴關係。「假餘料(PF)」通常發生在冷餘料一個糾纏在其他裝備上的物品。因此假餘料和餘料糾纏相同，只是物品還保留著 Owner 沒有被消滅（餘料糾纏的母物件還在），因此在這個流程上不會「分離（Detached）」。",
      },
      {
        title: "Frame 4 - 餘料程序的第４幀",
        collapsible: true,
        text: "解析依賴關係器 BaseProcMgr 分析 Frame 3 送出的申請，穩定依賴關係。",
      },
    ],
    notes: [
      { text: "餘料糾纏、冷餘料、假餘料在發展歷史中有幾十種做法，以上僅說明常見或常用的步驟。" },
    ],
    videos: [
      { id: "41ARX3F0I9M", title: "不廢話03(NS2) -「米涅魯糾纏(Mineru FE)」(適用：1.4.0~)" },
      { id: "WLSjvOTQXO8", title: "番外23(會員) -「怪持虛化口袋火箭(Enemy DI IPR)」前往西方高原（ver.1.4.3｜Nintendo Switch 2）" },
      { id: "7DS_ZmOVuR8", title: "番外23 - 海拉魯西方那座高山用火箭可以上去嗎？IPR 和 LSW 的挑戰！（ver.1.4.3｜Nintendo Switch 2）" },
      { id: "h7MpbgUvizw", title: "番外22 - 永久連噴、不會消耗的「無限/究極口袋火箭（Infinite/Ultimate Pocket Rockets）」！百科級流程說明（適用ver.1.1.2～）" },
      { id: "UIHuP5k0myM", title: "番外17 - 無限的代名詞！「過載(Overload)」全應用！（無限複製｜無限火箭｜無限跳躍）" },
      { id: "_XG5lYJzSpk", title: "不廢話18 -「黏足(Drop Smuggle)」與「足下並列(Drop Zuggle)」(適用：1.2.X)" },
      { id: "sfw0n6ywqjg", title: "不廢話10 -「閃藏糾纏(Portacull FE)」(適用：Ver.1.2.0～)" },
      { id: "bzM64P6F5tU", title: "不廢話18 -「足持(Sluggle)」與「足下並列(Drop Zuggle)」(適用：1.2.X)", desc: "未公開" },
      { id: "EG9qwZXSAOI", title: "不廢話03 -「米涅魯糾纏(Mineru FE)」(適用：全版本)" },
      { id: "bVnFIYKHMZg", title: "不廢話05 -「纏桿(Stick Desync Clip, SDC)」(適用：全版本)" },
      { id: "lA7el-E2YoA", title: "不廢話04 -「冷餘料(Cold Fuse, CF)」(適用：全版本)" },
      { id: "O0mY1o3Pb04", title: "不廢話02 -「餘存型餘料糾纏(FSFE, Fuse Storage Fuse Entanglement)」(適用：全版本)" },
      { id: "sSEDfRdcbmI", title: "不廢話01 -「餘料糾纏(FE, Fuse Entanglement)」(適用：～Ver.1.1.2)" },
      { id: "0nHE87qDars", title: "番外14 - 最簡單的「詞綴轉移(WST)」！找噁手手製作完美最強英傑武器！(Moobe WST 限定NS1)" },
      { id: "UboFi90sekw", title: "番外14 - 最簡單的「詞綴轉移(WST)」！找噁手手製作完美最強英傑武器！", desc: "私人" },
      { id: "GhCe2j_gkq8", title: "教學售後服務：實機示範「冷餘料(Cold Fuse)」 和「纏桿(SDC)」的手勢(嘴咬手機拍攝版） #王國之淚 #薩爾達傳說 #冷餘料" },
      { id: "s8wXxO8Lzis", title: "番外12(會員) - 不一定要在一始村！２種另類流程觸發『捆包無限材料增殖(Bundled Item Duplication)』(請以暫停觀看字幕)！", desc: "1/2" },
      { id: "hfWHsO1-zg4", title: "番外12 - 不用馬不用狗！詳解『捆包無限材料增殖(Bundled Item Duplication)』！（程錯原理與流程說明）" },
      { id: "wo7BDQRxag4", title: "番外11(會員) - 幹走蹺蹺板不用找萊克萊克？Yuda原創的「走狗(Zoggle)」路線！" },
      { id: "EIruDcEuUs4", title: "番外11 - 神廟的蹺蹺板可以幹走！？幹走蹺蹺板來做「超高速飛行器(Hyper Speed Flying Machine)」(程錯原理與流程說明｜～ver.1.2.1）" },
      { id: "80XD1dfAxSk", title: "番外10 - 1.2.1版最方便的武器置換和詞綴轉移！『餘料儲存（Fuse Storage）』" },
      { id: "QlJwMCtnE9A", title: "番外10(會員) - 1.2.1版最方便的武器置換和詞綴轉移！『餘料儲存（Fuse Storage）』與步驟詳細解說(Setup Breakdown)！" },
      { id: "Y3AUNIheO84", title: "番外05 - 實用技巧攻略(三)｜王淚戰鬥系統的精髓（～ver.1.2.1版）" },
    ],
  },

  "totk-07": {
    videoFolder: "totk-sdc",
    methods: [
      {
        tab: "Like-Like",
        tags: ["All Versions"],
        steps: [
          "將操縱桿放置於萊克萊克前方，其注意力在操縱桿上",
          "萊克萊克吞掉操縱桿的瞬間按 A 操作操縱桿（__視角沒有移到萊克萊克上__）",
          "再被萊克萊克要第二次，解除隱藏",
        ],
        note: "※ 林克此時的存在和萊克萊克肚子裡的操縱桿連結，當萊克萊克隱藏時，林克也會跟著隱藏。",
      },
      {
        tab: "FS",
        name: "餘料儲存（Fuse Storage）",
        video: "纏桿_FS.mp4",
        tags: ["All Versions"],
        steps: [
          "在阿卡萊或一始村隱藏區，丟出一個操縱桿放在隱藏區內，用武器或盾牌對其執行[[餘料儲存|totk-01]]",
          "走進隱藏區，同時按下 L 開啟技能輪盤，選到地圖",
          "進入地圖後按 + 號，到背包對著裝備中的武器或盾牌丟棄→裝備另一個→卸掉",
          "撿起步驟 3 丟棄的__冷餘料__裝備",
          "操作操縱桿，切換或卸掉步驟 4 的裝備後連打 B",
          "操作另一個操縱桿 / 騎上米涅魯或其他騎乘物件解除技能輪盤的鎖定",
          "步驟 1 的操縱桿會變成「纏桿（SDC）」",
        ],
      },
      {
        tab: "Mineru FE",
        name: "米涅魯糾纏（Mineru FE）",
        video: "纏桿_Mineru FE.mp4",
        tags: ["All Versions"],
        steps: [
          "開啟米涅魯，丟棄__裝備中__的武器或盾牌，對其執行[[米涅魯糾纏|totk-01]]",
          "從米涅魯身上跳下來，撿起步驟 1 的裝備，丟出一個操縱桿，啟動餘料對準操縱桿",
          "米涅魯變成魂魄回到林克手上前的瞬間，將操縱桿餘料到步驟 1 的裝備上，若操縱桿沒有實際餘料到裝備上，只是飛到林克旁邊，表示成功__冷餘料__",
          "操作操縱桿，切換或卸掉步驟 1 的裝備後連打 B",
          "操作另一個操縱桿 / 騎上米涅魯或其他騎乘物件解除技能輪盤的鎖定",
          "步驟 2 的操縱桿會變成「纏桿（SDC）」",
        ],
      },
      {
        tab: "Zuggle Overload",
        name: "並列過載（Zuggle Overload）",
        video: "纏桿_Zuggle Overload.mp4",
        tags: ["All Versions"],
        steps: [
          "過載狀態下切換裝備，__過載掉落__一個武器或盾牌",
          "將步驟 1 在地上的裝備餘料糾纏到另一類裝備上（__步驟 1 為武器，步驟 2 就是餘料到盾牌上__）",
          "丟出一個操縱桿，將操縱桿餘料到步驟 1 過載掉落的裝備上（__步驟 1 為武器，步驟 3 就是餘料到武器上__）",
          "操作操縱桿，切換或卸掉步驟 1 的裝備後連打 B",
          "操作另一個操縱桿 / 騎上米涅魯或其他騎乘物件解除技能輪盤的鎖定",
          "步驟 3 的操縱桿會變成「纏桿（SDC）」",
        ],
      },
      {
        tab: "String Feory",
        name: "弦纏（String Feory）",
        video: "纏桿_String Feory.mp4",
        tags: ["All Versions"],
        steps: [
          "米涅魯糾纏一個盾牌或武器",
          "用相反裝備製作一個纏桿（配合丟電果 + 倒轉乾坤防止遁地）",
          "將纏桿餘料在步驟 1 的裝備上",
        ],
        note: "※ 事實上這種方法就是糾纏鏈：纏桿 → 裝備 → 米涅魯，這樣就不需兩個纏桿。",
      },
    ],
    principle:
      "原文 Stick Desync Clipping（操縱桿解除同步遁地法），是 2023/7/1 由 【NaN Gogh】, 【DisguisedMoth】 發現，利用操縱桿可以穿越地面的方法，事實上這種脫離乘坐依附的方式都能造成遁地（Mount Lock 也是），而且林克的存在會和操縱桿綁在一起。若纏桿隱藏(Cull)，林克也會跟著隱藏。",
    notes: [
      {
        text: "纏桿剛觸發時是無法移動、並且啟動中的狀態（黏左納烏會直接啟動）。若是以餘料糾纏的方式觸發纏桿，傳送後纏桿會變得可以移動。若將纏桿餘料在武器或盾牌上，該裝備也會有纏桿的特性，例如 Ver.1.2.0+ 丟切卸裝備的話，林克也會跟著纏桿裝備一起隱藏 4 幀。",
      },
    ],
    videos: [
      { id: "bVnFIYKHMZg", title: "不廢話05 -「纏桿(Stick Desync Clip, SDC)」(適用：全版本)", desc: "NS1版的快速纏桿製作示範！" },
      { id: "rGCvHgch9jI", title: "不廢話07 -「萊克吞桿隱藏(LLSC, Like-Like Stick Culling)」(適用：全版本)" },
      { id: "GhCe2j_gkq8", title: "實機示範「冷餘料（Cold Fuse）」和「纏桿（SDC）」的手勢（嘴咬手機拍攝版）" },
      { id: "FYrrFcB40uE", title: "不廢話09 -「米涅魯纏桿糾纏（YeeFE）」(適用：全版本)" },
      { id: "BhagRZoBQRE", title: "不廢話19 -「隱存無形並列（Cull Area Invizuggle）」(適用：全版本)" },
      { id: "bzM64P6F5tU", title: "不廢話18 -「足持（Sluggle）」與「足下並列（Drop Zuggle）」(適用：1.2.X)" },
      { id: "fQ1WwnusSXk", title: "不廢話16 -「並列繼承（Zuggle Load Object Transfer）」與「乾坤鎖（Recall Lock）」(適用：全版本)" },
      { id: "wUL-pHB2P7Q", title: "不廢話15 -「存讀繼承（Save Load Duping, SLD）」(適用：全版本)" },
      { id: "AXHn-WTZh8E", title: "不廢話14 -「並列裝備（Zuggle）」(適用：全版本)" },
      { id: "GZLuq0Xh8Dg", title: "不廢話08 -「攜帶式隱藏（Portable Culling）」(適用：Ver.1.2.0～)" },
      { id: "mE-uVcRvMes", title: "不廢話08 -「攜帶式隱藏（Portable Culling）」(適用：全版本)" },
      { id: "qnq6E_8b9rU", title: "不廢話06 -「纏桿隱藏（SDC Culling）」(適用：全版本)" },
    ],
  },

  "totk-08": {
    videoFolder: "totk-cull",
    methods: [
      {
        tab: "Cull Storage",
        video: "20260710_Cull Storage.mp4",
        sections: [
          {
            title: "非虛化裝備（Normal Equipment）",
            tags: ["All Versions"],
            steps: [
              "在阿卡萊用餘料糾纏的方式準備[[纏桿|totk-07]]，將纏桿貼著隱藏區的牆壁",
              "裝備著纏桿的母裝備離開隱藏區",
              "對隱藏區內的纏桿__倒轉乾坤__，丟棄纏桿的母裝備後快速撿起來，並解除倒轉乾坤",
              "下一次丟棄纏桿的母裝備時，20幀後會釋放一次隱藏（NS1為10幀）",
            ],
            note: [
              "※ 步驟 3 可改為舉著電池或龍頭等可舉物品，解除倒轉乾坤的部分可以改為快速進出隱藏區讓纏桿顯現。",
              "※ 不一定要纏桿，儲存一般裝備的隱藏也可以。",
            ],
          },
          {
            title: "虛幽化裝備（DI Equipment）",
            steps: [
              "丟切卸 Smuggle 虛化裝備，並裝上任意同類型裝備",
              "將要儲存的目標（如：操縱桿）放在隱藏區靠牆",
              "用步驟 1 的裝備對目標進行餘料儲存",
              "技能切換成倒轉乾坤",
              "快速進出隱藏區，離開隱藏區的瞬間按 L 打開倒轉乾坤",
              "游標對準步驟 2 的目標，同時按下十字鍵 + A，倒轉的同時卸掉該裝備（Null FE）",
              "丟棄步驟 2 的裝備並正常裝備起來，卸掉該裝備解除虛幽化就能釋放儲存的隱藏（純虛化的裝備，丟出來的時候就會釋放）",
            ],
            note: "※ 此法也能用在一般裝備，步驟 6 的地方最後不要卸掉裝備，改為「切換裝備」。",
          },
        ],
      },
      {
        tab: "Portacull",
        video: "20260710_Portacull.mp4",
        sections: [
          {
            title: "閃藏（Portacull = Portable Cull）",
            tags: ["Ver.1.2.0+"],
            steps: [
              "觸發[[纏桿|totk-07]]",
              "將纏桿餘料在武器或是盾牌上",
              "丟棄纏桿裝備 → 裝備另一個同類型裝備，可以觸發林克的 4 幀隱藏",
            ],
          },
        ],
        note: "※Ver.1.2.0+丟切裝備的時候，被丟棄的裝備被證實會有 4 幀的無形隱藏，配合纏桿同步林克的存在，可以讓林克有閃一下的隱藏效果。",
      },
      {
        tab: "Permacull",
        video: "20260710_Permacull.mp4",
        sections: [
          {
            title: "永久隱藏（Permacull = Permanent Cull = Pcull）",
            tags: ["All Versions"],
            steps: [
              "觸發[[纏桿|totk-07]]",
              "將纏桿放在隱藏區，或是米涅魯身上",
              "離開隱藏區，或爬牆 / 在空中讓米涅魯消失不再出現",
              "林克會永久隱藏",
            ],
          },
        ],
        note: [
          "※ 上述步驟僅為其中一種方式，Permacull / Pcull 泛指所有永久隱藏的方法，如纏桿在米涅魯身上，但林克爬牆或在空中時米涅魯隱藏，這樣林克永久都不會顯示。",
          "※ 隱藏區觸發的隱藏，觀看回憶可以一瞬間解除隱藏。",
        ],
      },
      {
        tab: "Pyrocull",
        video: "20260709_Pyrocull.mp4",
        sections: [
          {
            title: "焰止隱藏（Pyrocull = Pryo- + Cull）",
            tags: ["All Versions"],
            steps: [
              "對目標物進行餘料糾纏",
              "在阿卡萊將火把放置於隱藏區牆壁，並黏著目標物",
              "製作一個間斷性噴火或吹冰工具對著火把和目標物",
              "啟動工具之後離開隱藏區，目標物會間斷性隱藏",
            ],
          },
        ],
        note: "※ 目標物為纏桿，則林克會間斷性隱藏。",
      },
      {
        tab: "Aerocull",
        video: "20260709_Aerocull.mp4",
        name: "氣流隱藏（Aerocull = Aero- + Cull）",
        sections: [
          {
            title: "～Ver.1.1.2 流程",
            tags: ["～Ver.1.1.2"],
            steps: [
              "餘料糾纏一個風扇在盾上，走到遠處直到左納烏裝置停止運作的距離，按下 ZL 啟動左納烏，帶著糾纏風扇的裝備走回去觸發 GAS",
              "調整這個處於 GAS 狀態的盾牌位置，讓他吹向隱藏區內，但盾牌本身和隱藏區域仍保持一段距離（可以把盾牌黏在平台上輔助）",
              "準備纏桿，把它放在隱藏區",
              "Map Zuggle 任意盾牌，空手裝備糾纏風扇的盾，走出隱藏區讓林克隱藏",
              "林克隱藏後丟棄裝備中的盾牌把風扇盾懲戒化，觀看記憶來解除隱藏，並跑回隱藏區",
              "Zuggle 地上的盾牌，用火箭盾把它解纏",
              {
                text: "完成「氣流隱藏」",
                sub: [
                  "(1) 纏桿在風場內：步驟 9 的纏桿裝備丟在地上，跳越過左納烏裝置會觸發「物理隱藏」",
                  "(2) 纏桿裝備在風場內：纏桿遠離隱藏區，站在一些物件（如左納烏）上會間斷性產生「無形隱藏」",
                ],
              },
            ],
          },
          {
            title: "Ver.1.2.0+ 流程",
            tags: ["Ver.1.2.0+"],
            steps: [
              "觸發[[纏桿|totk-07]]，並將纏桿餘料在武器上",
              "用纏桿武器米涅魯糾纏一個風扇，把風扇餘料在盾牌上",
              "對著隱藏區的牆壁按住 ZL 啟動風扇",
              "用纏桿武器 Invizuggle 或 Purgatorize 風扇盾來產生風場",
              "傳送到附近讓風場視覺化",
              "用武器(盾牌)FS2FE一個操縱桿，把它纏桿化",
              "傳送讓操縱桿變成可移動（原本究極手不能移動）",
              {
                text: "完成「氣流隱藏」",
                sub: [
                  "(1) 纏桿在風場內：步驟 9 的纏桿裝備丟在地上，跳越過左納烏裝置會觸發「物理隱藏」",
                  "(2) 纏桿裝備在風場內：纏桿遠離隱藏區，站在一些物件（如左納烏）上會間斷性產生「無形隱藏」",
                ],
              },
            ],
          },
        ],
      },
      {
        tab: "Vortacull",
        video: "20260709_Vortacull.mp4",
        sections: [
          {
            title: "渦流隱藏（Vortacull = Vortex + Cull）",
            tags: ["Ver.1.2.0+"],
            steps: [
              "觸發「[[氣流隱藏|tab:Aerocull]]」",
              "纏桿在風場內，丟→切步驟 9 的纏桿裝備再撿起來",
              "再丟→切步驟 9 的纏桿裝備，閃藏之後釋放一個「物理隱藏」",
            ],
          },
        ],
      },
    ],
    principleSections: [
      {
        text: "「隱藏（Cull）」是遊戲用來節省效能的機制，當某個物件（actor）暫時用不到、較遠看不到細節時，遊戲會把它的運算暫時收起來，同時讓它消失、甚至摸不到。隱藏依「深度」分成兩種狀態：",
      },
      {
        title: "Pause（暫停）— 淺層隱藏",
        collapsible: true,
        items: [
          "只是把 actor 的計算暫停，狀態保留，恢復（unpause）時直接接續原本進度",
          {
            text: "觸發原因稱為 pause reason，共 0–5 六種：",
            sub: [
              "Reason 0 (R0 Cull)：一般暫停（約 90% 情況）",
              "Reason 1：隱藏區／洞穴隱藏空間的隱藏",
              "Reason 2：賢者視錐隱藏（畫面視角外隱藏）",
              "Reason 3：賢者武器相關（不含 Mineru 構裝）",
              "Reason 4：事件觸發暫停（過場動畫等）",
              "Reason 5：NPC 視錐隱藏（畫面視角外隱藏）",
            ],
          },
          "※Reason 1、2 屬於即「__物理隱藏（physical cull）__」，外觀隱藏但仍有碰撞判定的狀態",
          "※Reason 0、3、4、5等等其他都是「__無形隱藏（intangible cull）__」，碰不到、無碰撞的隱藏狀態，在序章境內地圖操作此隱藏會被系統抓回去到序章起點（Callback）",
        ],
      },
      {
        title: "Sleep（睡眠）— 深層隱藏",
        collapsible: true,
        items: [
          "比 Pause 更徹底：完全不可見、完全不可互動（intangible）",
          "不論原本疊了幾種 pause reason，全部解除",
          "attachment 解除、equipment cache 被刪除",
          "甦醒時呼叫 onReset，等於重新初始化，而非接續原狀態",
          "通常發生在物件距離玩家過遠、系統判斷短時間內不會用到的情況",
        ],
      },
      {
        title: "與複製／glitch 技巧的關聯",
        items: [
          "多數程錯（如 Zuggle）的原理都是利用 Pause 狀態切換瞬間的空隙（物理隱藏和無形隱藏的時機略有不同），讓「裝備欄」與「場上實際物件」的狀態不同步（__Desync__）",
          "Resync（重新裝備／交換）能修正這種不同步，但修正的是林克的裝備狀態，並不等於直接把物件解除隱藏（__Uncull__）",
        ],
      },
    ],
    videos: [
      { id: "AdwFCk77JsE", title: "番外20.5 - 永久跨檔繼承 PSLOT", desc: "2026-06-04｜影片｜相關：閃藏懲戒、脈衝隱藏懲戒、隱藏區懲戒" },
      { id: "0MBy9e3FQu0", title: "番外11.5 - 電梯、蹺蹺板通通納入藍圖！CAIZ（Cull Area Invizlot）", desc: "2025-01-09｜影片" },
      { id: "_XG5lYJzSpk", title: "不廢話18 -「黏足(Drop Smuggle)」與「足下並列(Drop Zuggle)」", desc: "2024-08-29｜影片｜相關：隱藏儲存法 / Cull Storage" },
      { id: "sfw0n6ywqjg", title: "不廢話10 -「閃藏糾纏(Portacull FE)」", desc: "2024-08-17｜影片" },
      { id: "siGVEF5-AZY", title: "番外16(2) - 1.2.0～1.2.1 序章大師劍流程", desc: "2024-08-11｜影片｜相關：序章閃藏繼承 / Portacull SLD MNF in Intro" },
      { id: "BhagRZoBQRE", title: "不廢話19 -「隱存無形並列(Cull Area Invizuggle)」", desc: "2024-08-03｜影片" },
      { id: "bzM64P6F5tU", title: "不廢話18 -「足持(Sluggle)」與「足下並列(Drop Zuggle)」", desc: "2024-07-31｜影片（未公開）｜相關：隱藏儲存法 / Cull Storage" },
      { id: "3B3f77u_TOI", title: "不廢話17 -「隱藏儲存(Cull Storage)」", desc: "2024-07-30｜影片" },
      { id: "GZLuq0Xh8Dg", title: "不廢話08 -「攜帶式隱藏(Portable Culling)」Ver.1.2.0～", desc: "2024-07-17｜Shorts / 短片" },
      { id: "mE-uVcRvMes", title: "不廢話08 -「攜帶式隱藏(Portable Culling)」全版本", desc: "2024-07-16｜Shorts / 短片（未公開）" },
      { id: "rGCvHgch9jI", title: "不廢話07 -「萊克吞桿隱藏(LLSC, Like-Like Stick Culling)」", desc: "2024-07-16｜影片" },
      { id: "qnq6E_8b9rU", title: "不廢話06 -「纏桿隱藏(SDC Culling)」", desc: "2024-07-14｜影片" },
      { id: "s8wXxO8Lzis", title: "番外12(會員) - 捆包無限材料增殖 2種另類流程", desc: "2024-06-22｜影片｜相關：直接離開隱藏區 / Outside Cull Area" },
      { id: "hfWHsO1-zg4", title: "番外12 - 捆包無限材料增殖", desc: "2024-06-16｜影片｜相關：米涅魯隱藏增殖法" },
      { id: "wo7BDQRxag4", title: "番外11(會員) - 走狗(Zoggle)路線", desc: "2024-05-20｜影片｜相關：解桿遁地法 / Stick Desync Culling" },
      { id: "QlJwMCtnE9A", title: "番外10(會員) - 餘料儲存與步驟詳細解說 (1/2)", desc: "2024-04-11｜影片｜相關：隱藏 / Cull" },
    ],
    notes: [
      {
        text: "__Aerocull（氣流隱藏）__：Aerocull 會儲存隱藏，不會自行釋放。被儲存隱藏的物件會持續判定自己仍位於隱藏區內，因此即使經過傳送、讀取畫面或進入神廟，隱藏狀態仍可能延續。",
      },
      {
        text: "__Vortacull（渦流隱藏）__：Vortacull 是利用 Ver.1.2.0+ 丟切的 4 幀隱藏，讓風場中的纏桿進入「無形隱藏」，藉此釋放原本儲存的隱藏，並重新儲存一次。這也是它能將 Aerocull 的隱藏狀態重新觸發、延續到其他區域的原因。",
      },
      {
        text: "__物件與隱藏區（culling area）的關係__：隱藏區不會主動追蹤物件，而是物件自行偵測是否位於隱藏區內。因此，真正被延續的是物件本身的隱藏狀態，而不是把隱藏區整個帶到其他區域。",
      },
    ],
  },

  "totk-09": {
    intro: "[[dt13269|https://github.com/dt-12345/zuggle]] 玩家對於 Zuggle 的說明",
    videoFolder: "totk-smuggle zuggle",
    methodsTitle: "裝備狀態",
    notesTitle: "備註說明",
    methods: [
      {
        tab: "Smuggle",
        name: "黏手（Smuggle）",
        video: "Smuggle.mp4",
        steps: [
          "在阿卡萊隱藏區，將武器 A 餘料糾纏到盾牌 B 上（盾牌糾纏到武器也可以）",
          "將 B 留在隱藏區牆壁，裝備著 A 離開隱藏區",
          "當 A 隱藏之後丟棄 A",
          "再回到隱藏區內把 B 撿起來",
          "此時 A 會黏在林克手上",
        ],
        note: "※ 時常伴隨著十字鍵鎖著的狀況（虛化裝備不會鎖住）",
      },
      {
        tab: "Zuggle",
        name: "並列裝備 / 疊裝（Zuggle = Zvleon’s Smuggle）",
        video: "Zuggle.mp4",
        sections: [
          {
            title: "法一：地圖並列（Map Zuggle）",
            tags: ["～Ver.1.1.1"],
            steps: [
              "背對牆壁，按住 L 選到地圖",
              "放開 L 讓技能輪盤消失，打開地圖之前連打十字鍵打開武器(盾)的快速選單",
              "丟棄裝備中的武器(盾)後，連打十字鍵再次打開快速選單",
              "裝備另一把武器後，放開十字鍵讓地圖自動打開",
              "按 + 號到背包丟棄裝備中的武器(盾)",
              "退出暫停或讀檔",
            ],
            note: "※ Ver.1.1.1+ 的虛化裝備也可以用此方法",
          },
          {
            title: "法二：米涅魯糾纏並列（Mineru Parented Zuggle）",
            tags: ["Ver.1.2.0+"],
            steps: [
              "觸發纏桿，並將纏桿餘料在武器上裝備起來",
              "騎上米涅魯，丟棄裝備中的目標盾牌",
              "[[米涅魯糾纏|totk-06#FE]]步驟 2 的盾牌",
              "空手將盾牌撿起來裝備，按住 L 打開技能輪盤選到地圖",
              {
                text: "放開 L 地圖打開之前，連打十字鍵◀︎(或▶︎)完成以下動作：",
                sub: [
                  "丟棄裝備中的盾牌",
                  "裝備另一個盾牌",
                  "丟棄步驟 1 裝備中的纏桿武器",
                  "裝備另一把武器",
                  "放開 L 打開地圖",
                ],
              },
              "按 + 號打開背包，丟棄裝備中的盾牌",
              "故意離開或按 L 啟動技能，讓米涅魯隱藏之後再次顯現",
              "背上的盾牌顯示出來之後，騎上米涅魯",
              "隨意餘料一個物品覆蓋掉步驟 2 在米涅魯身上的盾牌解纏（Detangle）",
            ],
            note: "※ 若要 Zuggle 武器，上述順序的武器和盾牌可以對調。",
          },
          {
            title: "法三：再同步並列（Swap Resync Zuggle）",
            tags: ["Ver.1.2.0+"],
            steps: [
              "觸發纏桿，並將纏桿餘料在武器上裝備起來",
              "貼著牆壁，和牆壁的法向呈 90 度（非正對也非背對）",
              {
                text: "打開暫停，完成以下動作：",
                sub: [
                  "隨意丟棄一個武器 / 盾牌 / 弓箭",
                  "丟棄裝備中的纏桿武器",
                  "裝備另一把武器",
                  "丟棄任意 2 把以上武器 / 盾牌 / 弓箭，或是[[米涅魯的手臂|totk-11#SFO]]",
                  "丟棄裝備中的目標盾牌",
                  "裝備另一個盾牌",
                ],
              },
              "關閉暫停後瞬間打開暫停（Pause Buffer）",
              "確認暫停背景的林克仍處於[[隱藏(Cull)|totk-08#Portacull]]狀態",
              "卸掉或裝備任意套裝，或切換弓箭，重新同步林克的裝備狀態",
              "丟棄裝備中的盾牌",
              "左搖桿往遠離牆壁的方向推著，按下 B 關閉暫停",
              "目標盾牌丟棄失敗後會呈現 Zuggled 的狀態",
            ],
            note: "※ 若要 Zuggle 武器，上述順序的武器和盾牌可以對調。",
          },
          {
            title: "法四：米涅魯地圖並列（Mineru Map Zuggle）",
            tags: ["All Versions"],
            steps: [
              "觸發纏桿，並將纏桿餘料在米涅魯上",
              "找一個背對能夠讓米涅魯消失的牆壁，或丟出一個浮空石，啟動並轉 90 度背對浮空石",
              "啟動究極手對準米涅魯讓米涅魯的魂回到林克身上",
              "連打十字鍵打開快速選單",
              "打開後的背景林克呈現顯示狀態時",
              "按住 L 放開十字鍵",
              "技能輪盤選到地圖",
              {
                text: "放開 L 連打十字鍵打開目標武器(盾牌)的快速選單，並執行以下作業：",
                sub: [
                  "丟棄裝備中的目標武器(盾牌)",
                  "連打十字鍵裝備另一個武器(盾牌)",
                  "放開十字鍵打開地圖",
                ],
              },
              "按 + 號打開背包，丟棄裝備中的武器(盾牌)",
            ],
            note: "※ 若要 Zuggle 武器，上述順序的武器和盾牌可以對調。",
          },
        ],
      },
      {
        tab: "Zuggle Drop",
        name: "並列丟棄（Zuggle Dropped）",
        video: "Zuggle Drop.mp4",
        sections: [
          {
            title: "",
            tags: ["All Versions"],
            steps: [
              "將目標裝備 Smuggle 或 Zuggle",
              "隨意裝備相同類型的裝備",
              "丟棄該類型的裝備，步驟 1 的裝備會變成 Zuggle Dropped",
            ],
          },
          {
            title: "效果",
            steps: [
              "該裝備會保留與林克的連結，可用於[[Batch DI|totk-16#Batch DI]]",
              "Zuggle Dropped 的 ??? 裝備無法空手撿拾",
              "倒轉乾坤該裝備時使用通天術，倒轉乾坤會被取消",
              "掉落時與火堆、人物對話的時候不會停下來，和它黏合的東西也會隨著它繼續墜落",
              "用究極手或撿起來就會取消 Zuggle Dropped 的狀態",
              "會算入並列負載的數量，即 14 個 Zuggle Drop 也會過載",
            ],
          },
        ],
      },
      {
        tab: "Sluggle",
        name: "Sluggle = Smuggle-like Slug",
        video: "Sluggle.mp4",
        sections: [
          {
            title: "法一：吃掉瞬間撿起裝備",
            tags: ["～Ver.1.2.0"],
            steps: [
              "讓 Like Like 準備吃掉一件目標裝備",
              "在 Like Like 吃掉該裝備的同時，Link 也撿起該裝備",
              "裝備被 Like Like 接管並隱藏(Cull)，但 Link 端仍取得裝備關係，形成 Sluggle",
            ],
          },
          {
            title: "法二：Drop Smuggle 後讓 Like Like 吃掉",
            tags: ["～Ver.1.2.0"],
            steps: [
              "先將目標裝備做成 Drop Smuggle",
              "讓 Like Like 吃掉該裝備",
              "「正在被 Link 端保留的掉落裝備」被交給 Like Like 的吞食／隱藏(Cull)流程，形成 Sluggle",
            ],
          },
          {
            title: "法三：Cull Area Sluggle",
            tags: ["All Versions"],
            steps: [
              "過載掉落目標裝備，將裝備隱藏區隱藏",
              "背對牆壁丟棄失敗目標裝備",
            ],
            note: "※ Sluggle 的情況下再次丟棄該裝備，進入隱藏區時會變為「黏足（Drop Smuggle, 會鎖住裝備視窗）」。",
          },
          {
            title: "法四：Zuggle Overload 掉出裝備後讓 Like Like 吃掉",
            tags: ["All Versions"],
            steps: [
              "進入 Zuggle Overload 狀態",
              "讓裝備從 Link 身上異常掉到地上",
              "讓 Like Like 吃掉該異常掉落的裝備，接上吞食流程形成 Sluggle",
            ],
          },
          {
            title: "法五：Recall Sluggle",
            tags: ["～Ver.1.1.2"],
            steps: [
              "目標裝備原本未裝備，先丟在地上",
              "開啟 Recall 的瞬間撿起該裝備",
              {
                text: "成功時會出現以下現象：",
                sub: [
                  "裝備看起來還在地上",
                  "撿取音效播放",
                  "選單裡卻已經顯示裝備",
                ],
              },
              "在取消 Recall 前，該裝備會維持 Sluggled 狀態",
            ],
          },
        ],
      },
      {
        tab: "Wuggle",
        name: "糾纏型並列（Wuggle = Weird Zuggle）",
        video: "Wuggle.mp4",
        sections: [
          {
            title: "法一：隱藏區（Cull Area Wuggle）",
            tags: ["All Versions"],
            steps: [
              "先把目標武器餘料糾纏在盾牌上",
              "把母件盾牌放在 Cull Area 裡",
              "撿起子件武器站在能讓裝備快要[[隱藏(Cull)|totk-08#Portacull]]的邊界",
              "離開隱藏區後再回到隱藏區",
              "抓「裝備快要隱藏」的瞬間，在裝備即將隱藏前，打開快速選單，丟棄並切換武器",
              "此時快速選單會被鎖住無法打開，但武器會黏在手上",
              "填滿相同類型的裝備",
              "背對牆壁打開同類型裝備的寶箱，丟棄裝備中的武器",
              "若裝備被卸掉、十字鍵被鎖住(Dpad Lock)，丟棄隨意裝備撿起來重複上一個動作直到快速選單能夠打開",
            ],
            note: "※ 若要 Wuggle 盾牌，上述順序的武器和盾牌可以對調。",
          },
          {
            title: "法二：米涅魯隱藏（Mineru Cull Wuggle）",
            tags: ["All Versions"],
            steps: [
              "先把目標武器餘料糾纏在米涅魯上",
              "移動或按 L 啟動技能讓米涅魯的魂回到林克身上",
              "目標武器隱藏前的瞬間，丟棄切換裝備中的目標武器",
              "成功時快速選單會被鎖住無法打開，但武器會黏在手上",
              "填滿相同類型的裝備",
              "背對牆壁打開同類型裝備的寶箱，丟棄裝備中的武器",
              "若裝備被卸掉、十字鍵被鎖住(Dpad Lock)，丟棄隨意裝備撿起來重複上一個動作直到快速選單能夠打開",
            ],
            note: "※ 若要 Wuggle 盾牌，上述順序的武器和盾牌可以對調。",
          },
        ],
      },
      {
        tab: "Zoggle",
        name: "解纏型並列（Zoggle = Ock's Zuggle）",
        tags: ["Ver.1.2.0+"],
        video: "Zoggle.mp4",
        steps: [
          "完成武器的 Wuggle",
          "搜集武器填滿背包，打開一個含有武器的寶箱",
          "開寶箱的丟棄選單中丟棄裝備中的武器（解除快速選單鎖）",
          "裝備火箭盾使用掉（若用米涅魯 Wuggle，直接餘料覆蓋掉米涅魯上的裝備）",
        ],
        note: "※ 若要 Zoggle 盾牌，上述順序的武器和盾牌可以對調。",
      },
      {
        tab: "Arrow Smuggle",
        name: "黏箭（Arrow Smuggle）",
        video: "Arrow Smuggle.mp4",
        sections: [
          {
            title: "電黏法（Shock Smuggle）",
            tags: ["～Ver.1.1.1"],
            steps: [
              "保持收弓狀態，並進行「電黏法（Shock Smuggle）」的步驟",
              "在被電擊的前一刻（5 幀內），按下 ZR 鍵（拔弓）與 + 鍵",
              "在暫停選單中丟棄你已裝備的弓，接著取消暫停",
            ],
            note: "※ 僅限於 Ver.1.2.0 版有一個更快的 Quick Smuggle，可以參考技巧影片的「斷讀法」。",
          },
          {
            title: "閃藏法（Portacull）",
            tags: ["All Versions"],
            steps: [
              "卸掉弓箭，保持沒有裝備弓的狀態",
              "按住 L 選擇地圖，地圖開啟前快速選單丟棄纏桿盾 → 切換裝備另一個盾牌 → 裝備弓",
              "打開地圖後按 + 在背包丟棄裝備中的弓",
            ],
            note: "※ 步驟 2 可改為暫停丟切纏桿盾 → 裝備弓 → 快速關開暫停 → 丟棄裝備中的弓",
          },
          {
            title: "黏足法（Drop Smuggle）",
            tags: ["All Versions"],
            steps: [
              "過載掉落一個弓，放進隱藏區",
              "離開隱藏區讓弓隱藏，背對牆壁丟棄裝備中的弓箭（[[Sluggle|tab:Sluggle]]）",
              "離開牆壁再丟棄一次裝備中的弓",
              "走回去隱藏區",
            ],
            note: "※ 可以用滿裝開寶箱法解鎖裝備視窗。",
          },
        ],
      },
    ],
    principleSections: [
      {
        text: "裝備在被丟棄的時候，都會進入丟棄序列（Drop Queue），一度都會經過 Smuggle 的狀態。而《王國之淚》已經被發現的裝備狀態已經多達 20 幾種（Drop Zuggle, Dynamic Zuggle, Detached Zuggle, Enemy Pickpocketing 等等），而本站僅提出較為基礎、名稱容易搞混的五種：Smuggle、Zuggle、Sluggle、Wuggle、Zoggle。",
      },
      {
        title: "Smuggle",
        collapsible: true,
        text: "所有裝備在丟棄時都會經過進入「丟棄序列（Drop Queue）」，進入序列的裝備都會呈現 Smuggle（黏手）的狀態直到裝備成功被丟棄、或是丟棄失敗返回選單為止。而利用特殊操作讓裝備卡在「丟棄序列（Drop Queue）」，裝備停留在「正在丟棄中」的狀態（2023/5 【Ame】、【LegendofLinkk】 相繼發現）。",
      },
      {
        title: "Zuggle",
        collapsible: true,
        text: "裝備的丟棄程序已經完成(失敗)，但對林克的依賴並沒被刪除（2023/5/16 【Zvleon】 發現）。",
      },
      {
        title: "Sluggle",
        collapsible: true,
        text: "裝備沒有正常存在於林克手上，但系統仍讓林克端持有 / 裝備它（2023/6/15 【Mozz】 與 Like Like 互動時發現）和 Overload Pickup、Enemy Pickpocketing 的效果非常接近。",
      },
      {
        title: "Wuggle",
        collapsible: true,
        text: "是一種不完全的 Zuggle，特指在非隱藏位置觸發裝備隱藏前瞬間丟切裝備來 Smuggle，Smuggle 之後利用寶箱強制丟棄來完成丟棄序列，做出跟類 Zuggle 並列裝備的效果，即「殘留糾纏關係的 Zuggle」（2023/12/29 【Ock】、【ROBUXY2ND】 發現）。",
      },
      {
        title: "Zoggle",
        collapsible: true,
        text: "是 Zuggle 的一種，特指將 Wuggle 中的裝備與母物件解除糾纏關係，從 Wuggle 轉變而成的 Zuggle（2024/1/4 【Ock】、【Ryan?】發現）。",
      },
    ],
    notes: [
      {
        text: "Zuggle 的數量太多，達到林克的裝備依賴上限，會造成 [[Zuggle Overload|totk-11#Zuggle]]。",
      },
      {
        text: "Ver.1.1.2 以下的 SLD 達成的 Zuggle 操作，在 Ver.1.2.0+ 會變成 Invizuggle，因此通常適用 SLD 或 配合「[[再同步（Resync）|totk-09#Resync]]」讓 Invizuggle 變回 Zuggle（Invizuggle = Cull + Zuggle，被隱藏的 Zuggle 狀態）。",
      },
    ],
    faqLink: { label: "深入了解 Zuggle", path: "/types/totk-09-zuggle" },
    videos: [
      {
        id: "aELlly95zCk",
        title: "番外20 - 全屬性大師劍！並列多把裝備在手上的「再同步並列(Swap Resync Zuggle)」步驟與原理解說",
      },
      { id: "zaSkPSgXmn8", title: "不廢話24 -「米涅魯地圖並列（Mineru Map Zuggle）」(適用：全版本)" },
      { id: "_XG5lYJzSpk", title: "不廢話18 -「黏足（Drop Smuggle）」與「足下並列（Drop Zuggle）」(適用：1.2.X)" },
      { id: "95RPAqAllJo", title: "不廢話21 -「沐彼並列／繼承／掉落／幽體繼承（Advanced Moobe glitches）」(適用：Ver.1.2.0～)" },
      { id: "Ne1vx1SA_Sk", title: "不廢話20 -「深穴延遲並列（Chasm Delay Zuggle）」(適用：Ver.1.2.0～)" },
      { id: "BhagRZoBQRE", title: "不廢話19 -「隱存無形並列（Cull Area Invizuggle）」(適用：全版本)" },
      { id: "bzM64P6F5tU", title: "不廢話18 -「足持（Sluggle）」與「足下並列（Drop Zuggle）」(適用：1.2.X)" },
      { id: "fQ1WwnusSXk", title: "不廢話16 -「並列繼承（Zuggle Load Object Transfer）」與「乾坤鎖（Recall Lock）」(適用：全版本)" },
      { id: "wUL-pHB2P7Q", title: "不廢話15 -「存讀繼承（Save Load Duping, SLD）」(適用：全版本)" },
      { id: "AXHn-WTZh8E", title: "不廢話14 -「並列裝備（Zuggle）」(適用：全版本)" },
      { id: "wo7BDQRxag4", title: "番外11(會員) - 幹走蹺蹺板不用找萊克萊克？Yuda原創的「走狗（Zoggle）」路線！" },
    ],
  },

  "totk-10": {
    videoFolder: "totk-transfer",
    // 原理說明放頁面層級（不放進 SLD 的 method 裡）：
    // 若任何一個 method 有 principle/principleSections，右欄就會切成「跟著分頁切換」的動態模式，
    // 其餘沒有原理說明的分頁（ZLOT/PSLOT/RL）切過去就會變空白。
    // 這裡四個分頁共用同一套原理，比照轉存格（botw-02）的做法，放在頁面層級固定顯示。
    principleSections: [
      {
        text: "2023/5/16 由 【ZombieBoy225】、【ness】、【ElDuende】 發現。SLD 指的是任何已經不在「已裝備（Equipped）」或「正在丟棄（Dropping）」欄位中，但尚未被允許清除其「駐留實體狀態（Resident Actor State）」的道具。此狀態適用於那些不應該因為地圖傳送（Warping）或讀檔而卸載的實體（Actors）。林克所有已裝備的道具都會被賦予這個狀態，而 Smuggles 和 Zuggles 也會保留它。在讀取存檔時，系統會明確檢查「裝備（Equip）」欄位中的道具並將其清除，而「正在丟棄（Dropping）」欄位則會在傳送和讀檔時同時進行清除。由於在第二次丟棄後沒有取消暫停，該狀態便永遠不會被清除，因此 Zuggle Drop 便能滿足 SLD 的所有條件。",
      },
      {
        text: "然而，如果在此之後觀看回憶，遊戲會在回憶結束後強制取消暫停 1 影格（1 frame），這段時間就足以清除該駐留狀態（resident state）了。",
      },
    ],
    methods: [
      {
        tab: "SLD",
        name: "存讀繼承（Save Load Duplication）",
        video: "SLD.mp4",
        sections: [
          {
            title: "存讀繼承（SLD, Save Load Dupe）",
            tags: ["～Ver.1.1.1"],
            steps: [
              "裝備想要繼承的道具",
              "暫停丟棄 → 切換另一個同類型裝備",
              "快速關開暫停，背景上一個丟棄的裝備尚未掉出來",
              "丟棄裝備中的同類型裝備後讀取在作業區附近的存檔",
            ],
            note: "※ Ver.1.1.2 有 Throw SLD。",
          },
          {
            title: "隱藏存讀繼承（Culling SLD）",
            tags: ["All Versions"],
            steps: [
              "準備好任何隱藏的手段，包含 [[Cull Area|totk-08#Permacull]]、[[Cull Storage|totk-08#Cull Storage]]、[[Portacull|totk-08#Portacull]]",
              "在隱藏觸發的前 1 幀暫停，丟 → 切目標裝備",
              "快速關開暫停，背景上一個丟棄的裝備尚未掉出來、林克也是隱藏的",
              "丟棄裝備中的同類型裝備後讀取在作業區附近的存檔",
            ],
          },
        ],
        note: "※ 利用「地圖緩衝（Map Buffering, 按 L 選地圖後開啟快選）」丟棄道具並觀看冒險回憶的第一幀，或者是「林克被電擊而掉落道具」的第一幀。此外，投擲武器並在武器離開林克的第一幀暫停，接著讀檔也能達到相同的效果（此方法被稱為「Throw SLD」，適用於 1.1.2 版本），這種繼承方式沒有觸發 Zuggle，故不屬於 Zuggle Drop（Ver.1.2.0+ 以上為 Zuggle Drop）。",
      },
      {
        tab: "ZLOT",
        name: "並列繼承（Zuggle Load Object Transfer）",
        video: "ZLOT.mp4",
        tags: ["All Versions"],
        steps: [
          "將目標餘料糾纏在武器(盾牌)上",
          "[[Zuggle|totk-09#Zuggle]] 該武器(盾牌)",
          "傳送或讀檔後目標仍會存在於原座標",
        ],
      },
      {
        tab: "PSLOT",
        name: "永久存讀繼承（Permanent Save Load Object Transfer）",
        video: "PSLOT.mp4",
        tags: ["All Versions"],
        steps: [
          "將目標餘料糾纏於裝備",
          "將裝備__懲戒化（Purgatorify）__ 或 __幽體化（Ghostize）__",
          "目標在讀檔或傳送後仍會存在於相同座標",
        ],
        note: "※ 懲戒化和幽體化只是 PSLOT 的手段之一，並非只能用這兩種方法。詳細步驟細節可參考相關影片。",
      },
      {
        tab: "RL",
        name: "乾坤鎖 / 倒轉固定（Recall Lock）",
        video: "Recall Lock.mp4",
        steps: [
          "將目標 [[ZLOT|tab:ZLOT]] 或 [[PSLOT|tab:PSLOT]]",
          "對目標倒轉乾坤之後讀檔",
        ],
        note: "※ 再次對著目標倒轉乾坤可以解除。",
      },
    ],
    notes: [
      { text: "若 ZLOT 或 PSLOT 糾纏的物體是 __Invizuggle（無形並列）__、__Ghost（幽體）__、__Persistent Purgatory（持續型懲戒）__這種直到關閉遊戲都會永久存在的母物件，才會永久繼承。SLOT 本身通常是糾纏於非持續型無隱藏的懲戒裝備（Unculled Purgatory），這種只要離開一段距離或是傳送後懲戒狀態就會消失，與之糾纏的子物件又不會永久繼承。" },
    ],
    videos: [
      { id: "AdwFCk77JsE", title: "番外20.5 - 和林克無關聯的繼承！「永久跨檔繼承（PSLOT, Permanent Save Load Object Transfer）」", desc: "適用：All Versions" },
      { id: "fQ1WwnusSXk", title: "不廢話16 -「並列繼承（Zuggle Load Object Transfer）」與「乾坤鎖（Recall Lock）」", desc: "適用：全版本" },
      { id: "wUL-pHB2P7Q", title: "不廢話15 -「存讀繼承（Save Load Duping, SLD）」", desc: "適用：全版本" },
      { id: "-oifw9PKeh4", title: "回應03 - 錯過就不再的實用道具？「不壞的序章大師劍」與「料理效果轉移」", desc: "1.1.1版以前限定" },
    ],
  },

  "totk-11": {
    videoFolder: "totk-overload",
    methods: [
      {
        tab: "Zuggle",
        video: "Zuggle Overload.mp4",
        sections: [
          {
            title: "地圖並列法（Map Zuggle）",
            tags: ["～Ver.1.1.1"],
            steps: [
              "背對牆壁，按住 L 技能輪盤選到地圖",
              "技能輪盤消失、地圖開啟之前，連打並按住十字鍵打開武器(盾牌)快速選單",
              "丟棄裝備中的武器(盾牌)並切換裝備到另一個",
              "放開十字鍵打開地圖，按 + 號打開背包丟棄裝備中的武器(盾牌)",
              "步驟 1～4 一共要做 13+1 次（1.0.0 版做 9+1 次）",
            ],
          },
        ],
        note: [
          "※ Map Zuggle 的操作可套用在「虛化裝備（DI）」上（各版本適用）",
          "※「+1」表「箭」，標準 Zuggle 過載數為 14（1.0.0版為 10），因此在 Zuggle 13 個裝備之後，點擊 ZR 把箭拿出來也能剛好到達 Zuggle Overload，維持在按不按 ZR 能控制過載，可以避免過度過載（如：空手仍無法撿起裝備，會造成 Overload Pickup：「選單在林克身上，但是裝備在地上」的不同步現象）。（滿裝：頭身腳的套裝、武器、盾牌、弓、箭都呈「裝備中」的狀態）",
          "※ 丟棄裝備中的武器(弓/盾) → 切換裝備另一個，可以觸發「__臨時過載（Temporary Overload）__」，在關閉選單的瞬間會暫時增加 1 的負載量。",
        ],
        principle:
          "遊戲對林克身上的裝備依賴關係有一個總上限（33 個），其中林克自己本身部分模型（頭部、身體、腿部等）就佔用一部分且無法拆解。玩家只要再 Zuggle 或 Invizuggle 13 到 14 個（適用於 1.1.0+；1.0.0 版本為 9 到 10 個）武器、盾牌或弓箭裝備在林克身上、或 Zuggle Drop 在地上，就會把剩餘名額吃滿，進入「Zuggle Overload」的臨界狀態：此時只要切換裝備，系統偵測到依賴數超過上限，就會把優先度較低的裝備（相對於林克身體不可拆解的部位）與林克分離，選單雖然顯示裝備中，但該裝備會分離林克而掉落在地上，有時候甚至也無法操作操縱桿等執行結合互動的行為；讀檔或重新載入時，依照依賴的優先度，連帶讓林克身上的頭髮、衣服等外觀跟著分離。",
        principleExtra: {
          title: "延伸",
          items: [
            "Overload Drop（過載掉落）：裝備依賴數超過遊戲上限時切換裝備，系統會把優先度較低、可被拆解的裝備（相對於林克本身的部分模型不可拆解）與林克分離，選單上顯示為裝備中，但該裝備實際上已經掉落在地上。",
            "Temporary Overload（臨時過載）：丟切裝備中的道具可以在關閉暫停的一瞬間，增加 1 的負載量，同種類型裝備的臨時過載只會 +1，故最多能 +3。",
            "Overload Pickup（過載撿拾）：包含丟切裝備中的道具，裝備依賴數已經超過上限時試圖空手撿裝備，會發現選單顯示撿起來並裝備，但是該裝備的模型仍在原地沒有被撿起。通常 13 個 Zuggle Overload 的情形下，為了 Overload Pickup 身上會解除一項裝備來過載撿拾，這時候會搭配 Temporary Overload 來補負載量以便成功 Overload Pickup。",
            "Mitosis（過載分裂）：Overload Drop 盾牌(或武器) → 打開暫停丟切纏桿武器(或盾牌)並切換裝備另一個盾牌。",
          ],
        },
      },
      {
        tab: "Fuse",
        video: "Fuse Overload.mp4",
        sections: [
          {
            title: "餘料過載（Fuse Overload）",
            tags: ["All Versions"],
            steps: [
              "觸發 Zuggle Overload，並過載掉落一把武器(盾牌)，並且餘料在盾牌(武器)上",
              "丟出左納烏裝置，將裝置餘料在武器(盾牌)上，該裝置會被冷餘料飛到林克旁邊",
              "步驟 2 重複 30 次以上，直到冷餘料失敗，裝置穿到地面下即達餘料過載",
            ],
          },
        ],
        principle:
          "2023/11/3 【ultrababouin】, 【NghtmaR3】 玩家發現重複__冷餘料(CF)__多個物件，使餘料依賴數到達上限，抵達餘料過載的左納烏裝置啟動後就不會停止，例如火箭就會無限噴發。",
      },
      {
        tab: "SFO",
        video: "Super Fuse Overload.mp4",
        sections: [
          {
            title: "過載批次虛化法（Overload Batch DI route）",
            tags: ["All Versions"],
            steps: [
              "觸發 [[Zuggle Overload|tab:Zuggle]]",
              "進入神廟或蓋房子的小遊戲",
              "用 [[Overload Batch DI|totk-16#Batch DI]] 獲得 20 把虛幽化武器（武器 C1 ～ C20）",
              "Smuggle C1 裝備 C2，按 R 放開投擲武器，按 Y 讓腳下的武器黏回手上",
              "重複步驟 4 __懲戒化（Purgatorify）__20 把虛幽化的武器",
              "再用相反的裝備做一次 [[Overload Batch DI|totk-16#Batch DI]]，將 28 ~ 30 枚盾牌冷餘料在被懲戒化在手上的 20 把武器上，直到盾牌無法再被餘料為止",
              "按住 R 投擲材料，確認材料在地上表示環境已達 SFO",
            ],
            note: "※「相反的裝備」指的是原本的流程是用武器做的，下個流程就用盾牌操作。",
          },
          {
            title: "火把批次虛化法（Torch Batch DI route）",
            tags: ["All Versions"],
            steps: [
              "觸發 [[Zuggle Overload|tab:Zuggle]]",
              "用 [[Torch Batch DI|totk-16#Batch DI]] 準備虛幽化的武器，直到武器不再被[[假餘料|totk-06#PF]]在盾上的 Overload Drop 武器上為止",
              "撿掉無法再被[[假餘料|totk-06#PF]]的武器，將其消滅後，卸掉武器",
              "解纏 Zuggled 武器的兩個母盾牌（間接餘料掉母件虛化盾牌、火箭載走母件正常盾牌）",
              "裝備任意武器把 Zuggle 的武器（Batch DI 的[[冷餘料|totk-06#CF]]母物件）丟出來放在旁邊",
              "空手撿起批次虛化的武器，丟 → 切 → 卸 Smuggle 後，撿起下一把批次虛化的武器",
              "按住 R 放開投擲，按 Y 將腳下的武器黏回手上，丟 → 切 → 卸 Smuggle 裝備中的虛幽化武器",
              "重複步驟 6 ～ 7，最後一把 Smuggle 完裝備一般武器即可",
              "Zuggle 步驟 5 的武器，傳送到米法雕像旁邊的「伊黑恩阿神廟」",
              "卸下所有裝備（套裝、弓箭、盾牌）進入神廟",
              "丟棄武器，讓步驟 5 的武器保持 Zuggle Drop 的狀態",
              "裝備任意武器點擊 A 複製武器",
              "啟動浮空石放在兩個漂浮浮空石的中間，站在上面準備作業",
              "對著兩旁浮空石餘料建造，餘料到一半暫停丟 → 切 → 卸，裝備另一個步驟 12 複製的武器",
              "步驟 14 重複 14 次以上，依序空手撿起地上的浮空石武器，按住 R 放開丟出去解纏",
              "重複步驟 14 ～ 15，直到浮空石餘料沒反應，或是投擲浮空石武器後浮空石會成形並消失，不再幽體化",
              "裝備盾牌或弓箭或套裝，按住 R 投擲材料，確認材料在地上表示環境已達 SFO",
            ],
          },
        ],
        note: "※ 可以用於拿走序章薩爾達的火把（Torch），或米涅魯的雙臂（Arms）",
        principle:
          "2026/1/6 【mulberry】, 【Squidwest】 玩家發現並改良流程，核心原理是藉由逼近遊戲的全域依賴陣列（Global dependency array），使環境或甚至讓 NPC 手上的武器脫離 NPC 的附屬依賴，藉此讓玩家可以撿起 NPC 手上的裝備。",
      },
      {
        tab: "Constraint",
        sections: [
          {
            title: "束制過載（Constraint Overload）",
            tags: ["Ver.1.2.0+"],
            steps: [
              "準備虛幽化武器 W1 盾牌 A1、B1，並 W1 觸發可調式過載（Zuggle Overload）",
              "在阿卡萊隱藏區，丟切卸 Smuggle A1，餘料糾纏武器 A2 在 A1 上（Overload Drop 盾餘料到武器 → A2 餘料到盾）",
              "卸掉盾牌再裝備（或切換），丟棄裝備中的盾牌，讓 A1 保持 Zuggle Dropped",
              "丟切卸 Smuggle B1，裝備普通盾牌 B2，虛化感染一把武器 B3",
              "空手撿起 B1 再正常丟棄，解除 B1 的 Zuggle Dropped",
              "裝備 B2、丟切卸 Smuggle B3，過載撿拾 A2",
              "將 A2 的劍柄黏在樁上",
              "丟出大輪胎，對它餘料（第一次）",
              "再餘料一次大輪胎，特效到一半丟切卸盾牌 B2 虛化感染大輪胎",
              "重複 30次 步驟 8～10",
              "卸掉武器 A2 破壞掉盾牌上的餘料",
              "讀取阿卡萊存檔",
              "重複步驟 2 ～ 12，做出 10 組 300 個虛化大輪胎",
              "傳送並移動到「速射礦車遊戲」，利用 SDC 脫離小遊戲移動到要拆解的物件附近",
              "站在原地過載掉落一面盾牌穿過地面",
              "跳起來過載掉落一把武器，遠離一段距離背對牆壁，Fail Drop Cold Fuse 那把武器在盾牌上",
              "丟出一個大輪胎，餘料到武器上，讓它餘料飛到地圖外（Out-of-Bound）",
              "重複步驟 15 ～ 17 直到究極手操作上出現異常（卡住、無法沾黏物品，或已經黏在一起的物品可以再黏一次等等）",
              "切換到「倒轉乾坤」移動到目標附近，目標解體之後倒轉乾坤，並黏上蘋果收進藍圖",
            ],
          },
        ],
        note: [
          "※ 以上流程待確認。",
          "※「束制過載」本身全版本都能使用，上述流程僅說明 Ver.1.2.0+ 的步驟。",
        ],
        principle:
          "為了將兩個物理物件綁定在一起，遊戲會用一個「物理束制（Constraint）」來固定物件之間的互動關係。這包括連接兩個不同 Actor 的約束（如：究極手黏合膠），以及連接同一個 Actor 不同部分的約束（如：__彈簧的兩個部分__）。遊戲會在一個大小為 2560 的全域陣列中追蹤所有這些約束。當你填滿這個陣列時，遊戲會無法建立新的束制而解體。每隻馬在動畫處理上會使用 21 個束制。重複掃入一百餘隻__伊波娜馬__的 Amiibo 可以觸發該過載，即最早的「伊波娜過載（Epona Overload）」。若利用某些左納烏裝置（◯龍頭、◯輪胎）各會使用 4 個束制來成形，殘留 600 餘個就可以觸發束制過載。",
      },
    ],
    notes: [
      {
        text: "挑戰全域上限的過載（依賴數、束制數）在逼近最大值時都會非常不穩定，容易出現無限血月或是錯誤閃退。",
      },
      {
        text: "傳送到東北方空島的摩基薩里神廟可撿取米涅魯的雙手臂，讀檔到序章可以撿取薩爾達的火把。",
      },
    ],
    videos: [
      {
        id: "MWBVJsLTA0c",
        title: "番外21 - 無限耐久＆複製＆無限彈簧火箭盾！虛空次元歸來的「虛化裝備(Void Dip & DI)」原理解說與常用步驟示範（適用ver.1.2.1～）",
        desc: "代替 Invizuggle 的「可調式過載」！",
      },
      {
        id: "UIHuP5k0myM",
        title: "番外17 - 無限的代名詞！「過載(Overload)」全應用！（無限複製｜無限火箭｜無限跳躍）",
        desc: "過載後想怎麼用就怎麼用，不用電池！",
      },
      {
        id: "sqmtbNgdY1w",
        title: "番外24 - 偷走NPC手上的武器！「全域餘料過載(SFO)」拿走「薩爾達火把」和「米涅魯手臂」吧！（適用ver.1.2.0+｜Nintendo Switch 2）",
        desc: "偷走 NPC 手上裝備的方法！",
      },
    ],
  },

  "totk-12": {
    videoFolder: "totk-sneakstrike",
    methods: [
      {
        tab: "快速繞背",
        video: "20260729_normal sneakstrike_totk.mp4",
        steps: [
          "在魔物尚未發現玩家的情況下，對魔物造成一次攻擊",
          "魔物會轉向朝著攻擊來源（玩家當下位置）",
          "趁魔物轉向的過程中，快速移動到魔物身後",
          "按下 Y 進行偷襲",
        ],
      },
      {
        tab: "間接傷害",
        video: "20260710_sneakstrike_totk.mp4",
        steps: [
          "在魔物尚未發現玩家的情況下，用__非林克本人造成的傷害__（如環境傷害、遠端引爆物等）攻擊魔物",
          "魔物只會記錄__當時傷害來源的座標__，而不是玩家的實際位置",
          "直接從魔物身後或任意方向靠近，按下 Y 進行偷襲",
        ],
      },
    ],
    principleItems: [
      "在尚未被魔物發現的時候受到攻擊，魔物會儲存對攻擊來源的方向，一般來說會轉向當下玩家的所在座標，因此在魔物轉向的過程中移動到魔物後方就可以連續偷襲。",
      "另外，在魔物「受到攻擊 → 轉向攻擊來源」的期間，用__非林克本人造成的傷害__再次造成魔物的傷害的話，魔物只會記錄__當時被傷害來源的座標__，而非玩家的位置。",
    ],
    notes: [
      { text: "莫力布林的回頭機制比較特殊，有的時候會轉到攻擊來源的位置，而非林克身上。" },
    ],
    videos: [
      {
        id: "QWevjL_rbE8",
        title: "番外08(舊) - 300小時還不知道的12種玩法（~ver.1.2.1, Still Don't Know Until 300 Hours Play-Time）",
        at: 252,
      },
    ],
  },

  "totk-13": {
    videoFolder: "totk-gas",
    showEmptyMedia: true,
    methods: [
      {
        tab: "Cull Area",
        tags: ["All Versions"],
        video: "20240818_cull area_gas.MP4",
        steps: [
          "將會耗電的左納烏裝置餘料糾纏在盾牌上",
          "將左納烏裝置餘料建造在武器上",
          "把盾牌放在隱藏區，離開隱藏區讓盾牌隱藏",
          "揮動一次武器之後回到隱藏區，盾牌顯示出來後裝置會保持啟動中的狀態",
        ],
        note: [
          "上述步驟武器和盾牌可以對調。",
          "步驟 1 糾纏的母盾可以用「Zuggle + 使用掉火箭盾」「氣球解纏」來解纏掉裝置，武器則無法。",
        ],
      },
      {
        tab: "Mineru FE",
        tags: ["All Versions"],
        video: "20260720_mineru fe_gas.mp4",
        steps: [
          "準備[[纏桿武器或盾牌|totk-08#Portacull]]",
          "騎上米涅魯啟動餘料對準會耗電的左納烏裝置",
          "米涅魯餘料的瞬間同時打開暫停或快速選單丟棄步驟 1 的纏桿裝備，並裝上另一個同類型裝備",
          "將步驟 2 的裝置餘料建造在任意武器或盾牌上",
          "爬到高處或米涅魯會消失的位置使用一次裝置（揮武器或舉盾）",
          "回到平地讓米涅魯顯示出來，裝置會保持啟動中的狀態",
          "騎上米涅魯餘料任意物品覆蓋掉左納烏裝置",
        ],
      },
      {
        tab: "Drop Swap",
        tags: ["Ver.1.2.0+"],
        video: "20260720_drop swap_gas.mp4",
        steps: [
          "將會耗電的左納烏裝置餘料糾纏在盾牌上",
          "將左納烏裝置餘料建造在武器上",
          "往前衝刺，並在衝刺中按暫停",
          "丟出 4 把以上裝備（武器 / 盾 / 弓），最後丟棄糾纏盾並裝備另一個盾牌觸發盾牌__丟切隱藏（Drop Swap Cull）__",
          "推著方向鍵的同時，輸入「+ → Y → +」，快速關閉暫停之後衝刺攻擊，在盾牌掉出來之前再打開暫停。",
          "手持任意材料中止衝刺攻擊後關閉暫停",
        ],
        note: [
          "只能用在武器GAS。",
          "步驟 3 的動作稱作「Buffer Drop（緩衝丟棄，用來延遲目標掉落的時機）」，在 NS1 需要較多的裝備（7把以上）。",
          "步驟 1 糾纏的母盾可以用「Zuggle + 使用掉火箭盾」「氣球解纏」來解纏掉裝置。",
          "槍按 Y 拿出來，可以不衝刺、不手持材料，原地攻擊也能觸發。",
        ],
      },
      {
        tab: "Zuggle",
        tags: ["All Versions"],
        video: "20260720_zuggle_gas.mp4",
        steps: [
          "Zuggle一個盾牌",
          "裝備同類型的盾牌",
          "餘料建造目標左納烏裝置",
          "丟棄裝備中的盾牌，撿起步驟 1 的盾牌（看不到裝置）",
          "走到遠處使用一次裝置",
          "回到步驟 2 的盾牌旁邊",
        ],
        note: [
          "上述步驟武器和盾牌可以對調。",
          "步驟 1 糾纏盾可以用「Zuggle + 使用掉火箭盾」「氣球解纏」來解纏掉裝置，武器則無法。",
        ],
      },
    ],
    principle:
      "2023/6/12 Venaticus 提出一個能讓左納烏道具自動持續使用的方法，爾後因不同版本，或由玩家發展出其他觸發方式。舊版本（～Ver.1.1.2）可以藉由裝備單手劍和餘料好裝置的盾牌，按住 ZL，按 Y 揮武器啟動雷龍頭，讓系統在同一幀判定「電掉中斷」+「你正要使用裝置」，讓盾牌上的裝置可以恆常啟動，也是 Guard-less Active Shield 名稱的由來。新版本主要是想辦法「讓裝置被隱藏時啟動它」，這樣裝置只會記得它要啟動，沒有關閉。通常配合餘料糾纏或相似的程錯來達成這樣的遠端操作。",
    notes: [
      { text: "武器GAS不會消耗電池；盾牌GAS則會消耗電池。" },
      { text: "再次使用GAS的裝置就會解除程錯。" },
      { text: "除了某些過場動畫，身上若裝備著GAS的武器或盾牌，林克的「重生座標（Safe Respawn Coordinates）」不會被更新，也就是下次溺斃、掉入深淵，會重生在觸發GAS的位置，而非上一次正常站立於地圖位件上的位置。" },
      { text: "可以搭配 [[ARAZ|totk-01#ARAZ]]，把裝置餘料建造到 Zuggled 的同類型裝備上，再將糾纏的本體帶到裝置啟動範圍外揮動／格擋。" },
    ],
    videos: [
      { id: "eXGglGGWwO4", title: "不廢話23 -「恆動餘料左納烏 - GAS（Guard-less Active Shield）」", desc: "全版本適用｜但本片為針對1.2.X的流程" },
      { id: "kxGm05yjyM8", title: "不廢話22 -「暴打彈簧 - ARAZ（Attached Rangeless Active Zonai）」", desc: "可搭配 GAS 使用" },
    ],
  },

  "totk-14": {
    videoFolder: "totk-duplication",
    methods: [
      {
        tab: "MSD",
        name: "YB複製法（Midair Sort Duplication）",
        tags: ["～Ver.1.1.1"],
        steps: [
          "讓林克處於空中狀態（盾跳、滑翔翼，或站在米涅魯上）",
          "打開暫停選單並持有道具",
          "按 Y 排序選單，同時關閉選單",
          "撿起道具",
        ],
        note: [
          "※ 也可搭配左納烏裝置使用，取出裝置但不會扣減背包中的實際總數（複製左納烏裝置請參考 ZSD）。",
          "※ Y 鍵與「退出選單」必須在同一幀按下。",
        ],
        principle: "在空中複製材料：於空中狀態下暫停並持有道具，同一幀內排序選單並關閉選單即可複製。",
      },
      {
        tab: "ZSD",
        name: "左納烏YB複製法（Zonai Sort Duplication）",
        tags: ["～Ver.1.1.1"],
        steps: [
          "讓林克面向牆壁或懸崖，站在一個不會太近、但又足夠靠近的距離",
          "取出想要的數量的左納烏裝置",
          "排序選單並同時關閉選單，做法和 MSD 一樣",
        ],
        note: [
          "※ 若遊戲出現延遲(lag)，代表這次會成功；如果沒有延遲，代表站得太近了。如果道具數量減少、不變，或跟你取出的數量對不上，就代表失敗，或是部分左納烏裝置已經生成到世界中了。",
          "※ 想要更穩定的做法：離牆面約 3 次盾反的距離，只要牆面夠寬通常有效；如果遊戲沒有延遲，試著離遠一點，但林克仍要面向牆壁；轉角牆面或密閉空間（例如濱海科技實驗室）效果最好。",
        ],
        principle: "把左納烏零件複製回背包，做法與 MSD 相近，但需面向牆壁或懸崖以觸發遊戲的延遲(lag)判定。",
      },
      {
        tab: "MTD",
        name: "投擲複製法（Midair Throw Duplication）",
        tags: ["All Versions"],
        steps: [
          "背包裡只留 1 個想複製的道具，找一個夠高的懸崖邊",
          "按住 R 選取該道具，讓林克手持該物品",
          "走下懸崖，同時立刻按方向鍵上開啟快捷選單，接著放開 R，再按 X 丟下手持的物品",
          "重複最多 20 次，然後撿起複製出來的道具",
        ],
        principle: "可複製任何能丟擲的道具，包括左納烏膠囊。",
      },
      {
        tab: "DS",
        name: "扭蛋機儲存（Dispenser Storage）",
        tags: ["All Versions"],
        steps: [
          "把一個不太會滑動的重物放進左納烏裝置產生器（Dispenser）",
          "產生器的艙門應保持開啟，若沒有請重試",
          "取出一個穩定器並啟動它",
          "用究極手把穩定器放進艙口，卡住艙門讓它保持無限期開啟",
          "把想要的道具全部放進產生器，這些存放的道具數量可以超過 21 個上限",
          "想收取時，把穩定器從艙口移開，讓道具全部掉出來。要盡快撿，超過 21 個上限的部分會開始消失(despawn)",
        ],
        note: [
          "※ 可搭配 SID 或 MTD 一起使用，以達到道具數量上限。",
          "※ 在艙口旁放一個風扇或穩定器，可以讓艙門下次打開後不會關閉。",
          "※ 用兩個以 45 度角餘料在一起的風扇可以卡住產生器，避免穩定器有效時間限制的問題（頂部的風扇也可換成一顆小石頭）。",
        ],
        principle: "利用左納烏裝置產生器（Dispenser）作為暫存空間，繞過地面道具 21 個上限。",
      },
      {
        tab: "HSD",
        name: "持物儲存複製（Horse Storage Duplication）",
        tags: ["All Versions"],
        steps: [
          "在一匹馬身上啟動 Hold Storage",
          "騎在馬上，把該道具全部丟到地上，直到一個都不剩",
          "跳下馬，把 hold stored 的道具丟到地上",
          "把所有道具撿起來",
        ],
        principle: "透過 Hold Storage 複製道具，此招又稱 Minus Dupe。",
      },
      {
        tab: "DUD",
        name: "Double Unfuse Duplication",
        tags: ["All Versions"],
        sections: [
          {
            title: "Method 1【鯉神 Li Shen】",
            steps: [
              "拔出一把弓",
              "餘料一個道具到箭矢上",
              "暫停",
              "丟棄裝備中的弓，並切換到另一把弓",
              "快速關開暫停（Pause Buffer）",
              "丟棄新裝備的弓",
              "解除暫停",
              "從步驟 1 重複",
            ],
          },
          {
            title: "Method 2【mulberry】",
            steps: [
              "Zuggle 一把或多把弓",
              "裝備另一把弓",
              "餘料一個道具到箭矢上",
              "丟棄裝備中的弓",
              "從步驟 1 重複",
            ],
          },
          {
            title: "Method 3【mulberry】",
            steps: [
              "對一把或多把弓做 Drop Zuggle，或 Detached Drop Zuggle",
              "裝備另一把弓",
              "餘料一個道具到箭矢上",
              "丟棄裝備中的弓（不會影響你的 Drop Zuggle）",
              "從步驟 2 重複",
            ],
          },
        ],
        note: [
          "※ Method 1｜由於「D-Pad Lock」的加入，1.1.2 版以後必須對第一把弓使用 Void Dipping(VD)或 DI，才能在正確時機丟掉第二把弓（VD/DI 繞過法由 【ArmindoEmiya】 於 2026/1/21 發現）。",
          "※ Method 2、3｜此招在 Switch 1 上最多可複製 2 個材料，Switch 2 上最多可達 5 個；Zuggle／Drop Zuggle 的弓越多，成功率越高，也更有機會一次複製到多份；對每把弓的 FE parent 做 Zuggling／Zuggle Dropping，可以讓它們在處理順序中更接近，提高成功率。",
          "※ 除非有特殊情況，或針對難以在產生器中找到的特定左納烏裝置，一般來說不如更快的複製方法划算。",
        ],
        principle: "可複製任何能餘料到箭矢上的材料，包括左納烏裝置。此程錯依賴弓的處理順序（processing order），順序可以一定程度上被操控，但永遠帶有隨機性，載入的物件越少，成功率越穩定。",
      },
      {
        tab: "SID",
        name: "Split Item Duplication",
        tags: ["Ver.1.2.0+"],
        video: "SID.mp4",
        steps: [
          "對目標素材做堆疊拆分(Stack Splitting)，拆成 1 個一堆、以及另一堆 2 個(以上)",
          "進入任意空中狀態（盾滑、滑翔翼、米涅魯等），然後暫停",
          "從第二堆（拆出來、數量較多的那堆）拿起你能拿的最大數量",
          "排序選單，或是打開地圖",
          "解除暫停",
        ],
        principle: "透過堆疊拆分(Stack Splitting)複製材料：把同種素材拆成數量不同的兩堆，在空中狀態下暫停時拿取較大堆的最大數量，再排序選單或開地圖後解除暫停即可複製。",
      },
      {
        tab: "ZISD",
        name: "Zonai Inventory Shift Dupe",
        tags: ["All Versions"],
        video: "ZISD.mp4",
        steps: [
          "準備一顆要丟的膠囊（做法同 MTD）",
          "走下懸崖邊緣（往下墜落）",
          "打開暫停選單（按 +）",
          "選擇「取出」選項，選取「想複製裝置」旁邊那個數量 10 的裝置，取出 10 個",
          "不要離開選單，切到地圖畫面（按 −），並觀看一段回憶",
          "切回 Zonai Devices 分頁（按 +），然後退出選單",
        ],
        principle: "利用回憶緩衝(Memory Buffering)和 MTD 複製左納烏裝置。需求：要複製的裝置至少 1 個，另一個裝置要有 10 個，且在選單中排序要緊接在「想複製的裝置」之後（即在暫停選單中位於其右側）。",
      },
      {
        tab: "BID",
        name: "捆包複製法（Bundled Item Duplication）",
        tags: ["All Versions"],
        steps: [
          "設置纏桿隱藏(SDC Culling)或類似的操縱桿隱藏（部分地點比其他地點更穩定；萊克吞出沒的地點效果很差）",
          "在林克隱藏前 1 幀持有一個道具（若這個時機點抓不準，可改為：觀看回憶來解除隱藏，在回憶播放期間按住 L 且不放開，等 1 秒，再解除暫停並選擇地圖，需要抓到特定的隱藏時機）",
          "用某種方式移除該道具，其中一種方法是讓馬吃掉它（只對蘋果有效）",
          "把移除後的道具丟到地上",
          "騎上馬，讓隱藏停止",
          "下馬，並持有 5 個剛才移除的道具",
          "解除暫停",
          "放開持有其中 4 個道具，改成持有你想複製的道具",
          "準備丟出一個道具，這樣才能撿東西",
          "要複製時：先取消持有一個複製出來的道具，再重新持有它，然後解除暫停",
          "撿起道具，並重複步驟 9～11",
        ],
        principle: "用特定方式隱藏丟棄一個道具並讓它移除，會讓它進入「持有其他道具時不斷重生」的狀態，可以大量複製。",
      },
    ],
    notes: [
      { text: "修改中" },
    ],
    videos: [
      { id: "pmY_7ixbOjc", title: "1.1.2的複製挺像舊版的YB法 (Credit: Zas & BigDUCCO) #薩爾達傳說 #switch #王國之淚" },
      { id: "RwfdAWe-S18", title: "回應01 - 1.2.0版可以複製武器嗎？「萊克虛幻手持法(LLSD)」甚至幫你詞綴轉移！（1.1.0~1.2.0限定）" },
      { id: "22lm85F5rTc", title: "1.2.1版『投擲增殖法』快速說明(New setup: Cupcakesupream) #王國之淚 #薩爾達傳說 #nintendoswitch" },
      { id: "BhOnDZf5kV8", title: "不廢話13 -「投擲複製法(MTD, Midair Throw Duplication)」(適合：全版本)" },
      { id: "hfWHsO1-zg4", title: "番外12 - 不用馬不用狗！詳解『捆包無限材料增殖(Bundled Item Duplication)』！（程錯原理與流程說明）" },
      { id: "s8wXxO8Lzis", title: "番外12(會員) - 不一定要在一始村！２種另類流程觸發『捆包無限材料增殖(Bundled Item Duplication)』(請以暫停觀看字幕)！" },
      { id: "wUL-pHB2P7Q", title: "不廢話15 -「存讀繼承(Save Load Duping, SLD)」(適用：全版本)" },
      { id: "UIHuP5k0myM", title: "番外17 - 無限的代名詞！「過載(Overload)」全應用！（無限複製｜無限火箭｜無限跳躍）" },
      { id: "MWBVJsLTA0c", title: "番外21 - 無限耐久＆複製＆無限彈簧火箭盾！虛空次元歸來的「虛化裝備(Void Dip & DI)」原理解說與常用步驟示範（適用ver.1.2.1～）" },
      { id: "NYjm4oqBsRo", title: "番外12(NS2) - 高效率無限複製道具！快速示範『捆包複製法(BID, Bundled Item Duplication)』！" },
    ],
  },

  "totk-15": {
    videoFolder: "totk-sbr",
    methods: [
      {
        tab: "SBR",
        name: "盾擋重置（Shield Block Reset）",
        video: "SBR.mp4",
        steps: [
          "裝備耐久度夠高、不會因為格擋而損壞的盾牌",
          "按住 ZL 舉盾，「左搖桿 ←/↑/→ ＋ X」鎖定跳的同時在空中盾擋傷害",
          "在空中「左搖桿 ←/↑/→ ＋ X」第二段跳 → ZR 或 ZR＋Y",
        ],
      },
      {
        tab: "Bomb SBR",
        name: "斬彈二段跳（Bomb Shield Block Reset）",
        video: "Bomb SBR.mp4",
        steps: [
          "裝備單手劍，按 Y 揮劍",
          "十字鍵按▲，丟出一個炸彈花（或是本身劍上已經餘料一個炸彈花）",
          "炸彈花引爆的瞬間，左搖桿往前，並且按住 ZL + X 往前鎖定跳，在空中格擋炸彈花的爆風",
          "在空中「左搖桿 ←/↑/→ ＋ X」第二段跳 → ZR 或 ZR＋Y",
        ],
        note: "※ 若武器餘料火焰犄角（古慄歐克或奧爾龍），用武器的火焰餘波點燃炸彈的話，步驟 3 的 ZL+X 往前跳的時機可以比較餘裕。",
      },
    ],
    principle: "《曠野之息》2017/3/10 由 【Pewable】 首度發現並應用於神廟特解，2018/6/17 【Yuda】 首度沿用至戰鬥上。在《王國之淚》也並未被修正。盾擋非因重擊而後撤型的傷害會重置跳躍判定，因此在空中盾擋此類型傷害時可以在空中進行第二段跳，由於存在足夠的高低差，按 ZR 拉弓可以進入子彈時間，是大部分戰鬥風格或技巧的祖先級程錯。",
    notes: [
      { text: "鎖定跳必須帶有「方向」，原地跳雖然可以第二段跳，但通常高度不足無法進入子彈時間，此種 SBR 僅有弊無利。" },
    ],
    videos: [
      { id: "zFLuHyITm00", title: "番外01 - 實用技巧攻略(一)｜王國之淚也通用的曠野之息技巧解說！（ver.1.2.0版）", desc: "06:27～開始有提到「盾擋重置」的沿用！" },
    ],
  },

  "totk-16": {
    videoFolder: "totk-di",
    methods: [
      {
        tab: "Void Dip",
        name: "深淵虛化（Void Dip / Abyss DI）",
        video: "Void Dip.mp4",
        steps: [
          "前往火之神殿入口左側有放水栓的岩漿河（尾端下方有深淵判定），關閉放水栓避免產生石板",
          "米涅魯糾纏想虛化的裝備（可在此時餘料材料，該材料虛化後可無限使用）",
          "在岩漿河的末端角落放一個操縱桿，背對岩漿操作一秒後放開，連續跳躍確認糾纏的裝備是否處於點滅閃爍的__靈薄(Limbo)狀態__",
          "確認可利用反覆跳躍來控制裝備的「隱藏(Cull)」後，按下十字鍵將糾纏的裝備丟棄，在裝備沉下去的過程中持續跳躍，讓裝備接觸深淵開始淡出刪除時，被隱藏中斷裝備死亡",
          "騎上米涅魯隨意餘料材料覆蓋步驟 2 的裝備__解除糾纏(Detangle)__",
          "爬進岩漿河末端，空手將裝備撿起",
        ],
      },
      {
        tab: "DI",
        name: "吞噬虛化（Eaten DI）",
        intro: "此方法需要配合「閃藏」與「氣球解纏」技巧：",
        video: "DI.mp4",
        steps: [
          "前往西南方神廟尋找莫爾德拉吉克，並米涅魯糾纏想要虛化的裝備",
          "下去沙漠的地面，丟出一個操縱桿，將步驟 1 的裝備丟在操縱桿旁邊",
          "操作操縱桿之後放開，跳個幾下，確認米涅魯是消失的，且裝備在地上會點滅呈現__靈薄(Limbo)狀態__",
          "吹哨或移動，誘導拉吉克吞噬林克",
          "拉吉克吃掉操縱桿、咬完林克之後回去撿裝備",
          "騎上米涅魯隨意餘料材料覆蓋步驟 1 的裝備__解除糾纏(Detangle)__",
        ],
      },
      {
        tab: "Ghost DI",
        video: "GDI.mp4",
        sections: [
          {
            title: "虛化感染（GDI, Ghost DI / Infection）",
            tags: ["Ver.1.2.0+"],
            steps: [
              "先將裝備吞噬虛化（Eaten DI）",
              "丟→切→卸步驟 1 的裝備",
              "裝備另一個同類型裝備",
              "開啟餘料對準要感染的武器或盾牌",
              "執行餘料建造，特效與音效發生中的情形下按 + 暫停",
              "丟→切→卸步驟 3 的裝備",
              "撿起__假餘料(PF)__並被虛化的裝備",
              "用火箭送走步驟 6 掉在地上的裝備",
              "撿起步驟 1 的裝備，重複步驟 2，隨意餘料建造一顆蘋果或左納烏道具，不需要暫停中斷",
              "丟棄裝備，虛幽化感染完成",
            ],
            note: "※ 連續感染 13 次保持 Zuggle Drop，並把一般母物件用火箭送走可觸發可調式的 Zuggle Overload，只要將任意 Zuggle Drop 轉成 Normal Drop 就可脫離過載。",
          },
        ],
      },
      {
        tab: "Batch DI",
        name: "批次虛化（Batch Despawn Interrupt）",
        video: "Torch Batch DI.mp4",
        sections: [
          {
            title: "魔物批次虛化（Enemy BDI）",
            steps: [
              "準備一個虛化盾牌 S1",
              "丟→切→卸 Smuggle S1，裝備盾牌 S2，丟出一把武器 W1，餘料 W1 在盾上到一半暫停丟→切→卸",
              "把 W1 從 S1 上解纏",
              "準備一個纏桿餘料在米涅魯上，不必靠牆，用__米涅魯地圖並列__ Zuggle Drop 一把武器 W2",
              "空手撿起 W1 和 S2 裝備起來，W1 丟棄失敗兩次 Zuggle 起來（不能單純 Smuggle）",
              "搜集武器填滿欄位",
              "究極手拉其他物品 P 黏著 W2，究極手拖動 P 移動到魔物附近，晃掉 W2 讓魔物撿",
              "在 W2 前有撿拾判定時，魔物撿起的瞬間按 A 撿拾，若魔物手上的武器仍有撿拾判定表示成功「__魔物扒竊（Enemy Pickpocket）__」，此時把魔物冰凍起來避免作業中的時候他攻擊過來",
              "裝備任意武器按 R 投擲丟掉，並撿起魔物手上的 W2",
              "將要批次虛化的目標裝備餘料建造在武器上，目標會飛到魔物手上的 W2",
              "再次餘料 W2，餘料到一半暫停丟→切→卸",
              "重複步驟 9 ～ 11，直到虛化完所有目標",
              "電擊魔物卸裝魔物手上的 W2，讓它回到林克手上",
              "丟棄 W2 就可以撿武器上的虛化裝備",
            ],
            note: [
              "※ 用究極手直接去拖拉 W2，Zuggle Drop 會被解除。",
              "※ W2 是否是 Zuggle Dropped，可以倒轉 W2 後通天術，若倒轉被解開表示 W2 是 Zuggle Dropped。",
            ],
            videoUrl: "https://youtu.be/719HZdJmPAw",
          },
          {
            title: "過載批次虛化（Overload BDI）",
            steps: [
              "準備一個虛幽化盾牌 S1、虛幽化武器 W0",
              "用 W0 觸發[[可調式並列過載（Zuggle Overload）|totk-11#Zuggle]]",
              "空手撿起虛幽化盾牌 S1，丟→切→卸 Smuggle S1，裝備盾牌 S2，丟出一把武器 W1，餘料 W1 在盾上到一半暫停丟→切→卸",
              "關閉暫停，撿起 S1 再次丟→切→卸 Smuggle，__過載掉落（Overload Drop）__一個盾牌 S2，餘料在任意武器 W3 上，丟出一把武器 W4，將 W4 餘料盾牌上，此時 W4 會餘料糾纏於 S1 上",
              "切換或卸裝盾牌後丟棄盾牌，讓 S1 保持 Zuggle Drop 的狀態",
              "卸掉武器，空手撿起掉在地上的 W1 和 S2 裝備起來",
              "丟切卸 Smuggle W1，武器為空手的狀態走到 W4 前面出現撿拾判定",
              "暫停，丟→切裝備中的弓箭",
              "快速輸入 B 或 + → A，關閉暫停的瞬間__過載撿拾（Overload Pickup）__W4",
              "將 W4 黏在一個樁上，讓它能夠垂直向上、劍柄朝下，目的是待會讓餘料過去的裝備能夠固定掉落在同一個地方，也避免不小心餘料到 W4（會直接產生錯誤閃退）",
              "將批次虛化的目標裝備餘料建造在__武器__上，目標會飛到 W4 那裡",
              "再次嘗試餘料目標在__武器__上，餘料到一半丟→切→卸裝備中的 S2",
              "撿起 S2 重複步驟 11，就可以大量製造虛化裝備",
              "想結束批次虛化時，背對牆壁丟棄裝備中的武器讓 W4 回到林克身上，丟棄武器就可以撿 W4 上的虛化裝備",
            ],
            note: "※ 步驟 1 ～ 11 武器和盾牌可以交換。",
            videoUrl: "https://youtu.be/8llO2ESRO78",
          },
          {
            title: "火把批次虛化（Torch Batch DI）",
            steps: [
              "準備一個虛化盾牌 S1，丟→切→卸 Smuggle S1，裝備任意盾牌 S2",
              "感染一個虛幽化武器 W1，觸發[[可調式並列過載（Zuggle Overload）|totk-11#Zuggle]]，解纏 S1",
              "裝備 W1 並丟→切→卸 Smuggle W1，究極手把 S2 放到隱藏區靠牆",
              "丟一個火把靠近隱藏區牆壁並和 S2 黏合",
              "丟出火龍頭對準火把端部",
              "過載掉落武器 W2，餘料在盾牌上",
              "將要批次虛化的目標丟地上，啟動火龍頭點燃火把",
              "餘料目標到武器上（第一次只是飛過來）",
              "按住 L 切換到倒轉乾坤並啟動",
              "在倒轉乾坤啟動時再按住 L 切換到餘料建造，輪盤消失的瞬間、火把隱藏前點擊 Y [[假餘料(PF)|totk-06#PF]]到武器上（第二次）",
              "重複步驟 8 ～ 10 即可批次虛化",
            ],
            note: "※ 背對牆壁丟棄武器讓 W2 回到林克身上就可以正常丟棄武器。",
            videoUrl: "https://youtu.be/wbpaPhG6hUQ",
          },
        ],
      },
    ],
    principleSections: [
      {
        title: "歷史",
        text: "最早在 2024/6/16 由 【mulberry】 玩家發現，但仍未解其應用。於 2025/12/29 【Squidwest】 在北方深淵、掉落判定的地方發現，稱呼為「Void Dip」，中文 Yuda 稱作「深淵虛化」，而後來玩家了解其__裝備死亡（刪除機制）__的原理後，利用部分魔物會有吞噬並刪除裝備的行為，來觸發「吞噬中斷消滅（Eaten Despawn Interrupt）」。由於後者的實用性較高，且其原理都是中斷裝備死亡，故後來英文社群多採用「DI (Despawn Interruption)」稱呼此程錯，中文則保留「虛化」的名稱。",
      },
      {
        title: "原理",
        text: "遊戲系統刪除物品的方式分為「瞬間刪除」（如撿起物品）與「淡出刪除」（如掉進深淵）。當裝備在執行「淡出刪除」的過程中，玩家若刻意利用系統機制「隱藏(cull)並解除隱藏(uncull)」該裝備，就能強行終止刪除流程。這會保留該裝備「已經死亡」的特性，使其卡在特殊狀態，也就是所謂的「虛化」。",
      },
      {
        title: "延伸",
        items: [
          "Smuggle：丟棄失敗 或 丟切卸 DI，即「丟棄 DI → 裝備其他同類型裝備並卸掉」",
          "Zuggle：丟棄失敗 2 次，或 Map Zuggle",
          "Dynamic Zuggle：Smuggle DI 武器 → 關閉暫停 → 裝備另一把 DI 武器 → 投擲瞬間打開背包丟棄裝備中的武器 → 裝備其他武器",
          "Drop Smuggle：過載撿拾 DI → Smuggle → 空手撿起 DI",
          "Drop Zuggle：Drop Smuggle → 丟切卸裝備中的 DI → 裝備其他同類型的裝備 → 丟棄",
          "Drop Purgatorify：Drop Smuggle → 丟棄裝備中的 DI",
          "Throw Purgatorify：Smuggle DI 武器 → 裝備其他武器 → 投擲",
        ],
      },
    ],
    notes: [
      { text: "吞噬刪除的優先度較高，因此裝備中的狀態下去撿吞噬虛化的裝備不會刪除該裝備，可以無限複製。" },
      { text: "裝備虛化完後須先「並列裝備 (Zuggle)」，否則傳送或切換會失去虛化效果。可以背對牆壁 Map Zuggle，或背對牆壁丟棄失敗 2 次。若無牆壁，可以丟→切→卸讓其 Smuggle，再隨便裝備一把武器關閉暫停，打開暫停丟棄後直接讀檔。" },
      { text: "耐久度與消耗：虛化裝備被標記為死亡狀態，因此無論怎麼使用都不會消耗耐久度，丟擲不會碎裂，附著在上面的餘料也不會被消耗。" },
      { text: "能力免疫：虛化裝備不受究極手、倒轉乾坤影響，也無法被直接餘料建造。若要進行餘料建造，必須採用「間接餘料」的方式（詳見影片說明）。" },
      { text: "吞噬虛化的特性：由大青蛙或砂鯨魚觸發的吞噬虛化，其「刪除的優先度」較高，因此撿起時物理模型不會消失，可以用來複製裝備。" },
      { text: "「虛幽化（Ghost DI）」：虛幽化裝備本身帶有 __PSLOT（無關聯跨檔繼承）__的功能。" },
    ],
    videos: [
      {
        id: "MWBVJsLTA0c",
        title: "番外21 - 無限耐久＆複製＆無限彈簧火箭盾！虛空次元歸來的「虛化裝備(Void Dip & DI)」原理解說與常用步驟示範（適用ver.1.2.1～）",
        desc: "用途非常廣、不消耗耐久的裝備狀態",
        at: 1233,
      },
    ],
  },

  "totk-17": {
    videoFolder: "totk-pocket rockets",
    methods: [
      {
        tab: "PR",
        name: "口袋火箭（Pocket Rockets）",
        video: "PR.mp4",
        tags: ["All Versions"],
        steps: [
          "餘料糾纏一個火箭在盾牌上",
          "將火箭正常餘料建造在武器上",
          "往前踩盾跳（X → ZL + A）後，按住 A 後連打 B",
        ],
        note: "※ 各種版本有不同方法的餘料糾纏，只要能糾纏火箭的皆通用。",
      },
      {
        tab: "IPR",
        name: "無限口袋火箭（Infinite Pocket Rockets）",
        video: "Overload IPR.mp4",
        sections: [
          {
            title: "虛化假餘料法（PF on DI）",
            tags: ["Ver.1.2.0+"],
            steps: [
              "到沙漠區找拉吉克觸發虛化武器，Zuggle 它讀取阿卡萊的檔案",
              "先把虛化武器放旁邊，觸發纏桿，並將纏桿餘料在米涅魯上",
              "YeeFE 火箭在盾牌上，關閉米涅魯",
              "裝備虛化武器 W1，丟棄 W1 → 切換 → 卸掉，關開暫停裝備另一把武器 W2",
              "對著火箭餘料建造，餘料到一半暫停丟棄 → 切換 → 卸掉裝備中的武器",
              "把掉在地上的火箭武器（非虛化的）撿起來，往前踩盾跳（X → ZL + A）後，按住 A 後連打 B",
            ],
          },
          {
            title: "過載 + 虛化法（Overload + DI）",
            tags: ["Ver.1.2.0+"],
            steps: [
              "準備虛化盾牌 S1 + 並列過載（或可調式並列過載）",
              "丟棄 S1 → 切換 → 卸掉，並裝備另一個盾牌",
              "過載掉落一個盾牌，餘料在武器 W1 上，丟出一個火箭餘料在盾牌上",
              "把 W1 丟在地上，裝備另一把武器 W2，把地上的火箭餘料在 W2 上",
              "對 W1 按 A 撿起，撿到一半暫停丟棄 W2 → 切換 → 卸掉",
              "撿起掉在地上的火箭武器，切換盾牌後丟棄裝備中的盾牌",
              "撿起 S1 虛化火箭盾，往前踩盾跳（X → ZL + A）後，按住 A 後連打 B",
            ],
          },
        ],
      },
      {
        tab: "UPR",
        name: "究極口袋火箭（Ultimate Pocket Rockets）",
        video: "UPR.mp4",
        tags: ["All Versions"],
        steps: [
          "準備虛幽化武器 W1 和 虛幽化盾牌 S1，Zuggle 起來讀檔到阿卡萊",
          "在阿卡萊用 W1 觸發可調式並列過載",
          "丟棄 W1 → 切換 → 卸掉，並裝備另一個武器",
          "過載掉落一把武器，餘料在盾牌上，丟出一個熱氣球餘料在武器上",
          "切換武器後丟棄武器，把 W1 放在後面",
          "把熱氣球移動到貼著牆壁，倒轉乾坤之後再次讀檔到阿卡萊（乾坤鎖）",
          "準備一個風扇盾，並用過載掉落準備纏桿，將纏桿餘料在任意武器 W2 上",
          "空手撿起風扇盾，對準熱氣球中心按住 ZL 啟動風扇",
          "用纏桿武器 W2 __Invizuggle 或 懲戒化（Purgatorify）__ 風扇盾",
          "丟棄 S1 → 切換 → 卸掉 Smuggle S1，過載掉落一個盾牌 S2",
          "距離 S2 一段距離背對牆壁丟出一個火箭，啟動餘料對準火箭",
          "打開盾牌的快速選單，按 X 丟棄裝備中的盾牌",
          "快速選單消失後瞬間同時按 ZL 和 +，背景火箭有綠色光暈表示成功，解除暫停會看到火箭飛到 S2 那",
          "丟棄裝備中的盾牌，把 S1 撿起來",
          "對著火箭按 A 舉起來，將火箭放在熱氣球中心被風吹著",
          "往前踩盾跳（X → ZL + A）後，按住 A 後連打 B",
        ],
        note: "※ 步驟 15 的火箭不能用究極手移動。",
      },
    ],
    principle:
      "利用彈簧與盾牌連續發射組合出的「連噴火箭盾（Pocket Rockets）」，可不消耗耐久地持續向上推進，是抵達地圖高處等隱藏區域的重要手段。",
    notes: [
      { text: "連噴火箭有很幾十種觸發方式，以上僅列出幾種。" },
    ],
    videos: [
      { id: "h7MpbgUvizw", title: "番外22 - 永久連噴、不會消耗的「無限/究極口袋火箭（Infinite/Ultimate Pocket Rockets）」！百科級流程說明（適用ver.1.1.2～）" },
      { id: "7DS_ZmOVuR8", title: "番外23 - 海拉魯西方那座高山用火箭可以上去嗎？IPR 和 LSW 的挑戰！（ver.1.4.3｜Nintendo Switch 2）" },
      { id: "WLSjvOTQXO8", title: "番外23(會員) -「怪持虛化口袋火箭(Enemy DI IPR)」前往西方高原（ver.1.4.3｜Nintendo Switch 2）" },
    ],
  },

  "totk-19": {
    methods: [
      {
        tab: "Prologue Escape",
        tags: ["Ver.1.2.0+"],
        steps: [
          "重新開始遊戲，此後不得獲得任何套裝(Armor)（即__準備一個「套裝頁籤尚未被開啟過」的檔案__）",
          "取得足夠長距離移動的材料（或之後可以道具複製）、至少 1 個摩猶伊，解完初始空島",
          "獲得藍圖、操縱桿、推動和載運NPC用的藍圖（龍骨、神廟電梯、馬車等），並準備一個在序章第二個位置大師劍發光的自動存檔 A",
          "製作一個纏桿，將纏桿放置於(1226, 1209, X)的位置，和吉爾頓對話請柯爾天出來",
          "若柯爾天有成功被纏桿擠開，用移動NPC的藍圖將柯爾天載運到納裘亞哈(倒轉乾坤)的神廟",
          "準備滑坡和滾筒（或用石頭），讓林克站在神廟門口邊緣處，和柯爾天對話的同時被擠進神廟的判定範圍",
          "在對話首度獲得套裝的視窗，按 + 號打開選單，再按 - 號打開地圖觀看回憶，強迫啟動下一個對話觸發讀取畫面",
          "在讀取畫面中盲按選擇到序章存檔 A 並且讀檔，或是盲按到「回到選單」，就可以直接從標題選單明選序章存檔 A",
          "序章林克（含狀態、MsgNotFound武器與套裝）會繼承到空島的進度",
        ],
      },
    ],
    principleSections: [
      {
        text: "2024/10/1 【LegendOfLinkk】、【mulberry】、【Aergyl】、【Lightos】 成功發展出將序章林克帶到大地圖。",
      },
      {
        text: "利用第一次與柯爾天對話獲得套裝的特性，在倒轉乾坤的神廟觸發「__轉場儲存（Banc Storage）__」，儲存「走進神廟的轉場」的行為，在序章存檔裡面執行，進而得到序章林克走進空島神廟的動畫，藉此獲得序章林克身上的道具和特性，而只有倒轉乾坤神廟可以安全出來，不然其他神廟在還沒有拿到石板的情形下都會有落下判定無法在大地圖上移動。",
      },
    ],
    notes: [
      {
        text: "不要用繼承過來心心打開空島的生命力試驗之門，這段劇情是觸發傳送 flag 的重要對話，務必按 B 取消掉心心的消耗，不然之後會無法傳送。",
      },
      {
        text: "因為心心數量是滿的，無法撿取之後解完神殿獲得的心心，可以寄放到邪神那之後再去撿心心，心心可達第三排",
      },
      {
        text: "解完 4 個神殿前往城堡內部的幻影加儂戰會影響重置覺醒大師劍的 flag，解完任務後會失去覺醒狀態。",
      },
    ],
  },

  "totk-20": {
    videoFolder: "totk-endlag cancel",
    principle: "盾反、投擲、高空落地攻擊、後空翻等等__後硬直（Endlag）__較長，會讓林克比較有破綻，硬直期間林克比較沒有防備，可以靠一些內建操作來取消掉這些硬直。",
    methods: [
      {
        tab: "Switch",
        video: "Swap Cancel.mp4",
        sections: [
          {
            title: "切換取消（Swap / Switch Cancel）",
            tags: ["All Versions"],
            steps: ["盾反成功判定或是投擲動作發生後，切換武器或盾牌"],
            note: "※ 盾反時快速選單按 X 丟棄（Drop）也可以取消硬直。",
          },
        ],
      },
      {
        tab: "Jump",
        video: "Jump Cancel.mp4",
        sections: [
          {
            title: "跳躍取消（Jump Cancel）",
            tags: ["All Versions"],
            steps: ["按 Y 或按住 Y，攻擊過程或結束時，在硬直期間按下 X 跳"],
            note: "※ X 和 B 有設定切換時按 B。",
          },
        ],
      },
      {
        tab: "Item Hold",
        video: "Item Hold Cancel.mp4",
        sections: [
          {
            title: "持物取消（Item Hold Cancel）",
            tags: ["All Versions"],
            steps: [
              "盾反判定後手持物品",
              "蹲下或打開望遠鏡取消手持",
            ],
            note: "※ 較少被使用，盾反的硬直多以切換裝備來取消。",
          },
        ],
      },
      {
        tab: "Rune",
        video: "Rune Cancel.mp4",
        sections: [
          {
            title: "投擲取消（Rune Throw Cancel）",
            tags: ["All Versions"],
            steps: [
              "按住 R 放開投擲",
              "投擲完按 L 啟動繼承後按 B 取消技能",
            ],
          },
        ],
      },
      {
        tab: "Hopback",
        video: "Hopback Cancel.mp4",
        sections: [
          {
            title: "後跳重置（Hopback Cancel）",
            tags: ["All Versions"],
            steps: [
              "按住 ZL，左搖桿往 ▼ 按 X 後空翻",
              "起跳或在空中按下 Y",
              "在空中卸掉武器，林克的體態會從「後跳中」恢復成單純「空中落下」的樣子",
            ],
            note: [
              "※ 通常會在空中把盾牌裝備回去，並使用踩盾跳相關連續技。",
              "※ 向後 SBR 時，後跳重置後的踩盾跳會往後跳。",
            ],
          },
        ],
      },
      {
        tab: "Shield Swap",
        video: "Shield Swap.mp4",
        sections: [
          {
            title: "冷切盾取消（Shield Swap Cancel）",
            tags: ["～Ver.1.1.1"],
            steps: [
              "空中攻擊落地、跳斬、突擊完硬直期間按住 L",
              "放開 L 讓技能輪盤消失的瞬間，十字鍵按 ◀︎ 打開盾牌的快速選單，並切換盾牌",
            ],
            note: [
              "※ 高空落下時故意跳斬再冷切盾，開始落下前按 R 俯衝會重置高度判定，可以取消落下判定。",
              "※ 也可以用在「餘料糾纏（Fuse Entanglement）」。",
            ],
          },
        ],
      },
    ],
    notes: [
      { text: "可以用在「衛星迴力鏢（Rotating Boomerang）」，迴力鏢向上投擲之後可以快速移動，讓迴力鏢產生迴轉。" },
    ],
    videos: [
      {
        id: "zFLuHyITm00",
        title: "番外01 - 實用技巧攻略(一)｜王國之淚也通用的曠野之息技巧解說！",
        desc: "基本上沒寫某版本以下的基本上新版也能用。",
        at: 969,
      },
      {
        id: "Y3AUNIheO84",
        title: "番外05 - 實用技巧攻略(三)｜王淚戰鬥系統的精髓",
        desc: "基本上沒寫某版本以下的基本上新版也能用。",
        at: 617,
      },
    ],
  },

  "totk-21": {
    videoFolder: "totk-moobe",
    heroEn: "mulberry's Out of Body Experience",
    methods: [
      {
        tab: "Moobe",
        name: "沐彼（Moobe）",
        video: "moobe.mp4",
        tags: ["All Versions"],
        steps: [
          "攀爬在任意一個地方",
          "傳送或讀檔到其他地方遠離步驟 1 的位置（近乎一半地圖距離以上）",
          "按住 ZL 貼著牆壁，切記不要真的爬到牆壁",
          "按 X，林克到達跳躍高度頂端時按 - 鈕",
          "觀看一個回憶，略過回憶左搖桿往 ▲ 推",
          "左下角出現 2 次讀取，且讀取時間比平常時間還久表示成功",
          "林克的座標會從 1 的位置被拉回 2，延遲周圍環境的加載",
        ],
      },
      {
        tab: "WST",
        name: "沐彼詞綴轉移（Moobe WST）",
        tags: ["Switch 1"],
        steps: [
          "裝備想要的詞綴的裝備（譬如攻擊力+10），攀爬在任意一個地方",
          "傳送或讀檔到其他地方遠離步驟 1 的位置（近乎一半地圖距離以上）",
          "按住 ZL 貼著牆壁，切記不要真的爬到牆壁",
          "按 X，林克到達跳躍高度頂端時按 - 鈕",
          "觀看一個回憶，略過回憶左搖桿往 ▲ 推",
          "左下角出現 2 次讀取，且讀取時間比平常時間還久表示成功",
          "切換到想要轉移過去的目標裝備，並確認右邊模型沒有成功切換",
          "再觀看一次回憶，確認詞綴有被轉移到目標上",
          "手動存檔，或__卸掉所有裝備__之後解除暫停 → 按 - 號打開地圖傳送走",
        ],
      },
      {
        tab: "Drop",
        name: "沐彼丟棄（Moobe Drop）",
        video: "moobe drop.mp4",
        tags: ["All Versions"],
        steps: [
          "攀爬在任意一個想要裝備掉落的位置",
          "讀檔到其他地方遠離步驟 1 的位置（近乎一半地圖距離以上）",
          "將想要掉落的裝備 [[ZLOT|totk-10#ZLOT]] 或 [[PSLOT|totk-10#PSLOT]]",
          "按住 ZL 貼著牆壁，切記不要真的爬到牆壁",
          "按 X，林克到達跳躍高度頂端時按 - 鈕",
          "觀看一個回憶，略過回憶左搖桿往 ▲ 推",
          "左下角出現 2 次讀取，且讀取時間比平常時間還久表示成功",
          {
            text: "再觀看以下次數的回憶，讓裝備可以被丟棄：",
            sub: ["Switch 1：8 次", "Switch 2 Edition：13 次"],
          },
          "丟棄 [[ZLOT|totk-10#ZLOT]] / [[PSLOT|totk-10#PSLOT]] 的裝備，再觀看一次回憶",
          "關閉暫停之後再打開一次暫停讀取步驟 1 附近的檔案",
          "[[ZLOT|totk-10#ZLOT]] / [[PSLOT|totk-10#PSLOT]] 的裝備會掉在步驟 1 的位置",
        ],
      },
      {
        tab: "SLD",
        name: "沐彼存讀繼承（Moobe SLD）",
        video: "moobe SLD.mp4",
        tags: ["All Versions"],
        steps: [
          "攀爬在任意一個想要裝備掉落的位置",
          "讀檔到其他地方遠離步驟 1 的位置（近乎一半地圖距離以上）",
          "製作一個__纏桿__，把纏桿餘料在武器(盾牌)上，並裝備想要繼承的盾牌(武器)",
          "按住 ZL 貼著牆壁，切記不要真的爬到牆壁",
          "按 X，林克到達跳躍高度頂端時按 - 鈕",
          "觀看一個回憶，略過回憶左搖桿往 ▲ 推",
          "左下角出現 2 次讀取，且讀取時間比平常時間還久表示成功",
          {
            text: "再觀看以下次數的回憶：",
            sub: ["Switch 1：8 次", "Switch 2 Edition：13 次"],
          },
          "丟棄→切換裝備想要繼承的盾牌(武器)，丟棄→切換纏桿武器(盾牌)，快速關開暫停，丟棄裝備中的盾牌(武器)之後不要關閉暫停，直接讀取步驟 1 附近的檔案",
          "裝備會掉在步驟 1 的位置",
        ],
      },
    ],
    principle:
      "2024/1/6 由 【mulberry】 玩家發現。固定林克攀爬的座標，重新計算實際位置時造成超長距離的瞬間移動使周圍呈現未加載的狀態。",
    notes: [
      { text: "近乎一半地圖距離以上：如監視堡壘 → 水之神殿 或 初始空島 的距離。" },
      { text: "Moobe Smuggle 的觸發方式請參考相關影片，新版本較少被使用。" },
      { text: "Moobe Pickup 的用途被用在複製心心容器，原理上為讓遊戲判定為再超遠距離撿拾未被加載的心心容器，判定上林克獲得容器，但容器本身因為沒被加載，所以畫面拖回去之後又會存在在原位。" },
    ],
    videos: [
      { id: "95RPAqAllJo", title: "不廢話21 -「沐彼並列/繼承/掉落/幽體繼承(Advanced Moobe glitches)」(適用：Ver.1.2.0～)" },
      { id: "0nHE87qDars", title: "番外14 - 最簡單的「詞綴轉移(WST)」！找噁手手製作完美最強英傑武器！(Moobe WST 限定NS1)" },
    ],
  },

  "totk-22": {
    videoFolder: "totk-lsw",
    methods: [
      {
        tab: "Physical",
        name: "物理舉物定位傳送（Physical LSW）",
        video: "Physical LSW.mp4",
        tags: ["All Versions"],
        steps: [
          "餘料糾纏一個可舉起的物品（電池、石頭等）在盾牌或武器上",
          "將步驟 1 的武器或盾牌 [[Zuggle|totk-09#Zuggle]]，將物品 [[ZLOT|totk-10#ZLOT]] 化",
          "用與步驟 1 相反的裝備餘料糾纏一個[[纏桿|totk-07]]，並將纏桿放置於隱藏區，裝備纏桿的母裝備",
          "舉起步驟 1 的物品離開隱藏區，丟棄母裝備讓林克和物品一起隱藏",
          "預計移動的讀取檔案",
          "林克會出現在「讀檔前開始隱藏的位置」和「讀檔後的初始座標」的中間左右的座標",
          "消滅步驟 2 [[Zuggled|totk-09#Zuggle]] 的裝備可以解除 LSW",
        ],
        note: "※ 步驟 3 亦可單純冷餘料觸發纏桿，步驟 6 讀檔前開始隱藏的位置就是離開隱藏區隱藏的位置。",
      },
      {
        tab: "Intangible",
        name: "無形舉物定位傳送（Intangible LSW）",
        video: "Intangible LSW.mp4",
        tags: ["All Versions"],
        steps: [
          "餘料糾纏一個可舉起的物品（電池、石頭等）在盾牌或武器上",
          "將步驟 1 的武器或盾牌 [[Zuggle|totk-09#Zuggle]]（或 Drop Zuggle），將物品 [[ZLOT|totk-10#ZLOT]] 化",
          "準備好一個纏桿裝備，裝備起來",
          "舉起步驟 1 的物品，丟棄並切換裝備中的纏桿裝備，直接在選單內讀檔",
          "丟出步驟 2 [[Zuggle|totk-09#Zuggle]] 的裝備並把它撿起來（Drop Zuggle 可直接空手撿一次），丟棄並切換其他同類型裝備",
          "不退出選單的狀態下，手持任意材料，退出暫停",
        ],
      },
    ],
    principle:
      "2024/1/8 由 【mulberry】 提出。林克舉起物品會被視為一個一體的狀態，這種狀態下被隱藏，物品的座標不會因為林克傳送或讀檔而改變。由於是被視為一體，因此利用特殊的操作可以讓林克瞬間返回舉起物品時的座標位置。根據不同的隱藏機制（物理或無形），會影響被隱藏且固定座標的物品是否能在讀檔後讓林克直接回到舉起物品的位置（物理隱藏存在碰撞判定，能夠直接性地傳達要回傳的位置）。",
    notes: [
      { text: "Physical 和 Intangible 的差異來源為隱藏的機制，可參考[[隱藏(剔除)|totk-08]]的原理解說。" },
    ],
  },

  "eow-01": {
    methods: [
      {
        tab: "選單儲存",
        tags: ["～Ver.1.0.1"],
        principleSections: [
          {
            title: "選單儲存（Menu Storage）",
            collapsible: true,
            text: "選單儲存利用林克在__虛反（Void out）__邊界讀取告示牌的時機差，將暫停選單與地圖的狀態卡在可切換的狀態。成功後，可以在暫停選單與地圖之間切換，並以此作為錯誤傳送與序章林克繼承等操作的前置狀態。",
          },
        ],
        sections: [
          {
            title: "選單儲存（Menu Storage）",
            steps: [
              "在白霧或高空雲層會觸發__虛反（Void out）__的邊界附近放置一個告示牌（例如遠古森林大樹下，或利用大岩蛇高塔）",
              "按住 ZL 鎖定告示牌，將林克往白霧邊界推動，同時按 A 讀取告示牌",
              "看到畫面周圍的白霧稍微閃滅時，按 B 取消對話",
              "對話框完全消失後等一拍，快速依序按 +、- 開啟選單與地圖",
              "若畫面暫停或地圖上同時看見人物血量與右下角小地圖，即表示選單儲存成功",
            ],
            note: "※ 要在地圖與暫停選單間切換，可按住 L 再按 -；也可快速按十字鍵右，再按 + 或 -。",
          },
        ],
      },
      {
        tab: "錯誤傳送",
        tags: ["～Ver.1.0.1"],
        principleSections: [
          {
            title: "隨機錯傳（Random Wrong Warp, RWW）",
            collapsible: true,
            text: "第一地圖先建立一個有效的傳送確認視窗；再次開啟第二地圖後，游標卻能離開傳送點。當玩家把游標停在非傳送點並按 A，系統仍會嘗試讀取傳送位置，但此時讀到的是無效的__垃圾資料__，可能被當成其他地圖位置的陣列編號，因此產生隨機錯誤傳送。",
          },
          {
            title: "指標錯傳（Index Wrong Warp, IWW）",
            collapsible: true,
            text: "指標錯傳利用不同世界中傳送點共用的__MLocation Index__。開啟傳送確認視窗後，游標在被轉換成無效資料前存在一段很短的時間差；玩家在這段時間切換到另一個世界的地圖並立即按 A，就能讓系統沿用原本的陣列編號。只要目標世界存在相同編號的傳送點，角色就會被傳送到該位置。",
          },
        ],
        sections: [
          {
            title: "隨機錯傳（Random Wrong Warp, RWW）",
            intro: "利用游標離開傳送點後會被轉換成無效資料的特性，隨機傳送到其他區域。",
            steps: [
              "在選單儲存的狀態下按 - 開啟地圖，這張地圖稱為__第一地圖__",
              "將游標移到任意傳送點，按 A 開啟「是否要傳送？」確認視窗；此時不要再次按 A",
              "保持確認視窗開啟，再按 - 開啟__第二地圖__",
              "在第二地圖將游標移到任何不是傳送點的空白位置，或停在原地的非傳送點處",
              "直接按 A 執行傳送，讓遊戲將無效游標資料讀成隨機位置",
            ],
            note: "※ 傳送結果具有隨機性，可能沒有反應、報錯或閃退。",
          },
          {
            title: "指標錯傳（Index Wrong Warp, IWW）",
            intro: "利用不同世界中相同的傳送點陣列編號，在游標被清除前快速切換地圖完成跨世界傳送。",
            steps: [
              "維持選單儲存狀態，先進入目標世界（例如米諾米諾森林的無質世界），再按 - 開啟__第一地圖__",
              "按十字鍵左切換到主世界地圖，將游標移到任意傳送點，按 A 開啟確認視窗；此時不要按 A 傳送",
              "保持確認視窗開啟，再按 - 開啟__第二地圖__",
              "按十字鍵左回到主世界地圖，將游標停在與目標傳送點相同陣列編號的傳送點上",
              "依序快速按十字鍵右切回目標世界地圖，再緊接按 A 確認傳送",
              "若輸入時機正確，角色會依相同的陣列編號跨界傳送到目標世界的對應位置",
            ],
            note: "※ 例如目標是邊界陣列第 32 號的傳送點，就要在主世界選擇同為第 32 號的傳送點。",
          },
        ],
      },
      {
        tab: "序章林克繼承",
        tags: ["～Ver.1.0.1"],
        intro: "先保留序章林克的手動存檔，再利用選單儲存讓讀檔清單與 Game Over 選單短暫重疊。",
        sections: [
          {
            title: "序章林克繼承（Prologue Link Transfer）",
            steps: [
              "開啟新進度，在序章一開始可以操控林克時，立刻進行一次手動存檔。這是本流程唯一的手動存檔；後續逃離城牢與解開第一座神殿前，只能使用自動存檔，絕對不要覆蓋這個序章林克存檔。",
              "將進度推進到可以觸發選單儲存的區域（例如遠古森林邊界）。準備觸發前，先打開暫停選單，把頁籤停在「存讀檔（系統）」介面。",
              "利用白霧邊界與告示牌，或利用大岩蛇高塔，成功觸發選單儲存。成功後保持選單儲存狀態，不要按 B 或 +/- 取消。",
              "操控薩爾達尋找附近的敵方怪物，讓她持續受到攻擊直到血量歸零。",
              "在 Game Over 文字與畫面出現前的瞬間，操作背景中的選單游標移到「讀取」，按 A 開啟存檔列表。",
              "等待 Game Over 顯示「重新開始／退出」介面。此時畫面會同時疊加存檔讀取列表與 Game Over 選單，使用十字鍵上下調整，讓游標同時停在「重新開始（Retry）」與序章林克的手動存檔上。",
              "游標對齊後，極快依序按下 A → 十字鍵上 → A：先選擇重新開始，再將讀檔游標移到序章林克存檔，最後確認讀取。",
              "若時機正確，畫面黑屏讀取後會看到序章林克出現在主世界地圖中，即表示繼承成功。",
            ],
            note: "※ 選單儲存成功後，按 B 或 +/- 都會取消狀態，因此「存讀檔（系統）」頁籤必須在觸發前先選好。",
          },
        ],
        principleSections: [
          {
            title: "選單儲存是前置狀態",
            collapsible: true,
            text: "選單儲存利用薩爾達在__虛反（Void out）__邊界讀取告示牌的時機差，將暫停選單與地圖卡在可切換的狀態。序章林克繼承不直接利用這個狀態傳送，而是先把讀檔列表藏在背景，等待 Game Over 選單出現。",
          },
          {
            title: "Game Over 與讀檔列表重疊",
            collapsible: true,
            text: "薩爾達血量歸零後，遊戲準備顯示 Game Over 的「重新開始／退出」介面；如果在此之前已從背景選單開啟讀檔列表，兩個選單就會同時存在。它們各自保留游標位置，形成可以分別接收輸入的狀態。",
          },
          {
            title: "A → 上 → A 的輸入時序",
            collapsible: true,
            text: "兩個選單重疊後，先用第一個 A 讓 Game Over 選擇「重新開始」，再用十字鍵上把讀檔游標移到序章林克的手動存檔，最後用第二個 A 確認讀取。遊戲因此同時處理重新開始的世界狀態與手動存檔中的角色資料。",
          },
          {
            title: "繼承結果",
            collapsible: true,
            text: "重新開始提供目前的地圖與進度環境，讀檔則帶入序章手動存檔中的林克資料；兩者在同一次讀取中錯開套用，就能讓序章林克出現在主世界地圖，完成 Prologue Link Transfer。",
          },
        ],
      },
    ],
    notes: [
      {
        text: "序章林克的手動存檔是唯一的安全備份，後續流程只能依賴自動存檔；請確認不要手動覆蓋或刪除它。",
      },
      {
        text: "選單儲存成功後，按 B 或 +/- 會取消狀態；「存讀檔（系統）」頁籤必須在觸發選單儲存前先停好。",
      },
      {
        text: "薩爾達必須在選單儲存狀態仍存在時被敵人擊倒；開啟讀檔列表與等待 Game Over 的時機需要精準，失敗時請重新讀取自動存檔再嘗試。",
      },
      {
        text: "A → 上 → A 必須快速連續輸入；若先完整操作其中一個選單，兩個游標的重疊狀態可能會消失。",
      },
    ],
    videos: [
      { id: "fsTX3L_vga8", title: "番外03 - 用大岩蛇就可以半小時就破關！「指標錯傳(Index Wrong Warp)」（適用：ver.1.0.1以下）" },
    ],
  },

  "eow-02": {
    videoFolder: "eow-lynel",
    methods: [
      {
        tab: "側身閃避",
        video: "20260710_techniques.mp4",
        bullets: [
          "衝刺掃斬：正面對遠距離時人馬會衝過來揮砍，往人馬右側按 R 旋轉可迴避",
          "迴旋斬：人馬停頓時靠近人馬後方會迴旋斬，不要太靠近",
          "交叉斬：正面對近距離時人馬會使出交叉斬，不要太靠近",
        ],
      },
      {
        tab: "高空傷害",
        video: "20260710_breaking spam.mp4",
        intro: "在左側樹上堆疊兩層以上的高度人馬不易發覺，在高處丟會破碎的道具持續給予人馬傷害。",
        note: "※ 注意有時人馬會跳到樹上來，發現薩爾達並觸發敵意後此方法就無法繼續使用。",
      },
    ],
    videos: [
      { id: "eWfciKd6-cc", title: "番外01 - 初學者適用！4種「1星借物」也能擊倒人馬的方法！" },
    ],
  },

  "eow-03": {
    intro: "智慧的再現中的高速移動與飛行技巧解說，讓你突破地形限制、快速抵達地圖各處。適合想在探索上省時間的玩家。",
    videos: [
      { id: "O8bKXDLW2u8", title: "番外02 - 飛天遁地！最實用的高速移動與飛行的技巧解說！" },
    ],
  },

  "totk-18": {
    methods: [
      {
        tab: "SLD",
        group: "無過載（Overload-less）",
        tags: ["～Ver.1.1.1"],
        difficulty: "★☆☆☆☆",
        timeCost: "★☆☆☆☆",
        sections: [
          {
            title: "前置準備",
            steps: [
              "準備好序章__在壁畫位置__的序章自動存檔 A",
              "前往__伊恩伊薩神廟__手動存檔",
              "將其中一個岩石用究極手移動到有火焰果樹群的入口處，並跳到岩石上面（精確位置請參考影片）",
            ],
          },
          {
            title: "繼承裝備到序章",
            steps: [
              "丟棄 → 切換 裝備中的武器",
              "快速關開暫停（Pause Buffer）",
              "確認背景裝備中的武器沒有被丟棄出來，丟棄裝備中的武器",
              "讀取序章存檔 A",
            ],
          },
          {
            title: "SLD 繼承大師劍回進度檔案",
            steps: [
              "到加儂多夫前的樓梯途中撿起 SLD 繼承過來的武器",
              "裝備序章大師劍（MNF）執行 SLD",
              "讀取伊恩伊薩神廟的存檔",
              "回到「前置準備」步驟 2 的位置並撿起大師劍（MNF）",
            ],
          },
        ],
      },
      {
        tab: "R0 Cull Zuggle",
        group: "有過載（Overloading）",
        subTabs: [
          {
            tab: "In Bound",
            tags: ["All Versions"],
            difficulty: "★★☆☆☆",
            timeCost: "★★★★★",
            sections: [
              {
                title: "前置準備",
                steps: [
                  "準備好序章一開始的自動存檔 B，手動存檔 A 在阿卡萊的隱藏區，並且在地底(0000, -0085)的位置有放置一個傳送標記器",
                  "觸發虛幽化武器和盾牌各 1 個 Zuggle 起來",
                  "到馬拉克古奇神廟，解除虛幽化裝備的 Zuggle Drop，並將其放在指定位置，讀檔到序章存檔 B",
                  "下樓梯撿取虛化武器和盾牌，可以撿多一點，但是__盾牌至少要留空一格__，然後往前走觸發下一個自動存檔 C，接著讀檔回手動存檔 A",
                ],
              },
              {
                title: "繼承閃藏用的盾牌到序章",
                steps: [
                  "觸發並列過載（Zuggle Overload）",
                  "準備一個冷餘料觸發的纏桿 X 放在旁邊",
                  "用武器 FS2FE 一個操縱桿，使武器 W 糾纏一個纏桿 Y 並裝備著 W",
                  "將纏桿 X 合在米涅魯上，米涅魯地圖並列一個__與繼承到序章相同的盾牌__",
                  "用過載掉落餘料糾纏一個操縱桿 Z 在 Zuggled 的盾牌上",
                  "將纏桿 Y 移動靠牆壁",
                  "叫出藍圖的 MK2，使操縱桿 Z 拼在 MK2 上",
                  "駕駛 MK2 移動到(0000, -0080)附近",
                  "將操縱桿 Z 拆下來並且翻過來，按 A 舉起來移動到(0000, -0080)～(0000,-0085)之間",
                  "丟棄裝備中的武器 W（纏桿 Y 的母件）",
                  "林克隱藏時傳送到地底的傳送標記器",
                  "待林克高度座標到達(-0134)後，讀取序章自動存檔 C",
                  "武器和盾牌都卸掉一次再裝備起來避免過載掉落，裝備 MNF",
                  "背對加儂多夫丟棄盾牌，先撿「操縱桿盾」再撿一般盾",
                ],
              },
              {
                title: "執行 SRZ 並列 MNF 在身上",
                steps: [
                  "丟棄任意武器",
                  "丟棄裝備中的操縱桿盾",
                  "裝備任意盾牌",
                  "丟棄裝備中的 MNF",
                  "裝備任意武器",
                  "快速關開暫停（6F 內開到另一個暫停）",
                  "確認背景林克隱藏、大師劍沒有掉出來",
                  "切換或卸→裝一次盾牌",
                  "丟棄裝備中的武器",
                  "讀取手動存檔 A",
                ],
              },
              {
                title: "收尾",
                steps: [
                  "丟棄裝備中的武器 → 裝備任意武器 → 撿起 MNF → 手動存檔",
                ],
              },
            ],
            note: "※ SRZ 失誤後，可以再將裝備撿起來一次；注意「先撿操縱桿盾再撿一般盾」的順序。",
          },
          {
            tab: "Out of Bound",
            tags: ["Ver.1.2.0+"],
            difficulty: "★★★★☆",
            timeCost: "★★★☆☆",
            sections: [
              {
                title: "前置準備",
                steps: [
                  "準備好序章一開始的自動存檔 B，手動存檔 A 在阿卡萊的隱藏區",
                  "觸發虛幽化武器和盾牌各 1 個 Zuggle 起來",
                  "到馬拉克古奇神廟，解除虛幽化裝備的 Zuggle Drop，並將其放在指定位置，讀檔到序章存檔 B",
                  "下樓梯撿取虛化武器和盾牌，可以撿多一點，但是__盾牌至少要留空一格__，然後往前走觸發下一個自動存檔 C，接著讀檔回手動存檔 A",
                ],
              },
              {
                title: "觸發 LSW 並繼承 SRZ 的工具",
                steps: [
                  "觸發並列過載（Zuggle Overload）",
                  "準備 2 個冷餘料觸發的纏桿",
                  "米涅魯合一個纏桿，米涅魯地圖並列，Drop Zuggle 一個__與繼承到序章相同的盾牌__",
                  "用過載掉落餘料糾纏一個電池在 Drop Zuggled 的盾牌上",
                  "把電池搬進隱藏區，並且把另一個纏桿移動到隱藏區貼牆的位置（火箭或倒轉乾坤）",
                  "舉起電池離開隱藏區",
                ],
              },
              {
                title: "撿起隱藏的來源",
                steps: [
                  "林克隱藏時讀取序章存檔 C",
                  "卸掉再裝備一次 MNF（避免過載掉落）、卸掉盾牌，等待 30 秒",
                  "撿起 Drop Zuggled 的盾牌",
                ],
              },
              {
                title: "執行 SRZ 並列 MNF 在身上",
                steps: [
                  "丟棄任意武器",
                  "丟棄裝備中的操縱桿盾",
                  "裝備任意盾牌",
                  "丟棄裝備中的 MNF",
                  "裝備任意武器",
                  "快速關開暫停（6F 內開到另一個暫停）",
                  "確認背景林克隱藏、大師劍沒有掉出來",
                  "切換或卸→裝一次盾牌",
                  "丟棄裝備中的武器",
                  "讀取手動存檔 A",
                ],
              },
              {
                title: "收尾",
                steps: [
                  "丟棄裝備中的武器 → 裝備任意武器 → 撿起 MNF → 手動存檔",
                ],
              },
            ],
            note: "※ 若 SRZ 失敗，重複「觸發並列過載」到「執行 SRZ」的流程。",
          },
        ],
      },
      {
        tab: "Cull Detach Zuggle (R0&R1)",
        group: "有過載（Overloading）",
        tags: ["Ver.1.2.0+"],
        difficulty: "★★☆☆☆",
        timeCost: "★★★★☆",
        sections: [
          {
            title: "前置作業",
            steps: [
              "準備好阿卡萊的手動存檔",
              "在沙漠區找拉吉克觸發一把虛化武器 W1，直接讀檔到阿卡萊",
              "丟出一個盾牌開始虛幽化感染，感染 1 把武器和 2 面盾牌：W1 → S1 → W2 → 用 W2 可調式過載 → S2，放在隱藏區",
              "__把一般裝備用火箭載走，虛化裝備間的連結不用解纏__",
              "丟切卸 Smuggle S1，__過載掉落(Overload Drop)__一面盾牌餘料在武器上，丟出一個浮空石餘料在盾牌上，此時獲得「__浮空石(餘料糾纏) → S1__」，然後把 S1 正常丟在後面（不要 Zuggle Drop）",
              "用過載掉落的方式快速製作一個纏桿 A1",
              "丟切卸 Smuggle W1，過載掉落一把武器，餘料在一般盾牌，再丟出一個盾牌 S3 餘料在武器上，丟棄盾牌把 S3 撿起來，餘料剛剛製作的纏桿 A1，切換武器並丟出，此時獲得「__纏桿盾 S3(餘料糾纏) → W1__」，然後把它們放在隱藏區但不要靠牆",
              "丟切卸 Smuggle S2，過載掉落一面盾牌餘料在武器上，丟出另一個操縱桿 A2 放在隱藏區靠牆，在隱藏區內對它倒轉乾坤，走到隱藏區外將 A2 餘料在盾牌上",
              "把 A2 拉到隱藏區靠牆，黏一個蘋果之後離開隱藏區，確認是否只有蘋果隱藏，是的話把蘋果撿起來（若否則重新操作步驟 8），卸裝一次盾牌之後把 S2 正常丟棄在隱藏區內，此時獲得「__儲存隱藏的 A2(糾纏) → S2__」",
              "把浮空石拉到隱藏區內靠牆，將 A2 移到浮空石上面靠牆",
              "Drop Smuggle S2：過載撿拾 S2 → 丟切卸 S2 → 空手撿起 S2 → 切換盾牌任意盾牌",
              "Drop Purgatorify W2：過載撿拾 W2 → 丟切卸 W2 → 空手撿起 W2 → 丟棄 W2",
              "用究極手將 S3 黏在 A2 上靠牆（林克離開隱藏區會被隱藏）",
              "丟切卸 Smuggle W1，並且裝備任意武器",
              "倒轉乾坤浮空石，暫停丟棄裝備中的武器和盾牌之後讀檔到序章或是回到標題開始新遊戲",
            ],
            note: [
              "※ 操作過程出現「套裝分離」「按 A 無法操作操縱桿」「究極手拖曳物品時視角異常」，可以脫掉套裝或流程中尚未用到的裝備先卸掉。",
              "※ 負載量過高導致空手撿起裝備，意外變成「過載撿拾（Overload Pickup）」，背對牆壁丟棄失敗就可以附著回林克身上。",
              "※ 步驟 12 也可以用 Drop Zuggle，但避免在序章過載撿拾，以 Drop Purgatorify 為佳。另外若用到「臨時過載（Temporary Overload）」，切記不要丟切到 S2（會變成 Drop Zuggle，在序章丟武器不會隱藏），可以先讓 W1 或 S1 處於 Zuggle Drop 的狀態增加負載量",
            ],
          },
          {
            title: "序章",
            steps: [
              "撿起腳下的 W2 直到填滿武器欄位，並且 S2 變成可撿拾",
              "撿起 S2",
              "暫停切換武器，讓裝備中的不是序章大師劍",
              "暫停丟棄裝備中的武器，並切換到序章大師劍之後解除暫停",
              "林克隱藏之後，暫停丟棄 5 把非裝備中的武器（和步驟 2 多撿的盾牌），丟→切大師劍",
              "B → + 快速關開暫停（步驟 5 丟得越多，時機越寬裕）",
              "卸掉裝備中的盾牌並重新裝備，丟棄裝備中的武器，讀取阿卡萊的手動存檔",
              "丟棄裝備中的武器，裝備武器之後撿起 Zuggle Drop 的序章大師劍",
            ],
          },
        ],
      },
      {
        tab: "Cull Storage",
        group: "無過載（Overload-less）",
        tags: ["Ver.1.2.0+"],
        difficulty: "★★★★★",
        timeCost: "★★☆☆☆",
        sections: [
          {
            title: "前置準備",
            steps: [
              "準備好序章一開始的自動存檔 B，手動存檔 A 在阿卡萊的隱藏區",
              "觸發虛幽化武器和盾牌各 1 個 Zuggle 起來",
              "到馬拉克古奇神廟，觸發自動存檔 D，解除虛幽化裝備的 Zuggle Drop，並將其放在指定位置，讀檔到序章存檔 B",
              "下樓梯撿取虛化武器和盾牌，可以撿多一點，但是__盾牌至少要留空一格__，然後往前走觸發下一個自動存檔 C，接著讀檔回手動存檔 A",
            ],
          },
          {
            title: "繼承隱藏的來源",
            steps: [
              "用武器 W，FS2FE 觸發纏桿 X，並將纏桿置於隱藏區貼牆位置",
              "離開隱藏區倒轉乾坤纏桿 X，在纏桿 X 不離開牆壁的倒轉期間，丟棄武器 W 後馬上撿起來，解除倒轉乾坤",
              "騎上米涅魯，執行 Mineru Dismissal Zuggle，讀檔到序章存檔 C，將武器 W 繼承到序章",
            ],
          },
          {
            title: "利用一次性隱藏觸發 SLD 繼承 MNF",
            steps: [
              "裝備 MNF 以外的武器",
              "往後走到入口的樓梯上",
              "選單內丟棄裝備中的武器 → 裝備 MNF",
              "按下 B 之後，在第 18F 按下 + 號",
              "選單內丟棄裝備中的 MNF → 裝備另一把武器",
              "快速關開暫停（6F 內開到暫停）",
              "確認背景林克隱藏、大師劍沒有掉出來",
              "丟棄裝備中的武器 → 讀檔到手動存檔 D",
            ],
          },
          {
            title: "收尾",
            steps: [
              "回到神廟的 Zuggle Drop 位置撿起 MNF → 手動存檔",
            ],
          },
        ],
      },
      {
        tab: "Cull Detach (R1)",
        group: "無過載（Overload-less）",
        tags: ["Ver.1.2.0+"],
        difficulty: "★★★☆☆",
        timeCost: "★★★☆☆",
        sections: [
          {
            title: "前置準備",
            steps: [
              "準備一個在馬拉克古奇神廟的自動存檔、阿卡萊隱藏區的手動存檔",
              "找拉吉克準備一把虛化武器 W1",
              "感染 1 把武器和 2 面盾牌：W1、W2、S1、S2（W = 武器，S = 盾牌）",
              "將所有虛幽化裝備全部並列(Zuggle)，接著傳送或讀取馬拉克古奇神廟的存檔",
              "丟棄武器，把 W2 撿起來丟棄在序章開頭的位置",
              "並列(Zuggle) W1，並讀取在阿卡萊的手動存檔",
            ],
          },
          {
            title: "阿卡萊",
            steps: [
              "丟棄所有並列(Zuggle)中的裝備",
              "Smuggle S1，接著對操縱桿 A1 執行 FS2 + null FE + 倒轉乾坤，糾纏在 S1 上",
              "把 S1 丟在後面，黏一顆蘋果在 A1 上，離開隱藏區確認是否只有蘋果被隱藏，有的話繼續下一步",
              "把 A1 放旁邊一點，將第 2 根操縱桿 A2 FS2FE 到 S2 上，然後把 S2 丟在後面，保持虛幽化(Ghost Pslot)的狀態",
              "把 A1, A2 放旁邊一點，將第 3 根操縱桿 A3 FS2FE 到 W1 上",
              "把 A1 移到牆邊，把 A3 移到 A1 上面",
              "丟棄 W1 撿起冷餘料的武器，操作 A3 讓它變成纏桿(SDC)",
              "操作 A2 來解鎖技能輪盤，接著移動 A2 並把它黏在 A3 上，讓兩個操縱桿穩定放在 A1 上",
              "並列(Zuggle) S1，接著對著 A1 倒轉乾坤並讀取馬拉克古奇神廟的存檔（乾坤鎖固定 A1）",
              "在序章的相對位置正常丟棄 S1（不能 Zuggle Drop）",
            ],
          },
          {
            title: "序章",
            steps: [
              "撿起 S1 和 W2，武器欄至少要有 2 把",
              "切換到「序章大師劍」以外的武器，關閉暫停",
              "丟棄該武器並切換到 MNF，關閉暫停",
              "等林克隱藏之後，丟切(Drop Swap)武器，關閉暫停",
              "暫停，丟棄裝備中的武器，直接讀取馬拉克古奇神廟的存檔",
              "前往序章的相對位置撿起「序章大師劍」",
            ],
          },
        ],
      },
    ],
    notes: [
      { text: "序章大師劍的各種流程都有許多變形，譬如準備的地點、順序、過載或不過載等等，以上流程是 Yuda 認為最好懂且方便操作的流程。" },
      { text: "Zuggle 過來的序章大師劍丟出來的時候是 Zuggle Drop 的狀態，？？？的武器必須在武器裝備中的狀態下才能撿。" },
      { text: "FSFE、FS2FE 可以很方便地附著餘料材料在 MNF 上。" },
      { text: "若是有 Castle AMS（脫逃城堡的覺醒大師劍）的存檔，必須選擇用 Zuggle 的方法。" },
    ],
    principleItems: [
      "MNF 為 Message Not Found 的縮寫，中文社群常用 MSG 或 味精劍 稱呼，本站仍以原始的 __MNF 劍__ 稱呼。2023/5/17 發售後五天由 【LegendofLinkk】 (Zuggle Method)、【Abahbob】 (SLD Method) 發展出繼承序章大師劍到進度檔的方法，最主要是用 SLD 或 Zuggle 的方式，將序章大師劍帶回進度存檔。",
      "Ver.1.1.1 版以前靠單純丟切裝備就能觸發 SLD 時，可以很簡單找到與序章地圖相同座標的位置進行互相繼承來獲得 MNF。",
      "Ver.1.1.2 版以後可以用「隱藏儲存(Cull Storage)」的方式再現 SLD，但前置作業較長，還要想辦法先繼承裝備到序章打開背包分頁。",
      "Ver.1.2.0 版以後「丟切隱藏(Drop Swap Cull)」可以減少很多前置作業，配合「虛幽化裝備（DI Ghost Equipment）」可以更簡單地繼承裝備和觸發過載，以便快速繼承東西到序章以便作業。",
      "2026/7 mulberry 從 1.1.2 版的流程發展出可以自由控制解除隱藏(Cull)的方法，配合過載的方式發展出不需要極快手速關開暫停的流程。Yuda 於 2026/7/13 將其微調改為無過載的流程。",
    ],
    videos: [
      { id: "-oifw9PKeh4", title: "回應03 - 錯過就不再的實用道具？「不壞的序章大師劍」與「料理效果轉移」(1.1.1版以前限定)", desc: "～Ver.1.1.1版以前無過載 SLD 的流程" },
      { id: "Gn90XQwp5zU", title: "番外16(1 - 舊) - 1.1.2版～1.2.1版通用流程「序章大師劍(MNF/MSG)」", desc: "1.1.2 版 Cull Storage 的舊流程（NS2此法已經較少用，但有很多程錯可以學）" },
      { id: "siGVEF5-AZY", title: "番外16(2 - 舊) - 1.2.0版～1.2.1版獨有｜不在序章手動存檔之「序章大師劍(MNF/MSG)」流程", desc: "無過載 R0 Cull Zuggle (In Bound) 的舊流程（NS2此法已經較少用，但有很多程錯可以學）" },
      { id: "qumkO3l09Kw", title: "番外16(3 - 舊) - 1.2.X版覺醒大師劍檔(AMS)專用｜失傳已久的過載法「序章大師劍(MNF/MSG)」繼承流程", desc: "有過載 R0 Cull Zuggle (In Bound) 的舊流程，可用在有觸發恆常覺醒大師劍的 AMS 檔（NS2此法已經較少用，但有很多程錯可以學）" },
      { id: "HmocgDZFVdk", title: "番外16(NS2) - 不去加儂多夫那了！10 分鐘就拿到「序章大師劍（MsgNotFound）」！（ver.1.4.3｜Nintendo Switch 2）", desc: "R0 Cull Zuggle (Out of Bound) 流程" },
      { id: "SzIn0i5xyv4", title: "番外16(2) - 儲存隱藏 5 分鐘就能拿到「序章大師劍（MsgNotFound）」！？（ver.1.4.3｜Nintendo Switch 2）" },
    ],
  },

  "ssbu-01": {
    termGroups: [
      {
        title: "入門技巧 EX01",
        terms: [
          { zh: "按鍵設定", en: "Button Setting", desc: "建議至少將右搖桿設為強攻擊、關閉「快推向上跳躍」，以減少實戰中的誤操作。其餘設定依照使用者習慣，或角色特性再做調整（如需要 C 反可以設置 L 為必殺技、ZR 為跳等等）" },
          { zh: "肌肉記憶／降低思考時間", en: "Muscle Memory", desc: "熟悉角色的技能和移動慣性，透過反覆練習基礎操作讓手部產生記憶，在對戰中能反射性地做出動作而不必停下思考。" },
          { zh: "空中迴避", en: "Air Dodge", desc: "在空中按下防禦鍵可獲得短暫無敵，若同時推動搖桿還能朝特定方向進行位移閃避，只是後硬直會比較長一點。" },
          { zh: "受身", en: "Tech", desc: "被擊飛並即將撞擊地面或牆壁的瞬間按下防禦鍵，可瞬間恢復姿態站立，避免倒地被Jab Lock。" },
          { zh: "攻擊受身", en: "Attack Tech", desc: "有時受身反而會被追，因此在被擊飛、硬直結束後，落地前按下 A 或 B 等攻擊，也能恢復為一般站立的狀態。" },
          { zh: "小跳攻擊", en: "Short Hop Attack", desc: "同時按下跳躍與攻擊鍵，能讓角色直接以較低的跳躍高度使出空中攻擊。" },
          { zh: "隕石攻擊", en: "Meteor", desc: "使用具有「向下擊飛」判定的招式準確打中對手，可將對手垂直重擊扣落於場外。" },
        ],
      },
    ],
    videos: [
      { id: "Yx-oJTIyU0A", title: "EX01 - 大亂鬥入門技巧篇", desc: "不想亂玩？先「入門篇」開始學習！" },
    ],
  },

  "ssbu-02": {
    termGroups: [
      {
        title: "初級技巧 EX02",
        terms: [
          { zh: "速降", en: "Fast Fall / Fast-fallen", desc: "在跳躍達到最高點之後迅速將左搖桿往下推，角色會加速落地以利快速展開下一步動作。" },
          { zh: "踢牆跳", en: "Wall Jump", desc: "在靠近牆壁的空中將左搖桿往反方向推，即可藉由蹬牆來進行額外的跳躍（部分角色不適用）。" },
          { zh: "踩頭跳", en: "Footstool", desc: "在空中靠近對手正上方時按下跳躍鍵，能把對手當作踏板起跳並造成對方短暫硬直。" },
          { zh: "瞬間衝刺型攻擊", en: "Instant Dash Techniques", desc: "利用衝刺啟動瞬間的慣性來進行抓取或攻擊，可有效增加招式滑行的距離。" },
          { zh: "小跳", en: "Short Hop / Short Jump", desc: "按下跳躍鍵後 3 幀內放開（或同按兩顆跳躍鍵）使出低空跳躍，可用於立回或連段。" },
          { zh: "輕擊鎖", en: "Jab Lock", desc: "趁對手倒地且無法受身時，快速用一到兩下輕攻擊打中對方，可強制對方無法起身，以利後續接上猛擊或連招。" },
          { zh: "擊飛方向調整", en: "Directional Influence / DI", desc: "被擊飛瞬間往特定方向推動左搖桿，改變自身的飛出軌跡來避免觸及邊界。" },
          { zh: "滑步", en: "Step Dash", desc: "連續且短促地推動搖桿進行短距離衝刺，能維持機動走位並隨時保持可防禦狀態來迷惑對手。" },
        ],
      },
    ],
    videos: [
      { id: "XvEFg7kRx_Q", title: "EX02(初級) - 脫離新手！大亂鬥進階技巧(上)" },
    ],
  },

  "ssbu-03": {
    termGroups: [
      {
        title: "中級技巧 EX03",
        terms: [
          { zh: "擊飛慣性阻止", en: "Momentum Cancel", desc: "在被擊飛且即將出界前，利用特定的空中攻擊／跳躍／迴避來減緩飛出的慣性，增加存活率。" },
          { zh: "移動防禦", en: "Guarding Move", desc: "在移動或衝刺過程中迅速舉盾，讓角色能在保持防禦的狀態下稍微滑行一段距離。" },
          { zh: "掙脫", en: "Mashing / レバガチャ", desc: "被對手抓取或陷入埋首狀態時，快速轉動搖桿與連按按鍵來提早解除受控狀態。" },
          { zh: "預先輸入", en: "Buffering / 先行入力", desc: "在前一個動作的硬直結束前先輸入好下一個指令，讓角色能無縫接軌使出下一個動作。" },
          { zh: "抓邊二幀", en: "2 Frames", desc: "角色在抓取邊緣的最初兩幀（2 Frames）時間內是不具無敵判定的，可刻意針對這瞬間進行攻擊。" },
          { zh: "搶邊／奪崖", en: "Ledge Trump / 崖奪い", desc: "在對手抓住邊緣的瞬間立刻跟著抓邊，將對手強制擠開並趁其無法防禦時進行追擊。" },
          { zh: "落滑", en: "Wavelanding / 台絶", desc: "跳躍剛越過平台邊緣的瞬間，立刻往斜下方輸入空中迴避，使角色迅速滑行並站穩在平台上。" },
          { zh: "出盾／防禦取消", en: "Out of Shield Options / シールドキャンセル", desc: "在舉盾狀態下直接輸入跳躍、抓取或上猛擊，藉此省略收盾硬直來最快反擊。" },
          { zh: "軸向取消", en: "Pivot Cancel", desc: "衝刺時瞬間反推搖桿並立刻推動C搖桿，能帶著衝刺慣性使出強攻擊。" },
          { zh: "轉向空中移動", en: "RAR / Reverse Aerial Rush", desc: "衝刺時瞬間轉向並起跳，可以保持向前慣性使出空中後攻擊。" },
          { zh: "攻擊取消", en: "Attack Cancel", desc: "在強攻擊發動的前幾幀內按跳躍，讓系統取消攻擊並瞬間轉向起跳。" },
          { zh: "慣性反轉", en: "B Reverse / Wavebounce", desc: "使用必殺技時瞬間搭配反方向的搖桿輸入，在空中瞬間改變角色的面向與原有的移動慣性。" },
        ],
      },
    ],
    videos: [
      { id: "Wba5_lZmA9U", title: "EX03(中級) - 不再亂打一通！大亂鬥進階技巧(中)" },
    ],
  },

  "ssbu-04": {
    termGroups: [
      {
        title: "上級技巧 EX04",
        terms: [
          { zh: "懸線取消", en: "Tether Cancel / ワイヤーキャンセル", desc: "擁有繩索抓邊的角色在射出繩索瞬間推下搖桿取消抓邊，可用以滯空干擾或改變節奏。" },
          { zh: "蓄力取消", en: "Charge Cancel / チャージキャンセル", desc: "蓄力招式可透過按下防禦、跳躍或迴避來靈活中斷，製造假動作與操作彈性。" },
          { zh: "酸點", en: "Sour Spot / カス当たり", desc: "利用招式威力較弱、擊退力較小的判定區（酸點）打中對手，以便後續更容易接續連段攻擊。" },
          { zh: "Z落", en: "Z Drop / Zドロップ", desc: "在空中不推方向鍵按下抓取鍵（Z），可以讓道具原地落下。" },
          { zh: "場地隕石", en: "Stage Spike", desc: "將對手往場地邊緣的牆壁擊飛，利用撞擊牆壁反彈的力道將未能受身的對手直接擊落界外。" },
          { zh: "離邊取消", en: "Edge Cancel / 崖キャンセル", desc: "算準距離讓角色在招式硬直期間剛好滑出平台邊緣掉落，藉由「離地」來強制消除招式硬直。" },
          { zh: "抓邊意識", en: "Edge-Grabbing Mixup", desc: "避免單調的回場方式，靈活運用刻意抓邊、故意不抓邊或利用必殺技來混淆對手，確保安全回場。" },
          { zh: "繞背", en: "Cross-up / めくり", desc: "攻擊時刻意跳越並降落在對手背後，避免留在對手正前方而直接遭到出盾懲罰。" },
          { zh: "二次抓邊", en: "Regrabbing / 二回目からの崖掴まり", desc: "抓邊後若未爬上平台而再次落下抓邊，將會失去無敵狀態。" },
          { zh: "原地轉身", en: "Turnaround in Place", desc: "利用微推搖桿或推向反方向斜上，讓角色原地改變面向，避免執行轉身衝刺，跑過頭錯失攻擊或抓取時機。" },
          { zh: "製造空間", en: "Spacing / 間合い", desc: "精準掌控攻擊極限距離（例如劍尖打點），確保攻擊就算被防禦住也不會遭到對手反擊。" },
          { zh: "風險獎勵", en: "Risk-Reward", desc: "隨時評估操作的潛在收益與被反擊的危險，在低風險低獎勵與高風險高收益之間做出最有利的選擇。" },
          { zh: "NIL", en: "No-Impact Landing", desc: "透過特定操作（如史提夫的墊高方塊）讓角色在特定高度剛好落地，藉此完全消除落地的硬直時間。" },
        ],
      },
    ],
    videos: [
      { id: "V5QKv8f17OA", title: "EX04(上級) - 這原來都是老手圈的基本操作！大亂鬥進階技巧(下)" },
    ],
  },
  "ssbu-05": {
    termGroups: [
      {
        title: "大亂鬥專業術語 (上) - 來自影片 EX09",
        terms: [
          { zh: "? + tilt/smash/air", ja: "？強 / ？スマ / 空N 等", desc: "結合方向與攻擊類型的縮寫，F (前)、N (原地/空)、U (上)、D (下)、B (後)，搭配 Smash (猛擊)、Air (空中攻擊)、Tilt (強攻擊) 等組合使用（例如 F-Smash 為前猛擊、N-air 為空N）。" },
          { zh: "J-air", ja: "弱空後", desc: "連招的縮寫，「Jab (弱攻擊) 快速轉向接 Air (空中攻擊)」的縮寫，通常指 Roy 的 Jab → Bair。" },
          { zh: "T-bag", en: "Teabagging", ja: "煽り", desc: "連續蹲下的動作，帶有把自已的◯丸放在對手臉上，有嘲諷與羞辱對手的意味。" },
          { zh: "Tumble", en: "Reeling", desc: "角色被擊飛後，呈現類似布偶癱軟的狀態稱之。若傷害超過100%時，有機率變為縱向旋轉擊飛的 Reeling 狀態。" },
          { zh: "Jab Lock", ja: "ダウン連", desc: "當對手倒地且未受身時，利用傷害較低的弱攻擊打中對手，使其繼續躺在地上（最多連續兩次），以利後續追擊。" },
          { zh: "Tech Chase", en: "受身追擊", ja: "受け身狩り", desc: "預判並追擊對手受身位置的行為。" },
          { zh: "Trip", ja: "転倒", desc: "角色單純跌倒的狀態，例如被香蕉皮丟到而絆倒。" },
          { zh: "Crawl", ja: "しゃがみ歩き", desc: "將搖桿推向斜下方時，特定角色會做出的爬行動作。" },
          { zh: "Spike / Meteor", en: "隕石", ja: "メテオ", desc: "具有向下高速擊飛判定的攻擊，只要超過特定條件就能提早將對手擊墜。" },
          { zh: "Kill Confirms", ja: "撃墜確定", desc: "只要輸入時機和打中位置正確，就必定能夠接續擊墜對手的連招。" },
          { zh: "True Combo", en: "絕對連招", ja: "確定コンボ", desc: "對手完全無法透過迴避脫離的必中連招，最多只能 SDI 去避免對手連攜。" },
          { zh: "Lab", desc: "在訓練模式中測試連招或遊戲機制的行為。" },
          { zh: "Footstool", en: "踩頭跳", ja: "踏み台ジャンプ", desc: "在對手頭上按跳躍鍵，將對手當作踏板起跳，會造成對手短暫的無法動作時間。" },
          { zh: "Tomahawk", en: "空跳抓", ja: "すかし", desc: "跳起來後什麼都不做直接落地，藉由騙取對手舉盾防禦的時間差，在落地瞬間進行抓取。" },
          { zh: "Delay", en: "延遲", ja: "ディレイ", desc: "刻意晚一拍才出招，或是回場時改變慣性來製造落下位置的時間差。" },
          { zh: "Armor", en: "霸體", ja: "アーマー", desc: "遭受攻擊時也不會停止當下動作的狀態，可細分為 Heavy、Passive、Super 等不同機制。" },
          { zh: "Flinch / Hitlag / Hitstun", ja: "ひるみ / ヒットストップ / ふっとび硬直", desc: "被打中而後退的膽怯動作為 Flinch。雙方因攻擊接觸而多出的停滯時間稱為 Hitlag。被擊飛後無法動作的硬直時間則為 Hitstun。" },
          { zh: "Startup / Active Frames / Endlag", ja: "発生 / 持続 / 後隙", desc: "出招開始到產生判定所需的幀數（前硬直）為 Startup。動作過程中真正有攻擊判定的期間為 Active Frames。招式結束後的硬直時間則是 Endlag。" },
          { zh: "Hitbox / Hurtbox / Disjoint", ja: "攻撃判定 / やられ判定 / 武器判定", desc: "攻擊判定範圍（Hitbox）與角色本身會受傷的範圍（Hurtbox）。若兩者不重合（如武器判定在身體之外），出招會相對安全，稱為 Disjoint。" },
          { zh: "Tipper / Reverse Tipper", ja: "先端 / 根元", desc: "劍尖部位具備強判定的招式（Tipper），以及劍柄部位具備強判定的招式（Reverse Tipper）。" },
          { zh: "Burst", desc: "出招速度極快、讓對手幾乎難以反應的攻擊。" },
          { zh: "Option / Option Coverage", ja: "選択肢", desc: "在特定情形下能做出的選擇（Option）。利用一個動作去反制或涵蓋對手多種可能選項的行為稱為選項覆蓋（Option Coverage）。" },
          { zh: "Commitment", desc: "執行風險較大或空檔較大的選項。" },
        ],
      },
      {
        title: "大亂鬥專業術語 (下) - 來自影片 EX10",
        terms: [
          { zh: "Spam / Mash", ja: "入れ込み / ぶっぱ", desc: "不斷重複使用相同招式的行為稱為 Spam。不經思考、不觀察對手而無腦狂放猛擊的行為稱為 Mash。" },
          { zh: "Whiff Punish", en: "揮空懲罰", ja: "差し返し", desc: "趁對手招式揮空之後，抓準破綻給予的懲罰攻擊。" },
          { zh: "Poke", ja: "牽制 / 置き", desc: "朝對手可能接近的位置揮招，用於試探對手移動方向或限制其接近。" },
          { zh: "Clank / Trade", ja: "相殺 / 相打ち", desc: "雙方攻擊判定互相抵消（Clank），或互換傷害（Trade）。" },
          { zh: "Staling", en: "Stale-move Negation", ja: "OP相殺 / ワンパターン相殺", desc: "一直使用相同招式，會導致該招式的傷害量與安全幀數漸漸減少的機制。" },
          { zh: "Drag Down", en: "下拖", ja: "引きずり落とし / すっぽ抜け", desc: "有些招式有將擊中的目標往下拖拉的特性，故刻意不將招式打完，藉此把空中的對手拖至地面產生硬直或平台下方以利擊墜。" },
          { zh: "Gimp", desc: "對處於場外的對手施加小傷害或干擾，使其錯過反應時間或操作失誤而遭擊墜。" },
          { zh: "Spacing / Zoning", ja: "間合い管理 / ゾーニング", desc: "隨時保持安全距離來攻擊對手（Spacing）。利用場地優勢或遠距離攻擊去限制對手行動、逼迫對方做出選擇（Zoning）。" },
          { zh: "Camp / Circle Camp", ja: "キャンプ", desc: "避免正面迎戰，傾向利用遠端攻擊打帶跑的風箏戰術（Camp）。在三平台場地環繞打帶跑的游擊戰則為 Circle Camp。" },
          { zh: "Juggle", ja: "お手玉 / 着地狩り", desc: "持續將對手打飛在空中，並一直對空攻擊阻止對手輕易落地。" },
          { zh: "DI / LSI", en: "擊向調整/擊速調整", ja: "ベク変 / 速変", desc: "在被擊中時推動搖桿，藉此調整被擊飛的方向（DI）或影響擊飛速度的倍率（LSI）。" },
          { zh: "SDI", ja: "ずらし", desc: "在被連續攻擊的硬直期間，重複輸入同向指令使角色漸漸移動，以提早脫離攻擊範圍。" },
          { zh: "Pressure", en: "施壓", desc: "對劣勢者施加壓力（例如壓盾），引誘或逼迫對手做出你預期的行動。" },
          { zh: "Condition", en: "誘導習慣", desc: "透過重複特定行為去影響對手，讓對手養成某種習慣後再趁機給予大懲罰。" },
          { zh: "Ledge Trap", en: "困邊", ja: "崖狩り", desc: "將對手困在邊緣，透過猜測或選項覆蓋讓對手難以回到場內。" },
          { zh: "Edgeguard", en: "守邊", ja: "復帰阻止", desc: "主動阻止場外對手成功回場，甚至讓其連邊緣都抓不到的行為。" },
          { zh: "Mix Up", en: "混入選項/意外選項", desc: "在相同情境中混入不同的選擇避免被摸透，或是刻意使用出乎意料的選項來反制對手。" },
          { zh: "Call Out", ja: "読み", desc: "成功猜中或看破對手的選項，並給予重擊懲罰。" },
          { zh: "Matchup", ja: "キャラ相性", desc: "針對角色之間對戰的優劣勢關係與好不好打的概念。" },
          { zh: "Game Plan", desc: "理解自身與對手角色特性後，所擬定的整體打法與戰術。" },
          { zh: "CQC", en: "Close Quarter Combat", ja: "近距離戦", desc: "可互相攻擊範圍內的近距離攻防戰。" },
          { zh: "Line", en: "Stage Control", ja: "ライン", desc: "雙方角色之間畫出的虛擬界線，代表角色的自由活動領域，領域越大代表場地控制權越穩固。" },
          { zh: "Advantage / Disadvantage", en: "優勢/劣勢", ja: "有利 / 不利 / 展開", desc: "依據站位、資源或角色狀態，能做的事情較多的一方為優勢，反之為劣勢。" },
          { zh: "Neutral", en: "立回", ja: "ニュートラル / 立ち回り", desc: "指雙方在正式交戰前，為了取得優勢或試探對手而展開的一切行動、走位或策略。" },
          { zh: "Ditto", ja: "ミラー", desc: "使用相同角色進行的鏡像對戰。" },
          { zh: "Risk and Reward", en: "風險獎勵", ja: "リスク・リターン", desc: "評估操作失誤帶來的風險與成功帶來的獎勵之間的關係。" },
        ],
      },
    ],
    videos: [
      { id: "SWboFFEQEIA", title: "【任天堂明星大亂鬥SP】EX09 - 大亂鬥的專業術語 (上)" },
      { id: "Yj19GT1mjNM", title: "【任天堂明星大亂鬥SP】EX10 - 大亂鬥的專業術語 (下)" },
    ],
  },

  "ssbu-06": {
    videoFolder: "ssbu-slingshot",
    methods: [
      {
        tab: "Slingshot",
        name: "彈弓（Slingshot）",
        video: "20260709_Slingshot.mp4",
        steps: [
          "靜止狀態下快彈左搖桿執行__衝刺（Dash）__",
          "迅速將左搖桿撥向反方向的斜下或斜上",
          "跳躍（Jump）",
        ],
      },
    ],
    principle:
      "在《大亂鬥SP》中，如果在衝刺時反向跳躍，會觸發 RAR（反向空中衝刺），讓角色背對前進方向跳躍。然而，直接輸入「正後方」會與遊戲內的煞車動作或轉身指令衝突，導致無法被穩定預先輸入（Buffer）。2022/5/7 【GimR】提出若使用「斜下（或斜上）」來代替「正後方」，可以避免這個問題。遊戲的指令緩衝系統允許玩家預先儲存指令（指令儲存 9 幀）。當你輸入「斜下」時，系統會判定你進行了轉向，但因為不是正後方，不會觸發煞車或衝刺的覆蓋動作。這樣就能完美保留衝刺時的「最大橫向空中慣性（Max Air Speed）」，在動作結束的瞬間，系統會自動幫你執行一個擁有最完美慣性的轉向跳躍。",
    notes: [
      {
        text: "Slingshot 和 IRAR（Instant Reverse Aerial Rush，瞬間反向空中衝刺）兩者的視覺結果確實相似，但本質上輸入難度與應用層面有不同之處：",
        sub: [
          "IRAR 是在初始衝刺（Initial dash）的極短瞬間輸入後方向加跳躍。它需要幾乎幀數完美（Frame-perfect）的精準按壓。如果時機稍微不對，你就會失去衝刺的動能垂直跳起，或者變成單純的地面煞車。Slingshot 單純只有轉向的指令，沒有反向衝刺的煞車去覆蓋原動作，因此可以解釋為一種「高容錯的 IRAR」。你不需要擁有極限的反應神經去抓那 1 幀的完美時機，只要在動作結束前尻好指令，系統就會保證給你一個 100% 滿慣性的 RAR。",
        ],
      },
    ],
    videos: [
      { id: "1-4jVbs42-4", title: "EX06 - 改變Meta的技巧！？「彈弓(Slingshot)」極簡化的轉向跳躍！" },
    ],
  },

  "ssbu-07": {
    intro: "依角色分類整理立回、特殊操作或角色特色的分享。",
    videoGroups: [
      {
        title: "皮丘 Pichu",
        videos: [
          { id: "ca0uM8-76SE", title: "EX05 - 5分鐘學會「自動取消」與「皮丘的空後連段」！(Autocancel & Pichu's Back Air Loop/ピチューの空後落としループ)" },
          { id: "oFGgvpKHhYM", title: "EX07 - 大亂鬥的黃色小惡魔鼠！『皮丘』角色特色與進攻模式小講座（Pichu's Tutorial in SSBU, Ver.13.0.1）" },
          { id: "uHKrtsh-Ln4", title: "EX08 - 緋緞的降雷者！『皮丘』專用房間擊墜集（Pichu Montage in Battle Arenas, on Twitter/Discord｜Joy-Cons使用）" },
        ],
      },
    ],
  },

  "ssbu-08": {
    intro: "以短影音的方式快速分享遊戲內常見的特殊操作。",
    videos: [
      { id: "NIRUZmBsBcc", title: "貝雷特邊緣下投就能擊墜？「滑離上B」與「跳躍取消」", desc: "滑離上B / Slideoff Up B、跳躍取消 / Jump Cancel" },
      { id: "lVn-NsJNPuw", title: "變向４次的 Wavebounce 也太難？用「C反」簡化輸入", desc: "C反 / C Bounce" },
      { id: "3S6Q-yLzhHY", title: "主 Main 瑪利歐必學！收頭強招「轉向猛擊」", desc: "轉向猛擊 / Pivot Cancel Smash" },
      { id: "DITl9t1-_W4", title: "「Z Drop Combo」動彈不得的撃墜 Combo", desc: "林克的 Z Drop Combo" },
      { id: "HWLXZVLoQV8", title: "即使 0% 也不要靠近路易吉！0-to-Death Combo", desc: "路易吉即死連招 / 0-to-Death Combo" },
      { id: "e9tduGit1Lw", title: "不錯過時機！2種「瞬間蹬牆跳」", desc: "瞬間蹬牆跳 / Instant Wall Jump" },
      { id: "gXcm4yeo0RQ", title: "「空中轉向必殺技」森喜剛不用再怕貝雷特即死 Combo", desc: "空中轉向必殺技" },
      { id: "dH6f0reQYRM", title: "史提夫的收頭絕技「出盾踩頭」", desc: "出盾踩頭 / Shield Cancel Footstool" },
      { id: "lwA9PBSnJaQ", title: "超夢的「踩頭定身」原來這麼簡單？", desc: "踩頭定身 / Footstool Disable" },
      { id: "LYfd9GlG_SE", title: "皮丘也有反擊技？「反擊打雷」", desc: "反擊打雷 / Thunder Counter" },
      { id: "TUH5ZJIecRo", title: "法爾科的「貼地幻影」是這樣按的！？", desc: "貼地幻影 / Low Phantasm、小跳必殺 / Short Hop Special" },
    ],
  },

  "aoc-01": {
    intro: "收錄《災厄啟示錄》主線流程攻略與戰鬥挑戰影片，包含各章節的過場動畫、克洛格果實位置，以及非常困難（Very Hard）難度的戰鬥挑戰示範。",
    videos: [
      { id: "azFNNzQyl8Q", title: "攻略01（體驗版）- 13個克洛格果實的位置" },
      { id: "XNviEYJ-Qgg", title: "戰鬥挑戰Lv.1~10《小心易爆（Handle with Care）》｜非常困難（Very Hard）" },
      { id: "zFlZmmbYdLo", title: "戰鬥挑戰Lv.1~10《丟出去再引爆（Mastering Remote Bombs）》｜非常困難（Very Hard）" },
      { id: "hXmTDQYeo5w", title: "戰鬥挑戰Lv.1~10《被奪走的土地（Lizalfos Infestation）》｜非常困難（Very Hard）" },
      { id: "2D7tYXbWrVA", title: "流程01：第一章《海拉魯平原戰》- 含克洛格位置、過場動畫｜非常困難（Very Hard）" },
      { id: "hHbUjBuRXAQ", title: "流程02：第一章《前往王室古代研究所》- 含克洛格位置、過場動畫｜非常困難（Very Hard）" },
      { id: "wy7ZHdSPkSg", title: "Yu-Da戰鬥中的手部特寫鏡頭2（Yu-Da's Combat Handcam in Hyrule Warriors: Age of Calamity）" },
    ],
  },

  "aoc-02": {
    methodsTitle:   "技巧一覽",
    principleTitle: "傷害機制",
    principleSections: [
      {
        text: "《災厄啟示錄》的傷害幾乎全部來自__猛擊__。流程是先打出敵人的__弱點槽（WPG）__，槽滿之後接猛擊，才能造成有意義的輸出。因此高難度的核心課題不是「怎麼砍比較痛」，而是「怎麼更快、更多次地打出弱點槽」。",
      },
      {
        title: "武器刻印為什麼建議選攻擊速度？",
        collapsible: true,
        items: [
          "傷害主要來自猛擊，單純提升攻擊力對猛擊的幫助有限",
          "破防用的強攻擊多半在 __C5 之後__，攻擊速度直接決定你多久能打完一輪 C 技",
          "因此__攻擊速度提升__的實際效率高於攻擊力提升",
        ],
      },
      {
        title: "為什麼有些舊版技巧現在不能用了？",
        collapsible: true,
        items: [
          {
            text: "__槍林克 C6 擊點殘留__（1.2 版前）",
            sub: [
              "舊版 C6 往下衝時按住 ZL，落地會取消衝擊，但周圍保留約 4 秒的連打判定",
              "DLC1 之後殘留時間__已大幅縮短__，雖仍有傷害，但無法再作為主要輸出手段",
            ],
          },
          {
            text: "__可秋拉 ZR2 降防疊加__（1.2 版前）",
            sub: [
              "舊版大妖精可秋拉（金髮）的 ZR 第二段帶降防效果，且可無限疊加，疊到第 8 層有毀滅性傷害",
              "最新版本__已被削弱__，不再具秒殺能力，但大妖精整體掃場能力依然很強",
            ],
          },
        ],
      },
    ],
    methods: [
      {
        tab:  "破防流",
        name: "打出弱點槽（WPG Breaking）",
        intro: "以下是幾種高效觸發弱點槽的方法：",
        steps: [
          "__利用攻擊空檔__：怪物在進行特定攻擊後會暴露弱點",
          "__攻擊弱點部位__：射擊眼睛或爆頭",
          "__對應希卡道具__：使用剋制怪物動作的希卡道具",
          "__破霸體強攻擊__：例如單手劍林克的 C5／C6，或米法的 C6",
          "__靜止器延長__：趁弱點槽出現時使用靜止器，可延長約 __5 秒__的攻擊時間",
          "__突擊不打完__：觸發突擊（Flurry Rush）時故意不打最後一下，可在短時間內破壞更多弱點槽，且每次突擊攻擊都會延長慢動作時間",
        ],
        note: "破防後的猛擊才是主要傷害來源，因此「一場戰鬥能破幾次防」比「單刀傷害多高」更決定輸出總量。",
      },
      {
        tab:  "硬直取消",
        name: "多重硬直取消（Endlag Cancel）與 ZRB 亂舞",
        steps: [
          "__ZL 重置／防禦取消（Guard Cancel）__：攻擊中按住 ZL 約一秒會重置攻擊，主要用於取消強攻擊（特別是 C1）的後硬直",
          "__迴避取消（Dodge Cancel）__：使用普攻、強攻擊、ZR、靜止器後，按 B 迴避可取消後硬直，甚至可觸發突擊",
          "__取消靜止器動作__：對靜止器指定的攻擊進行突擊",
          "__希卡取消（Sheikah Cancel）__：使用希卡道具可取消 X／Y 攻擊和突擊的後硬直，過程有__短暫無敵判定__，適合躲避無法迴避的攻擊",
          "__必殺取消（Special Attack Cancel）__：直接按 A 使用必殺技可取消任何硬直",
          "__ZR 取消（ZR Cancel）__：部分角色（單手劍林克、烏魯波薩、露珠）可用 ZR 取消盾反的硬直",
          {
            text: "__ZRB 亂舞（ZRs Combo）__：米法、希多、大妖精等角色的核心技巧",
            sub: [
              "不停交錯按 ZR 和 B（或同時按），可快速累積必殺技槽",
              "搭配靜止器造成巨大傷害",
              "__大妖精的 ZRB__ 特別強勢，可一邊大範圍攻擊一邊快速移動躲避",
            ],
          },
        ],
      },
      {
        tab:  "進階操作",
        name: "通用的操作技巧",
        steps: [
          "__最速盾反靜止（Fast Parry Stasis）__：盾反成功後可立刻接上靜止器",
          "__法杖取消（Rod Cancel）__：舉起法杖（不需發射）即可取消許多攻擊動作的後硬直，例如突擊或強攻擊，甚至能在迴避時舉杖取消迴避動作，更快進行下一波攻擊",
          {
            text: "__空中減速攻擊（Bullet Time Attack）__：在空中射箭會觸發子彈時間，周圍怪物動作變慢",
            sub: [
              "__子時雷射（Bullet Time Laser）__：例如特拉扣的雷射，在空中觸發子彈時間後，雷射可持續對緩慢的怪物造成傷害",
            ],
          },
          "__米法噴泉治療__：米法的噴泉可治療隊友（包含 NPC）。按 X 幫他們回血，連按 ZR 幫自己回血；找牆壁使用 ZR 可同時補自己和隊友",
          {
            text: "__力巴爾的空中轉向與靜止滑行__",
            sub: [
              "__空中轉向__：在空中按 B 可強制改變力巴爾的面向（非正對背面時）",
              "__靜止滑行（Stasis Slide）__：在空中使用 C5 後，落地前觸發靜止器，可進行長距離滑行",
            ],
          },
        ],
      },
      {
        tab:  "角色專屬",
        name: "各角色的特化戰法",
        steps: [
          "__單手劍林克 － 無限踩盾滑行__：在坡度陡峭的下坡使用 C3 踩盾跳，接著持續按著 X，即可觸發連續踩盾滑行",
          "__槍林克 － 滯空突刺（Mid-Air Spearing）__：空中攻擊完畢後按 ZR 擊中目標，可重置空中攻擊次數",
          "__槍林克 － 擲槍瞬移（Spear Warping）__：空中按 X 擲出槍後，林克會直接瞬移到槍落下的位置，可用於下坡長距離移動",
          "__達爾克爾 － 消耗戰法__：防護罩非常堅固，抓準時機攻擊、其餘時間保持防禦，即可穩紮穩打",
          "__雙手劍林克 － 消耗戰法__：鎖定敵人後不斷往前按 X 進行衝刺攻擊，可繞著敵人打",
          "__可蓋大人 － C3__：Y Y X 組合技",
          "__阿沅 － C5 爆破__：在橘色防護罩狀態下，C5 落地前按下 ZR，有機會產生異常的疊加爆炸傷害",
        ],
      },
      {
        tab:  "法杖應用",
        name: "法杖與場地屬性",
        steps: [
          "__雷杖＋磁力吸取器（Magnesis Thunderstorm）__：先用磁力吸取器吸起金屬物體，再用雷杖攻擊被吸起的金屬物體，可一口氣電擊所有被吸過來的怪物；若是小 Boss 還能直接打出碎裂的弱點槽",
          {
            text: "__屬性加成__：法杖打在對應場地上效果更強",
            sub: [
              "__火杖__打在乾燥草原上效果更強",
              "__冰杖__打在水上會有大範圍結凍效果",
              "__雷杖__打在金屬、水上或下雨天也會有放電效果",
            ],
          },
        ],
      },
    ],
    notes: [
      {
        text: "本頁技巧以__最新版本（含 DLC1 之後）__為準，部分舊版強勢技巧已被削弱，詳見上方「傷害機制」的說明。",
      },
      {
        text: "難度越高，弱點槽越難打出、猛擊的重要性越高。低難度可以直接砍，高難度請優先練破防流與硬直取消。",
      },
    ],
    videos: [
      { id: "j22wcT5GDrU", title: "攻略02（體驗版）- 13個對新手們一定有幫助的事情" },
      { id: "urR9Kt2TBGA", title: "攻略03 - 基本操作解說（直述版｜以「林克」示範）" },
      { id: "hv3IuZATeOg", title: "攻略04 - 16個進階技巧與戰鬥知識(Advanced Techniques)", desc: "本頁多數技巧的出處" },
      { id: "s6aHyijl1tI", title: "攻略05(含DLC1內容) - 學會4招輕鬆打「啟示錄」等級！(4 High-Damage Techniques in Age of Calamity)", desc: "本頁多數技巧的出處" },
    ],
  },

  "aoi-01": {
    methodsTitle:   "戰鬥技巧",
    principleTitle: "高難度機制",
    principleSections: [
      {
        text: "《封印戰記》的傷害順序是__猛擊 → 同步技 → 固有技破招__，最後才是必殺技與普攻。困難以上難度很容易進入消耗戰，因此「怎麼降低受傷」和「怎麼穩定破防」比堆傷害更重要。",
      },
      {
        title: "困難以上難度改了什麼？",
        collapsible: true,
        items: [
          {
            text: "__無時停選單__：按 R 開啟技能選單時__不會有慢動作__",
            sub: [
              "只有系統提示的 Boss 特殊招式才會進入慢動作",
              "普通模式以下才有，且 4 秒解除後可再點一次 R 重新進入",
              "小 Boss 要放突進招還是騰空招，玩家都必須__即時反應__",
            ],
          },
          {
            text: "__營地不補血__：地圖上沒有補血道具，只能靠隨身糧食與電池",
            sub: [
              "普通以下：恢復血量、電池，以及隨身糧食和電池",
              "__困難__：只恢復電池和隨身電池",
              "__非常困難__：什麼都不恢復，必須打得極度保守",
            ],
          },
        ],
      },
      {
        title: "屬性相剋是怎麼判定的？",
        collapsible: true,
        items: [
          "__火冰互剋__：打冰用火、打火用冰；打雷用火或冰都可以，只要不用電",
          "所謂相剋__只差在容不容易集滿弱點槽的外圈__，不是寶可夢那種倍率關係",
          "用火打冰，外圈很容易集滿；用火打火，外圈不會累積 —— 但__傷害量是一樣的__",
          "外圈填滿即可強制破霸體，這是高難度最穩定的破防手段",
        ],
      },
    ],
    methods: [
      {
        tab:  "C技與連招",
        name: "傳統 C 技系統的回歸",
        steps: [
          "攻擊模式以__普攻（Y）__搭配__強攻擊（X）__的 C 技為主",
          {
            text: "__C 幾__就是看強攻擊 X 是第幾個按的",
            sub: [
              "C2 ＝ Y → X",
              "C3 ＝ Y → Y → X",
              "以此類推，也可以一路連打 Y 到底，普攻本身也是進攻手段",
            ],
          },
          "__距離控制__：遠距離用 C2，近距離用 C5，角色用熟就知道該出什麼招",
        ],
        note: "這版的 C 技平衡做得不錯，無雙老玩家會很熟悉，新玩家也能快速上手。",
      },
      {
        tab:  "隊友切換",
        name: "無敵與仇恨轉移",
        steps: [
          {
            text: "__規避致死傷害__：快被打死時馬上切換隊友",
            sub: [
              "AI 控制的隊友減傷極高、防禦極強，在你旁邊挨打遠比你自己挨打安全",
              "可以省下補血資源，還能延長活命機會",
            ],
          },
          {
            text: "__轉移仇恨與繞背__：怪物的仇恨通常在玩家操控的角色上",
            sub: [
              "怪物衝刺進攻時，立刻切換到旁邊的隊友，讓仇恨留在上一個角色身上",
              "切換瞬間有__短暫無敵狀態__，可規避大範圍、難以迴避的攻擊",
              "接著趁機從__背面偷襲__",
            ],
          },
          "__技能取消注意__：手動切換角色時，原角色正在施放的招式效果會被中斷；系統提示的無黑畫面切換則不會。建議招式放完再換人",
        ],
      },
      {
        tab:  "破防與輸出",
        name: "電池換硬直與必殺技追擊",
        steps: [
          {
            text: "__電池換硬直__：高難度下弱點槽（WPG）極難打出",
            sub: [
              "對付強霸體怪物時，用普攻穿插__消耗少、攻速快__的左納烏道具",
              "__火箭__和__炸彈__前期就會拿到，用來強制製造硬直並削減弱點槽",
              "普攻幾下接火箭或炸彈，再難的怪也能磨掉不少血",
            ],
          },
          {
            text: "__必殺技收割殘血__：猛擊的傷害有限",
            sub: [
              "若猛擊打完 Boss 還剩一點血，可用必殺技的__無敵與高爆發__強行收掉",
              "省下再打一次破防的時間，對付強怪特別有用",
            ],
          },
        ],
        note: "本作幾乎不需要升級武器 —— 只要電池夠，左納烏科技就能撐起大部分輸出。",
      },
      {
        tab:  "左納烏連段",
        name: "屬性科技的組合技",
        steps: [
          "__屬性龍捲風__：丟出一個對應屬性的龍頭（火／冰／雷），再丟__兩個風扇__，即可觸發大範圍屬性龍捲。一個龍頭的持續時間可以丟兩個風扇",
          {
            text: "__冰封陣／汎雷爆__：導電與結冰場地",
            sub: [
              "將__冰龍頭與放水栓__同時丟在地上，可製造大範圍結凍",
              "或在地上丟__雷龍頭__後手持放水栓，可持續導電",
            ],
          },
          "__嵐汎雷陣__：雷龍頭不會讓放在地上的放水栓消失，因此上面兩招可以疊起來做出__範圍導電＋龍捲__的效果。手速夠快只需__一格電池__就能打出極高傷害",
          "__脈衝雷射（點放法）__：手持光線頭時不要長按，改用__連打 X__ 進行雷射點放，可高速產生重複判定，對付高難度 Boss 傷害極高",
        ],
        note: "※ 脈衝雷射的原理與《王國之淚》讓魔像頭重複判定目標的做法相同。",
      },
      {
        tab:  "角色特化",
        name: "值得優先練的幾個角色",
        steps: [
          {
            text: "__四賢者與卡拉莫__：自身 C 技就帶屬性",
            sub: [
              "例如 C3／C4 可放出火焰漩渦、水池等",
              "施放後接對應的左納烏道具，__更省電池__",
              "卡拉莫一個角色即涵蓋所有屬性招式",
            ],
          },
          "__希多（水屬）__：擁有免費的水屬性範圍攻擊，面對需要沖刷「淤泥」霸體的關卡，可省下大量電池與放水栓",
          "__薩爾達__：唯一__不需要破霸體__的角色，只要用弓箭__爆頭__即可主動觸發「飛雷神」追擊",
        ],
      },
    ],
    notes: [
      {
        text: "本頁技巧整理自下方影片，該片同時包含購買心得與戰鬥技巧的說明示範。",
      },
      {
        text: "前期成長曲線偏陡，若覺得太難可先調低難度，熟悉 C 技與左納烏連段後再挑戰困難以上。",
      },
    ],
    videos: [
      { id: "RbPA0zL0GHY", title: "真正的「薩爾達」無雙！曠野王淚合計5000小時的玩家告訴你該不該買！", desc: "含一些戰鬥技巧的說明和分享" },
    ],
  },
};
