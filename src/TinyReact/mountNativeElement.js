import createDOMElement from './createDOMElement'
import unmountNode from './unmountNode'

export default function mountNativeElement (virtualDOM, container, oldDOM) {
  let newElement = createDOMElement(virtualDOM)
  if (oldDOM) {
    unmountNode(oldDOM)
  }
  container.appendChild(newElement)
  if (virtualDOM.comp) {
    virtualDOM.comp.setDOM(newElement)
  }
}