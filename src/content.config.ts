import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// 攻略內容集：每篇 glitch 一個 .md，frontmatter 放結構化欄位、內文寫散文。
const glitches = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/glitches" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    game: z.enum(["botw", "totk"]),
    category: z.string(),
    series: z.string().optional(),
    difficulty: z.string().default("進階"),
    versions: z.array(z.string()).default([]),
    videoId: z.string(),
    // 側欄標籤；未填則自動用 [遊戲名, category, difficulty]
    tags: z.array(z.string()).optional(),
    related: z
      .array(
        z.object({
          videoId: z.string(),
          title: z.string(),
          series: z.string().optional(),
        }),
      )
      .default([]),
    // 排序用，數字越小越新；未填則用檔名
    order: z.number().optional(),
  }),
});

export const collections = { glitches };
