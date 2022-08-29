import createDOMElement from './createDOMElement'

export default function mountNativeElement (virtualDOM, container) {
  let newElement = createDOMElement(virtualDOM)
  container.appendChild(newElement)
  if (virtualDOM.comp) {
    virtualDOM.comp.setDOM(newElement)
  }
}