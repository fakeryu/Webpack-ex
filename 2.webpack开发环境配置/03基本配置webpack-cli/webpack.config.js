/*
webpack 配置文件
作用： 指示webpack干哪些活（当你运行webpack指令时，会加载里面的配置）

所有构建工具都是基于nodejs平台运行 模块化默认采用commonjs
*/

const {
    resolve
} = require('path');

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
            // 详细配置
            // 不同文件配置不同loader
            {
                // 匹配哪些文件
                test: /\.css$/,
                use: [
                    // use数组中loader执行顺序：从右到左，从下到上，依次执行
                    // 创建style标签，将js中的样式资源插入，添加到head中生效
                    'style-loader',
                    // 将css文件变成commonjs模块，加载到js中，里面内容是样式字符串
                    'css-loader'
                ]
            },
            {
                // 匹配哪些文件
                test: /\.less$/,
                use: [
                    // use数组中loader执行顺序：从右到左，从下到上，依次执行
                    // 创建style标签，将js中的样式资源插入，添加到head中生效
                    'style-loader',
                    // 将css文件变成commonjs模块，加载到js中，里面内容是样式字符串
                    'css-loader',
                    // 将less文件编译成css
                    'less-loader'
                ]
            },
            {
                //问题：默认处理不了html中img图片
                // 处理图片资源
                test: /\.(jpg|png|gif)$/,
                //使用一个loader
                //下载url-loader，file-loader
                loader: 'url-loader',
                options: {
                    // 图片大小小于8kb，用base64处理
                    // 优点：减少i请求数量
                    // 缺点：图片体积会更大
                    limit: 8 * 1024,
                    // 问题因为url-loader默认使用es6模块化解析，而html-loader引入是图片是用commonjs
                    // 解析式会出问题:[object Module]
                    // 解决：关闭url-loader的es6模块化，使用commonjs解析
                    exModule: false,
                    //给图片重命名
                    // [hash:10]取图片前10位
                    // [ext]取文件原来扩展名
                    name: '[hash:10].[ext]'
                }
            }, {

                test: /\.html$/,
                // 处理html文件中的img图片（负责引入img，从而能被url-loader进行处理）
                loader: 'html-loader',
            }
        ]
    },
    // 插件
    plugins: [
        //详细配置
    ],
    mode: 'development'
    // mode: 'production' 会压缩js文件
};