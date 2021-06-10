/*

*/

const {
    resolve
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    //入口
    entry: './src/js/index.js',
    //输出路径
    output: {
        //输出文件名 [name]根据入口的key取值
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
    /*
    可以将node_modules中代码单独打包一个chunk最终输出
    自动分析多入口chunk中，有没有公共文件，如果有会单独打包成一个chunk
    */
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    mode: 'production',
};