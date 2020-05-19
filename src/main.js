import Vue from "../package/main";
new Vue({
  el: "#app",
  data: {
    name: "灿灿",
    age: 18,
    a: {
      b: {
        c: {
          d: "我是一个层级很深的对象",
        },
      },
    },
  },
});
