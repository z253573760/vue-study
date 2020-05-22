import { compier } from "./compier";
import { node2VNode, vNode2Node } from "./vnode";
import { initState } from "./state";
import Watcher from "./watcher";
export default function Vue(opts) {
  this._init(opts);

  // this.initData(this._data);
  // this.render();
}

Vue.prototype._init = function (options) {
  const vm = this;
  this.$options = options;
  // 初始化各个属性 data methods....
  initState(vm);
  // 开始挂载
  if (vm.$options.el) {
    vm.$mount(vm.$options.el);
  }
};

Vue.prototype.$mount = function (el) {
  // 优先级 render => template => el
  const vm = this;
  const options = vm.$options;
  el = vm.$el = document.querySelector(el);
  vm.$parent = vm.$el.parentNode;
  const updateComponent = () => {
    console.log(`我是渲染watcher的更新方法 --- updateComponent `);
    this.render();
  };
  new Watcher(vm, updateComponent);
};

/**
 * 将模板与数据结合 得到真实DOM元素
 */
Vue.prototype.compier = function () {
  const cloneNode = this.$el.cloneNode(true); // 先复制一份DOM再说
  const vNode = node2VNode(cloneNode);
  compier(vNode, this); // 编译模板 => 把虚拟DOM中的插值表达式替换成data中的数据
  this.update(vNode);
};

/**
 * 将模板和数据替换到HTML中
 */
Vue.prototype.render = function () {
  this.compier();
};

/**将虚拟DOM 元素更新到 DOM 中
 * @param {vNode} vNode
 */
Vue.prototype.update = function (vNode) {
  const realNode = vNode2Node(vNode);
  this.$parent.replaceChild(realNode, app); // 把app的dom节点替换掉
};
