

let queue = []
const concurrency = 2
function run() {
    for(let i = 0; i < concurrency; i++) {
        next()
    }
}
function next() {
    const fn = queue.shift()
    if (typeof fn === 'function') {
        fn()
    }
}
function addTask(ms, fn) {
    const cb = typeof fn === 'function'? fn:()=>{console.log(fn)}
    queue.push(()=>{
        setTimeout(()=>{
            cb()
            next()
        },ms)
    })

}
// 题目描述:JS 实现一个带并发限制的异步调度器 Scheduler，保证同时运行的任务最多有两个
addTask(1000,"1");
addTask(500,"2");
addTask(300,"3");
addTask(400,"4");
run()
// 输出顺序是：2 3 1 4


// Reference:
// 作者：Big shark@LX
// 链接：https://juejin.cn/post/6968713283884974088
// 来源：掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
class Scheduler {
    constructor(limit) {
      this.queue = [];
      this.maxCount = limit;
      this.runCounts = 0;
    }
    add(time, order) {
      const promiseCreator = () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            console.log(order);
            resolve();
          }, time);
        });
      };
      this.queue.push(promiseCreator);
    }
    taskStart() {
      for (let i = 0; i < this.maxCount; i++) {
        this.request();
      }
    }
    request() {
      if (!this.queue || !this.queue.length || this.runCounts >= this.maxCount) {
        return;
      }
      this.runCounts++;
      this.queue
        .shift()()
        .then(() => {
          this.runCounts--;
          this.request();
        });
    }
}

//   const scheduler = new Scheduler(2);
//   const addTask = (time, order) => {
//     scheduler.add(time, order);
//   };
//   addTask(1000, "1");
//   addTask(500, "2");
//   addTask(300, "3");
//   addTask(400, "4");
//   scheduler.taskStart();