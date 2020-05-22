export function isObject(obj) {
  return typeof obj === "object" && obj !== null;
}

export function def(target, key, value) {
  Object.defineProperty(target, key, {
    configurable: false, //不可以被重新设置
    enumerable: false, // 不可以被枚举
    value,
  });
  //
}

/**
 * 代理 通过this.name 可以直接访问到对应的_data中的name
 * vm.name => vm._data.name
 * @param {*} target vm
 * @param {*} prop _data _mehtods _computed
 */
export function proxy(target, prop) {
  const obj = target[prop];
  Object.keys(obj).forEach((key) => {
    let value = obj[key];
    Object.defineProperty(target, key, {
      get() {
        return value;
      },
      set(newVal) {
        value = newVal;
      },
    });
  });
}
