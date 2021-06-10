console.log('index加载')

// import {
//   mul
// } from './test'


document.getElementById('btn').onclick = function () {
  // 懒加载：需要使用才加载
  // 预加载，prefetch ：会在使用前提前加载js文件
  // 正常加载可以认识并行加载（同一时间加载多个文件） 
  // 预加载，prefetch：等其他资源加载完毕，浏览器空闲了，再偷偷加载资源
  import(/* webpackChunkName:'test',webpackPrefetch:true */'./test').then(({
    mul
  }) => {
    console.log(mul(4, 5))
  }).catch()

}