module.exports = {
    /* 设置模块如何被解析（不适用于对 loader 解析） */
    resolve: {
        /* 模块别名列表
         * 创建 import 或 require 的别名，是引入模块更简单
         * 也可以在给定对象的键后的末尾添加 $，以表示精准匹配
         */
        alias: {
            // 起别名："module" -> "new-module" 和 "module/path/file" -> "new-module/path/file"
            "module": "new-module",

            // 起别名 "only-module" -> "new-module"，但不匹配 "only-module/path/file" -> "new-module/path/file"
            "only-module$": "new-module",

            // 起别名 "module" -> "./app/third/module.js" 和 "module/file" 会导致错误
            "module": path.resolve(__dirname, "app/third/module.js"),
        },
        alias: [{
            // 旧的请求
            name: "module",

            // 新的请求
            alias: "new-module",

            // 如果为 true，只有 "module" 是别名
            // 如果为 false，"module/inner/path" 也是别名
            onlyModule: true
        }],

        /* 根据此规范进行解析 */
        aliasField: ['browser'],

        /* 用于描述的 JSON 文件 */
        descriptionFiles: ['package.json']

        /* 是否允许无扩展名文件 Boolean
         * 默认值 false，即如果 ./foo 有 .js 扩展，require('./foo') 正常运行
         * 如果为 true，将不允许无扩展名文件，只有 require('./foo.js') 能正常运行
         */
        enforceExtension: false,

        /* 模块是否需要使用扩展名 Boolean
         * 默认值 false
         */
        enforceModuleExtension: false, 

        /* 自动解析确定的扩展 arrary
         * 用户引入模块时不适用扩展
         */
        extensions: ['.js', '.json'], // 默认值

        /* 当从npm包中导入模块时，此选项将决定在 package.json 中使用哪个字段导入模块
         * 根据配置中指定的 target 不同，默认值会不同
         */
        mainFields: ['browser', 'module', 'main'], //当 target 属性设置为 webworker web 或者没指定值时的默认值
        mainFields: ['module', 'main'], //当 target 属性为其他任意值（包括 node ）的默认值

        /* 解析目录时要使用的文件名 string */
        mainFiles: ['index'] //默认值

        /* 解析模块时应该搜索的目录
         * 相对路径将类似于 node 查找 'node_modules' 的方式进行查找
         * 使用绝对路径将只在给定目标进行搜索
         */
        modules: ['node_modules'], //默认值
        modules: [ path.resolve(__dirname, 'src'), 'node_modules'], //添加一个目录到模块搜索目录，此目录优先于 node_modules/ 搜索

        /* 是否缓存模块 RegExp | array | boolean
         * 默认值 true
         * 启用，会主动缓存一切模块，但并不安全
         * 正则或正则表达式数组，可以用于匹配文件路径或值缓存某些模块
         */
        unsafeCache: true,
        unsafeCache: /src\/utilities/, //值缓存utilities模块

        /* 用于解析的附加插件列表 */
        plugins: [
            new DirectoryNamedWebpackPlugin()
        ],

        /* 是否将符号链接解析到符号链接位置
         * 启用时，符号链接的资源，将解析其真实的路径，而不是其符号链接的位置
         * 当使用符号链接package包工具时（如npm link）, 可能会导致模块解析失败
         */
        symlinks: true, //默认值














    }
}