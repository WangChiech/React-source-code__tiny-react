import diff from './diff'
export default class Component {
  constructor (props) {
    this.props = props || {}
  }
  setState (state) {
    this.state = Object.assign({}, this.state, state)
    // 获取最新要渲染的 virtualDOM 对象
    const virtualDOM = this.render()
    // 获取旧的 virtualDOM 进行比对
    const oldDOM = this.getDOM()
    diff(virtualDOM, oldDOM.parentNode,  oldDOM)
  }
  setDOM (dom) {
    this._dom = dom
  }
  getDOM () {
    return this._dom
  }
  updateProps (props) {
    this.props = props
  }
  // 生命周期函数
  componentWillMount () {}
  componentDidMount () {}
  componentWillReceiveProps (nextProps) {}
  shouldComponentUpdate (nextProps, nextState) {
    return nextProps != this.props || nextState != this.state
  }
  componentWillUpdate (nextProps, nextState) {}
  componentDidUpdate (prevProps, prevState) {}
  componentWillUnmount () {}
}