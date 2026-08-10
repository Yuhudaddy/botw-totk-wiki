# 示範影片遷移至 Cloudflare R2 — 設計文件

・ 日期:2026-08-10
・ 狀態:執行中
・ 影響範圍:`public/type-videos/`、`.github/workflows/deploy.yml`、`package.json`

---

## 一、要解決的問題

**repo 正在以每月約 1.2GB 的速度永久膨脹。**

| 事實 | 數字 |
|---|---|
| 專案起始 | 2026-06-15 |
| `.git` 目前大小 | 3.7GB |
| 影片檔案 | 124 個 / 2,551,016,780 bytes |
| 新增速度 | 6 月 24 個、7 月 79 個、8 月前 10 天 21 個 |
| 平均檔案大小 | 約 19MB |
| GitHub 強烈建議上限 | 5GB |
| **預估剩餘時間** | **約 1 個月** |

※ 關鍵性質:影片一旦 commit 就永久寫入 git 歷史,**刪除檔案不會縮小 repo**。唯一的根本解是不要再讓新影片進入版控。

### 明確「不」解決的問題

・ **流量上限**(GitHub Pages 100GB/月軟上限)——影片仍由 GitHub Pages 送出,此限制不變。要等購買自有網域後才處理。
・ **既有的 3.7GB 歷史**——本方案只讓它停止成長,不縮小。重寫歷史屬破壞性操作,不納入本次範圍。

---

## 二、方案

**影片的「儲存位置」搬到 R2,但「對外服務」仍由 GitHub Pages 負責。**

```
遷移前:
  訪客 → GitHub Pages → 網站 + 影片
                ↑ 影片來自 git repo(問題所在)

遷移後:
  訪客 → GitHub Pages → 網站 + 影片    ← 訪客端完全不變
                ↑ 影片建置時從 R2 下載
                ↑ git repo 不再存影片 ✅
```

◎ **R2 在此架構中是「倉庫」而非「門面」。** 訪客不會直接連到 Cloudflare。

### 為何不讓訪客直連 R2

尚未購買自有網域。R2 的 `r2.dev` 網址官方標示為「僅供開發、有速率限制」,而 `*.workers.dev` 的 Cache API 是失效的(快取屬 zone 層級,workers.dev 為共用網域)。兩者皆無邊緣快取,而 GitHub Pages 背後的 Fastly **有**。直連反而會讓影片變慢。

### 未來升級路徑

購買自有網域後,只需:
1. 網域加入 Cloudflare 成為 zone
2. R2 bucket 綁定該網域
3. **修改一個環境變數 `PUBLIC_MEDIA_BASE`**

不需重新上傳任何檔案、不需修改任何程式邏輯——因為 bucket 內的路徑結構與現行 URL 路徑刻意保持一致。

---

## 三、關鍵設計決定

### 3.1 bucket 內採用 `type-videos/` 前綴

上傳目的地為 `r2:botw-totk-wiki-media/type-videos/...`,而非 bucket 根目錄。

理由:現行 URL 為 `${BASE}/type-videos/${videoFolder}`。保留 `type-videos/` 前綴後,未來只要把 `${BASE}` 換成 R2 網域,**其餘路徑組合邏輯一字不改**。同時為 bucket 內未來可能加入的其他資產(如 `entrance-ocean/`、`flow-map/`)預留命名空間。

### 3.2 憑證分離為兩把

| 用途 | 權限 | 存放位置 |
|---|---|---|
| 本機 rclone(上傳) | Account API Token / **Object Read & Write** | `~/.config/rclone/rclone.conf` |
| GitHub Actions(下載) | Account API Token / **Object Read Only** | GitHub Secrets |

・ 皆選 **Account API Token**(不依附個別使用者,不會因成員異動失效)
・ 皆限定範圍至單一 bucket
・ CI 僅需讀取,故使用唯讀權杖,降低外洩風險

### 3.3 CI 需具備「缺漏偵測」

建置時若 R2 下載不完整,絕不可默默部署出缺少影片的網站。CI 必須驗證 `src/data/type-content.ts` 中引用的每一支影片皆確實存在,否則**讓建置失敗**。

失敗優於靜默降級:失敗會通知維護者,靜默降級則由訪客先發現。

### 3.4 不做全自動同步

不設置 git hook 自動上傳。理由:會讓每次 commit 都可能阻塞數分鐘傳輸大檔,可控性差。改採明確指令 `npm run media:push`,並以 3.3 的 CI 檢查作為安全網。

---

## 四、備份策略

三層,皆已就緒:

| 層級 | 內容 | 狀態 |
|---|---|---|
| 1 | 外部副本 `/Users/yuhudaddy/Desktop/type-videos` | ✅ 已驗證 124 檔 / 2.4GB 一致 |
| 2 | git 歷史(124 檔皆在,只要不重寫歷史即可取回) | ✅ |
| 3 | manifest(路徑 / 大小 / SHA256) | ✅ 已產生 |

▶︎ **鐵則:上傳 → 驗證 → 改 CI → 線上實測 → 最後才從 repo 移除。順序不可顛倒。**

---

## 五、執行階段

| 階段 | 內容 | 動到專案? | 回滾方式 |
|---|---|---|---|
| 0 | 產生 manifest、記錄基準 | 否 | — |
| 1 | rclone 上傳 + `rclone check` 逐檔驗證 | 否 | — |
| 2 | 建立 `media:push` / `media:pull` 指令 | 新增檔案 | 刪除即可 |
| 3 | 改造 CI:建置前從 R2 下載 + 缺漏檢查 | 是 | git revert |
| 4 | 線上驗證(影片可播放、可拖曳進度條) | 否 | — |
| 5 | 從 repo 移除影片 + 加入 .gitignore | 是 | git revert |

※ 階段 3 之前的任何步驟出錯,網站皆完全不受影響。

### 遷移前基準

・ `.git` 大小:3.7GB
・ 影片:124 檔 / 2,551,016,780 bytes
・ 排程建置耗時:5m45s

---

## 六、工作流變更

| | 遷移前 | 遷移後 |
|---|---|---|
| 新增影片 | 放入資料夾 → commit → push | 放入資料夾 → **`npm run media:push`** → commit → push |
| 新環境設定 | git clone | git clone → **`npm run media:pull`** |

※ commit 內容自此只含文字改動,不再夾雜二進位大檔。

---

## 七、風險與對策

| 風險 | 對策 |
|---|---|
| 忘記執行 `media:push` | CI 缺漏檢查會讓建置失敗並指出缺少的檔案 |
| CI 下載不完整 | 同上,檔案數與引用比對 |
| R2 服務異常 | 建置失敗,但**已部署的網站不受影響**,不會下線 |
| 中文/空白檔名編碼問題 | 階段 1 的 `rclone check` 會在動到程式前就抓出 |
| R2 免費額度(10GB)用盡 | 目前 2.4GB、每月 +1.2GB,約 6 個月後超過。超出部分 $0.015/GB/月,20GB 時約每月 $0.15 |
| R2 讀寫次數費用 | CI 每日讀 124 檔 ≈ 3,720 次/月,免費額度 1,000 萬次/月,無虞 |

---

## 八、不納入本次範圍

・ 重寫 git 歷史以縮小既有的 3.7GB(破壞性,需強制推送)
・ 整站遷移至 Cloudflare Pages(僅在需要私有 repo 時才有意義)
・ 購買自有網域與影片直連 R2(待流量成為實際問題時再議)
・ 影片重新編碼壓縮(可獨立進行,與本案無依賴)
