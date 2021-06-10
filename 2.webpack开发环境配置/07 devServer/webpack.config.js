const {
    resolve
} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: './src/index.js',
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
        open: true
    }
}