// 「常見類型」詳細頁的結構化內容。
// 步驟字串中以 __文字__ 包住的片段會在頁面上顯示為橙色。
// 單一步驟：純字串，或附帶巢狀子項目的物件（子項目不影響主編號）
export type TypeStep = string | { text: string; sub: string[] };

export interface TypeMethodSection {
  title: string;      // 子章節標題，例："K+1 法（通用版）"
  tags?: string[];    // 標籤陣列（顯示為「適合 + badge」），例：["～Ver.1.1.2"]
  steps: TypeStep[];  // 該區塊的編號步驟
  note?: string | string[]; // 該區塊步驟下方的灰色備註（可多行）
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
    cameraOrbit?: string;  // 初始視角 "方位角 仰角 距離"，例："15deg 45deg auto"
    cameraTarget?: string; // 初始注視點 "Xm Ym Zm"（glTF 座標，Y 朝上）
    layoutSrc?: string;    // 點擊互動座標表 JSON 路徑（public/ 下），點擊房間顯示名稱
    legend?: { color: string; label: string }[]; // 色彩圖例（顯示於模型下方）
  }; // C 區改放可拖曳旋轉的 3D 模型（取代快速示意）
  methods?: TypeMethod[];     // A 區流程步驟（分頁）
  notes?: TypeNote[];         // 注意事項
  closing?: string;           // 注意事項下方的結語
  faqLink?: { label: string; path: string }; // Q&A 頁面連結（選填）
  videos?: RelatedVideo[];    // 相關影片
  termGroups?: TermGroup[];   // termsOnly 頁的名詞說明分組（大亂鬥用）
  videoGroups?: VideoGroup[]; // videosOnly 頁依分類（例如角色）分組的相關影片
}

export const typeContent: Record<string, TypeContent> = {
  "botw-01": {
    videoFolder: "botw-windbomb",
    principle:
      "2019/9/6 【さとう菓子】玩家發展出的擊飛方法，而後由 【Yuda】, 【Kleric】 等玩家相繼協助改良得穩定且快速的風彈。依曠野之息的物理機制，利用子彈時間降低第二顆炸彈被引爆的機率，使第一顆爆炸時的推進力足以推進第二顆炸彈來撞擊林克，同時解除子彈時間讓林克高速擊飛出去的技巧。",
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
      { text: "Nintendo Switch 1 版須注意「擊停角度」，方位為 45 度的倍數以外的方向會因為瞬間初速度太快而停止、無法擊飛。" },
      { text: "Nintendo Switch 2 Editions 版受「擊停角」影響較小。風彈擊飛後的速度些微下降。若第二炸彈放出後不馬上引爆，成功率大幅下降。" },
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
        tab:   "持大劍",
        name:  "持大劍人馬（雙手大劍 / 獸神大劍）",
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
          "(2) 烏爾波扎的憤怒 ── 解完神獸後的英傑電擊可強制暈眩",
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
    principleItems: [
      "為什麼會有「過場必殺劍」？",
      "①這是遊戲官方為了確保 DLC 結尾過場動畫順利演出，而特製的動畫專用複製品。它和考驗中的必殺劍不同，具備不會吸血、可以自由切換的特色，正常情況下會在動畫結束時被系統強制回收。",
      "成功拿走「過場必殺劍」的原理是什麼？",
      "②當系統道具認知格數(mCount)小於等於 0 時，進入背包的道具會出現在重要物品右側的「未歸類道具頁籤」。而過場動畫只會掃描正常在背包序列裡面的「必殺劍」做刪除，當動畫結束系統執行刪除指令時，會因為不在掃描路徑上而無法將它刪除，玩家便能順利將其卡進存檔帶走。",
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
    principle: "2017/3/10 發售後第八天由 【Pewable】 首度發現並應用於神廟特解，由於太傷盾牌（耐久-30）被棄用。2018/6/17 【Yuda】 得知此技巧後首度使用於戰鬥上。盾擋非膽怯型的傷害會重置跳躍判定，因此在空中盾擋此類型傷害時可以在空中進行第二段跳，由於存在足夠的高低差，按 ZR 拉弓可以進入子彈時間，是大部分戰鬥風格或技巧的祖先級程錯。",
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
      cameraTarget: "-430m 80m -330m",
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
            title: "鐵箱冰柱穿牆法（Metal Box & Cyronis Clipping）",
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
        principle: "先用月步（Moonjump）搭配地底傳送標記器製造[[錯誤的著陸點判定|botw-04]]（Wrong Warp）直接進入劍之考驗地圖，再用[[相機穿牆|botw-18#POV Detach]]卡入水域溺斃來重新初始化位置，最後長按跳躍導向終點觸發過關，跳過中間所有樓層。",
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
        ],
      },
    ],
  },

  "botw-18": {
    methods: [
      {
        tab: "Stasis",
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
        principle: "利用高速撞擊擠壓，讓林克穿出牆面。",
      },
      {
        tab: "Cryonis",
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
        principle: "扭曲恢復時會有短暫的無碰撞判定，藉此穿過牆面。",
      },
      {
        tab: "Horse Jump",
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
        tab: "POV Detach",
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
        principle: "啟動相機或望遠鏡時會改變林克的站位，而開啟相機或望遠鏡時被設定會卡在高低差的邊緣，若林克能夠站立的空間不多，啟動相機或望遠鏡時會被邊緣推回來，進而將林克錯位進到牆內。",
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
        text: "NS1 和 NS2 Edition 版差異不大，NS2 版單純盾跳扭曲不易穿牆，必須藉由樹幹、靜止中的物體等等擠壓才能直接穿牆（如魔獸戰光牆旁的樹幹、依蓋隊後門的柱子、牆壁前面靜止一個物體等）。",
      },
    ],
    videos: [
      { id: "Zpc6r4T8Wwk", title: "ED02 - NS2才知道也不遲！絕對不能錯過的技巧！（下）" },
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
    principle: "正常的「突擊(Flurry Rush)」，是部分種類的傷害接近林克時，林克做出「迴避跳（ZL+X+→/←/↓）」就能「完美迴避」，並且在成功完美迴避時的子彈時間內觸發突擊。而在達爾克爾的守護破開或完美守護、空中 ZR 拉弓等等的子彈時間內做出能觸發完美迴避的「迴避跳（ZL+X+→/←/↓）」，也可以主動觸發突擊。",
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
    videoFolder: "totk-lynel",
    methodsTitle: "攻擊模式",
    principleTitle: "對應策略",
    principle: "內容整理中，敬請期待。",
    methods: [
      {
        tab: "共通",
        steps: ["步驟整理中，敬請期待。"],
      },
    ],
    notes: [{ text: "內容整理中，敬請期待。" }],
    videos: [],
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
            tags: ["Ver.1.2.0+"],
            steps: [
              "裝備纏桿盾或纏桿武器",
              "騎上米涅魯，按 R 打開餘料對準目標左納烏裝置",
              "點擊 L, Y, R 之後，3 幀內打開快速選單或暫停，丟棄並切換裝備中的纏桿盾(武器)觸發[[閃藏（Portacull）|totk-08#Portacull]]",
            ],
          },
          {
            title: "米涅魯隱藏糾纏（Mineru Cull FE / YeeFE）",
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
            tags: ["All Versions"],
            steps: [
              "觸發[[並列過載|totk-10#Zuggle]]",
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
      { id: "EIruDcEuUs4", title: "番外11 - 神廟的蹺蹺板可以幹走！？幹走蹺蹺板來做「超高速飛行器(Hyper Speed Flying Mechine)」(程錯原理與流程說明｜～ver.1.2.1）" },
      { id: "80XD1dfAxSk", title: "番外10 - 1.2.1版最方便的武器置換和詞綴轉移！『餘料儲存（Fuse Storage）』" },
      { id: "QlJwMCtnE9A", title: "番外10(會員) - 1.2.1版最方便的武器置換和詞綴轉移！『餘料儲存（Fuse Storage）』與步驟詳細解說(Setup Breakdown)！" },
      { id: "Y3AUNIheO84", title: "番外05 - 實用技巧攻略(三)｜王淚戰鬥系統的精髓（～ver.1.2.1版）" },
    ],
  },

  "totk-07": {
    methods: [
      {
        tab: "FS",
        name: "餘料儲存（Fuse Storage）",
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
        steps: [
          "過載狀態下切換裝備，__過載掉落__一個武器或盾牌",
          "將步驟 1 在地上的裝備餘料糾纏到另一類裝備上（__步驟 1 為武器，步驟 2 就是餘料到盾牌上__）",
          "丟出一個操縱桿，將操縱桿餘料到步驟 1 過載掉落的裝備上（__步驟 1 為武器，步驟 3 就是餘料到武器上__）",
          "操作操縱桿，切換或卸掉步驟 1 的裝備後連打 B",
          "操作另一個操縱桿 / 騎上米涅魯或其他騎乘物件解除技能輪盤的鎖定",
          "步驟 3 的操縱桿會變成「纏桿（SDC）」",
        ],
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
            title: "隱藏儲存（Cull Storage）",
            tags: ["All Versions"],
            steps: [
              "在阿卡萊用餘料糾纏的方式準備[[纏桿|totk-07]]，將纏桿貼著隱藏區的牆壁",
              "裝備著纏桿的母裝備離開隱藏區",
              "對隱藏區內的纏桿__倒轉乾坤__，丟棄纏桿的母裝備後快速撿起來，並解除倒轉乾坤",
              "下一次丟棄纏桿的母裝備時，20幀後會釋放一次隱藏（NS1為10幀）",
            ],
          },
        ],
        note: "※ 步驟 3 可改為舉著電池或龍頭等可舉物品，解除倒轉乾坤的部分可以改為快速進出隱藏區讓纏桿顯現。",
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
      { id: "GZLuq0Xh8Dg", title: "不廢話08 -「攜帶式隱藏(Poratble Culling)」Ver.1.2.0～", desc: "2024-07-17｜Shorts / 短片" },
      { id: "mE-uVcRvMes", title: "不廢話08 -「攜帶式隱藏(Poratble Culling)」全版本", desc: "2024-07-16｜Shorts / 短片（未公開）" },
      { id: "rGCvHgch9jI", title: "不廢話07 -「萊克吞桿隱藏(LLSC, Like-Like Stick Culling)」", desc: "2024-07-16｜影片" },
      { id: "qnq6E_8b9rU", title: "不廢話06 -「纏桿隱藏(SDC Culling)」", desc: "2024-07-14｜影片" },
      { id: "s8wXxO8Lzis", title: "番外12(會員) - 捆包無限材料增殖 2種另類流程", desc: "2024-06-22｜影片｜相關：直接離開隱藏區 / Outside Cull Area" },
      { id: "hfWHsO1-zg4", title: "番外12 - 捆包無限材料增殖", desc: "2024-06-16｜影片｜相關：米涅魯隱藏增殖法" },
      { id: "wo7BDQRxag4", title: "番外11(會員) - 走狗(Zoggle)路線", desc: "2024-05-20｜影片｜相關：解桿遁地法 / Stick Desync Culling" },
      { id: "QlJwMCtnE9A", title: "番外10(會員) - 餘料儲存與步驟詳細解說 (1/2)", desc: "2024-04-11｜影片｜相關：隱藏 / Cull" },
    ],
    notes: [
      { text: "本頁說明為修改中，正式攻略步驟尚在整理中。" },
    ],
  },

  "totk-09": {
    methodsTitle: "裝備狀態",
    notesTitle: "備註說明",
    methods: [
      {
        tab: "Smuggle",
        name: "黏手（Smuggle）",
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
        name: "並列（Zuggle = Zvleon's Smuggle）",
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
                  "丟棄任意 2 把以上武器 / 盾牌 / 弓箭，或是[[米涅魯的手臂|totk-10#SFO]]",
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
        tab: "Sluggle",
        name: "Sluggle",
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
            title: "法三：已有同類 Smuggle 時，讓 Like Like 偷走另一件同類裝備",
            tags: ["All Versions"],
            steps: [
              "讓 Link 端已有一件同類裝備處於 Smuggle 狀態",
              "讓 Like Like 偷走另一件同類裝備",
              "同類裝備的 Smuggle 關係和 Like Like 的 eaten／隱藏(Cull)關係互相干擾，形成 Sluggle",
            ],
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
            ],
            note: "※ 若要 Wuggle 盾牌，上述順序的武器和盾牌可以對調。",
          },
        ],
      },
      {
        tab: "Zoggle",
        name: "解纏型並列（Zoggle = Ock's Zuggle）",
        tags: ["Ver.1.2.0+"],
        steps: [
          "完成武器的 Wuggle",
          "搜集武器填滿背包，打開一個含有武器的寶箱",
          "開寶箱的丟棄選單中丟棄裝備中的武器（解除快速選單鎖）",
          "裝備火箭盾使用掉（若用米涅魯 Wuggle，直接餘料覆蓋掉米涅魯上的裝備）",
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
        text: "裝備卡在「丟棄序列（Drop Queue）」遊戲同時誤判裝備「已經丟出去」又「還裝備在身上」的現象（2023/5 【Ame】、【LegendofLinkk】 相繼發現）。",
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
        text: "是 Smuggle 的一種，特指在隱藏前瞬間丟切裝備，做出跟 Smuggle 相同的效果（2023/12/29 【Ock】、【ROBUXY2ND】 發現）。",
      },
      {
        title: "Zoggle",
        collapsible: true,
        text: "是 Zuggle 的一種，特指將裝備 Wuggle 的狀態解除，從 Wuggle 轉變而成的 Zuggle（2024/1/4 【Ock】、【Ryan?】發現）。",
      },
    ],
    notes: [
      {
        text: "Smuggle、Zuggle 的情形下丟棄裝備，該裝備會保持和林克有依賴關係的狀態，該狀態或裝備稱作 Zuggle Drop（從 Zuggle 被丟棄出來的狀態）",
      },
      {
        text: "Zuggle 的數量太多，達到林克的裝備依賴上限，會造成 [[Zuggle Overload|totk-10#Zuggle]]。",
      },
    ],
    faqLink: { label: "深入了解 Zuggle", path: "/types/totk-09-zuggle" },
    videos: [
      {
        id: "aELlly95zCk",
        title: "番外20 - 全屬性大師劍！並列多把裝備在手上的「再同步並列(Swap Resync Zuggle)」步驟與原理解說",
      },
    ],
  },

  "totk-10": {
    methods: [
      {
        tab: "Zuggle",
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
          "重複 Zuggle 或 Invizuggle，使 9 到 10 個（適用於 1.0.0 版本）或 13 到 14 個（適用於 1.1.0+）武器、盾牌或弓箭並列裝備在林克身上或是 Zuggle Drop 在地上，使其達到林克本身的依賴數上限，導致切換裝備會使裝備掉落在地上、讀檔林克身上頭髮或衣服會從林克身上脫離。",
        principleExtra: {
          title: "延伸",
          items: [
            "Overload Drop（過載掉落）：林克身上的裝備依賴數 14 以上時切換裝備，該裝備會掉落在地上，但選單為裝備中。",
            "Temporary Overload（臨時過載）：丟切裝備中的道具可以在關閉暫停的一瞬間，增加 1 的負載量，同種類型裝備的臨時過載只會 +1，故最多能 +3。",
            "Overload Pickup（過載撿拾）：包含丟切裝備中的道具，林克身上的裝備依賴數 14 以上試圖空手撿裝備，會發現選單有撿起來並裝備，但是該裝備的模型仍在原地沒有被撿起。",
            "Mitosis（過載分裂）：Overload Drop 盾牌(或武器) → 打開暫停丟切纏桿武器(或盾牌)並切換裝備另一個盾牌。",
          ],
        },
      },
      {
        tab: "Fuse",
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
        sections: [
          {
            title: "全域餘料過載（Super Fuse Overload）",
            tags: ["All Versions"],
            steps: [
              "觸發 Zuggle Overload",
              "利用 Overload Batch DI 批次虛化 20 把武器",
              "Smuggle 並投擲 DI 武器，__懲戒化（Purgatorize）__ 20 把武器，繞過餘料上限",
              "再將 28 ～ 30 個盾牌冷餘料在被懲戒化的 20 把武器上，使餘料依賴超過 600 個，直到盾牌無法再被冷餘料在武器上",
              "投擲材料、手持捆包、NPC身上的裝備都會開始脫離本體",
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

  "totk-11": {
    videoFolder: "totk-sneakstrike",
    methods: [
      {
        tab: "快速繞背",
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
    videos: [
      {
        id: "QWevjL_rbE8",
        title: "番外08(舊) - 300小時還不知道的12種玩法（~ver.1.2.1, Still Don't Know Until 300 Hours Play-Time）",
        at: 252,
      },
    ],
  },

  "totk-12": {
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
        steps: [
          "將會耗電的左納烏裝置餘料糾纏在盾牌上",
          "將左納烏裝置餘料建造在武器上",
          "往前衝刺，並在衝刺中按暫停",
          "丟出4把以上裝備（武器 / 盾 / 弓），最近丟棄糾纏盾並裝備另一個盾牌觸發盾牌__丟切隱藏（Drop Swap Cull）__",
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
      "舊版本（～Ver.1.1.2）可以藉由裝備單手劍和餘料好裝置的盾牌，按住 ZL，按 Y 揮武器啟動雷龍頭，讓系統在同一幀判定「電掉中斷」+「你正要使用裝置」，讓盾牌上的裝置可以恆常啟動，也是 Guard-less Active Shield 名稱的由來。新版本主要是想辦法「讓裝置被隱藏時啟動它」，這樣裝置只會記得它要啟動，沒有關閉。通常配合餘料糾纏或相似的程錯來達成這樣的遠端操作。",
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

  "totk-13": {
    methods: [
      {
        tab: "MSD",
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
        tags: ["Ver.1.2.0+"],
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
        tags: ["All Versions"],
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

  "totk-14": {
    methods: [
      {
        tab: "SBR",
        name: "盾擋重置（Shield Block Reset）",
        steps: [
          "裝備耐久度夠高、不會因為格擋而損壞的盾牌",
          "按住 ZL 舉盾，「左搖桿 ←/↑/→ ＋ X」鎖定跳的同時在空中盾擋傷害",
          "在空中「左搖桿 ←/↑/→ ＋ X」第二段跳 → ZR 或 ZR＋Y",
        ],
      },
      {
        tab: "Bomb SBR",
        name: "斬彈二段跳（Bomb Shield Block Reset）",
        steps: [
          "裝備單手劍，按 Y 揮劍",
          "十字鍵按▲，丟出一個炸彈花（或是本身劍上已經餘料一個炸彈花）",
          "炸彈花引爆的瞬間，左搖桿往前，並且按住 ZL + X 往前鎖定跳，在空中格擋炸彈花的爆風",
          "在空中「左搖桿 ←/↑/→ ＋ X」第二段跳 → ZR 或 ZR＋Y",
        ],
        note: "※ 若武器餘料火焰犄角（古慄歐克或奧爾龍），用武器的火焰餘波點燃炸彈的話，步驟 3 的 ZL+X 往前跳的時機可以比較餘裕。",
      },
    ],
    principle: "《曠野之息》2017/3/10 由 Pewable 首度發現並應用於神廟特解，2018/6/17 Yuda 首度沿用至戰鬥上。在《王國之淚》也並未被修正。盾擋非膽怯型的傷害會重置跳躍判定，因此在空中盾擋此類型傷害時可以在空中進行第二段跳，由於存在足夠的高低差，按 ZR 拉弓可以進入子彈時間，是大部分戰鬥風格或技巧的祖先級程錯。",
    notes: [
      { text: "鎖定跳必須帶有「方向」，原地跳雖然可以第二段跳，但通常高度不足無法進入子彈時間，此種 SBR 僅有弊無利。" },
    ],
    videos: [
      { id: "zFLuHyITm00", title: "番外01 - 實用技巧攻略(一)｜王國之淚也通用的曠野之息技巧解說！（ver.1.2.0版）", desc: "06:27～開始有提到「盾擋重置」的沿用！" },
    ],
  },

  "totk-15": {
    methods: [
      {
        tab: "Void Dip",
        name: "深淵虛化（Void Dip / Abyss DI）",
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
        tab: "DI Infection",
        sections: [
          {
            title: "虛幽化（Ghost DI）",
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

  "totk-16": {
    methods: [
      {
        tab: "西方高原",
        name: "西方高原（Western Highlands）",
        steps: ["步驟整理中，敬請期待。"],
      },
    ],
    principle:
      "利用彈簧與盾牌連續發射組合出的「連噴火箭盾（Pocket Rockets）」，可不消耗耐久地持續向上推進，是抵達地圖高處或西方高原等隱藏區域的重要手段。詳細原理與步驟陸續整理中。",
    videos: [
      { id: "h7MpbgUvizw", title: "番外22 - 永久連噴、不會消耗的「無限/究極口袋火箭（Infinite/Ultimate Pocket Rockets）」！百科級流程說明（適用ver.1.1.2～）" },
      { id: "7DS_ZmOVuR8", title: "番外23 - 海拉魯西方那座高山用火箭可以上去嗎？IPR 和 LSW 的挑戰！（ver.1.4.3｜Nintendo Switch 2）" },
      { id: "WLSjvOTQXO8", title: "番外23(會員) -「怪持虛化口袋火箭(Enemy DI IPR)」前往西方高原（ver.1.4.3｜Nintendo Switch 2）" },
    ],
  },

  "totk-18": {
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
    principle:
      "利用第一次與柯爾天對話獲得套裝的特性，在倒轉乾坤的神廟觸發「__轉場儲存（Banc Storage）__」，儲存「走進神廟的轉場」的行為，在序章存檔裡面執行，進而得到序章林克走進空島神廟的動畫，藉此獲得序章林克身上的道具和特性，而只有倒轉乾坤神廟可以安全出來，不然其他神廟在還沒有拿到石板的情形下都會有落下判定無法在大地圖上移動。",
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

  "eow-01": {
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
        steps: [],
      },
      {
        tab: "高空傷害",
        video: "20260710_breaking spam.mp4",
        steps: [],
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

  "totk-17": {
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
            timeCost: "★★★★☆",
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
        tab: "Cull Detach (R0&R1)",
        group: "有過載（Overloading）",
        tags: ["Ver.1.2.0+"],
        difficulty: "★★★☆☆",
        timeCost: "★★★★☆",
        sections: [
          {
            title: "前置作業",
            steps: [
              "準備好阿卡萊的手動存檔",
              "在沙漠區找拉吉克觸發一把虛化武器 W1，直接讀檔到阿卡萊",
              "按照以下順序，虛幽化感染 1 把武器和 2 面盾牌：W1 → S1 → W2 → S2，注意只把一般裝備用火箭載走，__虛化裝備間的連結不用解纏__",
              "用 W2 可調式過載，並把 W2 回收回來，把它丟在隱藏區內（__可調式過載中途要撿起 W1 避免地上武器過多而消失__）",
              "丟切卸 Smuggle S1，__過載掉落(Overload Drop)__一面盾牌餘料在武器上，丟出一個浮空石餘料在盾牌上，此時獲得「__浮空石(餘料糾纏) → S1__」，然後把 S1 正常丟在後面（不要 Zuggle Drop）",
              "隨意製作一個纏桿放在隱藏區外不會被餘料的位置，丟切卸 Smuggle W1，過載掉落一把武器，餘料在一般盾牌，再丟出一個盾牌 S3 餘料在武器上，丟棄盾牌把 S3 撿起來，餘料剛剛製作的纏桿 A1，切換武器並丟出，此時獲得「__纏桿盾 S3(餘料糾纏) → W1__」，然後先把它們放在隱藏區但不要靠牆",
              "丟切卸 Smuggle S2，過載掉落一面盾牌餘料在武器上，丟出另一個操縱桿 A2 放在隱藏區靠牆，在隱藏區內對它倒轉乾坤，走到隱藏區外將 A2 餘料在盾牌上，把 S2 正常丟棄在隱藏區內，此時獲得「__隱藏儲存的 A2(糾纏) → S2__」",
              "把浮空石拉到隱藏區內靠牆，將 A2 移到浮空石上面靠牆，靠牆黏一個蘋果在 A2 上離開隱藏區，確認是否只有蘋果被隱藏，有的話表示 A2 有成功儲存隱藏",
              "將 S3 靠牆黏在 A2 上（此時林克離開隱藏區會被隱藏）",
              "Drop Smuggle S2：過載撿拾 S2 → 丟切卸 S2 → 空手撿起 S2 → 切換盾牌任意盾牌",
              "Drop Purgatorify W2：過載撿拾 W2 → 丟切卸 W2 → 空手撿起 W2 → 丟棄 W2",
              "丟切卸 Smuggle W1，並且裝備任意武器",
              "倒轉乾坤浮空石，暫停丟棄裝備中的武器和盾牌之後讀檔到序章或是回到標題開始新遊戲",
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
      { id: "-oifw9PKeh4", title: "回應03 - 錯過就不再的實用道具？「不壞的序章大師劍」與「料理效果轉移」(1.1.1版以前限定)", desc: "最早也是最快的方法（限定Ver.1.1.1以前）" },
      { id: "Gn90XQwp5zU", title: "番外16(1 - 舊) - 1.1.2版～1.2.1版通用流程「序章大師劍(MNF/MSG)」", desc: "Ver.1.1.1以後難度很高但是很快的方法（NS2此法已經較少用，但有很多程錯可以學）" },
      { id: "siGVEF5-AZY", title: "番外16(2 - 舊) - 1.2.0版～1.2.1版獨有｜不在序章手動存檔之「序章大師劍(MNF/MSG)」流程", desc: "Ver.1.2.0～1.2.1最早被復刻的拿法（NS2此法已經較少用，但有很多程錯可以學）" },
      { id: "qumkO3l09Kw", title: "番外16(3 - 舊) - 1.2.X版覺醒大師劍檔(AMS)專用｜失傳已久的過載法「序章大師劍(MNF/MSG)」繼承流程", desc: "Ver.1.2.0～1.2.1最早必須在AMS檔的做法（NS2此法已經較少用，但有很多程錯可以學）" },
      { id: "HmocgDZFVdk", title: "番外16(NS2) - 不去加儂多夫那了！10 分鐘就拿到「序章大師劍（MsgNotFound）」！（ver.1.4.3｜Nintendo Switch 2）" },
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
          { zh: "受身", en: "Tech", desc: "被擊飛並即將撞擊地面或牆壁的瞬間按下防禦鍵，可瞬間恢復姿態站立，避免倒地被Job Lock。" },
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
      "在《大亂鬥SP》中，如果在衝刺時反向跳躍，會觸發 RAR（反向空中衝刺），讓角色背對前進方向跳躍。然而，直接輸入「正後方」會與遊戲內的煞車動作或轉身指令衝突，導致無法被穩定預先輸入（Buffer）。【GimR】 發現若使用「斜下（或斜上）」來代替「正後方」，可以避免這個問題。遊戲的指令緩衝系統允許玩家預先儲存指令（指令儲存 9 幀）。當你輸入「斜下」時，系統會判定你進行了轉向，但因為不是正後方，不會觸發煞車或衝刺的覆蓋動作。這樣就能完美保留衝刺時的「最大橫向空中慣性（Max Air Speed）」，在動作結束的瞬間，系統會自動幫你執行一個擁有最完美慣性的轉向跳躍。",
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
};
