module.exports = {
    /* 开发中的 Server
     * 如果通过 node.js API 来使用dev-server, devServer 中的选项将被忽略，将作为第二个参数传入 new WebpackDevServer(compiler, {...})
     * 插件地址：https://github.com/webpack/webpack-dev-server
     */ 
    devserver: {
        /* 提供在服务的中间件中执行其他中间件的能力 */
        after: (app) => {},

        /* 主机的白名单 */
        allowedHosts: [
            'host.com',
            'host2.com',
            'subdomain.host.com'
        ],

        /* 提供在服务中用户自定义的中间件优于其他中间件的能力 */
        before: (app) => {
            app.get('/some/path', function(req, res){
                res.json({custom: 'response'});
            })
        },

        /* 是否开启广播 */
        bonjour: true,

        /* 客户端显示日志的级别
         * 取值：'none' 'error' 'warning' 'info'
         * 默认值 info
         */
        clientLogLevel: 'none',

        /* 控制台是否开启颜色 */
        color: true,

        /* 服务是否启用 gzip 压缩 */
        compress: true,

        /* 告诉服务器从哪里提供内容 boolean | string | array
         * 默认情况下，将使用当前目录作为提供内容的目录
         * 推荐使用绝对路径 
         */ 
        contentBase: path.join(__dirname, 'public');
        contentBase: [ path.join(__dirname, 'public'), path.join(__dirname, 'assets') ],
        contentBase: false, 

        /* 是否开启主机域名校验
         * true 必须通过校验
         */
        disableHostCheck: true,

        /* 在惰性模式下，此选项可减少编译 
         * 默认在惰性模式，每个请求结果都会产生全新的编译
         * 使用 filename 可以只在某个文件被请求时编译
         */
        filename: 'bundle.js',

        /* 在所有响应中添加头部内容 */
        headers: {
            'X-Custom-Foo': 'bar'
        },

        /* 当使用 HTML5 History API时，任意 404 响应都可能被替换为 index.html 
         * boolean | object
         */
        historyApiFallback: true, //启用
        historyApiFallback: {
            rewrites: [
                {
                    from: /^\/$/,
                    to: '/views/landing.html'
                },
                {
                    from: /^\/subpage/,
                    to: '/views/subpage.html'
                },
                {
                    from: /./,
                    to: '/views/404.html'
                }
            ],
            disableDotRule: true //当路径中使用点(dot)时，需要使用 disableDotRule
        },

        /* 指定使用的host
         * 默认是localhost
         */
        host: '0.0.0.0',

        /* 启用模块热替换 */
        hot: true,

        /* 启用热模块替换，在生成失败时不使用页面刷新作为回退 */
        hotOnly: true,

        /* 启用https  boolean | object */
        https: true,
        https: { //使用以下设置自签名证书
            key: fs.readFileSync('/path/to/server.key'),
            cert: fs.readFileSync('/path/to/server.crt'),
            ca: fs.readFileSync('/path/to/ca.pem')
        },

        /* 默认页面 */
        index: 'index.html',

        /* 命令行是否输出信息 */
        info: false

        /* 使用内联模式或iframe Boolean
         * 默认情况下应用程序使用内联模式 这意味着一段处理实时重载的脚本被插入到你的包中，并且构建消息将会出现在浏览器的控制台
         * false 则启用iframe模式，在通知栏下使用iframe标签，包含了关于构建的消息
         */
        inline: true,

        /* 惰性模式
         * 开启时，只有请求时才编译包，不会监视任何文件改动
         */
        lazy: true,

        /* 不显示信息
         * 开启后 启动和每次保存之后显示的打包消息将会隐藏 错误和警告仍会显示
         */
        noInfo: true,

        /* 打开浏览器
         * CLI: webpack-dev-server --open 
         * 如果没有指定浏览器 将使用默认浏览器，也可以CLI指定：webpack-dev-server --open 'Google Chrome'
         */
        open: true,

        /* 浏览器打开时需打开的特殊页面 */
        openPage: '/different/page',

        /* 当编译报错或警告时全屏显示 */
        overlay: true, // 只显示 errors
        overlay: { // warnings 和 errors 都显示
            warnings: true,
            errors: true
        }

        /* pfx证书 */
        pfx: '/path/to/file.pfx',

        /* pfx证书的密码 */
        pfxPassphrase: 'passphrase',

        /* 端口号 */
        port: 8080,

        /* 代理 */
        proxy: {
            //请求到 /api/users 现在会被代理到请求 http://localhost:3000/api/users
            '/api': 'http://localhost:3000',

            //如果你不想始终传递 /api ，则需要重写路径
            '/api': { 
                target: 'http://localhost:3000',
                pathRewrite: {
                    '^/api': ''
                }
            },
            //默认情况下，不允许运行在HTTPS上，且使用了无效证书的后端服务器，如果想要接受修改配置如下
            '/api': {
                target: 'https://other-server.example.com',
                secure: false
            },
            /* 不想代理所有的请求，可以基于一个函数的返回值绕过代理
             *
             */
            '/api': {
                target: 'http://localhost:3000',
                bypass: function(req, res, proxyOptions){
                    if (req.headers.accept.indexOf("html") !== -1) {
                        console.log("Skipping proxy for browser request.");
                        return "/index.html";
                    }
                }
            }
        },
        /* 将多个特定路径代理给同一个目标 */
        proxy: [
            {
                context: ['/auth', '/api'],
                target: 'http://localhost:3000'
            }
        ],

        /* devServer.progress 只用于命令行工具
         * 将运行进度输出到控制台 webpack-dev-server --progress
         */

        /* 告诉客户端需要代理到什么地方
         * 例如：dev-server 被代理到 Nginx，并且在myapp.test上可用
         */
        public: 'myapp.test:8080',

        /* 此路径下打包文件可在浏览器中访问
         * 默认 publicPath 是 "/"
         */
        publicPath: '/assets/', //确保 publicPath 总是以斜杠(/)开头和结尾
        publicPath: 'http://localhost:8080/assets/',// 也可以是完整的URL

        /* 启用后，除了初始启动信息之外的任何内容都不会被打印到控制台
         * 意味着 webpack 的错误或警告在控制台不可见
         */
        quiet: true,

        /* 即将被废弃，倾向于使用 before */
        setup: function(app){
            app.get('./some/path', function(req, res){
                res.json({ custom: 'response'})
            })
        },

        /* The Unix socket to listen to (instead of a host). */
        socket: 'socket',

        /* 静态资源配置 */
        staticOptions: {
            redirect: false
        },

        stats: 'errors-only',

        useLocalIp: true,

        watchContentBase: true,

        watchOptions: {
            poll: true
        }
    }
}