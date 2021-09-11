class EventEmitter {
    constructor() {
        this.sub = new Map()
    }
    on(type, fn) {
        if (this.sub.has(type)) {
            this.sub.get(type).push(fn)
            return
        }
        this.sub.set(type, [fn])
    }

    emit(type, ...args) {
        const fns = this.sub.get(type)
        if (!Array.isArray(fns)) {
            return
        }
        fns.forEach((fn)=>{
            fn.call(this,...args)
        })
    }
    // call or apply
    // emit(type, ...rest) {
    //     this.events[type] &&
    //     this.events[type].forEach((fn) => fn.apply(this, rest));
    // }

    off(type, fn) {
        if(this.sub.has(type)){
            const fns = this.sub.get(type)
            const index = fns.indexOf(fn)
            fns.splice(index, 1)
        }
    }

    // 只执行一次
    once(type, fn) {
        function cb() {
            fn()
            this.off(type, cb)
        }
        this.on(type, cb)
    }
}
// 实现一个发布订阅模式拥有 on emit once off 方法
const event = new EventEmitter();

const handle = (...rest) => {
  console.log(rest);
};

event.on("click", handle);

event.emit("click", 1, 2, 3, 4);

event.off("click", handle);

event.emit("click", 1, 2);

event.once("dbClick", () => {
  console.log(123456);
});
event.emit("dbClick");
event.emit("dbClick");