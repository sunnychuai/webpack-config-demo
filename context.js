const path = require('path');

/*
 * @param context: string 
 * 基础路径，绝对路径，用于从配置中解析入口起点和loader
 * 默认使用当前目录
 */
module.exports = {
    context: path.resolve(__dirname, 'app');
}
