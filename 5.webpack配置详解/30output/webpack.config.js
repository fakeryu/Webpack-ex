const {
    resolve
} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    entry: './src/index.js',
    output: {
        //输出文件名
        filename: 'js/[name].js',
        //输出路径
        // __dirname nodejs变量，代表当前文件的目录的绝对路径
        path: resolve(__dirname, 'build'),
        // 所有资源引入公共路径前缀 --> 'imgs/a.jpg' -->'/imgs/a.jpg'
        publicPath: '/',
        chunkFilename: 'js/[name]_chunk.js', // 非入口chunk的名称,
        // library一般结合dll使用
        // library: '[name]', // 整个库向外暴露的变量名
        // libraryTarget: 'window' // 变量名添加到哪个上：browser
        // libraryTarget: 'global' // 变量名添加到哪个上：node
        // libraryTarget: 'commonjs' // 变量名添加到哪个上：node
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    mode: 'development'
}