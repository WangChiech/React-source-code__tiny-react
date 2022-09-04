import createDOMElement from './createDOMElement'
import unmountNode from './unmountNode'

export default function mountNativeElement (virtualDOM, container, oldDOM) {
  let newElement = createDOMElement(virtualDOM)
  if (oldDOM) {
    container.insertBefore(newElement, oldDOM)
  } else {
    container.appendChild(newElement)
  }
  if (oldDOM) {
    unmountNode(oldDOM)
  }
  if (virtualDOM.comp) {
    virtualDOM.comp.setDOM(newElement)
  }
}