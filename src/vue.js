import { compier } from "./compier";
import { node2VNode } from "./vnode";
export default function Vue(opts) {
  this.$options = opts;
  this.$el = document.querySelector(opts.el);
  this._parent = this.$el.parentNode;
  this._data = opts.data;
  this.render();
}

/**
 * 将模板与数据结合 得到真实DOM元素
 */
Vue.prototype.compier = function () {
  const cloneNode = this.$el.cloneNode(true); // 先复制一份DOM再说
  compier(cloneNode, this._data); // 编译模板 => 把模板中的插值表达式替换成data中的数据
  node2VNode(cloneNode);
  this.update(cloneNode);
};

/**
 * 将模板和数据替换到HTML中
 */
Vue.prototype.render = function () {
  this.compier();
};

/**将DOM 元素更新到 DOM 中
 * @param {DomNode} node
 */
Vue.prototype.update = function (node) {
  this._parent.replaceChild(node, app); // 把app的dom节点替换掉
};
