const {
    resolve
} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

process.env.NODE_ENV = 'development'

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
                    'css-loader',
                    /*
                    css兼容性处理：postcss-->postcss-loader postcss-preset-env

                    帮postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式

                      "browserslist": {
                          // 开发环境 -->设置node环境变量:process.env.NODE_ENV=development
                        "development": [
                        "last 1 chrome version",
                        "last 1 firefox version",
                        "last 1 safari version"
                        ],
                        生成环境 --> 默认
                        "production": [
                        "last 1 version",
                        "> 0.1%",
                        "ie 10",
                        "not dead",
                        "not op_mini all"
                        ]
                    }
                    */
                    //默认loader配置
                    // 'postcss-loader'
                    //修改loader配置
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => {
                                // postcss的插件
                                require('postcss-preset-env')()
                            }
                        }
                    }
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