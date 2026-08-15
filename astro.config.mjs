// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// 部署在 GitHub Pages，掛自訂網域 www.dazotikuy.com（GitHub repo Settings → Pages
// → Custom domain 已設定，HTTPS 憑證已核發）。自訂網域是網域根目錄，不再有
// /dazotikuy 這種子路徑前綴，所以不設 base（等同預設值 "/"）。
// 舊網址 yuhudaddy.github.io/dazotikuy/ 會被 GitHub Pages 自動 301 轉址到這裡，
// 不需要另外處理。內部連結一律用 src/lib/url.ts 的 href() 加前綴（base 是 "/"
// 時 href() 等於原樣輸出，但保留這層是因為之後若改回子路徑部署完全不用碰呼叫端）。
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
