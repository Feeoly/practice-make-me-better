// 题目描述:手写 call apply bind 实现
// func.call(this, 1,2,3)
// func.apply(this, [1,2,3])
// func.bind(this, 123)
Function.prototype.advancedCall = function(context, ...args) {
    if (!context) {
        context = window
    }
    // 注意Symbol
    const fn = Symbol()
    context[fn] = this
    return context[fn](...args)
}

Function.prototype.myCall=function() {
    // 利于v8优化
    let args = [...arguments]
    const context = args.shift()
    context.func = this
    context.func(...args)
    delete context.func
}

Function.prototype.myApply = function() {
    let args = [...arguments]
    const context = args[0]
    context.func = this
    context.func(...args[1])
    delete context.func
}

Function.prototype.myBind = function(context, ...initArgs) {
    const fn = Symbol()
    context[fn] = this
    const func =  function (...args) {
        context[fn].call(context, ...[...initArgs,...args])
    }
    return func
}

Function.prototype.advancedBind = function(context, ...initArgs) {
    const fn = Symbol()
    context[fn] = this
    const _this = this
    const result = function(...args) {
        // 第一种情况 :若是将 bind 绑定之后的函数当作构造函数，通过 new 操作符使用，则不绑定传入的 this，而是将 this 指向实例化出来的对象
        // 此时由于new操作符作用  this指向result实例对象  而result又继承自传入的_this 根据原型链知识可得出以下结论
        // this.__proto__ === result.prototype   //this instanceof result =>true
        // this.__proto__.__proto__ === result.prototype.__proto__ === _this.prototype; //this instanceof _this =>true
        if (this instanceof _this) {
            this[fn] = _this
            this[fn](...[...initArgs,...args])
            delete this[fn]
        } else {
            context[fn](...[...initArgs,...args])
            delete context[fn]
        }
    }
    result.prototype = Object.create(this.prototype)
    return result
}

// 作者：Big shark@LX
// 链接：https://juejin.cn/post/6968713283884974088
// 来源：掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

function Person(name, age) {
  console.log(name); //'我是参数传进来的name'
  console.log(age); //'我是参数传进来的age'
  console.log(this); //构造函数this指向实例对象
}
// 构造函数原型的方法
Person.prototype.say = function() {
  console.log(123);
}

let obj = {
  objName: '我是obj传进来的name',
  objAge: '我是obj传进来的age'
}
function normalFun(name, age) {
  console.log(name);   //'我是参数传进来的name'
  console.log(age);   //'我是参数传进来的age'
  console.log(this); //普通函数this指向绑定bind的第一个参数 也就是例子中的obj
  console.log(this.objName); //'我是obj传进来的name'
  console.log(this.objAge); //'我是obj传进来的age'
}
// console.log(normalFun.myCall(obj, 1,2))
// console.log(normalFun.myApply(obj, [3,4]))
// const fn = normalFun.myBind(obj,5)
// console.log(fn(6))

// 先测试作为构造函数调用
let bindFun = Person.advancedBind(obj, '我是参数传进来的name')
let a = new bindFun('我是参数传进来的age')
a.say() //123

// 再测试作为普通函数调用
let bindFun1 = normalFun.advancedBind(obj, '我是参数传进来的name1')
console.log(bindFun1.prototype) // normalFun
bindFun1('我是参数传进来的age1')