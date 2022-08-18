import isFunctionComponent from './isFunctionComponent'
export default function mountComponent (virtualDOM, container) {
  // 判断是类组件还是函数组件
  if (isFunctionComponent(virtualDOM)) {
    console.log('888888888888')
  }
}