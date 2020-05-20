/**
 * 代理 通过this.name 可以直接访问到对应的_data中的name
 * vm.name => vm._data.name
 * @param {*} target vm
 * @param {*} prop _data
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
