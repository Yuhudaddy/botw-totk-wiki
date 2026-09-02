// 「關於神廟」頁的開發作品清單（導師的工坊），由 src/components/WorksRunes.astro 渲染。
//
// 狀態語意沿用站內的神廟色彩：有公開連結的作品是「已喚醒」（英傑藍），
// 沒有公開連結的是「休眠中」（希卡金）——沒連結的作品只顯示說明，不做成按鈕。
//   live     已上架／可使用，links 至少一筆
//   wip      開發中，可掛 TestFlight 之類的測試連結，也可以沒有
//   dormant  個人用工具，沒有連結（面板不顯示狀態標籤——它不是「還沒公開」，是本來就不對外）
//
// icon 填 public 底下的路徑、不含副檔名，元件會同時輸出 .webp 與 .png
// （256×256，原檔 1024 用 sharp 縮；透明底的圖形要先鋪底色再縮，
// 否則超橢圓遮罩裁不到東西、看起來像浮在頁面上的線稿）。

export type WorkStatus = "live" | "wip" | "dormant";
export type WorkLinkKind = "appstore" | "github" | "site";

export interface WorkLink {
  kind: WorkLinkKind;
  label: string;
  url: string;
}

export interface Work {
  /** 網址 hash 用（#works-<id>），也是 icon 檔名 */
  id: string;
  name: string;
  icon: string;
  /** 平台標籤，照原樣顯示（mono 小籤），不翻譯 */
  platforms: string[];
  /** 支援語言，顯示成「支援：繁體中文 / 日文 / 英文」；不要另外寫進 description */
  languages: string[];
  languagesJa?: string[];
  status: WorkStatus;
  description: string;
  descriptionJa: string;
  /** 版本號，顯示在面板右上角（例："Ver. 1.0.3"）；沒有版本概念的作品不填 */
  version?: string;
  links?: WorkLink[];
}

export const works: Work[] = [
  {
    id: "tier-list-maker",
    name: "Tier List Maker",
    icon: "/works/tier-list-maker",
    platforms: ["iOS", "iPadOS", "macOS", "visionOS"],
    languages: ["繁體中文", "簡體中文", "英文", "日文"],
    languagesJa: ["繁体字中国語", "簡体字中国語", "英語", "日本語"],
    status: "live",
    description:
      "原生的評級表（Tier List）製作 App。不用註冊登入、不上傳伺服器，所有評級表與圖片都只留在自己的裝置上。等級數量、名稱、顏色與漸層都能自訂，從相簿匯入圖片後拖曳排序、長按裁切定位，完成直接存進相簿。",
    descriptionJa:
      "ネイティブのティアリスト作成アプリ。登録・ログイン不要、サーバーへのアップロードなし、ティアリストも画像もすべて端末内に保存。ティアの数・名前・色・グラデーションを自由に設定でき、写真から画像を読み込んでドラッグで並べ替え、長押しでトリミング位置も調整。完成したらそのまま写真アルバムへ保存。",
    version: "Ver. 1.0.3",
    links: [
      {
        kind: "appstore",
        label: "App Store",
        url: "https://apps.apple.com/tw/app/tier-list-maker/id6772853918",
      },
    ],
  },
  {
    id: "subflow",
    name: "SubFlow",
    icon: "/works/subflow",
    platforms: ["macOS", "CLI", "Python"],
    languages: ["繁體中文", "日文", "英文"],
    languagesJa: ["繁体字中国語", "日本語", "英語"],
    status: "dormant",
    description:
      "導師個人用的字幕自動化工具。與主流原聲素材不同，許多解說型影片的流程是有稿的，因此配合字幕原稿把影片或人聲音檔丟進去，可以非常準確的判斷語音字幕，也可以直接在本機進行 GUI 編輯、加入常用詞庫，最後輸出成 XML，匯入軟體內微調字幕顯示長度後即可完成字幕。",
    descriptionJa:
      "導師が個人用に作った字幕自動化ツール。生の音声素材をそのまま扱う一般的な流れと違い、解説系の動画は台本ありで進むことが多い。そこで字幕の原稿と一緒に動画や音声を放り込むと、音声に対する字幕を非常に正確に判定できる。ローカルの GUI でそのまま編集したり、よく使う用語を用語集に登録したりもでき、最後に XML として書き出し、編集ソフトに読み込んで字幕の表示時間を微調整すれば完成。",
  },
];
