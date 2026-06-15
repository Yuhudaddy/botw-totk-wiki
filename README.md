# 曠野・王國攻略 Wiki

《薩爾達傳說：曠野之息 (BotW)》／《王國之淚 (TotK)》技巧與 Glitch 攻略，整理自 YouTube 頻道 [@zb_yuhudaddy](https://www.youtube.com/@zb_yuhudaddy)。

- 技術：**Astro + Tailwind CSS v4 + Content Collections**
- 語言：繁體中文（台灣）
- 設計：Claude (Anthropic) 設計語言 — 羊皮紙底 + 赤陶強調，淺／深雙主題
- 部署：GitHub Actions → GitHub Pages

線上網址：<https://yuhudaddy.github.io/botw-totk-wiki/>

## 本機預覽

```bash
npm install
npm run dev          # http://localhost:4321/botw-totk-wiki/
```

其他指令：

```bash
npm run build        # 產生靜態站到 dist/
npm run preview      # 本機預覽 build 結果
```

## 新增一篇攻略

在 `src/content/glitches/` 新增一個 `.md`，frontmatter 填 metadata、內文寫散文：

```markdown
---
title: 技巧名稱
game: totk            # totk 或 botw
category: 虛化類
series: 番外21
difficulty: 進階
versions: ["1.2.1～"]
videoId: YouTube_ID
tags: ["王國之淚", "虛化類"]
---

## 這是什麼
...

## 常用步驟
1. **步驟標題** — 說明
```

首頁、影片總覽、標籤頁、攻略頁會自動生成，不需手動同步。

## 專案結構

```
src/
├─ components/   # Header、Footer、VideoCard、CategoryCard、ArticleAside 等
├─ content/
│  └─ glitches/  # 每篇攻略一個 .md
├─ data/         # 影片清單、分類定義、站台資料
├─ layouts/      # BaseLayout
├─ lib/          # url.ts（base path 連結工具）
├─ pages/        # 路由：index、[game]、article/[...slug]、videos、tags、404
└─ styles/       # global.css（雙主題 CSS 變數）
astro.config.mjs # site / base path 設定
```

## 部署

push 到 `main` → GitHub Actions（`.github/workflows/deploy.yml`）自動建置並部署。
Repo **Settings → Pages → Source** 須設為「**GitHub Actions**」。
