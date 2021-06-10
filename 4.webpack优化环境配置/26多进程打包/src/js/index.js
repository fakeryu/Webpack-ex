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
