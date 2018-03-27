/* 导出一个函数
 * @param env 环境变量
 * @param argv 描述了传递给 webpack 的选项
 */
module.exports = {
    module.exports = function(env, argv) {
        return {
            devtools: env.production ? '' : '',
            plugins: [
                new webpack.optimize.UglifyJsPlugin({
                    compress: argv['optimize-minimize'] //只有传入 -p 或者 --optimizi-minimize
                })
            ]
        }
    }
}

/* 导出一个Promise
 * 便于需要异步加载所需的配置变量
 */
 module.exports = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                entry: './app.js',
                /* ... */ 
            });
        }, 5000);
    });
 }

/* 导出多个配置对象 */
module.exports = [
    {
        entry: './app.js',
        output: {
            filename: '',
            path: '',
            libraryTarget: 'amd'
        }
    },
    {
        entry: './app.js',
        output: {
            filename: '',
            libraryTarget: 'commonjs'
        }
    },
]



