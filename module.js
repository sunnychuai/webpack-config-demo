module.exports = {
    module: {
        /* 不解析与给定正则表达式相匹配的文件 RegExp | [RegExp]| function
         * 忽略的文件中不应该含义 import require define 的调用，或任何其他导入机制
         */
        noParse: /jquery|lodash/,
        noParse: [/jquery|lodash/],
        noParse: function (content) {
            return /jquery|lodash/.test(content);
        },

        /* 规则数组
         * 能够修改模块的创建方式，配置 loader 或 解析器
         */
        rules: [
            /* rule 
             * 每个规则分为三个部分：条件 结果 嵌套规则
             * 条件有两种输入值: 1.resource 请求文件的绝对路径 2.issuer 被请求资源的模块文件的绝对路径
             * 结果有两种输入值: 1.loader 应用在resource上loader数组 2.Parser 用于为模块创建解析器的对象
             * 嵌套规则: 可以使用属性rules 和 oneOf 指定嵌套规则，这些规则用于在规则条件匹配时进行取值
             * 条件可以是以下之一
             * 1.字符串：匹配输入必须以提供字符串开始。目录绝对路径或文件绝对路径
             * 2.正则表达式：test输入值
             * 3.函数：调用输入的函数，必须返回一个真值以匹配
             * 4.条件数组：至少一个匹配条件
             * 5.对象：匹配所有属性
             * { test: Condition }：匹配特定条件。一般是提供一个正则表达式或正则表达式的数组，但这不是强制的。
             * { include: Condition }：匹配特定条件。一般是提供一个字符串或者字符串数组，但这不是强制的。
             * { exclude: Condition }：排除特定条件。一般是提供一个字符串或字符串数组，但这不是强制的。
             * { and: [Condition] }：必须匹配数组中的所有条件
             * { or: [Condition] }：匹配数组中任何一个条件
             * { not: [Condition] }：必须排除这个条件
             */
            {
                /* 指定loader种类 string
                 * loader的种类：前置、行内、普通、后置，并按此顺序使用
                 * 没有值表示是普通的 loader；行内 loader被应用到 import/require 行内
                 * 所有的普通的 loader 可以通过在请求中加 ! 来忽略（覆盖）
                 * 所有普通和前置 loader 可以通过在请求中加上 -! 来忽略（覆盖）
                 * 所有普通 前置 和 后置 loader 可以通过在请求中加上 !! 来忽略（覆盖）
                 * 不应该使用行内 loader 和 ! 前缀，因为它们是非标准的。可在 loader 生成的代码中使用
                 */ 
                enforce: 'pre' | 'post',

                /* 是必不匹配选项（优先于 test 和 include）
                 * Rule.exclude 是 Rule.resource.exclude 的简写
                 * 如果你提供了 Rule.exclude 选项，就不能再提供 Rule.resource
                 * 尽量避免 exclude，更倾向于使用 include
                 */
                exclude: [],

                /* 必须匹配
                 * Rule.include 是 Rule.resource.include 的简写
                 * 如果你提供了 Rule.include 选项，就不能再提供 Rule.resource
                 * 在 include 和 exclude 中使用绝对路径数组
                 */ 
                include: [],

                /* 条件 导入源 发布者
                 * 用来将 loader 应用到一个特定模块或一组模块的依赖中
                 */
                issuer: {
                    test,
                    include,
                    exclude
                },

                /* 相对上下文解析
                 * Rule.loader 是 Rule.use: [{ loader }] 的缩写
                 */
                loader: 'babel-loader',

                /* 已废弃
                 * Rule.loaders 是 Rule.use 的别名
                 */
                loaders: [],

                /* 规则数组
                 * 当匹配规则时，只使用第一个匹配规则
                 */
                oneOf: [
                    {
                        resourceQuery: /inline/, //foo.css?inline
                        use: 'url-loader'
                    },
                    {
                        resourceQuery: /external/, //foo.css?external
                        use: 'file-loader'
                    }
                ],

                /* 可选项
                 * Rule.options 和 Rule.query 是 Rule.use: [ { options } ] 的缩写
                 * Rule.use 和 Rule.query 已废弃
                 */
                options: {},

                /* 解析选项对象 object */
                parser: {
                    amd: false, // 禁用 AMD
                    commonjs: false, // 禁用 CommonJS
                    system: false, // 禁用 SystemJS
                    harmony: false, // 禁用 ES2015 Harmony import/export
                    requireInclude: false, // 禁用 require.include
                    requireEnsure: false, // 禁用 require.ensure
                    requireContext: false, // 禁用 require.context
                    browserify: false, // 禁用特殊处理的 browserify bundle
                    requireJs: false, // 禁用 requirejs.*
                    node: false, // 禁用 __dirname, __filename, module, require.extensions, require.main 等。
                    node: {...} // 在模块级别(module level)上重新配置 node 层(layer)
                },

                /* 匹配条件 array | object
                 * 默认为条件数组
                 */ 
                resource: {
                    and: [ /* 条件 */ ] //仅当所有的条件都匹配时匹配
                },
                resource: {
                    or: [ /* 条件 */ ] //任意条件匹配时匹配
                },
                resource: [ /* 条件 */ ], //任意条件匹配时匹配
                resource: {
                    not: [ /* 条件 */ ] //条件不匹配时匹配
                },

                /* 条件匹配的查询条件 */
                resourceQuery: /inline/, //import Foo from './foo.css?inline'
                
                /* 嵌套规则（合并可用条件）  */
                rules: [ /* rules */ ],

                /* 匹配条件
                 * Rule.test 是 Rule.resource.test 的简写
                 * 如果你提供了一个 Rule.test 条件就不能再提供 Rule.resource 
                 */
                test: /\.html$/,

                /* 应用多个loader 每个入口指定使用一个loader
                 * use: ['style-loader'] 是 use: [ { loader: 'style-loader'} ] 的缩写
                 */
                use: [ 
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            noIeCompat: true
                        }
                    }
                ],

            }
        ],

        /* 特殊动态请求配置的默认值
         * 未知的(unknown) 动态依赖：require。
         * 表达式(expr) 动态依赖：require(expr)。
         * 包裹的(wrapped) 动态依赖：require("./templates/" + expr)。
         */
        unknownContextRequest: ".",
        unknownContextRecursive: true,
        unknownContextRegExp: /^\.\/.*$/,
        unknownContextCritical: true,
        exprContextRequest: ".",
        exprContextRegExp: /^\.\/.*$/,
        exprContextRecursive: true,
        exprContextCritical: true,
        wrappedContextRegExp: /.*/,
        wrappedContextRecursive: true,
        wrappedContextCritical: false, //动态依赖的警告
    }
}