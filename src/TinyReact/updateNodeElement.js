export default function updateNodeElement (
  newElement,
  virtualDOM,
  oldVirtualDOM = {}
) {
  const newProps = virtualDOM.props || {}
  const oldProps = oldVirtualDOM.props || {}
  Object.keys(newProps).forEach(propName => {
    const newPropValue = newProps[propName]
    const oldPropValue = oldProps[propName]
    if (newPropValue !== oldPropValue) {
      if (propName.startsWith('on')) {
        const eventName = propName.slice(2).toLowerCase()
        newElement.addEventListener(eventName, newProps[propName])
        // 删除原事件处理函数
        if (oldPropValue) {
          newElement.removeEventListener(eventName, oldPropValue)
        }
      } else if (['value', 'checked'].includes(propName)) {
        newElement[propName] = newPropValue
      } else if (propName === 'className') {
        newElement.setAttribute('class', newPropValue)
      } else if (propName !== 'children') {
        newElement.setAttribute(propName, newPropValue)
      }
    }
  })
  // 属性删除情况
  Object.keys(oldProps).forEach(propName => {
    const newPropValue = newProps[propName]
    const oldPropValue = oldProps[propName]
    if (!newPropValue) {
      if (propName.startsWith('on')) {
        const eventName = propName.toLowerCase.slice(2)
        newElement.removeEventListener(eventName, oldPropValue)
      } else if (propName !== 'children') {
        newElement.removeAttribute(propName)
      }
    }
  })
}