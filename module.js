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
             * 
             */
            {

            }
        ],
    }
}