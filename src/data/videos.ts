// 影片清單（示意資料，沿用原型內容；之後可改為從內容集自動彙整）。
export interface Video {
  id: string; // YouTube ID
  title: string;
  meta: string; // 期號 · 版本
  game: "totk" | "botw";
  cat: string; // 分類標籤
}

export const totkVideos: Video[] = [
  { id: "AdwFCk77JsE", title: "永久跨檔繼承 PSLOT", meta: "番外20.5 · All Versions", game: "totk", cat: "跨檔繼承" },
  { id: "HmocgDZFVdk", title: "序章大師劍 MsgNotFound", meta: "番外16 · 1.4.3｜NS2", game: "totk", cat: "速通/錯傳" },
  { id: "MWBVJsLTA0c", title: "虛化裝備 Void Dip & DI", meta: "番外21 · 1.2.1～", game: "totk", cat: "虛化類" },
  { id: "MzbtzsGB34A", title: "餘料儲存 Fuse Storage", meta: "不廢話02 · ～1.4.3", game: "totk", cat: "儲存類" },
  { id: "h7MpbgUvizw", title: "無限／究極口袋火箭", meta: "番外22 · 1.1.2～", game: "totk", cat: "左納烏裝置" },
  { id: "WLSjvOTQXO8", title: "怪持虛化口袋火箭 Enemy DI IPR", meta: "番外23（會員）· 1.4.3｜NS2", game: "totk", cat: "虛化類" },
  { id: "7DS_ZmOVuR8", title: "IPR 與 LSW 的挑戰", meta: "番外23 · 1.4.3｜NS2", game: "totk", cat: "左納烏裝置" },
  { id: "aELlly95zCk", title: "再同步並列 Swap Resync Zuggle", meta: "番外20 · 全屬性大師劍", game: "totk", cat: "並列" },
  { id: "eXGglGGWwO4", title: "恆動餘料左納烏 GAS", meta: "不廢話23 · 全版本", game: "totk", cat: "左納烏裝置" },
  { id: "kxGm05yjyM8", title: "暴打彈簧 ARAZ", meta: "不廢話22 · 1.2.X", game: "totk", cat: "左納烏裝置" },
  { id: "41ARX3F0I9M", title: "米涅魯糾纏 Mineru FE", meta: "不廢話03 · 1.4.0～", game: "totk", cat: "左納烏裝置" },
  { id: "zaSkPSgXmn8", title: "米涅魯地圖並列 Mineru Map Zuggle", meta: "不廢話23 · 全版本", game: "totk", cat: "並列" },
  { id: "lcNTPBSBiEY", title: "實體賢者 Physical Sages", meta: "番外19 · All Versions", game: "totk", cat: "左納烏裝置" },
  { id: "0MBy9e3FQu0", title: "CAIZ 幹走神廟物件", meta: "番外11.5 · 1.2.0～1.2.1", game: "totk", cat: "速通/錯傳" },
  { id: "wd8nhzBJoLg", title: "乾坤返 Recall Locked PFD", meta: "番外18 · 1.0.0 神廟速通", game: "totk", cat: "速通/錯傳" },
  { id: "TSQ2JGjfVKs", title: "3 分鐘神廟速通世界紀錄", meta: "番外18.5 · 1.0.0", game: "totk", cat: "速通/錯傳" },
  { id: "7HeUApBT2Ng", title: "NS1(1.2.1) vs NS2(1.4.3) 差異", meta: "版本比較", game: "totk", cat: "版本比較" },
];

export const botwVideos: Video[] = [
  { id: "siBcEvxr1Y0", title: "過場必殺劍 Obliterator", meta: "番外58 · NS2", game: "botw", cat: "必殺技類" },
  { id: "5-h3TNlXaLk", title: "轉向盾擋重置 Turnaround SBR", meta: "番外10.5 · NS2", game: "botw", cat: "盾擋類" },
  { id: "taDfBSyTdU0", title: "NS1(1.6.0) vs NS2 差異", meta: "版本比較", game: "botw", cat: "版本比較" },
  { id: "Zpc6r4T8Wwk", title: "NS2 必看技巧（下）", meta: "ED02", game: "botw", cat: "版本比較" },
  { id: "K5JjZHBTC9c", title: "NS2 必看小知識（上）", meta: "ED01", game: "botw", cat: "版本比較" },
];

export const allVideos: Video[] = [...totkVideos, ...botwVideos];
