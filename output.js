module.exports = {
    output: {
        /* 辅助注释 string | object
         * 在和 output.library 和 output.libraryTarget 一起使用时，此选项允许用户向导出容器中插入注释
         */ 
        //要为 libraryTarget 每种类型插入相同的注释，将auxiliaryComment设置为一个字符串
        auxiliaryComment: 'test comment',
        //对于每种类型的 libraryTarget 插入更为细粒度的控制，可传入一个对象
        auxiliaryComment: {
            root: 'root comment',
            amd: 'amd comment',
            commonjs: 'commonjs comment'
        },

        /* 非入口chunk文件的名称  string | function
         * 默认使用 [id].js 或从 output.filename 中推断出的值([name]会被预先替换为[id] 或 [id].)
         */
        chunkFilename: '[id].js',
        chunkFilename: "[chunkhash].js", //长效缓存

        /* chunk 到期之前的毫秒数 integer
         * 默认值 120 000
         */
        chunkLoadTimeout: 120000,

        /* 跨域加载 Boolean | string
         * 只用于 target 是 web，使用了script标签的 jsonp 来按需加载 chunk
         */ 
        crossOriginLoading: false, //禁止跨域加载（默认）
        crossOriginLoading: 'anonymous', //不带凭证启用跨域加载
        crossOriginLoading: 'use-credentials', //带凭证启用跨域加载

        /* 自定义script标签类型 string
         * webpack 会将 script 标签注入到 DOM 中以下载异步 chunk
         */
        jsonpScriptType: 'text/javascript', //默认值
        jsonpScriptType: 'module', //与 ES6 就绪代码一起使用

        /* 行到行映射  boolean | object
         * 将生成基本的源映射，即生成的资源的每一行，映射到原始资源的同一行
         */
        devtoolLineToLine:  true | false, //对所以模块启用或禁用此功能
        devtoolLineToLine: {
            test: /\.js$/,
            include: './src/utils.js',
            exclude: './src/vendors.js'
        },

        /* 自定义每个source map在sources数组中使用的名称
         * 可以通过传递模板字符串或者函数来完成
         * [absolute-resource-path] 绝对路径文件名
         * [all-loaders] 自动和显示的loader 并且参数取决于第一个 loader 名称
         * [hash] 模块标识符的hash
         * [id] 模块标识符
         * [loaders] 显示的loader 并且参数取决于第一个 loader 名称
         * [recource] 用于解析文件的路径和用于第一个loader的任意查询参数
         * [resource-path] 不带任何的查询参数，用于解析文件的路径
         */
        devtoolModuleFilename: "webpack:///[resource-path]?[loaders]", //默认值
        devtoolModuleFilename: info => { //使用函数时，同样的选项需要使用 info 参数并使用驼峰式
            return `webpack:///${info.resourcePath}?${info.loaders}`
        },

        /* 当模板字符串或函数产生重复时使用的备用内容 string | function
         * 当多个模块产生相同的名称，使用 devtoolFallbackModuleFilenameTemplate 来替换
         */
        devtoolFallbackModuleFilenameTemplate: '',

        /* 每个输出 bundle 的名称 string | function
         * 可以使用像'js/[name]/bundle.js'这样的文件夹结构
         * 不会影响 按需加载的chunk 的输出文件，这些文件请使用 chunkFilename来控制输出
         * 不会影响 通过loader创建的文件
         * [name] 模块名称
         * [id] chunk id 模块标识符
         * [hash] 模块标识符的 hash，可以使用[hash:16](默认20)来限制
         * [chunkhash] chunk 内容的 hash，可以使用[chunkhash:16](默认20)来限制
         * [query] 模块的query，例如文件名?后面的字符串
         */
        filename: 'bundle.js', //单个入口起点，filename 会是一个静态名称
        filename: '[name].bundle.js', //使用入口名称
        filename: '[id].bundle.js',//使用内部chunk id
        filename: '[name].[hash].bundle.js',// 使用每次构建过程中，唯一的hash生成
        filename: '[chunkhash].bundle.js', //使用每个chunk内容的hash

        /* 全局指定 hash 的长度 
         * 散列摘要的前缀长度
         */
        hashDigestLength: 20, //默认值

        /* 生成hash时使用的编码方式 */ 
        hashDigest: 'hex',

        /* 可选的加盐值
         * 通过nodejs的hash.update来更新哈希
         */
        hashsalt: ,

        /* 自定义热更新 chunk 文件名  string | function
         * 占位符只能是 [id] 和 [hash]
         */
        hotUpdateChunkFilename: '[id].[hash].hot-update.js', // 默认值

        /* 热更新函数 function
         * 只在target是web时使用，用于加载热更新的JSONP函数
         * JSONP函数用于异步加载热更新 chunk
         */
        hotUpdateFunction: () => {},

        /* 自定义热更新的主文件名 string | function
         * 占位符只能是 [hash]
         */ 
        hotUpdateMainFilename: '[hash].hot-update.json', //默认值

        /* 只在target是web使用，用于按需加载 chunk 的 JSONP 函数
         * JSONP函数用于异步加载chunk，或者拼接多个初始 chunk
         */
        jsonpFunction: () => {},

        library: '',
        libraryExport: '',
        libraryTarget: 'var', //默认值

        /* 输出路径 string
         * 对应一个绝对路径
         */ 
        path: path.resolve(__dirname, 'dist/assets'),

        /* 在bundle中引入 所包含模块信息 的相关注释 Boolean
         * 默认值是false 不应该用于生产环境
         */
        pathinfo: true | false,

        /* 引用资源的公开URL string
         * 相对URL会被相对于HTML页面解析，还有相对服务的URL、相对协议的URL或绝对URL
         * 以runtime(运行时)和loader(载入时)所创建的每个URL为前缀，因此多数情况下，此选项的值都会以"/"结束
         * 默认值是空字符串""
         * 在编译时无法知道输出文件的 publicPath 的情况下，可以留空，然后在入口文件处使用自由变量 __webpack_public_path__，以便在运行时进行动态设置
         */
        publicPath: '', //相对于 HTML 页面（目录相同）
        publicPath: '../assets/', //相对于 HTML 页面
        publicPath: 'assets/', //相对于 HTML 页面
        publicPath: '/assets/', //相对于服务
        publicPath: 'https://cdn.example.com/assets/',//CDN (总是相对于https)
        publicPath: '//cdn.example.com/assets/',//CDN (协议相同)

        /* 配置source mapd的命名方式 string
         * 只在 devtool 启用SourceMap选项时才使用
         * 默认使用 [file].map
         * 可以使用以下替换符：[name] [id] [hash] [chunkhash] 
         * [file] 原始文件的文件名 (建议使用，其他占位符在非chunk生成的 SourceMap 时不起作用)
         * [filebase] 文件的 basename
         */
        sourceMapFilename: '[file].map',

        /* 修改输出 bundle 中每行的前缀 string
         * 默认使用空字符串"" 没必要修改
         */
        sourcePrefix: '\t',

        /* 异常处理 Boolean
         * 如果一个模块在require时抛出异常，告诉webpack从模块实例缓存中删除这个模块
         * 默认值 false，该模块不会从缓存中删除，这将造成仅在第一次 require 调用时抛出异常
         * true, 模块所有的 require 都抛出异常
         */ 
        strictModuleExceptionHandling: false,

        /* 对UMD的构建过程中的AMD模块进行命名，否则使用匿名的 define 
         * Boolean
         * 当使用了 libraryTarget: 'umd'
         */
        umdNamedDefine: true
    }
}