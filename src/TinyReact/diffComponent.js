import mountElement from './mountElement'
import updateComponent from './updateComponent'

export default function diffComponent (virtualDOM, oldComponent, oldDOM, container) {
  if (isSameComponent(virtualDOM, oldComponent)) {
    console.log('same')
    updateComponent(virtualDOM, oldComponent, oldDOM, container)
  } else {
    console.log('not same')
    mountElement(virtualDOM, container, oldDOM)
  }
}

function isSameComponent (virtualDOM, oldComponent) {
  return oldComponent && virtualDOM.type === oldComponent.constructor
}
