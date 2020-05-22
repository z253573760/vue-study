import Dep from "./dep";

import { isObject, def } from "./utils";

/**
 * 循环对象的KEY 添加响应式
 * @param {Object} data
 */
export function observe(data) {
  if (!isObject(data)) return;
  if (data.__ob__) return data.__ob__;
  return new Observer(data);
}

/**
 * @param {Object} target 添加响应式的目标源
 * @param {String} key    添加响应式的目标key
 * @param {any}    value  添加响应式的目标value
 * @param { undefined | Boolean } enumerable  是否可以枚举
 */
function defineRective(target, key, value, enumerable) {
  const dep = new Dep();
  const childObj = observe(value); //
  Object.defineProperty(target, key, {
    enumerable: Boolean(enumerable), //是否可以枚举
    get() {
      // 去收集依赖了
      dep.depend();
      if (childObj) {
        //数组收集当前渲染的watcher依赖
        childObj.dep.depend();
      }
      return value;
    },
    set(newVal) {
      if (value === newVal) return;
      console.log("出发了setter ：我被更新了");
      // 判断新赋的值 是否是一个复合类型
      if (Array.isArray(newVal)) {
        //判断是否是一个数组 数组用AOP劫持 添加响应式
        observeArray(newVal);
      }
      // if (isObject(newVal)) {
      //   //判断是否是一个对象; 递归添加响应式
      //   observe(newVal);
      // }
      observe(newVal);
      value = newVal;
      dep.notify();
    },
  });
}

const ARRAY_METHODS = [
  "push",
  "pop",
  "shift",
  "unshift",
  "reverse",
  "sort",
  "splice",
];

// 这边给是给数组添加响应式
const arrayProto = Object.create(Array.prototype);
ARRAY_METHODS.forEach((method) => {
  arrayProto[method] = function (...args) {
    let inserted = null; //当前用户插入的新数据
    console.log(`数组的${method}方法被执行了`);
    const res = Array.prototype[method].call(this, ...args);
    console.log("this", this);
    if (method === "push") {
      inserted = args;
    } else if (method === "splice") {
      inserted = args;
    } else if ("splice") {
      inserted = args.slice(2);
    }
    if (inserted) {
      //如果插入了新的数据 这边给新数据添加响应式
      observeArray(inserted);
    }
    this.__ob__.dep.notify();
    return res;
  };
});
/**
 * 给数组添加响应式
 * @param {Array} array
 */
function observeArray(array) {
  array.__proto__ = arrayProto;
  for (const item of array) {
    isObject(item) && observe(item);
  }
}

export default class Observer {
  constructor(value) {
    this.value = value;
    //数组专用的dep
    this.dep = new Dep();

    // 每个被添加响应式的数据 都添加一个__ob__的属性
    // 1.这个__ob__属性是不可被枚举的
    // 2.这个__ob__属性是不可以被重新设置
    def(value, "__ob__", this);
    this.walk(value);
  }
  walk(data) {
    Object.keys(data).forEach((key) => {
      // 循环每个KEY添加响应式
      let value = data[key];
      if (Array.isArray(value)) {
        //判断是否是一个数组 数组用AOP劫持 添加响应式
        observeArray(value);
      }
      if (isObject(value)) {
        //判断是否是一个对象; 递归添加响应式
        observe(value);
      }
      defineRective(data, key, value);
    });
  }
}
