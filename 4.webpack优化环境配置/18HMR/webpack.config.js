/*
HMR：hot module replacement 热模块替换/模块热替换
作用:一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块）
极大提升构建速度

 样式文件: 可以使用HMR:因为 style-loader 内部实现了~
 js文件: 默认不能使用HMR功能 -->需要修改js代码,添加支持HMR代码
 html文件:默认不能使用HMR功能,同时导致问题:html文件不能热更新了~ (无需HMR)
    解决:修改entry入口,将html文件引入
*/

const {
    resolve
} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: ['./src/index.js','./src/index.html'],
    output: {
        //入口文件输出路径
        filename: 'built.js',
        //其他文件路径
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    // 创建style标签，样式放入
                    // 'style-loader',
                    //取代style-loader，作用：提取js中的css成单独文件
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            // 打包其他资源（除了html，js，css资源意外的资源）
            {
                exclude: /\.(css|js|html)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'others'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            //重命名
            filename: 'css/built.css'
        })
    ],
    mode: 'development',

    // 开发服务器 devServer：用来自动化(自动编译，自动打开浏览器，自动刷新浏览器...)
    // 特点: 只会在内存中编译打包，不会有任何输出，而webpack会有输出
    // 启动devServer指令：npx webpack-dev-server
    devServer: {
        //项目构建后路径
        contentBase: resolve(__dirname, 'build'),
        // 启动gzip压缩
        compress: true,
        //端口号
        port: 3000,
        // 自动打开浏览器
        open: true,
        // 开启HMR
        // 当修改了webpackconfig 需要重新执行
        hot: true
    }
}