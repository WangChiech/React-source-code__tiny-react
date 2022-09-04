export default function unmountNode (node) {
  // 获取节点的 virtualDOM 对象
  const virtualDOM = node._virtualDOM
  // 文本节点可以直接删除
  if (virtualDOM.type === 'text') {
    node.remove()
    return
  }
  // 判断节点是否是由组件生成
  const comp = virtualDOM.comp
  if (comp) {
    comp.componentWillUnmount()
  }
  // 判断节点属性是否有 ref 属性
  if (virtualDOM.props && virtualDOM.props.ref) {
    virtualDOM.props.ref(null)
  }
  // 判断节点的属性中是否有事件属性
  const propsKeys = Object.keys(virtualDOM.props || {})
  propsKeys.forEach(prop => {
    if (prop.startsWith('on')) {
      const eventName = prop.slice(2).toLowerCase()
      node.removeEventListener(eventName, virtualDOM.props[prop])
    }
  })
  // 判断如果有子节点，则递归删除
  if (node.childNodes.length) {
    for (let i = 0; i < node.childNodes.length; i++) {
      unmountNode(node.childNodes[i])
      i--
    }
  }
  node.remove()
}