let CompilerHelper = {
  toArray(likeArray) {
    return [].slice.call(likeArray);
  },
  isElementNode(node) {
    //nodeType: 节点的类型  1：元素节点  3：文本节点
    return node.nodeType === 1;
  },
  isTextNode(node) {
    return node.nodeType === 3;
  },
  isDirective(attrName) {
    return attrName.startsWith("v-");
  },
  isEventDirective(type) {
    return type.split(":")[0] === "on";
  },
};
