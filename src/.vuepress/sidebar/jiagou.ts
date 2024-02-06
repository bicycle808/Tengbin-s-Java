import {sidebar} from "vuepress-theme-hope";

export const jiagou = sidebar([
        {
            text: "分布式原理",
            icon: "fenbushijiagou",
            // 是否可折叠，默认是 false
            collapsible: true,
            // 文件地址，可以不设置
            //prefix: "jiagou/",
            children: ["RPC-learn-0", "use-suggestion", "contribution-guideline", "faq"],
        },
        {
            text: "微服务技术栈",
            icon: "weifuwu1",
            // 是否可折叠，默认是 false
            collapsible: true,
            // 文件地址，可以不设置
            //prefix: "jiagou/",
            children: ["page", "use-suggestion", "contribution-guideline", "faq"],
        },
        {
            text: "消息中间件",
            icon: "apacherocketmq",
            // 是否可折叠，默认是 false
            collapsible: true,
            // 文件地址，可以不设置
            //prefix: "jiagou/",
            children: ["page", "use-suggestion", "contribution-guideline", "faq"],
        },
        {
            text: "源码深入理解",
            icon: "spring",
            // 是否可折叠，默认是 false
            collapsible: true,
            // 文件地址，可以不设置
            //prefix: "jiagou/",
            children: ["page", "use-suggestion", "contribution-guideline", "faq"],
        }, {
            text: "容器化技术",
            icon: "a-kubernetesrongqihuayingyong",
            // 是否可折叠，默认是 false
            collapsible: true,
            // 文件地址，可以不设置
            //prefix: "jiagou/",
            children: ["page", "use-suggestion", "contribution-guideline", "faq"],
        }, {
            text: "数据库相关",
            icon: "suyaniconchanpinleibufenzuodaohangbufen84",
            // 是否可折叠，默认是 false
            collapsible: true,
            // 文件地址，可以不设置
            //prefix: "jiagou/",
            children: ["page", "use-suggestion", "contribution-guideline", "faq"],
        }, {
            text: "性能调优",
            icon: "JVM",
            // 是否可折叠，默认是 false
            collapsible: true,
            // 文件地址，可以不设置
            //prefix: "jiagou/",
            children: ["page", "use-suggestion", "contribution-guideline", "faq"],
        }, {
            text: "代码简洁之道",
            icon: "jianjie",
            // 是否可折叠，默认是 false
            collapsible: true,
            // 文件地址，可以不设置
            //prefix: "jiagou/",
            children: ["page", "use-suggestion", "contribution-guideline", "faq"],
        }, {
            text: "工欲善其事，必先利其器",
            icon: "gongju",
            // 是否可折叠，默认是 false
            collapsible: true,
            // 文件地址，可以不设置
            //prefix: "jiagou/",
            children: ["page", "use-suggestion", "contribution-guideline", "faq"],
        },
    ],
);
