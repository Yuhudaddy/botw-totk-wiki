# 曠野・王國攻略 Wiki

《薩爾達傳說：曠野之息 (BotW)》／《王國之淚 (TotK)》技巧與 Glitch 攻略，整理自 YouTube 頻道 [@zb_yuhudaddy](https://www.youtube.com/@zb_yuhudaddy)。

- 技術：**MkDocs Material**
- 語言：繁體中文（台灣）
- 設計：Claude (Anthropic) 設計語言 — 羊皮紙底 + 赤陶強調
- 部署：GitHub Actions → `gh-pages` 分支 → GitHub Pages

線上網址：<https://yuhudaddy.github.io/botw-totk-wiki/>

## 本機預覽

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
mkdocs serve          # http://127.0.0.1:8000
```

## 新增內容

見站內頁面 [如何新增攻略](docs/how-to-add.md)：複製範本、填入影片 ID 與步驟、放進對應資料夾，再到 `mkdocs.yml` 的 `nav` 加入選單。

## 專案結構

```
mkdocs.yml                  # 站台設定（主題、導覽、外掛）
requirements.txt            # mkdocs-material、jieba（中文搜尋分詞）
.github/workflows/deploy.yml# push 到 main 自動部署
docs/
├─ index.md                 # 首頁
├─ assets/stylesheets/extra.css  # Claude 配色（可微調）
├─ botw/                    # 曠野之息分類
├─ totk/                    # 王國之淚分類
├─ videos.md                # 影片總覽卡片牆
├─ tags.md                  # 標籤索引
├─ about.md                 # 關於
└─ how-to-add.md            # 新增攻略教學
```

## 部署設定（一次性）

1. 推送本 repo 到 `main`，GitHub Actions 會自動建置並推到 `gh-pages`。
2. 到 repo **Settings → Pages**，將來源設為 `gh-pages` 分支、根目錄 `/`。
