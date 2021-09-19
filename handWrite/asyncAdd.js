
function mySerialSum(...args) {
    return new Promise((resolve, reject)=>{
        let sum = 0
        function asyncShift() {
            return new Promise(resolve=>{
                const a = args.shift()
                resolve(a)
            })
        }
        async function wrapper() {
            while(args.length) {
                const val = await asyncShift()
                console.log('val,args-',val,args)
                sum += val 
            }
            resolve(sum)
        }
        wrapper()
    })
}

function promiseAdd(a,b) {
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve(a+b)
        },100)
    })
}

function serialSum(...args) {
    return args.reduce((acc,cur)=>{
        console.log('acc,cur', acc,cur)
        return acc.then((res)=>{
            console.log('res', res)
            return promiseAdd(res, cur)
        })
    }, Promise.resolve(0))
}

async function parallelSum(...args) {
    function calc(arr) {
        const res = []
        function group() {
            const a = arr.shift() || 0
            const b = arr.shift() || 0
            return promiseAdd(a, b)
        }
        while(arr.length) {
            res.push(group())
        }
        console.log('res-',res)
        return res
    }
    while(args.length > 1) {
        args = await Promise.all(calc(args))
    }
    // let data = await Promise.all(calc(args))
    // console.log('data',data)
    // while(data.length>1) {
    //     data = await Promise.all(calc(data))
    // }
    // return data[0]
    return args[0]
}

async function parallelSum(...args) {
    if (args.length === 1) return args[0]
    const tasks = []
    for (let i = 0; i < args.length; i += 2) {
      tasks.push(promiseAdd(args[i], args[i + 1] || 0))
    }
    const results = await Promise.all(tasks)
    return parallelSum(...results)
}
//   作者：homyeeking
//   链接：https://juejin.cn/post/6844904199017218055
//   来源：掘金
//   著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

(async () => {
    console.log('Running...');
    const res0 = await mySerialSum(1, 2, 3, 4, 5, 8, 9, 10, 11, 12)
    console.log(res0)
    const res1 = await serialSum(1, 2, 3, 4, 5, 8, 9, 10, 11, 12)
    console.log(res1)
    const res2 = await parallelSum(1, 2, 3, 4, 5, 8, 9, 10, 11, 12)
    console.log(res2)
    console.log('Done');
})()