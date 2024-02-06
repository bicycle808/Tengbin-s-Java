import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

import theme from "./theme.js";
import {searchPlugin} from "@vuepress/plugin-search";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "Tengbin 的技术沉淀",
  description: "Tengbin 的技术沉淀Tengbin 的技术沉淀",
  theme,

  plugins: [
    searchPlugin({
      //多语言支持
      locales: {
        "/": {
          placeholder: "搜索本站",
        },
      },
      // 热键支持
      hotKeys: ["command", "k"],
      // 最大推荐个数
      maxSuggestions: 7,
      // 排除首页
      isSearchable: (page) => page.path !== "/",
    })
  ]
  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
