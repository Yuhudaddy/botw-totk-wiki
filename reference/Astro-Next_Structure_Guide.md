# 曠野・王國攻略 Wiki — 轉換到 Astro/Next 結構指南

這份文件幫助你從設計原型（HTML）轉換到 **Astro** 或 **Next.js + Tailwind CSS** 的可用專案結構。

---

## 目錄結構建議

```
src/
├── layouts/          # 頁面範本
│   ├── BaseLayout.astro      # 共用導覽、頁腳
│   └── ArticleLayout.astro   # 攻略頁特殊欄位佈局
├── components/       # 可重用元件
│   ├── Header.astro          # 黏貼導覽列、搜尋、主題開關
│   ├── VideoCard.astro       # 影片卡（名稱、縮圖、版本標籤）
│   ├── VersionMeta.astro     # 版本表側欄（適用版本、難度、分類）
│   ├── StepList.astro        # 編號步驟清單
│   ├── QuickNavGrid.astro    # 首頁快速導覽 4 格
│   ├── CategoryGrid.astro    # 分類頁網格（進行中/建置中狀態）
│   └── TagChip.astro         # 標籤篩選籌碼
├── pages/            # 路由（Astro）或 app/page.tsx（Next）
│   ├── index.astro           # 首頁
│   ├── [game]/
│   │   └── index.astro       # 分類頁（BotW / TotK）
│   ├── article/
│   │   └── [...slug].astro   # 攻略頁動態路由
│   ├── videos.astro          # 影片總覽
│   └── tags.astro            # 標籤索引
├── styles/           # 全域樣式（可選，Tailwind 為主）
│   └── globals.css
├── data/             # 資料（JSON / TS）
│   ├── glitches.json         # 所有技巧與影片資料
│   └── categories.json       # BotW / TotK 分類定義
└── lib/
    ├── theme.ts              # 深淺主題邏輯、localStorage 管理
    └── search.ts             # 搜尋與篩選邏輯
```

---

## 色彩系統（Tailwind 設定）

在 `tailwind.config.js` 定義所有色彩為 CSS 變數：

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // 淺色主題（預設）
        'parchment': '#f5f4ed',
        'ivory': '#faf9f5',
        'surface': 'var(--surface)',       // 適配 light/dark
        'sand': 'var(--sand)',
        'border-cream': '#f0eee6',
        'border-warm': '#e8e6dc',
        'ink': 'var(--ink)',
        'text-primary': 'var(--text)',
        'text-muted': 'var(--muted)',
        'brand': '#c96442',
        'accent': 'var(--accent)',
        'mono-bg': 'var(--mono-bg)',
        'mono-text': 'var(--mono-text)',
      },
    },
  },
}
```

在 HTML 根元素加 CSS 變數：

```css
/* globals.css */
:root,
[data-theme="light"] {
  --bg: #f5f4ed;
  --surface: #faf9f5;
  --surface-2: #ffffff;
  --sand: #e8e6dc;
  --border: #f0eee6;
  --border-strong: #e8e6dc;
  --ink: #141413;
  --ink-2: #3d3d3a;
  --text: #5e5d59;
  --muted: #87867f;
  --brand: #c96442;
  --accent: #c96442;
  --mono-bg: #f0eee6;
  --mono-text: #5e5d59;
  --ring: #d1cfc5;
  --shadow: rgba(0, 0, 0, 0.05);
}

[data-theme="dark"] {
  --bg: #141413;
  --surface: #1d1c1a;
  --surface-2: #30302e;
  --sand: #30302e;
  --border: #2a2926;
  --border-strong: #30302e;
  --ink: #faf9f5;
  --ink-2: #ece9e0;
  --text: #b0aea5;
  --muted: #8a8980;
  --brand: #c96442;
  --accent: #d97757;
  --mono-bg: #30302e;
  --mono-text: #b0aea5;
  --ring: #4d4c48;
  --shadow: rgba(0, 0, 0, 0.35);
}
```

---

## 核心元件 — HTML 結構 & Tailwind Class 對照

### 1. Header / 導覽列

**設計原型中的結構：**
```html
<header class="r-navbar sticky top-0 z-50 border-b border-[var(--border)]">
  <div class="max-w-[1180px] mx-auto px-8 h-16 flex items-center gap-6">
    <!-- Logo -->
    <a class="flex items-center gap-2">
      <span class="w-7 h-7 rounded-lg bg-[var(--brand)] text-ivory flex items-center justify-center">
        <!-- Icon SVG -->
      </span>
      <span class="font-serif font-medium text-lg">曠野・王國攻略</span>
    </a>
    
    <!-- Nav Links -->
    <nav class="flex gap-1">
      <a class="px-3 py-2 rounded-lg text-sm">首頁</a>
      <!-- ... -->
    </nav>
    
    <!-- Search + Theme Toggle -->
    <div class="ml-auto flex items-center gap-2">
      <button class="r-navsearch hidden md:flex items-center gap-2 bg-[var(--surface)] ...">搜尋技巧…</button>
      <button class="w-9 h-9 rounded-lg bg-[var(--sand)] ...">🌙</button>
    </div>
  </div>
</header>
```

**Tailwind 快速映射：**
- `sticky top-0 z-50` = 固定導覽
- `border-b border-[var(--border)]` = 下方細線
- `h-16 flex items-center` = 64px 高、垂直置中
- `hidden md:flex` = 中等螢幕以上才顯示（搜尋在手機隱藏）
- `px-8 max-w-[1180px] mx-auto` = 內邊距 + 最大寬度 + 水平置中

---

### 2. 首頁 Hero + 列表 

**雙欄佈局（桌面）→ 單欄堆疊（手機）：**

```html
<section class="r-hero max-w-[1180px] mx-auto px-8 py-20 grid grid-cols-[1.05fr_0.95fr] gap-16 lg:grid-cols-1 lg:gap-10">
  <!-- 左欄：文案 -->
  <div>
    <h1 class="r-h1 font-serif font-medium text-5xl lg:text-4xl md:text-3xl leading-tight mb-5 -tracking-wider">
      把每個 Glitch<br>整理成一頁攻略
    </h1>
    <p class="text-lg leading-relaxed text-[var(--text)] mb-8 max-w-prose">
      薩爾達傳說...
    </p>
    <div class="flex gap-3 flex-wrap">
      <button class="px-6 py-3 bg-[var(--brand)] text-ivory rounded-lg">瀏覽王國之淚 →</button>
      <button class="px-6 py-3 bg-[var(--surface-2)] rounded-lg">瀏覽曠野之息</button>
    </div>
  </div>
  
  <!-- 右欄：最新索引 -->
  <div class="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6">
    <div class="flex justify-between mb-4">
      <span class="text-sm font-semibold text-[var(--muted)]">最新整理 · LATEST</span>
      <a class="text-sm text-[var(--accent)]">全部 →</a>
    </div>
    <!-- 列表項目 -->
    {items.map(item => (
      <div key={item.id} class="flex justify-between items-center py-4 border-t border-[var(--border)]">
        <div>
          <div class="font-serif text-lg">{{ item.title }}</div>
          <div class="text-xs text-[var(--muted)]">{{ item.meta }}</div>
        </div>
        <span class="font-mono text-xs px-2 py-1 bg-[var(--mono-bg)] rounded">{{ item.ver }}</span>
      </div>
    ))}
  </div>
</section>
```

**響應式技巧：**
- `grid-cols-[1.05fr_0.95fr] lg:grid-cols-1` = 桌面雙欄，≤1024px 改單欄
- `text-5xl lg:text-4xl md:text-3xl` = 標題隨螢幕尺寸縮放
- `hidden md:flex` = 搜尋在平板以上顯示

---

### 3. 影片卡 (VideoCard)

**可重用元件：**

```astro
---
// src/components/VideoCard.astro
interface Props {
  vid: string;      // YouTube ID
  title: string;
  meta: string;     // 版本、分類等
}

const { vid, title, meta } = Astro.props;
---

<a href={`https://youtu.be/${vid}`} target="_blank" class="block no-underline">
  <div class="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
    <div class="relative">
      <img 
        src={`https://img.youtube.com/vi/${vid}/maxresdefault.jpg`}
        alt={title}
        class="w-full aspect-video object-cover"
        loading="lazy"
      />
      <span class="absolute bottom-2 left-2 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
        ▶ YouTube
      </span>
    </div>
    <div class="p-4">
      <div class="font-serif font-medium text-lg leading-snug">{title}</div>
      <div class="text-xs text-[var(--muted)] mt-1">{meta}</div>
    </div>
  </div>
</a>
```

---

### 4. 版本表（攻略頁側欄）

```html
<aside class="r-aside sticky top-24 flex flex-col gap-4 lg:static">
  <!-- 版本詳情 -->
  <div class="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden">
    <div class="flex justify-between px-4 py-3 border-b border-[var(--border)] text-sm">
      <span class="text-[var(--muted)]">適用版本</span>
      <span class="font-mono">1.2.1～</span>
    </div>
    <div class="flex justify-between px-4 py-3 border-b border-[var(--border)] text-sm">
      <span class="text-[var(--muted)]">難度</span>
      <span class="text-[var(--accent)] font-semibold">進階</span>
    </div>
    <!-- ... 其他欄位 -->
  </div>
  
  <!-- YouTube 按鈕 -->
  <a href="..." class="flex items-center justify-center gap-2 bg-[var(--brand)] text-ivory py-3 rounded-lg font-semibold">
    ▶ 在 YouTube 觀看
  </a>
  
  <!-- 相關技巧 -->
  <div class="bg-[var(--surface)] rounded-2xl p-4">
    <div class="text-xs font-bold text-[var(--muted)] mb-3 tracking-wider">相關技巧 · RELATED</div>
    {related.map(r => (
      <a href="..." class="block py-2 border-t border-[var(--border)]">
        <div class="font-serif font-medium">{r.title}</div>
        <div class="text-xs text-[var(--muted)]">{r.meta}</div>
      </a>
    ))}
  </div>
  
  <!-- 標籤 -->
  <div class="flex flex-wrap gap-2">
    <span class="px-3 py-1 bg-[var(--sand)] rounded-full text-sm">王國之淚</span>
    <!-- ... -->
  </div>
</aside>
```

---

### 5. 編號步驟清單

```html
<ol class="list-none space-y-5 mb-8">
  {steps.map((step, idx) => (
    <li class="flex gap-4">
      <span class="flex-none w-8 h-8 rounded-full bg-[var(--brand)] text-ivory flex items-center justify-center text-sm font-semibold">
        {idx + 1}
      </span>
      <div>
        <div class="font-serif font-medium text-lg">{step.title}</div>
        <div class="text-sm text-[var(--text)] leading-relaxed mt-1">{step.desc}</div>
      </div>
    </li>
  ))}
</ol>
```

---

### 6. 影片縮圖牆（自動回流網格）

```html
<div class="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
  {videos.map(v => (
    <VideoCard vid={v.id} title={v.title} meta={v.meta} />
  ))}
</div>
```

**`repeat(auto-fit, minmax(240px, 1fr))`：**
- 每欄最小 240px，寬度 flex（`1fr`）
- 自動回流：桌面 4 欄 → 平板 2–3 欄 → 手機 1 欄
- 不需要額外的 media query

---

### 7. 分類卡網格

```html
<div class="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-4">
  {categories.map((cat, idx) => (
    <div 
      onClick={() => navigate(cat.route)}
      class="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 cursor-pointer flex flex-col gap-3 h-full"
    >
      <div class="flex justify-between items-center">
        <span class="font-serif text-sm text-[var(--accent)]">{String(idx + 1).padStart(2, '0')}</span>
        <span class={`text-xs px-2 py-1 rounded-full ${
          cat.status === 'active' 
            ? 'bg-[rgba(201,100,66,0.13)] text-[var(--accent)]' 
            : 'bg-[var(--sand)] text-[var(--muted)]'
        }`}>
          {cat.status === 'active' ? '進行中' : '建置中'}
        </span>
      </div>
      <div class="font-serif font-medium text-xl">{cat.title}</div>
      <p class="text-sm text-[var(--text)] leading-relaxed">{cat.desc}</p>
      <div class="text-xs text-[var(--muted)] mt-auto">{cat.meta}</div>
    </div>
  ))}
</div>
```

---

## 主題管理（深淺切換）

### React / Next.js 範例

```typescript
// lib/theme.ts
export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // 讀取 localStorage
    const saved = localStorage.getItem('wiki-theme') as 'light' | 'dark' | null;
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initial = saved || preferred;
    
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
    document.body.style.background = initial === 'dark' ? '#141413' : '#f5f4ed';
  }, []);

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('wiki-theme', next);
    document.documentElement.setAttribute('data-theme', next);
    document.body.style.background = next === 'dark' ? '#141413' : '#f5f4ed';
  };

  return { theme, toggle };
}
```

### Astro 範例

```astro
---
// src/components/ThemeToggle.astro
---

<button id="theme-toggle" aria-label="切換主題" class="w-9 h-9 rounded-lg bg-[var(--sand)] flex items-center justify-center">
  <span id="theme-icon">🌙</span>
</button>

<script is:inline>
  const toggle = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');
  
  const saved = localStorage.getItem('wiki-theme') || 'light';
  const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const theme = saved || preferred;
  
  document.documentElement.setAttribute('data-theme', theme);
  icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  
  toggle?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('wiki-theme', next);
    icon.textContent = next === 'dark' ? '☀️' : '🌙';
  });
</script>
```

---

## 資料結構（JSON 示例）

### `src/data/glitches.json`

```json
{
  "glitches": [
    {
      "id": "void-dip-di",
      "slug": "void-dip-di",
      "title": "虛化裝備 Void Dip & DI",
      "subtitle": "原理解說與常用步驟示範",
      "game": "totk",
      "category": "虛化類",
      "series": "番外21",
      "difficulty": "進階",
      "versions": ["1.2.1"],
      "videoId": "MWBVJsLTA0c",
      "description": "無限耐久＆複製...",
      "whatIs": "「虛化 (Void Dip / DI)」是...",
      "preparation": ["版本 1.2.1～", "要操作的裝備...", "建議先備份..."],
      "steps": [
        { "title": "確認版本與道具", "desc": "備妥要虛化的裝備..." },
        { "title": "進入虛空次元", "desc": "利用特定地形..." },
        { "title": "觸發虛化 (DI)", "desc": "在載入 / 過場瞬間..." },
        { "title": "確認效果", "desc": "取得無限耐久..." }
      ],
      "applications": ["無限耐久 — 武器、盾不再損耗", "裝備複製 — 快速..."],
      "notes": ["版本差異大...", "操作失誤..."],
      "related": [
        { "id": "enemy-di-ipr", "title": "怪持虛化口袋火箭...", "series": "番外23（會員）" },
        { "id": "swap-resync", "title": "再同步並列...", "series": "番外20" }
      ]
    },
    // ... 更多技巧
  ]
}
```

---

## 搜尋 & 篩選邏輯

```typescript
// src/lib/search.ts
export function filterGlitches(
  glitches: Glitch[],
  query: string,
  filters: { game?: string; category?: string; difficulty?: string }
) {
  return glitches.filter(g => {
    const matchesQuery = query === '' || 
      g.title.toLowerCase().includes(query.toLowerCase()) ||
      g.subtitle.toLowerCase().includes(query.toLowerCase());
    
    const matchesGame = !filters.game || g.game === filters.game;
    const matchesCategory = !filters.category || g.category === filters.category;
    const matchesDifficulty = !filters.difficulty || g.difficulty === filters.difficulty;
    
    return matchesQuery && matchesGame && matchesCategory && matchesDifficulty;
  });
}
```

---

## 路由結構（Astro / Next.js）

### Astro
```
src/pages/
├── index.astro                    # /
├── videos.astro                   # /videos
├── tags.astro                     # /tags
├── [game]/
│   └── index.astro               # /botw, /totk
└── article/
    └── [...slug].astro           # /article/void-dip-di
```

### Next.js (App Router)
```
app/
├── page.tsx                       # /
├── videos/
│   └── page.tsx                  # /videos
├── tags/
│   └── page.tsx                  # /tags
├── [game]/
│   └── page.tsx                  # /botw, /totk
└── article/
    └── [...slug]/
        └── page.tsx              # /article/void-dip-di
```

---

## Tailwind 設定檔示例

```javascript
// tailwind.config.js
export default {
  content: ['./src/**/*.{astro,tsx,ts,jsx,js}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Spectral', 'Noto Serif TC', 'Georgia', 'serif'],
        sans: ['Noto Sans TC', 'system-ui', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      fontSize: {
        xs: ['12px', '1.43'],
        sm: ['14px', '1.43'],
        base: ['16px', '1.5'],
        lg: ['18px', '1.6'],
        xl: ['20px', '1.6'],
        '2xl': ['22px', '1.3'],
        '3xl': ['32px', '1.1'],
        '4xl': ['42px', '1.15'],
        '5xl': ['52px', '1.12'],
        '6xl': ['60px', '1.1'],
      },
      borderRadius: {
        none: '0',
        sm: '6px',
        base: '8px',
        md: '12px',
        lg: '16px',
        xl: '18px',
        full: '9999px',
      },
      spacing: {
        // 使用 4px 為基數
        0: '0',
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        6: '24px',
        8: '32px',
        10: '40px',
        // ...
      },
    },
  },
  plugins: [],
}
```

---

## 關鍵提示

1. **色彩用 CSS 變數** — 讓深淺主題只需切換根元素的 `data-theme` 屬性，無需額外 Tailwind 邏輯
2. **網格用 `auto-fit` / `auto-fill`** — 不需要 media query，元素自動回流
3. **黏貼導覽** — `sticky top-0 z-50` 搭配邊框
4. **字體層級一致** — Spectral + 思源宋體扛所有標題（font-serif），思源黑體內文
5. **響應式文字** — 用 `text-3xl md:text-2xl sm:text-xl` 逐級縮放，不需額外 CSS
6. **版本碼 / 標籤** — 統一用等寬字 (`font-mono`) + `--mono-bg` / `--mono-text` 顏色
7. **localStorage 主題** — Astro 用 `is:inline` script，Next.js 用 useEffect hook

---

## 下一步

1. 在 Claude Code 裡建立上述資料夾結構
2. 複製 `曠野・王國攻略Wiki_standalone.html` 的內容，拆成各元件
3. 填入真實的 glitch 步驟資料（目前示意）
4. 測試深淺主題、搜尋、路由切換
5. 發佈到 Vercel / Netlify / GitHub Pages

有任何疑問或微調需求，直接在 Claude Code 裡提，我可以實時幫你修。
