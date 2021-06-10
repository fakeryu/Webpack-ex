import '../css/index.css';
import {
  mul,
} from './test';

mul(2, 3);

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

// eslint-disable-next-line
console.log(sum(1, 2, 3, 4));

/*
 1.eslint不认识window、navigator全局变量
  解决：需要修改package中的eslintConfig配置
    "env": {
      "browser": true // 支持浏览器端全局变量
    }
  2.sw代码必须运行在服务器上
  -->nodejs
  --> npm i serve -g
  serve -s build 启动服务器，将build目录下所有资源作为静态资源暴露出去
*/
// 注册 serviceworker
// 处理兼容性问题
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(() => {
      // eslint-disable-next-line
      console.log('successW')
    }).catch(() => {
      // eslint-disable-next-line
      console.log('fail')
    });
  });
}
