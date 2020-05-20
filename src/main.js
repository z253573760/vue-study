import Vue from "../package/main";
const vm = new Vue({
  el: "#app",
  data: {
    name: "灿灿",
    age: 18,
    list: [1, 2, 3],
    a: {
      b: {
        c: {
          d: "我是一个层级很深的对象",
        },
      },
    },
  },
});
console.log(vm.a);
vm.a.b.c.d = "第1次改变";
// vm.a.b.c = { d: "第2次改变" };
// // console.log(vm._data);
// // console.log("push", vm._data.list.push(4));
// // console.log(vm._data.list);
// // console.log("pop", vm._data.list.pop(4));
// // console.log(vm._data.list);
// vm.list = 1;
