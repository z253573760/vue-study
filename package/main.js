import { compier } from "./compier";
import { node2VNode, vNode2Node } from "./vnode";
import { observe } from "./observe";
import { proxy } from "./proxy";
import $event from "./event";
export default function Vue(opts) {
  this.$options = opts;
  this.$el = document.querySelector(opts.el);
  this.$parent = this.$el.parentNode;
  this._data = opts.data || Object.create({});
  this.initData(this._data);
  this.render();
}

/**
 * 将模板与数据结合 得到真实DOM元素
 */
Vue.prototype.compier = function () {
  const cloneNode = this.$el.cloneNode(true); // 先复制一份DOM再说
  const vNode = node2VNode(cloneNode);
  compier(vNode, this._data); // 编译模板 => 把虚拟DOM中的插值表达式替换成data中的数据
  this.update(vNode);
};

/**
 * 将模板和数据替换到HTML中
 */
Vue.prototype.render = function () {
  this.compier();
};

/**将DOM 元素更新到 DOM 中
 * @param {vNode} vNode
 */
Vue.prototype.update = function (vNode) {
  const realNode = vNode2Node(vNode);
  this.$parent.replaceChild(realNode, app); // 把app的dom节点替换掉
};

Vue.prototype.mount = function () {
  this.render = this.createRenderFn();
  this.mountedComponent();
};

Vue.prototype.mountedComponent = function () {
  const mount = () => {
    this.update(this.render());
  };
  mount();
};

Vue.prototype.initData = function (data) {
  proxy(this, "_data");
  observe(data);
};

/**
 * 生成render函数 同时缓存虚拟DOM
 */
Vue.prototype.createRenderFn = function () {
  //
};
