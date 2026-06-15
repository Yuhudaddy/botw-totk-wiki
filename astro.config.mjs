// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// 部署在 GitHub Pages 的專案頁：https://yuhudaddy.github.io/botw-totk-wiki/
// base 在開發與正式環境一致，內部連結一律用 src/lib/url.ts 的 href() 加前綴。
export default defineConfig({
  site: "https://yuhudaddy.github.io",
  base: "/botw-totk-wiki",
  vite: {
    plugins: [tailwindcss()],
  },
});
