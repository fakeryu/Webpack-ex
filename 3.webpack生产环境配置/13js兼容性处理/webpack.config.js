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
        rules: [
            /*
                js兼容性处理：babel-loader @babel/core @babel/preset-env
                1.基本js兼容性转换-->@babel/preset-env
                问题：只能转换基本语法，如promise高级语法不能转换
                2.全部js兼容性处理-->@babel/polyfill  直接引入即可使用
                问题：代码体积过大
                3.需要做兼容性处理就做：按需加载 --> core-js 不能与方案2同时存在
            */
            {
                test: /\.js$/,
                exclude: /node_module/,
                loader: 'babel-loader',
                options: {
                    //预设：指示babel做怎么样的兼容性处理
                    presets: [
                        // '@babel/preset-env'
                        ['@babel/preset-env', {
                            // 按需加载
                            useBuiltIns: 'usage',
                            //指定core-js版本
                            corejs: {
                                version: 3
                            },
                            // 指定兼容性做到哪个版本浏览器
                            targets: {
                                chrome: '60',
                                firefox: '60',
                                ie: '9',
                                safari: '10',
                                edge: '17'
                            }
                        }]

                    ]
                }
            }
        ]
    },
    // 插件
    plugins: [
        //详细配置
        new HtmlWebpackPlugin({
            // 复制‘./src/index.html’文件，并自动引入打包输出的所有资源（js/css）
            template: './src/index.html'
        })
    ],
    mode: 'development'
    // mode: 'production' 会压缩js文件
};