import diff from './diff'

export default function render (
  virtualDOM,
  container,
  oldDOM = container.firstChild
) {
  console.log()
  diff(virtualDOM, container, oldDOM)
}
