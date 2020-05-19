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
   * @param {String} tag
   * @param {Object} data
   * @param {String} value
   * @param {String} type
   */
  constructor(tag, data, value, type) {
    this.tag = tag && tag.toLowerCase();
    this.value = value;
    this.data = data;
    this.type = type;
    this.children = [];
  }
  appendChild(vnode) {
    this.children.push(vnode);
  }
}
/**
 * 递归把真实DOM转化成虚拟DOM
 * @param {DOMNode} realNode
 *
 * @return {VNode}
 */
export function node2VNode(node) {
  const nodeType = node.nodeType;
  let vnode = null;
  if (nodeType === 1) {
    //元素节点 => vnode
    const attrs = node.attributes;
    const attrsObj = [...attrs].reduce((pre, next) => {
      pre[next.nodeName] = next.nodeValue;
      return pre;
    }, {});
    vnode = new VNode(node.nodeName, attrsObj, undefined, nodeType);
    const childNodes = node.childNodes;
    // 循环子节点 递归 并添加到父VNode中
    childNodes.forEach((element) => {
      vnode.appendChild(node2VNode(element));
    });
  } else if (nodeType === 3) {
    //文本节点 => vnode
    vnode = new VNode(undefined, undefined, node.nodeValue, nodeType);
  }
  return vnode;
}
/**
 * 递归把虚拟DOM转化成真实DOM
 * @param {VNode}
 *
 * @return {DOMNode} realNode
 */
export function vNode2Node(vNode) {
  if (vNode.type === 3) {
    return document.createTextNode(vNode.value);
  } else if (vNode.type === 1) {
    const node = document.createElement(vNode.tag);
    const attrObj = vNode.data;
    Object.keys(attrObj).forEach((key) => {
      node.setAttribute(key, attrObj[key]);
    });
    const children = vNode.children;
    children.forEach((childVNode) => {
      node.appendChild(vNode2Node(childVNode));
    });
    return node;
  }
}
