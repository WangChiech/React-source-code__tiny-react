import mountElement from './mountElement'
import updateNodeElement from './updateNodeElement'

export default function createDOMElement (virtualDOM) {
  let newElement = null
  if (virtualDOM.type === 'text') {
    newElement = document.createTextNode(virtualDOM.props.textContent)
  } else {
    newElement = document.createElement(virtualDOM.type)
    updateNodeElement(newElement, virtualDOM)
  }
  // 递归创建子节点
  virtualDOM.children.forEach(item => {
    mountElement(item, newElement)
  })
  return newElement
}