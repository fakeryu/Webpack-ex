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
    entry: ['./src/index.js', './src/index.html'],
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
            },
            {

                test: /\.html$/,
                // 处理html文件中的img图片（负责引入img，从而能被url-loader进行处理）
                loader: 'html-loader',
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
    },
    devtool: 'source-map'
}

/*
source-map：是一种提供源代码到构建后代码映射 技术（如果构建后代码错误了，通过映射可以追踪到源代码错误）
取值:
[inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map

source-map:外部
        提示错误代码准确信息 和 源代码的错误位置

 只生成一个内联的source-map
inline-source-map:嵌入js中，内联
        提示错误代码准确信息 和 源代码的错误位置

hidden-source-map:外部
        提示错误代码错误原因，但是没有错误位置
        不能追踪源代码错误，只能提示到构建后代码的错误位置

 每一个文件都生成一个内联的source-map，都在eval
eval-source-map:内联
        提示错误代码准确信息 和 源代码的错误位置

nosources-source-map：外部
        提示错误代码准确信息，但是没有源代码信息

cheap-source-map：外部
        提示错误代码准确信息 和 源代码的错误位置
        只能精确到行

cheap-module-source-map：外部
        提示错误代码准确信息 和 源代码的错误位置
        module会将loader的source map加入

内联 和 外部的区别: 1.外部生成了文件，内联没有2.内联构建速度更快

开发环境：速度快，调试更友好
速度快（eval>inline>checp>...）
eval-cheap-source-map
eval-source-map
调试更友好
source-map
cheap-module-source-map
cheap-source-map

--> eval-source-map / eval-cheap-module-source-map

生产环境：源代码要不要隐藏？调试要不要更友好
   内联会让代码体积更大，所以在生产环境不用内联
   nosources-source-map
   hidden-source-map

   --> source-map / cheap-module-source-map
*/