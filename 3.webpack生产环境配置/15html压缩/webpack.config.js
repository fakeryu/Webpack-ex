/*
webpack 配置文件
作用： 指示webpack干哪些活（当你运行webpack指令时，会加载里面的配置）

所有构建工具都是基于nodejs平台运行 模块化默认采用commonjs
*/

const {
    resolve
} = require('path');
const HtmlWebpackPlugin =
    require('html-webpack-plugin')

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
    // loader配置
    module: {

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
    mode: 'development'
    // mode: 'production' 会压缩js文件
};