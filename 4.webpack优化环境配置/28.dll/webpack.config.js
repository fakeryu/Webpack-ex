const {
    resolve
} = require('path')
const HtmlWebpackPlugin =
    require('html-webpack-plugin')
const webpack = require('webpack');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

module.exports = {
    //入口
    entry: './src/index.js',
    //输出路径
    output: {
        //输出文件名
        filename: 'built.js',
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
        }),
        // 告诉webpack那些库不参与打包，同时使用时的名称也得变~~
        new webpack.DllReferencePlugin({
            manifest: resolve(__dirname, 'dll/manifest.json')
        }),
        // 将某个文件打包输出去，并在html中自动引入该资源
        new AddAssetHtmlWebpackPlugin({
            filepath: resolve(__dirname, 'dll/jquery.js'),
            publicPath: ''
        })
    ],
    mode: 'development'
    // mode: 'production' 会压缩文件
}