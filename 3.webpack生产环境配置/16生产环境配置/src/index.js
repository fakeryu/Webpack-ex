import './index.css'

// import '@babel/polyfill'

// 下一行eslint所有规则都失效（下一行不进行eslint检查）
// eslint-disable-next-line
console.log('hello webpack')

const a = 2

const b = (x, y) => {
    return x + y
}

new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('666')
        resolve()
    }, 1000);
})