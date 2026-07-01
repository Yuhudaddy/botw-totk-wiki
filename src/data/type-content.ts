// 「常見類型」詳細頁的結構化內容。
// 步驟字串中以 __文字__ 包住的片段會在頁面上顯示為橙色。
// 單一步驟：純字串，或附帶巢狀子項目的物件（子項目不影響主編號）
export type TypeStep = string | { text: string; sub: string[] };

export interface TypeMethodSection {
  title: string;      // 子章節標題，例："K+1 法（通用版）"
  steps: TypeStep[];  // 該區塊的編號步驟
}

export interface TypeMethod {
  tab: string;        // 分頁名稱，例：前跳
  tags?: string[];    // 標籤陣列（顯示為「適合 + badge」），例：["先圓後方"]
  name?: string;      // 方法中文全名（白色字，與 tags 擇一），例："轉存格（Inventory Slot Transfer）"
  steps?: TypeStep[]; // 單一編號步驟（與 sections / bullets 擇一）
  bullets?: string[]; // 無序條列（圓點，與 steps / sections 擇一），用於並列分類
  sections?: TypeMethodSection[]; // 多區塊步驟，每區塊各自從 1 開始編號
  video?: string;     // 快速示意影片檔名，例："前跳.MP4"
  image?: string;     // 快速示意圖片檔名（與 video 擇一），例："IST.png"
  note?: string | string[]; // 步驟下方的灰色備註（可多行）
  principle?: string;       // 此分頁的原理說明（覆蓋 TypeContent.principle）
}

export interface RelatedVideo {
  id: string;    // YouTube 影片 ID
  title: string; // 顯示標題（已移除開頭的【…】）
  desc?: string; // 副標題（選填），顯示於標題下方
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

export interface TypeContent {
  videoFolder?: string;       // public/type-videos/ 下的子資料夾名稱（影片用）
  imageFolder?: string;       // public/type-videos/ 下的子資料夾名稱（圖片用）
  methodsTitle?: string;      // A 區左欄標題，預設「流程步驟」
  principleTitle?: string;    // B 區右欄標題，預設「原理說明」
  intro?: string;             // videosOnly 頁的簡介文字（顯示於影片區上方）
  notesTitle?: string;        // 注意事項區標題（預設「注意事項」）
  principle?: string;         // B 區內文（段落式，與 principleItems 擇一）
  principleItems?: string[];  // B 區內文（條列式，有值則覆蓋 principle）
  principleNote?: string;     // B 區備註（灰色小字，顯示於 principle/principleItems 下方）
  methods?: TypeMethod[];     // A 區流程步驟（分頁）
  notes?: TypeNote[];         // 注意事項
  closing?: string;           // 注意事項下方的結語
  faqLink?: { label: string; path: string }; // Q&A 頁面連結（選填）
  videos?: RelatedVideo[];    // 相關影片
  termGroups?: TermGroup[];   // termsOnly 頁的名詞說明分組（大亂鬥用）
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
          "__三階段進攻模式__：3 次近距離招式 或 2次掃斬 後 → 衝刺性招式 → 火球",
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
    methods: [
      {
        tab: "步驟",
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
    intro: "DLC1「考驗的霸者」收錄的考驗挑戰，清空既有進度的裝備進入考驗，連續通過各個樓層擊敗魔物。本系列包含普通模式和大師模式的初級、中級、頂級的重點攻略，以及大師模式更需要學習的「偷襲」技巧，適合在試煉中卡關或想省時完成的玩家參考。",
    videos: [
      { id: "4lZpCR8OyzY", title: "高效率3心無傷！『劍之考驗 - 頂級(大師模式)』重點攻略！（2022 Guide of DLC1 Trial of the Sword - Final）" },
      { id: "N3QVfzHn-ps", title: "高效率3心無傷！『劍之考驗 - 中級(大師模式)』重點攻略！（2022 Guide of DLC1 Trial of the Sword - Middle）" },
      { id: "EjX0-Pj6wG0", title: "高效率3心無傷！『劍之考驗 - 初級(大師模式)』重點攻略！（2022 Guide of DLC1 Trial of the Sword - Beginning）" },
      { id: "ce21Z79Zbtc", title: "破除夢魘！詳解《劍之考驗 - 初級地下10樓》！（ToTS B10 Tutorial）" },
      { id: "9AM19fJ7mSo", title: "回應07「劍之考驗(ToTS)」的穿牆重點講解（人聲解說）" },
      { id: "g8eqZ6LaK10", title: "番外23 - 在劍之試煉騎機車（Cycle Zero in ToTS）" },
      { id: "5nzrj_5-FNM", title: "劍試01 - 簡單無傷通過「劍之試煉（一般模式）- 初級」攻略（2018年版）" },
      { id: "Dxh3W_sQmmo", title: "劍試02 - 簡單無傷通過「劍之試煉（一般模式）- 中級」攻略（2018年版）" },
      { id: "pjix1ZahVQ4", title: "劍試03 - 簡單無傷通過「劍之試煉（一般模式）- 頂級」攻略（2018年版）" },
      { id: "jC-mr7ZJhoc", title: "劍試04 - 無傷「劍之試煉（大師模式）- 初級」攻略流程（2018年版）" },
      { id: "IJElnqcy-ok", title: "劍試05 - 無傷「劍之試煉（大師模式）- 中級」攻略流程（2018年版）" },
      { id: "5080qSOLtNg", title: "劍試06 - 無傷「劍之試煉（大師模式）- 頂級」攻略流程（2018年版）" },
      { id: "QlJw8N7cMyo", title: "劍試07 - 劍之試煉 -「靜止衝撞法(Stasis Clipping)」（大師／一般模式皆通用．新方法請見敘述）" },
      { id: "wPsT2Ienj9k", title: "劍試08 - 牆外路線(Oob Route)初級12F冰柱放置教學（中文解說）" },
      { id: "OYu_vHdo2wo", title: "劍試09 - 劍之試煉OOB -「盾跳穿牆法（Shield Skew Clipping）」（示範影片）" },
      { id: "FHMarfPxVhY", title: "技巧21 - 劍之試煉的 14 個攻略重點與技巧（大師模式・中文解說）" },
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
    principleItems: [
      "觸發__選單過載__或是__座標偏移造成裝備來不及加載__的時候切換裝備，會讓選單和實際裝備不同步，此時將脫離同步、實際裝備在身上的武器、弓、盾牌與林克分離（掛牆壁、受電擊、投擲等等）就能增殖道具。",
    ],
    methods: [
      {
        tab: "選單過載",
        name: "落弓過載法（Multi-shot Bow Overload）",
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
    methods: [
      {
        tab: "DR",
        name: "(完美)達爾克爾突擊（(Perfect) Daruk Rush）",
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

  "totk-05": {
    methods: [
      { tab: "Mount Lock + PR" },
      { tab: "LSW" },
    ],
    videos: [
      {
        id: "7DS_ZmOVuR8",
        title: "番外23 - 海拉魯西方那座高山用火箭可以上去嗎？IPR 和 LSW 的挑戰！（ver.1.4.3｜Nintendo Switch 2）",
      },
      {
        id: "WLSjvOTQXO8",
        title: "番外23(會員) -「怪持虛化口袋火箭(Enemy DI IPR)」前往西方高原（ver.1.4.3｜Nintendo Switch 2）",
      },
    ],
  },

  "totk-06": {
    methodsTitle: "裝備狀態",
    notesTitle: "備註說明",
    methods: [
      { tab: "Smuggle" },
      { tab: "Zuggle" },
      { tab: "Wuggle" },
      { tab: "Zoggle" },
    ],
    videos: [
      {
        id: "aELlly95zCk",
        title: "番外20 - 全屬性大師劍！並列多把裝備在手上的「再同步並列(Swap Resync Zuggle)」步驟與原理解說",
      },
    ],
  },

  "totk-07": {
    methods: [
      { tab: "Zuggle" },
      { tab: "Fuse" },
      { tab: "SFO" },
      { tab: "Constraint" },
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
        id: "MWBVJsLTA0c",
        title: "番外21 - 無限耐久＆複製＆無限彈簧火箭盾！虛空次元歸來的「虛化裝備(Void Dip & DI)」原理解說與常用步驟示範（適用ver.1.2.1～）",
        desc: "偷走 NPC 手上裝備的方法！",
      },
    ],
  },

  "totk-08": {
    methods: [
      { tab: "Void Dip" },
      { tab: "DI" },
    ],
    videos: [
      {
        id: "MWBVJsLTA0c",
        title: "番外21 - 無限耐久＆複製＆無限彈簧火箭盾！虛空次元歸來的「虛化裝備(Void Dip & DI)」原理解說與常用步驟示範（適用ver.1.2.1～）",
        desc: "用途非常廣、不消耗耐久的裝備狀態",
      },
    ],
  },

  "totk-09": {
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
          "在對話首度獲得套裝的視窗，按 + 號打開選單，再按 - 號打開地圖觀看回憶",
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

  "totk-12": {
    principle: "在王國之淚中複製道具的方式，依版本不同有多種操作方法。",
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

  "eow-01": {
    videos: [
      { id: "fsTX3L_vga8", title: "番外03 - 用大岩蛇就可以半小時就破關！「指標錯傳(Index Wrong Warp)」（適用：ver.1.0.1以下）" },
    ],
  },

  "eow-02": {
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

  "totk-04": {
    methods: [
      {
        tab: "SLD",
        tags: ["～Ver.1.1.1"],
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
        tab: "Zuggle near Ganondorf",
        tags: ["All Versions"],
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
        tab: "SRZ",
        tags: ["Ver.1.2.0+"],
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
      {
        tab: "Cull Storage",
        tags: ["Ver.1.2.0+"],
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
          { zh: "Spam / Mash", ja: "入れ込み / ぶっぱ / ガン処理", desc: "不斷重複使用相同招式的行為稱為 Spam。不經思考、不觀察對手而無腦狂放猛擊的行為稱為 Mash。" },
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
          { zh: "Neutral", en: "立回", ja: "ニュートラル / 立ち回り", desc: "雙方皆無優劣勢的局面，或是為了獲得優勢而互相試探、走位的進攻模式。" },
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
};
