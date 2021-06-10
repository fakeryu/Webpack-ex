/*

*/

const {
    resolve
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    //入口
    entry: {
        //多入口：有多少个就输出多少个bundle
        index: './src/js/index.js',
        test: './src/js/test.js'
    },
    //输出路径
    output: {
        //输出文件名 [name]更具入口的key取值
        filename: 'js/[name].[contenthash:10].js',
        //输出路径
        // __dirname nodejs变量，代表当前文件的目录的绝对路径
        path: resolve(__dirname, 'build')
    },
    // 插件
    plugins: [
        //详细配置
        new HtmlWebpackPlugin({
            // 复制‘./src/index.html’文件，并自动引入打包输出的所有资源（js/css）
            template: './src/index.html',
            //压缩html代码
            minify: {
                //移除空格
                collapseWhitespace: true,
                //移除注释
                removeComments: true
            }
        })
    ],
    mode: 'production',
};