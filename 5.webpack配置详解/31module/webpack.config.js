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
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            //loader配置
            {
                test: /\.css$/,
                // 多个loader用use
                use: ['css-loader', 'style-loader']
            }, {
                test: /\.js$/,
                // 排除node_modules下文件
                exclude: '/node_modules/',
                // 只检查src下js文件
                include: resolve(__dirname, 'src'),
                enforce: 'pre', // 优先执行
                enforce: 'post', // 延后执行
                loader: 'eslint.loader'
            }, {
                // 以下配置只会生效一个
                oneOf: []

            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    mode: 'development'
}