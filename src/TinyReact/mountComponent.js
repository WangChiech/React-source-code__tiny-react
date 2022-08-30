import isFunctionComponent from './isFunctionComponent'
import mountNativeElement from './mountNativeElement'
import isFunction from './isFunction'

export default function mountComponent (virtualDOM, container, oldDOM) {
  let nextVirtualDOM = null
  // 判断是类组件还是函数组件
  if (isFunctionComponent(virtualDOM)) {
    nextVirtualDOM = buildFunctionComponent(virtualDOM)
  } else {
    nextVirtualDOM = buildClassComponent(virtualDOM)
  }
  if (isFunction(nextVirtualDOM)) {
    mountComponent(nextVirtualDOM, container, oldDOM)
  } else {
    mountNativeElement(nextVirtualDOM, container, oldDOM)
  }
}

function buildFunctionComponent (virtualDOM) {
  return virtualDOM.type(virtualDOM.props || {})
}

function buildClassComponent (virtualDOM) {
  const comp = new virtualDOM.type(virtualDOM.props)
  const nextVirtualDOM = comp.render()
  nextVirtualDOM.comp = comp
  return nextVirtualDOM
}
