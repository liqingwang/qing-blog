window.$docsify = {
    name: 'Qing-Blog', // 文档标题，会显示在侧边栏顶部
    repo: 'liqingwang/qing-blog',
    maxLevel: 3,
    coverpage: 'docs/extra-page/cover.md',   // 封面
    loadNavbar: 'docs/extra-page/navbar.md',   // 顶部导航栏
    loadSidebar: 'summary.md',  // 侧边栏
    subMaxLevel: 3,
    alias: {
        '/.*/.*/summary': 'summary.md',
        '/.*/summary.md': 'summary.md',
    },
    auto2top: true,  //切换页面后是否自动跳转到页面顶部。

    search: {
        maxAge: 1800000, // 过期时间，单位毫秒
        paths: [
            '/docs/about/',
            '/docs/about/docsify/',
            '/docs/devops/',
            '/docs/java/',
        ],
        depth: 3,
    }

}