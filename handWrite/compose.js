
function compose(...fns) {
    return function (args) {
        const res = fns.reduce((acc,cur)=>{
            return cur(acc)
        }, args)
        return res
    }
}

/**
 * 其实是一个两两合并的过程
 * 加入就有两个fns，fn1，fn2，那需要把fn2计算的值当作fn1的参数来执行fn1，所以就是acc(cur(args))
 * 然后再把acc(cur(args))当作acc，再去执行acc(cur(args))
 * 就和洋葱一样，fn1(fn2(fn3(1)))，一层层往外计算
 * @param  {...any} fns 
 * @returns 
 */
function compose (...fns) {
    if(!fns.length) return (args)=>args
    if(fns.length===1) return fns[0]
    return fns.reduce((acc, cur)=>{
        return (...args)=>{
            return acc(cur(...args))
        }
    })
}


// 用法如下:
function fn1(x) {
    return x + 1;
}
function fn2(x) {
    return x + 2;
}
function fn3(x) {
    return x + 3;
}
const a = compose(fn1, fn2, fn3);
console.log(a(1)); // 7
