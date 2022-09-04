import TinyReact from './TinyReact'

const virtualDOM = (
  <div className="container">
    <h1>你好 Tiny React</h1>
    <h2 data-test="test">hello ~~</h2>
    <div>嵌套1<div>嵌套1.1</div></div>
    <h3>(观察：这个会被改变)</h3>
    {2==1 && <div>如果2和1相等则渲染当前内容</div>}
    {2==2 && <div>2</div>}
    <span>这是一段内容</span>
    <button onClick={() => alert('hello')}>button</button>
    <h3>这个会被删除</h3>
    2,3
    <input type="text" value="13"/>
  </div>
)

const modifyDOM = (
  <div className="container">
    <h1>你好 Tiny React</h1>
    <h2 data-test="test-change">has changed</h2>
    <div>嵌套1<div>嵌套1.1</div></div>
    <h3>(观察：这个会被改变)</h3>
    {2==1 && <div>如果2和1相等则渲染当前内容</div>}
    {2==2 && <div>2</div>}
    <span>这是一段被修改过的内容</span>
    <button onClick={() => alert('hello，changed')}>button</button>
    {/* <h6>这个会被删除</h6> */}
    2,3
    <input type="text" value="13"/>
  </div>
)


// TinyReact.render(virtualDOM, document.querySelector('#root'))

// setTimeout(() => {
//   console.log('============')
//   TinyReact.render(modifyDOM, document.querySelector('#root'))
// }, 5000)

function Demo (props) {
  return <div>{props.title}<h1>hello </h1></div>
}
function Heart () {
  return <div>&hearts;</div>
}
// console.log(<Heart/>)
// TinyReact.render(<Demo title="demo-props-title"/>, document.querySelector('#root'))

class Alert extends TinyReact.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: 'default title'
    }
    this.handleChangeTitle = this.handleChangeTitle.bind(this)
  }
  render () {
    console.log('this.state', this.state)
    return (
      <div>
        <span>{this.state.title}</span>
        <div>{this.props.title}</div>
        <button onClick={this.handleChangeTitle}>改变title</button>
      </div>
    )
  }
  handleChangeTitle () {
    this.setState({ title: 'changed title' })
  }
  componentWillReceiveProps (nextProps) {
    console.log('componentWillReceiveProps')
  }
  componentWillUpdate (nextProps) {
    console.log('componentWillUpdate')
  }
  componentDidUpdate (prevProps) {
    console.log('componentDidUpdate')
  }
}

// TinyReact.render(<Alert title="class-props-title"/>, document.querySelector('#root'))

// setTimeout(() => {
//   TinyReact.render(<Alert title="class-props-title-update"/>, document.querySelector('#root'))
//   // TinyReact.render(<Demo title="this is demo component"/>, document.querySelector('#root'))
// }, 3000)


class DemoRef extends TinyReact.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  render () {
    return (
      <div>
        <input type="text" ref={input => (this.input = input)}/>
        <button onClick={this.handleClick}>button</button>
        <Alert ref={alert => {this.alert = alert}} title="alert title"/>
      </div>
    )
  }
  handleClick () {
    console.log(this.input.value)
    console.log(this.alert)
  }
  componentDidMount () {
    console.log('componentDidMount')
  }
  componentWillUnmount () {
    console.log('componentWillUnmount')
  }
}
// TinyReact.render(<DemoRef/>, document.querySelector('#root'))

class KeyDemo extends TinyReact.Component {
  constructor (props) {
    super(props)
    this.state = {
      persons: [
        { id: '1', name: '111111' },
        { id: '2', name: '222222' },
        { id: '3', name: '333333' }
      ],
      noKeyList: [
        { name: 1 },
        { name: 2 },
        { name: 3 }
      ]
    }
    this.handleAdd = this.handleAdd.bind(this)
  }
  render () {
    return (
      <div>
        <ul>
          {
            this.state.persons.map(person => (
              <li key={person.id}>
                {person.name}
                <DemoRef/>
              </li>
            ))
          }
          {
            this.state.noKeyList.map(item => (
              <li>{item.name}</li>
            ))
          }
        </ul>
        <button onClick={this.handleAdd}>button</button>
      </div>
    )
  }
  handleAdd () {
    const newState = JSON.parse(JSON.stringify(this.state))
    // newState.persons.push(newState.persons.shift())
    // newState.persons.splice(1, 0, { id: 8, name: '888888888'})
    newState.persons.pop()
    // newState.noKeyList.pop()
    this.setState(newState)
  }
}

TinyReact.render(<KeyDemo/>, document.querySelector('#root'))