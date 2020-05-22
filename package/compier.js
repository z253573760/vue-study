const reg = /\{\{(.+?)\}\}/g;

/**
 * 解析嵌套的对象 例如{{ a.b.c.d }}
 * 考虑到这边 插值表达式是固定不变的 但是data是会经常变化的 先用一个高阶封装一下 把插值表达式缓存住
 * @param {Object} obj
 * @param {String} path {{ a.b.c.d }}
 */
function createGetValueByPath(path) {
  const list = path.split("."); // 切成数组 [ a, b, c, d ]
  return (obj) => {
    console.log("obj", obj);
    return list.reduce((pre, next) => pre[next.trim()], obj);
  };
}
/**
 * 递归 => 把vNode的插值表到式更换成对应的data数据
 * @param {vNode} vNode
 * @param {Object} data
 */
export function compier(vNode, vm) {
  if (vNode.tag === undefined) {
    // 文本类型的虚拟DOM 匹配插值表达式 替换成DATA中对应的值
    vNode.value = vNode.value.replace(reg, (_, key) => {
      return createGetValueByPath(key)(vm);
    });
  }
  // 循环递归遍历子节点的虚拟DOM
  for (const item of vNode.children) {
    compier(item, vm);
  }
}

export function compilerToFunction(template) {
  return function render() {
    //
  };
}
