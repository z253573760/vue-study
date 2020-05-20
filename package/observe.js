function isObject(obj) {
  return typeof obj === "object" && obj !== null;
}

/**
 * 循环对象的KEY 添加响应式
 * @param {Object} data
 */
export function observe(data) {
  Object.keys(data).forEach((key) => {
    // 循环每个KEY添加响应式
    let value = data[key];
    if (Array.isArray(value)) {
      //判断是否是一个数组 数组用AOP劫持 添加响应式
      defineRectiveOfArray(value);
    }
    if (isObject(value)) {
      //判断是否是一个对象; 递归添加响应式
      observe(value);
    }
    defineRective(data, key, value);
  });
}

/**
 * @param {Object} target 添加响应式的目标源
 * @param {String} key    添加响应式的目标key
 * @param {any}    value  添加响应式的目标value
 * @param { undefined | Boolean } enumerable  是否可以枚举
 */
function defineRective(target, key, value, enumerable) {
  Object.defineProperty(target, key, {
    enumerable: Boolean(enumerable), //是否可以枚举
    get() {
      return value;
    },
    set(newVal) {
      if (value === newVal) return;
      console.log("我被更新了");
      value = newVal;
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
/**
 * 给数组添加响应式
 * @param {Array} array
 */
function defineRectiveOfArray(array) {
  const arrayProto = Object.create(Array.prototype);
  ARRAY_METHODS.forEach((method) => {
    arrayProto[method] = (...args) => {
      console.log(`${method}方法被执行了`);
      return Array.prototype[method].call(array, ...args);
    };
  });
  array.__proto__ = arrayProto;

  for (const item of array) {
    isObject(item) && observe(item);
  }
}
