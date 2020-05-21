const obj = {};
const event = {
  /**
   * 注册事件
   */
  on: (type, handler) => {
    (obj[type] || (obj[type] = [])).push(handler);
  },
  /**
   * 触发事件
   */
  emit: (type) => {
    if (!obj[type]) {
      console.warn(`请先注册事件${type}`);
      return;
    }
    obj[type].forEach((cb) => cb());
  },
  off: (type, handler) => {
    if (!handler) {
      obj[type] = null;
      return;
    }
    obj[type] = obj[type].filter((cb) => cb !== handler);
  },
};
// const fn1 = () => {
//   console.log("我是新的点击事件");
// };
// event.on("$click", fn1);

// event.on("$click", () => {
//   console.log("我是新的点击事件2");
// });

// event.emit("$click");

// event.off("$click", fn1);
// event.emit("$click");
export default event;
