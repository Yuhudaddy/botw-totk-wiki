// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// 部署在 GitHub Pages 的專案頁：https://yuhudaddy.github.io/dazotikuy/
// base 必須與 GitHub repo 名稱一致——GitHub Pages 的專案頁網址就是 repo 名稱，
// 且 repo 改名時 Pages 網址「不會」自動轉址（官方文件明列的例外），兩邊要一起改。
// base 在開發與正式環境一致，內部連結一律用 src/lib/url.ts 的 href() 加前綴。
export default defineConfig({
  site: "https://yuhudaddy.github.io",
  base: "/dazotikuy",
  vite: {
    plugins: [tailwindcss()],
  },
});
