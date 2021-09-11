
// 题目描述:setinterval 用来实现循环定时调用 可能会存在一定的问题 能用 settimeout 解决吗
function setInterval1(cb, ms) {
    let timer = null
    const loop = ()=>{
        return timer = setTimeout(() => {
            cb()
            loop()
        }, ms);
    }
    loop()
    return {
        timer,
        clear: function () {
            clearTimeout(timer)
        }
    }
}

let a = setInterval1(()=>{
  console.log('setInterval1');
}, 1000)


setTimeout(()=>{
    a.clear()
}, 4000)

// let b=setInterval1(() => {
//   console.log(222)
// }, 1000)


// 我们能反过来使用 setinterval 模拟实现 settimeout 吗？
function setTimeout1(cb, ms){
    let timer = null
    timer = setInterval(()=>{
        clearInterval(timer)
        cb()
    }, ms)
}

setTimeout1(()=>{
  console.log('setTimeout1');
},2000)