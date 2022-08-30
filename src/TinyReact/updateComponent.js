import diff from './diff'

function updateComponent (virtualDOM, oldComponent, oldDOM, container) {
  oldComponent.componentWillReceiveProps(virtualDOM.props)
  if (oldComponent.shouldComponentUpdate(virtualDOM.props)) {
    let prevProps = oldComponent.props
    oldComponent.componentWillUpdate(virtualDOM.props)

    oldComponent.updateProps(virtualDOM.props)
    let nextVirtualDOM = oldComponent.render()
    nextVirtualDOM.comp = oldComponent
    diff(nextVirtualDOM, container, oldDOM)

    oldComponent.componentDidUpdate(prevProps)
  }
}

export default updateComponent