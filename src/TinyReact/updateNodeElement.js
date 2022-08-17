export default function updateNodeElement (newElement, virtualDOM) {
  const newProps = virtualDOM.props
  Object.keys(newProps).forEach(propName => {
    const newPropValue = newProps[propName]
    if (propName.startsWith('on')) {
      const eventName = propName.slice(2).toLowerCase()
      newElement.addEventListener(eventName, newProps[propName])
    } else if (['value', 'checked'].includes(propName)) {
      newElement[propName] = newPropValue
    } else if (propName === 'className') {
      newElement.setAttribute('class', newPropValue)
    } else if (propName !== 'children') {
      newElement.setAttribute(propName, newPropValue)
    }
  })
}