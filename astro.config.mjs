// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// 部署在 GitHub Pages 的專案頁：https://yuhudaddy.github.io/dazotikuy/
// base 必須與 GitHub repo 名稱一致——GitHub Pages 的專案頁網址就是 repo 名稱，
// 且 repo 改名時 Pages 網址「不會」自動轉址（官方文件明列的例外），兩邊要一起改。
// base 在開發與正式環境一致，內部連結一律用 src/lib/url.ts 的 href() 加前綴。
export default defineConfig({
  site: "https://yuhudaddy.github.io",
  base: "/dazotikuy",
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
