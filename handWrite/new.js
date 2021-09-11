
// 手写 new 操作符实现
function new1(ctor, ...args) {
    const obj = Object.create(ctor.prototype)
    const res = ctor.call(obj, ...args)
    if (res && (Object.prototype.toString.call(res) === "[object Object]" || Object.prototype.toString.call(res) === "[object Function]")) {
        return res
    }
    return obj
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.say = function() {
  console.log(this.age);
};
let p1 = new1(Person, "z", 16);
console.log(p1);
p1.say();