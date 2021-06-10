// 引入样式文件
import './iconfont.css'
import print from './print.js'


print()

function add(x, y) {
    return x + y
}

console.log(add(1, 2));


// js的HMR
if (module.hot) {
    //module上一旦有module.hot为true,说明开启了HMR功能 -->让HMR功能代码生效
    module.hot.accept('./print.js', function () {
        //方法会监听print.js文件的变化,一旦变化,其他默认不会重新打包构建
        //会实行后面的回调函数
        print()
    })

}