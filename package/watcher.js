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
 * @param {function} fn
 */
function nextTick(fn) {
  callBacks.push(fn);
  // Promise.resolve.then(flusCallBacks); // 兼容问题 用setTimeout替代
  setTimeout(flusCallBacks, 0);
}
/**
 * 异步队列中的函数全部执行
 */
function flusCallBacks() {
  callBacks.forEach((fn) => fn());
}

export default Watcher;
