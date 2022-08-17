import mountNativeElement from './mountNativeElement'
import isFunction from './isFunction'

export default function mountElement (virtualDOM, container) {
  //Component VS NativeElement
  if (isFunction(virtualDOM)) {
    console.log('aaa')
  } else {
    mountNativeElement(virtualDOM, container)
  }
}