class QueueNode {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
}

// 带双指针的queue
class Queue {
    constructor() {
        this.first = null
        this.last = null
        this.size = 0
    }

    enqueue(value) {
        const node = new QueueNode(value)
        if (this.size === 0) {
            this.first = this.last = node
        } else {
            this.last.next = node
            this.last = node
        }
        this.size++
        return this
    }

    dequeue() {
        // 边界
        if (this.size == 0) {
            return false
        }
        let dequeueNode = this.first
        const newFirst = this.first.next
        if (!newFirst) {
            this.last = newFirst
        }
        this.first = newFirst
        dequeueNode.next = null
        this.size--
        return dequeueNode
    }
}

let queue = new Queue()
queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)
queue.enqueue(4)
queue.dequeue()
console.log(queue)