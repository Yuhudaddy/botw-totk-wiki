---
title: 如何新增攻略
---

# 如何新增攻略

新增一篇攻略只要三步：**複製範本 → 填內容 → 放進對應資料夾**。縮圖、連結、標籤都會自動生成。

## 資料夾規則

```
docs/
├─ botw/                  ← 曠野之息
│   └─ <類型資料夾>/
│       ├─ index.md       ← 類型總覽（卡片列表）
│       └─ <技巧>.md      ← 一篇攻略 = 一個檔
└─ totk/                  ← 王國之淚
    └─ <類型資料夾>/
        ├─ index.md
        └─ <技巧>.md
```

- 一個**類型** = 一個資料夾，裡面放一個 `index.md`（總覽）＋多篇攻略。
- 一篇**攻略** = 一個 `.md` 檔。
- 資料夾與檔名用英文小寫、連字號，例如 `wind-bomb/`、`bow-dupe.md`。

## 步驟

1. 在 `docs/botw/` 或 `docs/totk/` 下，建立（或選擇）一個類型資料夾。
2. 複製下方**攻略範本**，存成新的 `.md` 檔。
3. 把 `VIDEO_ID` 換成 YouTube 影片網址中 `watch?v=` 後面那段 11 碼。
4. 填入標題、摘要、適用版本、難度、步驟。
5. 到 `mkdocs.yml` 的 `nav:` 把新頁面加進選單（照現有格式）。

!!! tip "影片 ID 怎麼找"
    例如網址 `https://youtu.be/MWBVJsLTA0c` 或 `https://www.youtube.com/watch?v=MWBVJsLTA0c`，`VIDEO_ID` 就是 **MWBVJsLTA0c**。縮圖網址固定為 `https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg`。

## 攻略範本

````markdown
---
title: 技巧名稱
tags:
  - 王國之淚      # 或 曠野之息
  - 虛化類        # 類型
  - 入門          # 難度：入門 / 進階 / 高難度
---

# 技巧名稱

[![技巧名稱](https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg)](https://youtu.be/VIDEO_ID)

> 一句話摘要。

| 適用版本 | 難度 | 影片 |
| --- | --- | --- |
| 王國之淚 1.2.1～ | 入門 | [▶ 在 YouTube 觀看](https://youtu.be/VIDEO_ID) |

## 這是什麼

說明原理。

## 步驟

1. 第一步
2. 第二步
3. 第三步

## 注意事項

- 版本差異、風險、容易失敗處。

---

📺 影片來源：[YouTube — @zb_yuhudaddy](https://youtu.be/VIDEO_ID)
````

## 類型總覽範本（`index.md`）

把新攻略加進類型總覽的卡片牆：

````markdown
---
title: 類型名稱
---

# 類型名稱

一句話介紹這個類型。

<div class="grid cards" markdown>

-   [![技巧名稱](https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg)](技巧檔名.md)

    <span class="vtitle">技巧名稱</span>
    <span class="vmeta">遊戲 ・ 版本備註</span>

</div>
````

## 本機預覽

```bash
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
mkdocs serve   # 開 http://127.0.0.1:8000
```

存檔後推到 `main` 分支，GitHub Actions 會自動建置並部署。
