import {navbar} from "vuepress-theme-hope";

export default navbar([
    {text: "架构真经", icon: "java", link: "/jiagou/"},
    {text: "算法宝典", icon: "people-network", link: "/demo1/"},
    {text: "开源项目", icon: "kaiyuan", link: "/demo2/"},
    {
        text: "工具&随笔",
        icon: "gengduo",
        children: [
            {text: "实用工具", icon: "cz-gjdj", link: "/demo3/"},
            {text: "技术碎片", icon: "-liebiao-suipian", link: "/demo4/"},
        ],
    },
    {
        text: "网站相关",
        icon: "wangzhankaifa",
        children: [
            //{text: "关于作者", icon: "zuozhe", link: "/demo5/"},
            {text: "更新历史", icon: "lishijilu_o", link: "/timeline/"},
        ],
    },
]);
