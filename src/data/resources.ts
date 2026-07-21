// 「資料網站」頁的資料：由本神廟 Discord 管理員（Hsin-Po）協助整理外部資源連結，
// 來源：https://www.symbol.codes。
// kind 決定連結列前的類型圖示；分類（category）只負責語言分組，
// 每個遊戲固定分「中文資料／英文資料／日文資料」三類（無該語言資料則省略），
// 資源類型已經由 kind 圖示區分，分類不需要重複再切一次。

export type ResourceKind =
  | "sheet" // Google 試算表
  | "doc" // Google 文件
  | "slides" // Google 簡報
  | "map" // 互動地圖
  | "forum" // 論壇／Reddit 貼文
  | "video" // YouTube 影片／播放清單
  | "tool" // 模擬器／計算器
  | "site"; // 一般網站

export interface ResourceItem {
  title: string;
  url: string;
  kind: ResourceKind;
  note?: string; // 資源卡副標題：優先標示製作者，其次標示整理來源或補充說明
  recommended?: boolean; // 站長本人推薦且常用，star 篩選會用到
}

export interface ResourceCategory {
  id: "zh" | "en" | "ja"; // 語言代碼，用於推斷語言標籤
  label: string; // 分類名稱（中文資料／英文資料／日文資料）
  en: string;
  items: ResourceItem[];
}

export interface ResourceGame {
  game: "botw" | "totk" | "eow" | "ssbu" | "aoc" | "aoi";
  label: string;
  en: string;
  shortLabel?: string; // 門扉卡片空間有限時使用的縮寫（未填則用 label）
  categories: ResourceCategory[]; // 空陣列 = 尚未整理，頁面顯示「整理中」
}

export const RESOURCES_CREDIT = {
  name: "Hsin-Po",
  url: "https://www.symbol.codes",
};

export const resourceGames: ResourceGame[] = [
  {
    game: "botw",
    label: "曠野之息",
    en: "Breath of the Wild",
    categories: [
      {
        id: "zh",
        label: "中文資料",
        en: "Chinese",
        items: [
          {
            title: "曠野之息中文地圖",
            url: "https://www.gamertw.com/zelda/botw-map",
            kind: "map",
            note: "Hosted by gamertw",
          },
          {
            title: "曠野之息物件中英名詞對照",
            url: "https://docs.google.com/spreadsheets/d/1wLoabOgGwh6ST23-lgQG8O6oKdKwwAyb75fzwH5FYpE/",
            kind: "sheet",
            note: "Translated by Hsin-Po",
          },
          {
            title: "怪物掉寶率",
            url: "https://docs.google.com/spreadsheets/d/1Au2aXlddhSV7dSmkv3KhmTiviNCNUjHZD3-DApC2Ev8/",
            kind: "sheet",
            note: "Translated by Hsin-Po",
          },
          {
            title: "Amiibo 掉寶率",
            url: "https://docs.google.com/spreadsheets/d/1WugDkmQcloO6SDkVyaaLO6Uu1EIerqMnAf0hR9QnCqU/",
            kind: "sheet",
            note: "Translated by Hsin-Po",
          },
          {
            title: "料理數學",
            url: "https://docs.google.com/spreadsheets/d/1WVlrlhM3gDOdSi-hvmbUFkFuBHWnOOWhohhVk1uSunw/",
            kind: "sheet",
            note: "Translated by Hsin-Po",
          },
          {
            title: "武器數值",
            url: "https://docs.google.com/spreadsheets/d/1DB_Z_dQrlv5x5S3hRlQPgVpIr9HnS1NkFh3aJKa2iaQ/",
            kind: "sheet",
            note: "Translated by Hsin-Po",
          },
          {
            title: "經驗值",
            url: "https://docs.google.com/spreadsheets/d/1WFJRuQtGTUIOKV_UKetkbYHea_FjLiatYPKfGTNvIsw/",
            kind: "sheet",
            note: "Translated by Hsin-Po",
          },
          {
            title: "隱藏數據",
            url: "https://docs.google.com/spreadsheets/d/1yi99TOn-kWSfSSRRIKeAR_1ZTntbzmrvJ79MsMSoP9Q/",
            kind: "sheet",
            note: "Translated by Hsin-Po",
          },
          {
            title: "曠野之息資料彙整",
            url: "https://docs.google.com/spreadsheets/d/1wlOXEwHS29v9BT0772HEaf5UbV_8N9LY8olRmKz75bA/",
            kind: "sheet",
            note: "Curated by Hsin-Po",
          },
          {
            title: "定位月步傳送",
            url: "https://docs.google.com/presentation/d/1vq6iNPsOQmgh8Z2rSqnK7arqhTwO42rmtAJc8M6wEpQ/",
            kind: "slides",
            note: "Explained by Hsin-Po",
          },
          {
            title: "Amiibo 掉寶保底",
            url: "https://docs.google.com/presentation/d/1WSLUUipMFUV08WIyTX89icfF3VsQIXHW4mTLKFD80Xo/",
            kind: "slides",
            note: "Explained by Hsin-Po",
          },
          {
            title: "ZeldaMods：遊戲機制",
            url: "https://zeldamods.org/wiki/Category:Game_mechanics/zh",
            kind: "site",
            note: "Translated by Hsin-Po",
          },
          {
            title: "物理機制",
            url: "https://docs.google.com/document/d/1HdIff0N22_VC7YKEfpAEil0RTT6AKk-tkVDn17GTROk/",
            kind: "doc",
            note: "Translated by Hsin-Po",
          },
          {
            title: "希卡古文、海利亞文、格魯德文解析",
            url: "https://forum.gamer.com.tw/C.php?bsn=1689&snA=8640",
            kind: "forum",
            note: "Created by 巴哈/yuki5566",
          },
        ],
      },
      {
        id: "en",
        label: "英文資料",
        en: "English",
        items: [
          {
            title: "MrCheeze Actor物件地圖",
            url: "https://objmap-legacy.zeldamods.org/",
            kind: "map",
            note: "Created by MrCheeze",
          },
          {
            title: "Léo 曠野物件地圖",
            url: "https://objmap.zeldamods.org/",
            kind: "map",
            note: "Created by Léo Lam / 最全面的物件地圖",
            recommended: true,
          },
          {
            title: "IGN 曠野之息地圖",
            url: "https://www.ign.com/maps/the-legend-of-zelda-breath-of-the-wild/hyrule",
            kind: "map",
            note: "Hosted by IGN",
          },
          {
            title: "克洛格地圖（按任務分類）",
            url: "https://lepelog.github.io/korokmap/",
            kind: "map",
            note: "Created by lepelog",
          },
          {
            title: "曠野之息互動地圖",
            url: "https://www.zeldadungeon.net/breath-of-the-wild-interactive-map/",
            kind: "map",
            note: "Hosted by Zelda Dungeon",
          },
          {
            title: "進度 100% 需拜訪地點",
            url: "https://mrcheeze.github.io/botw-waypoint-map/",
            kind: "map",
            note: "Created by MrCheeze",
          },
          {
            title: "萊尼爾地圖",
            url: "https://www.reddit.com/r/Breath_of_the_Wild/comments/87num5/lynel_map/",
            kind: "map",
            note: "Created by PlasmaSlaya",
          },
          {
            title: "野馬地點（含抓馬建議與說明）",
            url: "https://gamefaqs.gamespot.com/wii-u/632936-the-legend-of-zelda-breath-of-the-wild/faqs/74764/normal-horses",
            kind: "map",
            note: "Created by HylianAngel",
          },
          {
            title: "事件流程表",
            url: "https://eventviewer.zeldamods.org/",
            kind: "tool",
            note: "Created by MrCheeze et al.",
          },
          {
            title: "WMC 料理詞綴料理",
            url: "https://docs.google.com/spreadsheets/d/1efenvai4JJM9iPGziHvvef6jSWvNeUGrx-WV9eWlR3g/",
            kind: "sheet",
            note: "Created collectively by Glitch Hunter Channel players",
          },
          {
            title: "WMC 料理賣價計算式",
            url: "https://docs.google.com/spreadsheets/d/1NT6u2fGmT7xJAwA7n-uS0D6c-RTMtxxmpNaIY3xgqTk/edit",
            kind: "sheet",
            note: "Created by Nebulaara",
          },
          {
            title: "Rin 的戰鬥技巧教學",
            url: "https://docs.google.com/document/d/1qtYT06sxweRW3tRnovcCc-f4xIOGFNsD02pG1TzloHc/",
            kind: "doc",
            note: "Created by RinHara5aki",
          },
          {
            title: "神廟速通表（無瞬間移動程錯）",
            url: "https://docs.google.com/spreadsheets/d/1n82Emcn8qfcYG2zd9fn7cDPzj-RedgHkFDyNM7FnRUs/",
            kind: "sheet",
            note: "Created by Komali",
          },
          {
            title: "程錯表",
            url: "https://docs.google.com/spreadsheets/d/15DYWr2WHUI3pxxjgeEaZ7MHoo19rmBTIE7koJ7L1-eM/",
            kind: "sheet",
          },
          {
            title: "More things you still didn't know",
            url: "https://www.youtube.com/watch?v=7ZbcmPrPtII&list=PLpg6WLs8kxGO0sUCxow2TVQfHW1s7wBbY",
            kind: "video",
            note: "Series by GameSpot / Rin",
          },
        ],
      },
      {
        id: "ja",
        label: "日文資料",
        en: "Japanese",
        items: [
          {
            title: "曠野之息攻略網站",
            url: "https://gamewith.jp/zeldabotw/",
            kind: "site",
            note: "Hosted by gamewith",
          },
        ],
      },
    ],
  },
  {
    game: "totk",
    label: "王國之淚",
    en: "Tears of the Kingdom",
    categories: [
      {
        id: "zh",
        label: "中文資料",
        en: "Chinese",
        items: [
          {
            title: "王國之淚攻略網站（含地圖）",
            url: "https://www.gamertw.com",
            kind: "map",
            note: "Created by gamertw",
          },
          {
            title: "王國之淚資料彙整",
            url: "https://docs.google.com/spreadsheets/d/1-QiEisDV4v-nOZ4xeYdnYFbYBfL-Q4f4M3g1TLFarJY/",
            kind: "sheet",
            note: "Curated by Hsin-Po",
          },
          {
            title: "特殊組合建材（不含 CO 拆下來的）",
            url: "https://forum.gamer.com.tw/C.php?bsn=1689&snA=11715",
            kind: "forum",
            note: "Created by 巴哈/z59922395525",
          },
          {
            title: "進度 100%／全要素",
            url: "https://forum.gamer.com.tw/C.php?bsn=1689&snA=11607",
            kind: "forum",
            note: "Created by 巴哈/a255010",
          },
          {
            title: "料理指南",
            url: "https://haozzone.notion.site/Z-5908f127996e4454806aca88e74dcda5",
            kind: "site",
            note: "Created by 巴哈/haophic",
          },
        ],
      },
      {
        id: "en",
        label: "英文資料",
        en: "English",
        items: [
          {
            title: "ToTK Actor Map",
            url: "https://vetyst.github.io/TotK-Object-Map/",
            kind: "map",
            note: "Created by Danny Janse",
          },
          {
            title: "Léo 王淚物件地圖",
            url: "https://objmap-totk.zeldamods.org/",
            kind: "map",
            note: "Created by Léo Lam / 最全面的物件地圖",
            recommended: true,
          },
          {
            title: "Savage 地圖攻略",
            url: "https://restite.org/",
            kind: "tool",
            note: "Created by savage13",
          },
          {
            title: "GameWith 的王國之淚攻略（英文版）",
            url: "https://gamewith.net/zelda-totk/",
            kind: "site",
            note: "Curated by Hsin-Po",
          },
          {
            title: "進度追蹤地圖",
            url: "https://totk.aeonsake.com/",
            kind: "map",
            note: "Created by Aeon",
          },
          {
            title: "Zelda Dungeon 互動地圖",
            url: "https://www.zeldadungeon.net/tears-of-the-kingdom-interactive-map/",
            kind: "map",
            note: "Hosted by Zelda Dungeon",
          },
          {
            title: "Zelda Maps 互動地圖",
            url: "https://zeldamaps.com/?game=TotK",
            kind: "map",
            note: "Hosted by Zelda Maps",
          },
          {
            title: "Map Genie 互動地圖",
            url: "https://mapgenie.io/zelda-tears-of-the-kingdom/maps/hyrule",
            kind: "map",
            note: "Hosted by Map Genie",
          },
          {
            title: "IGN 互動地圖",
            url: "https://www.ign.com/maps/the-legend-of-zelda-tears-of-the-kingdom/hyrule",
            kind: "map",
            note: "Hosted by IGN",
          },
          {
            title: "Polygon 攻略連結地圖",
            url: "https://www.polygon.com/c/zelda-tears-of-the-kingdom-guide/23718210/zelda-tears-of-the-kingdom-map-hyrule-depths-sky",
            kind: "map",
            note: "Hosted by Polygon",
          },
          {
            title: "事件流程表",
            url: "https://restite.org/eventviewer-totk/",
            kind: "tool",
            note: "Created by MrCheeze et al.",
          },
          {
            title: "程錯表",
            url: "https://docs.google.com/spreadsheets/d/1xNB1gOLZRSF9yp1mHUsS9ymogRJa1Wz8rTliTXezeRM/",
            kind: "sheet",
          },
          {
            title: "資料彙整",
            url: "https://docs.google.com/spreadsheets/d/1fBvQ17WHP3ASgtO8ode_rf1g4DfEHErMrHwwLppNTJM/",
            kind: "sheet",
            note: "Created by Phil et al.",
          },
          {
            title: "可互動物件表",
            url: "https://docs.google.com/spreadsheets/d/1eHHFwGDsI3sHTOLaawlxKgxbiLG8ceHUHpbpC2Bj57k/",
            kind: "sheet",
            note: "Created by Phil et al.",
          },
          {
            title: "文字語庫",
            url: "https://docs.google.com/spreadsheets/d/11S_vD-kUTwG58qnhtchB12humhFOOK0qzRRilrA_hek/",
            kind: "sheet",
            note: "Created by Phil and Aeon",
          },
          {
            title: "防具升級素材計算器",
            url: "https://docs.google.com/spreadsheets/d/1gzS-kViCZ6c4GCDdUFiwfx_Fih2sbcwJm5czzKLJvGo/",
            kind: "sheet",
            note: "Created by Phil",
          },
          {
            title: "馬匹升級計算器",
            url: "https://docs.google.com/spreadsheets/d/1dIqcZ4a0D_oyug5wTMdF9Ori7wOyTzJOsamnGHn-IdU/",
            kind: "sheet",
            note: "Created by Phil",
          },
          {
            title: "原始參數",
            url: "https://docs.google.com/spreadsheets/d/1YkGXGsYIr91d00Lri2cTXYtorRfoMkZNbS1I_4mZLGc/",
            kind: "sheet",
            note: "Created by Phil",
          },
          {
            title: "解釋賢者攻擊力",
            url: "https://www.reddit.com/r/tearsofthekingdom/comments/14ct8kt/sage_attack_power_a_full_breakdown/",
            kind: "forum",
            note: "Created by Phil · Reddit 貼文",
          },
          {
            title: "解釋 Boss 攻擊力",
            url: "https://www.reddit.com/r/tearsofthekingdom/comments/14rr5sd/how_temple_bosses_scale_a_full_breakdown/",
            kind: "forum",
            note: "Created by Phil · Reddit 貼文",
          },
          {
            title: "Raw Parameter Files",
            url: "https://docs.google.com/spreadsheets/d/1HlkGg9Si61lvuWooPckmQMlv3EJT-jHcR2ZmLtRmsL4/",
            kind: "sheet",
            note: "Created by DT12345",
          },
          {
            title: "Combined Parameter Files",
            url: "https://docs.google.com/spreadsheets/d/13_I_wPuG6AvFm02qgtIBDamQrrb6x4a8--UouZYKOsc/",
            kind: "sheet",
            note: "Created by DT12345",
          },
          {
            title: "掉寶率",
            url: "https://docs.google.com/spreadsheets/d/1PhKeLdLqjLTLxRqsd3ZvzpUpU8RBSD6zXFgzmxIRSbM/edit#gid=21404910",
            kind: "sheet",
            note: "Created by DT12345",
          },
          {
            title: "AttackParam",
            url: "https://docs.google.com/spreadsheets/d/1UQG0W2RkYq_HyMhK0ZB9cqDeKxa4TcI_y6nynz6fbAc/",
            kind: "sheet",
            note: "Created by DT12345",
          },
          {
            title: "餘料武器攻擊計算",
            url: "https://docs.google.com/spreadsheets/d/1LPhUKU479MtmxFd5V7EXdIAurIGR6pxOG3FYjuZw8NM/",
            kind: "sheet",
            note: "Created by Echocolat et al.",
          },
          {
            title: "餘料組合總表",
            url: "https://docs.google.com/spreadsheets/d/1D8FpE5meHxblv62VbI70g_eRBd3b2Xphz7wM69stG5E/",
            kind: "sheet",
            note: "Created by Echocolat et al.",
          },
          {
            title: "動物與怪物的攻擊力",
            url: "https://docs.google.com/spreadsheets/d/1HvVT5MWV0tr7ZiioW8MndsQGtG7S-g4AtWF2NFi-5qQ/",
            kind: "sheet",
            note: "Created by Echocolat et al.",
          },
          {
            title: "經驗值系統",
            url: "https://docs.google.com/spreadsheets/d/1VyzoV6YrTkJHUjqBcgaflPLRDNPvFEhaStJMuOahfAY/",
            kind: "sheet",
            note: "Created by Echocolat et al.",
          },
          {
            title: "餘料建造命名法",
            url: "https://docs.google.com/spreadsheets/d/1wQDX1RJIRRbRBhujk-XA8TqxJU_WjvR_LBC1ZGtRuM4/",
            kind: "sheet",
            note: "Created by Echocolat et al.",
          },
          {
            title: "解釋武器攻擊力",
            url: "https://www.reddit.com/r/tearsofthekingdom/comments/13wrp2g/a_mostly_complete_post_about_how_the_weapon/",
            kind: "forum",
            note: "Created by Echocolat et al.",
          },
          {
            title: "解釋未腐朽武器",
            url: "https://www.reddit.com/r/tearsofthekingdom/comments/13uqo9h/everything_you_need_to_know_about_nondecayed/",
            kind: "forum",
            note: "Created by Echocolat et al.",
          },
          {
            title: "解釋經驗值系統",
            url: "https://www.reddit.com/r/tearsofthekingdom/comments/1496az3/explaining_level_scaling_in_totk/",
            kind: "forum",
            note: "Created by Echocolat et al.",
          },
          {
            title: "NPC 命名來源",
            url: "https://docs.google.com/spreadsheets/d/1MnnpgzMHRm8lZ73lhvGc2fx04M6542w61zop9l7TAE0/",
            kind: "sheet",
            note: "Curated by Hsin-Po",
          },
          {
            title: "BotW NPC 命名來源",
            url: "https://docs.google.com/spreadsheets/d/1u1ZhEDEJNl5aNl8UIyHqkcQ-UeUGOluNLbTLBDpAkEg/",
            kind: "sheet",
            note: "Curated by Hsin-Po",
          },
          {
            title: "廟名與京都地名的關係",
            url: "https://www.google.com/maps/d/u/0/viewer?mid=1LskaKRbdTSr2jqlaybiMCAcKMSa5rUY",
            kind: "map",
            note: "Curated by Hsin-Po",
          },
          {
            title: "猜測參數的含義",
            url: "https://docs.google.com/spreadsheets/d/1_wiJD0WQ2uEqOEdgBCg8bTuF35pFTU9rengRp6GE--w/",
            kind: "sheet",
            note: "Curated by Hsin-Po",
          },
          {
            title: "餘料建造模擬器",
            url: "https://zonai-fusion.link",
            kind: "tool",
            note: "Created by Track-tor",
          },
          {
            title: "餘料建造組合分享網",
            url: "https://www.hyruleworks.com",
            kind: "tool",
            note: "Created by HyruleWorks",
          },
          {
            title: "食材簡表",
            url: "https://www.reddit.com/r/tearsofthekingdom/comments/144ss8t/cooking_cheat_sheet_version_03_with_ingredient/",
            kind: "forum",
            note: "Created by HylianExplorer",
          },
          {
            title: "料理模擬器（Zelda Recipes）",
            url: "https://www.zelda.recipes/",
            kind: "tool",
            note: "Created by jamie",
          },
          {
            title: "料理模擬器（TotK Cookbook）",
            url: "https://www.totkcookbook.com/",
            kind: "tool",
            note: "Created by Ghastly64",
          },
          {
            title: "音樂與音效",
            url: "https://docs.google.com/spreadsheets/d/1EulzqfIHFt5g7ElGktMRRMyXvvC9sY170P1M8yAjUPs/",
            kind: "sheet",
            note: "Curated by Hsin-Po",
          },
          {
            title: "物理引擎",
            url: "https://docs.google.com/document/d/1BrjXWYnciYpL76hLmQ8KQfZeWYtdDhyNDjPlGNh515o/",
            kind: "doc",
            note: "Curated by Hsin-Po",
          },
          {
            title: "攻擊力計算",
            url: "https://docs.google.com/document/d/1K5hLcxfnvSnY-nsIP-n8Ew7rm9EkqHtnn6iJqOnxlng/",
            kind: "doc",
            note: "Curated by Hsin-Po",
          },
          {
            title: "Amiibo 掉寶率",
            url: "https://gist.github.com/jordanbtucker/a950e3a041b95867bc123b71c4cf7f28",
            kind: "site",
            note: "Curated by Hsin-Po",
          },
          {
            title: "魔像頭",
            url: "https://docs.google.com/document/d/1_SQPZ3IN_Dk1tGbcj2Wbze01Evusfrcrncc1rW8PsAc/",
            kind: "doc",
            note: "Curated by Hsin-Po",
          },
          {
            title: "Rin 的戰鬥技巧教學",
            url: "https://docs.google.com/document/d/1z0qViEN9cl7dTpTb2LP2vlUVp9qiFMu2QJS8KDFx-cM/",
            kind: "doc",
            note: "Created by RinHara5aki",
          },
          {
            title: "左納烏機械",
            url: "https://www.youtube.com/playlist?list=PLAp_O-WDBQLDk0owRTliK7G7FUrKuFS6q",
            kind: "video",
            note: "Created by Top Gaming Plays",
          },
          {
            title: "More things you still didn't know",
            url: "https://www.youtube.com/playlist?list=PLpg6WLs8kxGMPX8cYED64m1Kgq3Rnnp_W",
            kind: "video",
            note: "Series by GameSpot / Rin",
          },
        ],
      },
      {
        id: "ja",
        label: "日文資料",
        en: "Japanese",
        items: [
          {
            title: "GameWith 的王國之淚攻略",
            url: "https://gamewith.jp/zelda-totk/",
            kind: "site",
            note: "Curated by Hsin-Po",
          },
        ],
      },
    ],
  },
  {
    game: "eow",
    label: "智慧的再現",
    en: "Echoes of Wisdom",
    categories: [], // 尚未整理，待補
  },
  {
    game: "ssbu",
    label: "任天堂明星大亂鬥特別版",
    en: "SSB Ultimate",
    shortLabel: "大亂鬥",
    categories: [], // 尚未整理，待補
  },
  {
    game: "aoc",
    label: "災厄啟示錄",
    en: "Age of Calamity",
    categories: [
      {
        id: "zh",
        label: "中文資料",
        en: "Chinese",
        items: [
          {
            title: "災厄啟示錄資料庫",
            url: "https://docs.google.com/spreadsheets/d/1YUwOkL_HBp6YADsAm60UxfkO-qn713GPLNKzayjq46o/",
            kind: "sheet",
            note: "Curated by Hsin-Po",
          },
        ],
      },
    ],
  },
  {
    game: "aoi",
    label: "封印戰記",
    en: "Age of Imprisonment",
    categories: [
      {
        id: "zh",
        label: "中文資料",
        en: "Chinese",
        items: [
          {
            title: "封印戰記資料庫",
            url: "https://docs.google.com/spreadsheets/d/1gETsarMsqRHYQYDLAyHzOmZl70hY1waqaQmd726pSdE/",
            kind: "sheet",
            note: "Curated by Hsin-Po",
          },
        ],
      },
    ],
  },
];
