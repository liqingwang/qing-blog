window.$docsify = {
    name: 'Qing-Blog', // 文档标题，会显示在侧边栏顶部
    repo: 'liqingwang/qing-blog',
    coverpage: 'COVER.md',   // 封面
    loadSidebar: 'SIDEBER.md',  // 侧边栏
    //小屏设备下合并导航栏到侧边栏
    mergeNavbar: true,
    auto2top: true,  //切换页面后是否自动跳转到页面顶部。
    // 全文搜索
    search: {
        maxAge: 1800000, // 过期时间，单位毫秒
        paths: [
            '/docs/about/',
            '/docs/about/docsify/',
            '/docs/devops/',
            '/docs/java/',
        ],
        depth: 4,
        placeholder: '搜索',
        noData: '没有结果！',
        namespace: "website-1",  // 避免搜索索引冲突,同一域下的多个网站之间
    },
    // 页面右侧toc(文档目录)
    toc: {
        tocMaxLevel: 2,
        target: "h2, h3, h4, h5, h6",
    },
    // 底部导航
    pagination: {
        previousText: "上一页",
        nextText: "下一页",
        crossChapter: true,
        crossChapterText: true,
    },
    // 字数统计
    count: {
        countable: true,
        position: "top",
        margin: "10px",
        float: "right",
        fontsize: "0.9em",
        color: "red",
        language: "chinese",
        localization: {
            words: "",
            minute: "",
        },
        isExpected: true,
    }

}