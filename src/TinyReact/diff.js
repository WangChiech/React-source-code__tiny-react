import mountElement from './mountElement'
import updateTextNode from './updateTextNode'
import updateNodeElement from './updateNodeElement'
import createDOMElement from './createDOMElement'
import unmountNode from './unmountNode'
import diffComponent from './diffComponent'

export default function diff (virtualDOM, container, oldDOM) {
  const oldVirtualDOM = oldDOM && oldDOM._virtualDOM
  const oldComponent = oldVirtualDOM && oldVirtualDOM.comp
  //判断 oldDOM 是否存在
  if (!oldDOM) {
    mountElement(virtualDOM, container)
  } else if (oldVirtualDOM && virtualDOM.type === oldVirtualDOM.type) {
    if (virtualDOM.type === 'text') {
      // 更新文本内容
      updateTextNode(virtualDOM, oldVirtualDOM, oldDOM)
    } else {
      // 更新元素节点属性
      updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM)
    }

    virtualDOM.children.forEach((child, i) => {
      diff(child, oldDOM, oldDOM.childNodes[i])
    })

    // 删除节点(默认子节点类型属性皆相同)
    const virtualdomChildrenLen = virtualDOM.children.length
    const oldVirtualdomChildrenLen = oldVirtualDOM.children.length
    if (oldVirtualdomChildrenLen > virtualdomChildrenLen) {
      for (let i = oldVirtualdomChildrenLen;  i > virtualdomChildrenLen; i--) {
        unmountNode(oldDOM.childNodes[i - 1])
      }
    }
  } else if (
    oldVirtualDOM &&
    virtualDOM.type !== oldVirtualDOM.type &&
    typeof virtualDOM.type !== 'function'
  ) {
    const newElement = createDOMElement(virtualDOM)
    container.replaceChild(newElement, oldDOM)
  } else if (typeof virtualDOM.type === 'function') {
    diffComponent(virtualDOM, oldComponent, oldDOM, container)
  }
}