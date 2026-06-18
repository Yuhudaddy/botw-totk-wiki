// 「常見類型」詳細頁的結構化內容。
// 步驟字串中以 __文字__ 包住的片段會在頁面上加底線。
export interface TypeMethod {
  tab: string;      // 分頁名稱，例：前跳
  tags: string[];   // 標籤陣列，例：["先圓後方"] 或 ["先方後圓", "Switch 2 Edition 版"]
  steps: string[];  // 編號步驟，可含 __底線__ 標記
  video?: string;   // 快速示意影片檔名，例："前跳.MP4"
}

export interface RelatedVideo {
  id: string;    // YouTube 影片 ID
  title: string; // 顯示標題（已移除開頭的【…】）
}

export interface TypeContent {
  videoFolder?: string;    // public/type-videos/ 下的子資料夾名稱
  principle?: string;      // 原理說明
  methods?: TypeMethod[];  // 流程步驟（分頁）
  notes?: string[];        // 注意事項
  closing?: string;        // 注意事項下方的結語
  videos?: RelatedVideo[]; // 相關影片
}

export const typeContent: Record<string, TypeContent> = {
  "botw-01": {
    videoFolder: "botw-windbomb",
    principle:
      "2019/9/6 【さとう菓子】玩家發展出的擊飛方法。按照曠野之息的物理機制，利用子彈時間降低近距離的物體受炸彈爆風擊碎或是引爆的機率，使第一顆炸彈爆炸的推進力足以推進第二顆炸彈來撞擊林克，同時解除子彈時間讓林克高速飛出去的技巧。",
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
        tags: ["先方後圓", "Switch 2 Edition 版"],
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
      "Nintendo Switch 1 版須注意「擊停角度」，方位為 45 度的倍數以外的方向會因為瞬間初速度太快而停止、無法擊飛。",
      "Nintendo Switch 2 Edition 版受「擊停角」影響較小。風彈擊飛後的速度些微下降，若第二炸彈放出後不馬上引爆，成功率大幅下降。",
    ],
    closing: "風彈有很多種變形 (variations)，詳細請參考下方相關影片。",
    videos: [
      { id: "PlakwPcfJjM", title: "指法16 -「風彈」與「導向風彈」(Windbomb & Directional Windbomb)" },
      { id: "dgcopMBlrhk", title: "番外42 - 靜止擊飛過時了？「木箱擊飛(Kibako Launch)」與「爆風炸彈(Windbomb)」（中文解說）" },
      { id: "uJJlD5Xs6I0", title: "番外47 - 抵抗地心引力！「風彈與靜彈的物理機制(Windbomb & Stasis Bounce Tutorial)」" },
      { id: "qPErvMa0hC4", title: "初學者適用！畫面暫停一下輕鬆學會最常用的「風彈」- 自己檢查風彈失敗的原因！" },
      { id: "dOVAzYGLwoU", title: "不廢話！畫面暫停一下快速檢查「空中風彈」失敗的原因！" },
      { id: "EYYCye4Qfak", title: "指法11 - 擊上風彈（Vertical Windbomb, 撃ち上げウインドボム）" },
      { id: "pHRRwj1bFRM", title: "回應13 -「風彈」的各種形式（Windbomb Setups）" },
    ],
  },
};
