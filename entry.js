/*
 * @param entry: string | [string] | object { <key>: string | [string] } | (function: () => string | [string] | object { <key>: string | [string] })
 * 起点入口
 * 每个HTML文件一个入口起点，单页面应用(SPA): 一个入口起点，多页面应用(MPA): 多个入口起点
 */ 
module.exports = {
    /* 单页面应用语法 */
    entry: './path/to/my/entry/file.js', //是下面的简写
    entry: {
        main: './path/to/my/entry/file.js'
    },

    /* 对象语法 */
    entry: {
        app: './src/app.js',
        vendors: './src/vendors.js'
    },

    /* 多页面应用语法 */
    entry: {
        'home': './home',
        'about': './about',
        'contract': './contract'
    }
}

/* 命名 
 * 如果传入一个字符串或一个字符串数组，chunk会被命名为 main
 * 如果传入一个对象，则每个key会是chunk的名称，该值描述了chunk的入口起点
 */

/* 动态入口
 * 当结合 output.library 选项时：如果传入数组，则只导出最后一项。
 */ 
module.exports = {
    entry: () => './demo',
    entry: () => new Promise((resolve, reject) => {
        resolve(['./demo1', './demo2']);
    });
}




