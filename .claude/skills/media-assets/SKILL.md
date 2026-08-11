---
name: media-assets
description: 本專案（yuda website / botw-totk-wiki）的示範影片與快速示意圖處理方式。只要工作內容碰到 public/type-videos/、type-content.ts 裡的 videoFolder/imageFolder/video/image/extraImage 欄位、任何 media: 開頭的 npm 指令、或是 CI（.github/workflows/deploy.yml）裡跟影片相關的步驟失敗，都要先讀這份 skill 再動作——不要重新推導這套機制，也不要假設影片檔案本身在 git 版控裡（它們不在）。新增/更新示範影片、除錯「建置在驗證影片素材時失敗」、或有人問「這個網站的影片是怎麼運作的」，都適用。
---

# 示範影片與快速示意圖：R2 儲存機制

## 一句話說明現況

**`public/type-videos/` 底下的檔案不進 git 版控。** 本機硬碟上照樣有這些檔案（給 `astro dev` 本機預覽用），但 `.gitignore` 已經排除它們，commit 裡看不到它們。真正的檔案存放在 Cloudflare R2（bucket 名稱 `botw-totk-wiki-media`），CI 建置網站時會即時從 R2 下載回來、打包進部署的網站，訪客看到的影片依然是由 GitHub Pages 直接送出——**訪客端的體驗完全沒有改變**。

## 為什麼會這樣（別重新質疑這個決定）

2026-06-15 專案起始後，示範影片以每月約 1.2GB 的速度被 commit 進 git，兩個月後 `.git` 已經 3.7GB，逼近 GitHub 官方建議的 5GB 上限，而且**刪除檔案不會讓已經寫入的 git 歷史變小**。完整背景、考慮過的其他方案（Cloudflare Pages、直連 R2 搭配 Worker、買網域）、以及為什麼最後選這個做法，寫在 [docs/superpowers/specs/2026-08-10-video-migration-to-r2-design.md](../../../docs/superpowers/specs/2026-08-10-video-migration-to-r2-design.md)。

## 新增或更新一支示範影片

```bash
# 1. 影片檔案放進對應資料夾
public/type-videos/<資料夾>/<檔名>.mp4

# 2. 在 src/data/type-content.ts 對應方法加上欄位
#    （TypeContent 層級要有 videoFolder，TypeMethod 層級要有 video）

# 3. 上傳到 R2，並自動重新產生 media-manifest.txt
npm run media:push

# 4. 正常 commit + push（這次不會夾帶影片本身，只有文字檔案）
git add -A && git commit -m "..." && git push
```

⚠️ **第 3 步是最容易漏掉、也最容易被忽略的一步。** 如果只做了 1、2，忘記 `media:push`，本機 `astro dev` 照樣看得到影片（因為檔案就在硬碟上），會誤以為一切正常——但 CI 會在建置時失敗（見下方「CI 怎麼攔這個錯」），因為 R2 上根本沒有這支影片。

## 相關指令

| 指令 | 做什麼 | 什麼時候用 |
|---|---|---|
| `npm run media:push` | 上傳 `public/type-videos/` 到 R2，完成後自動重新產生 `media-manifest.txt` | 新增／更新影片後 |
| `npm run media:pull` | 從 R2 下載回本機 | 新環境、換電腦、重新 clone 後 |
| `npm run media:check` | 用 `rclone check` 逐檔比對本機與 R2（含 SHA256） | 懷疑上傳不完整時手動確認 |
| `npm run media:verify` | 比對「本機檔案」是否與 `media-manifest.txt` 一致（不比對 R2，只看本機） | CI 下載完 R2 後自動跑 |
| `npm run media:verify-refs` | 比對 `type-content.ts` **實際引用**的每一支影片/圖片是否都登記在 `media-manifest.txt` 裡 | CI 最前面自動跑，本機也可手動跑 |

`media:push`/`media:pull`/`media:check` 需要本機裝好 `rclone` 並設定過 `r2` 這個 remote（`rclone config`，S3 相容、provider 選 Cloudflare）。`media:verify-refs` 需要 Node 22+（用了 `--experimental-strip-types` 直接讀取 `type-content.ts` 的真實資料結構，不是用 regex 猜測——它會遞迴走訪 `methods` 和巢狀的 `subTabs`，不會漏掉合併分頁底下的項目）。

## CI 怎麼運作、怎麼攔錯（`.github/workflows/deploy.yml`）

```
checkout（不含影片，幾秒鐘）
  → npm ci
  → 驗證影片參照完整（media:verify-refs，免網路，最先跑）
  → 安裝 rclone
  → 讀取影片快取（GitHub Actions cache，清單沒變就命中）
  → 從 R2 取回示範影片
  → 驗證影片素材齊全（media:verify，比對下載結果）
  → 型別檢查 → 抓 YouTube 熱門影片 → astro build → 部署
```

兩層驗證，攔的是不同的錯：

- **「驗證影片參照完整」失敗** → `type-content.ts` 引用了某支影片/圖片，但 `media-manifest.txt` 裡沒有這筆記錄。**代表忘記 `npm run media:push`**，或是資料夾/檔名打錯字。錯誤訊息會精準指出是哪個 `content` 的哪個 `tab`。
- **「驗證影片素材齊全」失敗** → `media-manifest.txt` 說某個檔案該存在，但從 R2 下載下來卻不在、或大小不對。代表 R2 上的檔案跟清單對不上（可能是清單過期、或 R2 端出了狀況）。

兩種情況都只會讓**建置**失敗，**不會影響已經上線的網站**——舊版本會繼續正常服務訪客，只是新的更新暫時推不上去。

## 目前故意還沒做的事

已經深入研究過、但刻意還沒實作：**讓訪客瀏覽器直接連到 R2（透過 Cloudflare Worker）**，取代現在「CI 建置時下載進網站」的做法。這樣做能同時解決「部署包裹超過 GitHub 官方建議的 1GB」和「每月流量上限」，但需要買一個網域才能有邊緣快取（否則走免費的 `workers.dev` 會讓影片變慢）。使用者判斷目前流量還沒有急迫到需要處理，所以**先維持現狀**，等 GitHub 的部署警告變得更緊迫、或流量真的成長，才會啟動這個升級。

不要看到「部署 artifact 2.5GB 左右、超過 GitHub 官方 1GB 建議值」就假設是 bug 想去「修好」它——這是已知、已經評估過風險、使用者知情同意接受的現況，真正的硬限制是 10 分鐘部署逾時，不是 1GB 本身。已經跑過的部署都在 3 分鐘內完成。

## 三層備份（如果要做更大幅度的改動，先確認這些還在）

1. 外部硬碟副本：`/Users/yuhudaddy/Desktop/type-videos`（124 檔 / 2.4GB，已核對與本機一致）
2. git 歷史（在做這次遷移之前的 commit 裡，124 個檔案都還在，只要不重寫歷史就能取回）
3. R2 本身（`botw-totk-wiki-media` bucket，已用 `rclone check` 逐檔驗證過 SHA256 一致）
