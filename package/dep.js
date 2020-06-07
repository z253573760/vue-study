let id = 0;
class Dep {
  constructor() {
    this.id = id++;
    this.subs = [];
  }
  addSub(sub) {
    this.subs.push(sub);
  }
  notify() {
    this.subs.forEach((sub) => sub.update());
  }
  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }
}

Dep.target = null;
const stack = []; // 存watcher
export function pushTarget(watcher) {
  Dep.target = watcher;
  stack.push(watcher);
}
export function popTarget() {
  stack.pop();
  Dep.target = stack[stack.length - 1];
}
export default Dep;
