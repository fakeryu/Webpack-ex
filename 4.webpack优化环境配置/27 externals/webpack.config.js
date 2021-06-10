/*

*/

const {
    resolve
} = require('path')
const HtmlWebpackPlugin =
    require('html-webpack-plugin')
module.exports = {
    //入口
    entry: './src/js/index.js',
    //输出路径
    output: {
        //输出文件名
        filename: 'js/built.js',
        //输出路径
        // __dirname nodejs变量，代表当前文件的目录的绝对路径
        path: resolve(__dirname, 'build')
    },
    // 插件
    plugins: [
        //详细配置
        //  
        // 功能：默认创建一个空html，自动引入打包输出的所有资源（js/css）
        // 需求：需要有结构的html文件
        new HtmlWebpackPlugin({
            // 复制‘./src/index.html’文件，并自动引入打包输出的所有资源（js/css）
            template: './src/index.html'
        })
    ],
    mode: 'production',
    // mode: 'production' 会压缩文件
    externals: {
        // 忽略/拒绝下列库被打包     需要单独引入（CDN）
        jquery: 'jQuery'
    }
}