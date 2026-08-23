// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// 部署在 Cloudflare Workers Static Assets（見 wrangler.jsonc 的 assets.directory：
// 有 assets、沒有 main，就是純靜態資產的 Workers，不是 Pages），掛自訂網域
// www.dazotikuy.com。Cloudflare 端已接上這個 repo 的 GitHub 整合，push 到 main
// 會自動建置；.github/workflows/deploy.yml 只負責每日戳 Deploy Hook 重新建置一次。
//
// 2026-08-19 之前是 GitHub Pages，舊網址 yuhudaddy.github.io/dazotikuy/ 由 GitHub
// 自動 301 轉址過來，不需要另外處理。自訂網域是網域根目錄，沒有 /dazotikuy 這種
// 子路徑前綴，所以不設 base（等同預設值 "/"）。
// 內部連結一律用 src/lib/url.ts 的 href() 加前綴（base 是 "/" 時 href() 等於原樣
// 輸出，但保留這層是因為之後若改回子路徑部署完全不用碰呼叫端）。
export default defineConfig({
  site: "https://www.dazotikuy.com",
  integrations: [
    // 產生 sitemap-index.xml／sitemap-0.xml，供 Google Search Console 提交。
    // 海洋入口是彩蛋，不希望被搜尋引擎收錄後直接被搜出來，故排除在外
    // （該頁本身的 canonical 也已指向正式入口 "/"，兩道保險）。
    sitemap({
      filter: (page) => !page.includes("/entrance-ocean"),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
