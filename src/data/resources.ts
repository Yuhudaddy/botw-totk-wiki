// 「資料網站」頁的資料：由本神廟 Discord 管理員（Hsin-Po）協助整理外部資源連結，
// 來源：https://www.symbol.codes。
// kind 決定連結列前的類型圖示。

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
  note?: string; // 補充說明或作者署名
}

export interface ResourceCategory {
  id: string; // 錨點用
  label: string; // 分類名稱（含語言標記，用於推斷語言）
  en: string;
  items: ResourceItem[];
}

export interface ResourceGame {
  game: "botw" | "totk" | "eow" | "ssbu";
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
    en: "BoTW",
    categories: [
      {
        id: "zh-map",
        label: "中文地圖",
        en: "Maps · 中文",
        items: [
          {
            title: "互動地圖",
            url: "https://www.gamertw.com/zelda/botw-map",
            kind: "map",
            note: "by 巴哈/scps940208",
          },
        ],
      },
      {
        id: "zh-sheets",
        label: "中文表格",
        en: "Spreadsheets · 中文",
        items: [
          {
            title: "中英名詞對照",
            url: "https://docs.google.com/spreadsheets/d/1wLoabOgGwh6ST23-lgQG8O6oKdKwwAyb75fzwH5FYpE/",
            kind: "sheet",
          },
          {
            title: "怪物掉寶率",
            url: "https://docs.google.com/spreadsheets/d/1Au2aXlddhSV7dSmkv3KhmTiviNCNUjHZD3-DApC2Ev8/",
            kind: "sheet",
          },
          {
            title: "Amiibo 掉寶率",
            url: "https://docs.google.com/spreadsheets/d/1WugDkmQcloO6SDkVyaaLO6Uu1EIerqMnAf0hR9QnCqU/",
            kind: "sheet",
          },
          {
            title: "料理數學",
            url: "https://docs.google.com/spreadsheets/d/1WVlrlhM3gDOdSi-hvmbUFkFuBHWnOOWhohhVk1uSunw/",
            kind: "sheet",
          },
          {
            title: "武器數值",
            url: "https://docs.google.com/spreadsheets/d/1DB_Z_dQrlv5x5S3hRlQPgVpIr9HnS1NkFh3aJKa2iaQ/",
            kind: "sheet",
          },
          {
            title: "經驗值",
            url: "https://docs.google.com/spreadsheets/d/1WFJRuQtGTUIOKV_UKetkbYHea_FjLiatYPKfGTNvIsw/",
            kind: "sheet",
          },
          {
            title: "隱藏數據",
            url: "https://docs.google.com/spreadsheets/d/1yi99TOn-kWSfSSRRIKeAR_1ZTntbzmrvJ79MsMSoP9Q/",
            kind: "sheet",
          },
          {
            title: "巴哈/UC2010 的表格",
            url: "https://docs.google.com/spreadsheets/d/1wlOXEwHS29v9BT0772HEaf5UbV_8N9LY8olRmKz75bA/",
            kind: "sheet",
            note: "神廟寶箱、任務、商店、染劑、裝備升級、料理、Amiibo、萊尼爾位置等總表",
          },
        ],
      },
      {
        id: "zh-more",
        label: "更多中文資料",
        en: "More · 中文",
        items: [
          {
            title: "定位月步傳送",
            url: "https://docs.google.com/presentation/d/1vq6iNPsOQmgh8Z2rSqnK7arqhTwO42rmtAJc8M6wEpQ/",
            kind: "slides",
          },
          {
            title: "Amiibo 掉寶保底",
            url: "https://docs.google.com/presentation/d/1WSLUUipMFUV08WIyTX89icfF3VsQIXHW4mTLKFD80Xo/",
            kind: "slides",
          },
          {
            title: "ZeldaMods：遊戲機制",
            url: "https://zeldamods.org/wiki/Category:Game_mechanics/zh",
            kind: "site",
          },
          {
            title: "物理機制",
            url: "https://docs.google.com/document/d/1HdIff0N22_VC7YKEfpAEil0RTT6AKk-tkVDn17GTROk/",
            kind: "doc",
          },
          {
            title: "遊戲內文字",
            url: "https://forum.gamer.com.tw/C.php?bsn=1689&snA=8640",
            kind: "forum",
            note: "by 巴哈/yuki5566",
          },
        ],
      },
      {
        id: "en-map",
        label: "英文地圖",
        en: "Maps · English",
        items: [
          {
            title: "舊版物件地圖",
            url: "https://objmap-legacy.zeldamods.org/",
            kind: "map",
            note: "縮小時顯示總數 · by MrCheeze",
          },
          {
            title: "新版物件地圖",
            url: "https://objmap.zeldamods.org/",
            kind: "map",
            note: "強大的搜尋功能 · by leoetlino",
          },
          {
            title: "神廟列表 · 含寶箱",
            url: "https://www.ign.com/wikis/the-legend-of-zelda-breath-of-the-wild/Shrines",
            kind: "map",
            note: "host by IGN",
          },
          {
            title: "神廟列表 · 含地點提示",
            url: "https://www.gosunoob.com/zelda-breath-of-wild/shrines-where-to-find-how-to-complete/",
            kind: "map",
            note: "host by GosuNoob",
          },
          {
            title: "神廟列表 · 力之考驗",
            url: "https://gamefaqs.gamespot.com/boards/189707-the-legend-of-zelda-breath-of-the-wild/75183722",
            kind: "forum",
            note: "含武器 · by Sailor_Razor",
          },
          {
            title: "克洛格地圖 · 按任務分類",
            url: "https://lepelog.github.io/korokmap/",
            kind: "map",
            note: "by lepelog",
          },
          {
            title: "克洛格地圖 · 含截圖",
            url: "https://www.zeldadungeon.net/breath-of-the-wild-interactive-map/",
            kind: "map",
            note: "host by Zelda Dungeon",
          },
          {
            title: "克洛格地圖 · 含截圖",
            url: "https://www.ign.com/maps/the-legend-of-zelda-breath-of-the-wild/hyrule",
            kind: "map",
            note: "host by IGN",
          },
          {
            title: "100% 需拜訪地點",
            url: "https://mrcheeze.github.io/botw-waypoint-map/",
            kind: "map",
            note: "by MrCheeze",
          },
          {
            title: "萊尼爾地圖",
            url: "https://www.reddit.com/r/Breath_of_the_Wild/comments/87num5/lynel_map/",
            kind: "map",
            note: "含武器及箭種 · by PlasmaSlaya",
          },
          {
            title: "野馬地點",
            url: "https://gamefaqs.gamespot.com/wii-u/632936-the-legend-of-zelda-breath-of-the-wild/faqs/74764/normal-horses",
            kind: "map",
            note: "含血速魔 · by HylianAngel",
          },
        ],
      },
      {
        id: "foreign",
        label: "外文資料",
        en: "Data · Foreign",
        items: [
          {
            title: "訛植料理",
            url: "https://docs.google.com/spreadsheets/d/1efenvai4JJM9iPGziHvvef6jSWvNeUGrx-WV9eWlR3g/",
            kind: "sheet",
            note: "Glitch Hunter 頻道玩家共同整理",
          },
          {
            title: "WMC 料理賣價計算式",
            url: "https://docs.google.com/spreadsheets/d/1NT6u2fGmT7xJAwA7n-uS0D6c-RTMtxxmpNaIY3xgqTk/edit",
            kind: "sheet",
            note: "by Nebulaara",
          },
          {
            title: "一般情報",
            url: "https://docs.google.com/spreadsheets/d/1lCFAZIlSgVV4HiCd2gDhHX5o08Smtgval7svBhZbtn4/edit",
            kind: "sheet",
            note: "by 萱草プレリアル",
          },
          {
            title: "戰鬥技巧合集",
            url: "https://docs.google.com/document/d/1qtYT06sxweRW3tRnovcCc-f4xIOGFNsD02pG1TzloHc/",
            kind: "doc",
            note: "by Rin",
          },
          {
            title: "神廟技巧性速通總表",
            url: "https://docs.google.com/spreadsheets/d/1n82Emcn8qfcYG2zd9fn7cDPzj-RedgHkFDyNM7FnRUs/",
            kind: "sheet",
            note: "禁止風彈月步錯傳馬滑 · by Komali",
          },
        ],
      },
      {
        id: "gallery",
        label: "藝廊",
        en: "Gallery",
        items: [
          {
            title: "More things you still didn't know",
            url: "https://www.youtube.com/watch?v=7ZbcmPrPtII&list=PLpg6WLs8kxGO0sUCxow2TVQfHW1s7wBbY",
            kind: "video",
            note: "系列 by GameSpot / Rin",
          },
        ],
      },
    ],
  },
  {
    game: "totk",
    label: "王國之淚",
    en: "ToTK",
    categories: [
      {
        id: "zh-map",
        label: "中文地圖",
        en: "Maps · 中文",
        items: [
          {
            title: "互動地圖",
            url: "https://www.gamertw.com/zelda/totk/map",
            kind: "map",
            note: "by 巴哈/scps940208",
          },
          {
            title: "素材效果與位置",
            url: "https://www.gamertw.com/zelda/totk/material",
            kind: "map",
          },
          {
            title: "防具位置與升級素材",
            url: "https://www.gamertw.com/zelda/totk/armor",
            kind: "map",
          },
        ],
      },
      {
        id: "zh-more",
        label: "更多中文資料",
        en: "More · 中文",
        items: [
          {
            title: "中文雜表",
            url: "https://docs.google.com/spreadsheets/d/1-QiEisDV4v-nOZ4xeYdnYFbYBfL-Q4f4M3g1TLFarJY/",
            kind: "sheet",
            note: "防具、武器、材料、食物、左納烏裝置、藍圖、圖鑑、商店、轉蛋機等",
          },
          {
            title: "特殊建材",
            url: "https://forum.gamer.com.tw/C.php?bsn=1689&snA=11715",
            kind: "forum",
            note: "by 巴哈/z59922395525",
          },
          {
            title: "100%／全要素",
            url: "https://forum.gamer.com.tw/C.php?bsn=1689&snA=11607",
            kind: "forum",
            note: "神廟、破魔之根、魔猶伊、圖鑑、克洛格、勳章等 · by 巴哈/a255010",
          },
          {
            title: "料理指南",
            url: "https://haozzone.notion.site/Z-5908f127996e4454806aca88e74dcda5",
            kind: "site",
            note: "by 巴哈/haophic",
          },
        ],
      },
      {
        id: "en-map",
        label: "英文地圖",
        en: "Maps · English",
        items: [
          {
            title: "物件地圖 · 顯示總數",
            url: "https://vetyst.github.io/TotK-Object-Map/",
            kind: "map",
            note: "縮小時顯示總數 · by Danny Janse",
          },
          {
            title: "物件地圖 · 完整搜尋",
            url: "https://objmap-totk.zeldamods.org/",
            kind: "map",
            note: "by Léo Lam",
          },
          {
            title: "進度追蹤地圖",
            url: "https://totk.aeonsake.com/",
            kind: "map",
            note: "可開塔、含神殿 · by AEON",
          },
          {
            title: "互動地圖",
            url: "https://www.zeldadungeon.net/tears-of-the-kingdom-interactive-map/",
            kind: "map",
            note: "host by Zelda Dungeon",
          },
          {
            title: "互動地圖",
            url: "https://zeldamaps.com/?game=TotK",
            kind: "map",
            note: "host by Zelda Maps",
          },
          {
            title: "互動地圖",
            url: "https://mapgenie.io/zelda-tears-of-the-kingdom/maps/hyrule",
            kind: "map",
            note: "host by Map Genie",
          },
          {
            title: "互動地圖",
            url: "https://www.ign.com/maps/the-legend-of-zelda-tears-of-the-kingdom/hyrule",
            kind: "map",
            note: "host by IGN",
          },
          {
            title: "附攻略連結的地圖",
            url: "https://www.polygon.com/c/zelda-tears-of-the-kingdom-guide/23718210/zelda-tears-of-the-kingdom-map-hyrule-depths-sky",
            kind: "map",
            note: "host by Polygon",
          },
        ],
      },
      {
        id: "en-data",
        label: "英文資料",
        en: "Data · English",
        items: [
          {
            title: "List of Glitches",
            url: "https://docs.google.com/spreadsheets/d/1xNB1gOLZRSF9yp1mHUsS9ymogRJa1Wz8rTliTXezeRM/",
            kind: "sheet",
            note: "程錯列表",
          },
          {
            title: "Data Spreadsheet",
            url: "https://docs.google.com/spreadsheets/d/1fBvQ17WHP3ASgtO8ode_rf1g4DfEHErMrHwwLppNTJM/",
            kind: "sheet",
            note: "by Phil（Aeon、SuperSpazzy 協力）",
          },
          {
            title: "Interactable Objects",
            url: "https://docs.google.com/spreadsheets/d/1eHHFwGDsI3sHTOLaawlxKgxbiLG8ceHUHpbpC2Bj57k/",
            kind: "sheet",
            note: "可互動之物品 · by Phil and Jay",
          },
          {
            title: "Text Dump",
            url: "https://docs.google.com/spreadsheets/d/11S_vD-kUTwG58qnhtchB12humhFOOK0qzRRilrA_hek/",
            kind: "sheet",
            note: "多語言文字對照 · by Phil and Aeon",
          },
          {
            title: "防具升級素材計算器",
            url: "https://docs.google.com/spreadsheets/d/1gzS-kViCZ6c4GCDdUFiwfx_Fih2sbcwJm5czzKLJvGo/",
            kind: "sheet",
            note: "by Phil",
          },
          {
            title: "馬匹升級計算器",
            url: "https://docs.google.com/spreadsheets/d/1dIqcZ4a0D_oyug5wTMdF9Ori7wOyTzJOsamnGHn-IdU/",
            kind: "sheet",
            note: "by Phil",
          },
          {
            title: "Raw Param",
            url: "https://docs.google.com/spreadsheets/d/1YkGXGsYIr91d00Lri2cTXYtorRfoMkZNbS1I_4mZLGc/",
            kind: "sheet",
            note: "原始參數",
          },
          {
            title: "解釋賢者攻擊力",
            url: "https://www.reddit.com/r/tearsofthekingdom/comments/14ct8kt/sage_attack_power_a_full_breakdown/",
            kind: "forum",
            note: "Reddit 貼文",
          },
          {
            title: "解釋 Boss 攻擊力",
            url: "https://www.reddit.com/r/tearsofthekingdom/comments/14rr5sd/how_temple_bosses_scale_a_full_breakdown/",
            kind: "forum",
            note: "Reddit 貼文",
          },
          {
            title: "Raw Parameter Files",
            url: "https://docs.google.com/spreadsheets/d/1HlkGg9Si61lvuWooPckmQMlv3EJT-jHcR2ZmLtRmsL4/",
            kind: "sheet",
          },
          {
            title: "Combined Parameter Files",
            url: "https://docs.google.com/spreadsheets/d/13_I_wPuG6AvFm02qgtIBDamQrrb6x4a8--UouZYKOsc/",
            kind: "sheet",
          },
          {
            title: "Drop Tables",
            url: "https://docs.google.com/spreadsheets/d/1PhKeLdLqjLTLxRqsd3ZvzpUpU8RBSD6zXFgzmxIRSbM/edit#gid=21404910",
            kind: "sheet",
            note: "掉寶表",
          },
          {
            title: "AttackParam（清理版）",
            url: "https://docs.google.com/spreadsheets/d/1UQG0W2RkYq_HyMhK0ZB9cqDeKxa4TcI_y6nynz6fbAc/",
            kind: "sheet",
            note: "已移除未使用項目",
          },
          {
            title: "Data Sheet v5",
            url: "https://docs.google.com/spreadsheets/d/18pNtDx3z-8CwGJRmlW574xbQ6VphQOkvpZhClpOEVDA/",
            kind: "sheet",
            note: "by Echocolat 等人（已停止更新）",
          },
          {
            title: "餘料武器攻擊計算",
            url: "https://docs.google.com/spreadsheets/d/1LPhUKU479MtmxFd5V7EXdIAurIGR6pxOG3FYjuZw8NM/",
            kind: "sheet",
          },
          {
            title: "FUSION",
            url: "https://docs.google.com/spreadsheets/d/1D8FpE5meHxblv62VbI70g_eRBd3b2Xphz7wM69stG5E/",
            kind: "sheet",
            note: "所有餘料組合總表",
          },
          {
            title: "Attack Params",
            url: "https://docs.google.com/spreadsheets/d/1HvVT5MWV0tr7ZiioW8MndsQGtG7S-g4AtWF2NFi-5qQ/",
            kind: "sheet",
            note: "動物與怪物的攻擊力",
          },
          {
            title: "XP System",
            url: "https://docs.google.com/spreadsheets/d/1VyzoV6YrTkJHUjqBcgaflPLRDNPvFEhaStJMuOahfAY/",
            kind: "sheet",
            note: "經驗值系統",
          },
          {
            title: "Fuse Names",
            url: "https://docs.google.com/spreadsheets/d/1wQDX1RJIRRbRBhujk-XA8TqxJU_WjvR_LBC1ZGtRuM4/",
            kind: "sheet",
            note: "餘料武器命名法",
          },
          {
            title: "解釋武器攻擊力",
            url: "https://www.reddit.com/r/tearsofthekingdom/comments/13wrp2g/a_mostly_complete_post_about_how_the_weapon/",
            kind: "forum",
            note: "Reddit 貼文",
          },
          {
            title: "解釋未腐朽武器",
            url: "https://www.reddit.com/r/tearsofthekingdom/comments/13uqo9h/everything_you_need_to_know_about_nondecayed/",
            kind: "forum",
            note: "Reddit 貼文",
          },
          {
            title: "解釋經驗值系統",
            url: "https://www.reddit.com/r/tearsofthekingdom/comments/1496az3/explaining_level_scaling_in_totk/",
            kind: "forum",
            note: "Reddit 貼文",
          },
          {
            title: "猜測參數的含義",
            url: "https://docs.google.com/spreadsheets/d/1_wiJD0WQ2uEqOEdgBCg8bTuF35pFTU9rengRp6GE--w/",
            kind: "sheet",
          },
          {
            title: "餘料建造模擬器",
            url: "https://zonai-fusion.link",
            kind: "tool",
            note: "by Track-tor",
          },
          {
            title: "3D 模型檢視 · bleh",
            url: "http://dev.ssmvc.org:8080/bleh.html?actor=Obj_SpikeBall_B",
            kind: "tool",
          },
          {
            title: "3D 模型檢視 · wip",
            url: "http://dev.ssmvc.org:8080/wip.html?actor=Obj_SpikeBall_B",
            kind: "tool",
          },
          {
            title: "食材簡表",
            url: "https://www.reddit.com/r/tearsofthekingdom/comments/144ss8t/cooking_cheat_sheet_version_03_with_ingredient/",
            kind: "forum",
            note: "by HylianExplorer",
          },
          {
            title: "料理模擬器 · Zelda Recipes",
            url: "https://www.zelda.recipes/",
            kind: "tool",
            note: "by jamie",
          },
          {
            title: "料理模擬器 · TotK Cookbook",
            url: "https://www.totkcookbook.com/",
            kind: "tool",
            note: "by Ghastly64",
          },
          {
            title: "龍的預報",
            url: "https://restite.org/dragons/",
            kind: "tool",
            note: "by savage13",
          },
          {
            title: "Stream Dump",
            url: "https://docs.google.com/spreadsheets/d/1EulzqfIHFt5g7ElGktMRRMyXvvC9sY170P1M8yAjUPs/",
            kind: "sheet",
            note: "音樂與音效",
          },
          {
            title: "Physics",
            url: "https://docs.google.com/document/d/1BrjXWYnciYpL76hLmQ8KQfZeWYtdDhyNDjPlGNh515o/",
            kind: "doc",
            note: "物理引擎",
          },
          {
            title: "Damage Calculations",
            url: "https://docs.google.com/document/d/1K5hLcxfnvSnY-nsIP-n8Ew7rm9EkqHtnn6iJqOnxlng/",
            kind: "doc",
            note: "攻擊力計算",
          },
          {
            title: "Gloom Mechanics",
            url: "https://docs.google.com/document/d/1jGe6vV1-xgw6UbTiD39kUwd8No6zC4vSbhccfG9Flxo/",
            kind: "doc",
            note: "瘴氣機制",
          },
          {
            title: "Amiibo 掉寶",
            url: "https://gist.github.com/jordanbtucker/a950e3a041b95867bc123b71c4cf7f28",
            kind: "site",
          },
          {
            title: "Special Objects for Building",
            url: "https://docs.google.com/spreadsheets/d/1NkURUErF1Jpoemkr4rLQjrcMO-XibsMykpFEGj0uHVU/",
            kind: "sheet",
            note: "特殊建材",
          },
          {
            title: "The Construct Head",
            url: "https://docs.google.com/document/d/1_SQPZ3IN_Dk1tGbcj2Wbze01Evusfrcrncc1rW8PsAc/",
            kind: "doc",
            note: "魔像頭",
          },
          {
            title: "進階戰鬥術語表",
            url: "https://docs.google.com/document/d/1z0qViEN9cl7dTpTb2LP2vlUVp9qiFMu2QJS8KDFx-cM/",
            kind: "doc",
            note: "by Rin",
          },
        ],
      },
      {
        id: "ja-data",
        label: "日文資料",
        en: "Data · 日本語",
        items: [
          {
            title: "GameWith 的攻略",
            url: "https://gamewith.jp/zelda-totk/",
            kind: "site",
          },
          {
            title: "GameWith 的攻略（英文版）",
            url: "https://gamewith.net/zelda-totk/",
            kind: "site",
          },
          {
            title: "NPC 命名來源",
            url: "https://docs.google.com/spreadsheets/d/1MnnpgzMHRm8lZ73lhvGc2fx04M6542w61zop9l7TAE0/",
            kind: "sheet",
          },
          {
            title: "BotW NPC 命名來源",
            url: "https://docs.google.com/spreadsheets/d/1u1ZhEDEJNl5aNl8UIyHqkcQ-UeUGOluNLbTLBDpAkEg/",
            kind: "sheet",
          },
          {
            title: "廟名與京都地名的關係",
            url: "https://www.google.com/maps/d/u/0/viewer?mid=1LskaKRbdTSr2jqlaybiMCAcKMSa5rUY",
            kind: "map",
          },
        ],
      },
      {
        id: "gallery",
        label: "藝廊",
        en: "Gallery",
        items: [
          {
            title: "左納烏機械",
            url: "https://www.youtube.com/playlist?list=PLAp_O-WDBQLDk0owRTliK7G7FUrKuFS6q",
            kind: "video",
            note: "by Top Gaming Plays",
          },
          {
            title: "More things you still didn't know",
            url: "https://www.youtube.com/playlist?list=PLpg6WLs8kxGMPX8cYED64m1Kgq3Rnnp_W",
            kind: "video",
            note: "系列 by GameSpot / Rin",
          },
        ],
      },
    ],
  },
  {
    game: "eow",
    label: "智慧的再現",
    en: "EoW",
    categories: [], // 尚未整理，待補
  },
  {
    game: "ssbu",
    label: "任天堂明星大亂鬥特別版",
    en: "SSBU",
    shortLabel: "大亂鬥",
    categories: [], // 尚未整理，待補
  },
];
