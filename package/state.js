import { proxy } from "./utils";
import { observe } from "./observe";
/**
 * 初始化各种状态
 * @param {Object}  vm Vue的实例
 */
export function initState(vm) {
  if (vm.$options.props) {
    initProps(vm);
  }
  if (vm.$options.data) {
    initData(vm);
  }
  if (vm.methods) {
    initMethods(vm);
  }
  if (vm.computed) {
    initComputed(vm);
  }
  if (vm.watch) {
    initWatch(vm);
  }
}

function initProps() {}

function initData(vm) {
  let data = vm.$options.data;
  //判断是否是函数
  data = vm._data = typeof data === "function" ? data.call(vm) : data;
  proxy(vm, "_data");
  observe(data);
}

function initMethods() {
  //
}

function initComputed() {
  //
}

function initWatch() {
  //
}
