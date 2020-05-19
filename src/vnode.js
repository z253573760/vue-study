// 1 <div> => { tag : "div" }

// 2  文本节点 => { tag : undefined , value : "文本节点" }

// 3 <div title="标题" class="类名"> =>
// {
//   tag: "div",
//   data: { title: "标题", class: "类名" },
// };

// 4  <div><div></div></div> =>
// {
//   tag: "div",
//   children: [{ tag: "div" }],
// };

class VNode {
  /**
   *
   * @param {String} tag
   * @param {Object} data
   * @param {String} value
   * @param {String} type
   */
  constructor(tag, data, value, type) {
    this.tag = tag.toLowerCase();
    this.value = value;
    this.data = data;
    this.type = type;
    this.children = [];
  }
  appendChild(vnode) {
    //
  }
}
/**
 * 递归把真实DOM转化成虚拟DOM
 * @param {DOMNode} realVNode
 *
 * @return {Object}
 */
export function node2VNode(node) {
  console.log("node", node);
  const nodeType = node.nodeType;
  let vnode = null;
  if (nodeType === 1) {
    //元素节点
    const attrs = node.attributes;
    console.log(attrs);
    const attrsObj = attrs.reduce((pre, next) => {
      pre[next.nodeName] = next.nodeValue;
    }, {});
    console.log(attrsObj);
    //
  } else if (nodeType === 3) {
    // 文本节点
  }
}
