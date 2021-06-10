/*
缓存：
babel缓存
cacheDirectory：true

-->让第二次打包构建速度更快
----------------------------------
文件资源缓存
hash：每次webpack构建时会生成一个唯一的hash值
问题：因为js和css同时使用一个hash值，如果重新打包会使所有缓存失效（可能至改动了一个文件）
解决：
chunkhash：根据chunk生成的hash值，如果打包来源于同一个chunk，那么hash值就一样
问题：js和css的hash值还是一样的
因为css时在js中被引入的，所以同属于一个chunk（chunk：同属于一个入口引进的文件）
contenthash：根据文件内容生成hash，不同文件hash值一定不一样

-->让代码上线运行缓存更好使用
*/

const {
    resolve
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

process.env.NODE_ENV = 'production'

// 复用loader
const commonLoader = [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
        loader: 'postcss-loader',
        // options: {
        //     ident: 'postcss',
        //     plugins: [
        //         // postcss的插件
        //         require('postcss-preset-env')()
        //     ]
        // }
    }
]

module.exports = {
    //入口
    entry: './src/js/index.js',
    //输出路径
    output: {
        //输出文件名
        filename: 'js/built.[contenthash:10].js',
        //输出路径
        // __dirname nodejs变量，代表当前文件的目录的绝对路径
        path: resolve(__dirname, 'build')
    },
    // loader配置
    module: {
        rules: [{
            // 在pakagejson中eslintConfig --》使用airbnb规则
            test: /\.js$/,
            exclude: /node-modules/,
            //优先执行！！！
            enforce: 'pre',
            loader: 'eslint-loader',
            options: {
                fix: true
            }
        }, {
            // oneOf 每个文件只会匹配一个loader
            // 注意：不能有两个配置处理同一个类型文件，需要提取出去
            oneOf: [{
                    test: /\.css$/,
                    use: [
                        ...commonLoader
                    ]
                }, {
                    test: /\.less$/,
                    use: [
                        ...commonLoader,
                        'less-loader'
                    ]
                },
                /*
                正常来讲一个文件只能被一个loader处理
                当一个文件要被多个loader处理，那么一定指定loader执行先后顺序
                先执行eslint 再执行babel！！！！
                */
                {
                    test: /\.js$/,
                    exclude: /node-modules/,
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],

                        // 开启babel缓存
                        // 第二次构建时,会读取之前的缓存
                        cacheDirectory: true
                    }
                },
                {
                    test: /\.(jpg|png|gif)$/,
                    loader: 'url-loader',
                    options: {
                        // 图片大小小于8kb，用base64处理
                        // 优点：减少i请求数量
                        // 缺点：图片体积会更大
                        limit: 8 * 1024,
                        // 问题L因为url-loader默认使用es6模块化解析，而html-loader引入是图片是用commonjs
                        // 解析式会出问题:[object Module]
                        // 解决：关闭url-loader的es6模块化，使用commonjs解析
                        exModule: false,
                        //给图片重命名
                        // [hash:10]取图片前10位
                        // [ext]取文件原来扩展名
                        name: '[hash:10].[ext]',
                        outputPath: 'imgs'
                    }
                }, {

                    test: /\.html$/,
                    // 处理html文件中的img图片（负责引入img，从而能被url-loader进行处理）
                    loader: 'html-loader',
                },
                // 打包其他资源（除了html，js，css资源意外的资源）
                {
                    exclude: /\.(css|js|html|less|jpg|png|gif)$/,
                    loader: 'file-loader',
                    options: {
                        outputPath: 'others'
                    }
                }
            ]
        }]
    },
    // 插件
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/built.[contenthash:10].css'
        }),
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
        }),
        new OptimizeCssAssetsWebpackPlugin(),
        // postcss的插件
        require('postcss-preset-env')()
    ],
    mode: 'production',
    // mode: 'production' 会压缩js文件
    devtool: 'source-map'
};