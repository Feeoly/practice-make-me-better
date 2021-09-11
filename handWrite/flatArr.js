// 实现一个方法使多维数组变成一维数组
function flatter(arr) {
    const res =[]
    function fn(arr) {
        arr.forEach(element => {
            if(!Array.isArray(element)) {
                res.push(element)
                return
            }
            fn(element)
        })
    }
    fn(arr)
    return res
}
// console.log(flatter([1, 2, [3]]));
console.log(flatter([1, 2, [1, [2, 3, [4, 5, [6]]]]]));

function flatter(arr) {
    let i = 0
    while(arr.some((item)=>Array.isArray(item))) {
        arr = [].concat(...arr)
    }
    return arr
}

function flatter(arr) {
    arr.reduce((acc, cur)=>{
        // Array.isArray(cur) ? [...pre, ...flatter(cur)] : [...pre, cur]
        if (Array.isArray(cur)) {
            return acc.push(...cur)
        } else {
            acc.push(cur)
        }
    }, [])
}

function uniqueArr(arr) {
    return [...new Set(arr)]
}