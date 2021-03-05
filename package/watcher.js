import { pushTarget, popTarget } from "./dep";

let id = 0;
class Watcher {
  constructor(vm, expOrFn, cb = () => {}) {
    id += 1;
    this.id = id;
    this.vm = vm;
    this.expOrFn = expOrFn;
    this.cb = cb;
    this.deps = [];
    this.depsId = new Set();
    if (typeof expOrFn === "function") {
      this.getter = expOrFn;
    }
    this.get(); // 默认调用自身的getter方法
  }
  get() {
    pushTarget(this); // Dep.target = watcher
    this.getter();
    popTarget(this);
  }

  update() {
    // 这边用一个异步队列 先把watcher放到一个队列里 然后
    //
    queueWatcher(this);
  }

  run() {
    this.get();
  }

  addDep(dep) {
    const id = dep.id;

    if (!this.depsId.has(id)) {
      //防止重复添加相同的dep
      this.depsId.add(id);
      this.deps.push(dep);
      dep.addSub(this);
    }
  }
}

let has = {};
let queue = [];
/**
 * 执行完队列内的所有watcher 然后清空缓存
 */
function flusqueue() {
  queue.forEach((watcher) => watcher.run());
  has = {};
  queue = [];
}
/**
 *
 * @param {Watcher} watcher
 */
export function queueWatcher(watcher) {
  const id = watcher.id;
  if (!has[id]) {
    has[id] = true;
    queue.push(watcher);
  }
  nextTick(flusqueue);
}

const callBacks = [];
/**
 * 放到异步队列中 然后再全部执行
 * 简单来说 就是利用 事件循环的机制 (微任务 宏任务)
 * this.name = "灿灿"
 * this.name = "灿灿2"
 * 触发了 setter  然后的一系列动作都属于是主线程
 * 主线程将 回调函数都放到一个队列中后
 * 主线程结束 进行异步队列的 执行
 * 再把所有的更新函数 执行
 *
 * @param {function} fn
 */
function nextTick(fn) {
  callBacks.push(fn);
  // Promise.resolve.then(flusCallBacks); // 兼容问题 用setTimeout替代
  //
  setTimeout(flusCallBacks, 0);
}
/**
 * 异步队列中的函数 全部执行
 */
function flusCallBacks() {
  callBacks.forEach((fn) => fn());
}

export default Watcher;
