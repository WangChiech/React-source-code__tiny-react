import diff from './diff'

export default function render (virtualDOM, container, oldDOM) {
  console.log()
  diff(virtualDOM, container, oldDOM)
}
