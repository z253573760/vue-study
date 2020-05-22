import { pushTarget, popTarget } from "./dep";

let id = 0;
class Watcher {
  constructor(vm, expOrFn, cb = () => {}) {
    this.id = id++;
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
    this.get();
  }

  addDep(dep) {
    const id = dep.id;
    if (!this.depsId.has(id)) {
      this.depsId.add(id);
      this.deps.push(dep);
      dep.addSub(this);
    }
  }
}

export default Watcher;
