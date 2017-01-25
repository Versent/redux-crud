import React          from 'react'
import actions        from './actions'
import bows           from 'bows'
import Icon           from 'react-fa'

const PT              = React.PropTypes
const log             = bows('todos--Form')

class Comp extends React.Component {

  constructor(props, ctx) {
    super(props, ctx)
    this.state = this.getCleanState(props)
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.getCleanState(nextProps))
  }

  getCleanState(props) {
    const todo = props.todo
    return {
      title: todo.title,
    }
  }

  onChange(event) {
    const { value } = event.target
    this.setState({
      title: value,
    })
  }

  onSave(event) {
    event.preventDefault()
    let todo = this.props.todo
    todo = todo.merge(this.state)

    this.props.onCommit(todo)
  }

  render() {
    return (
      <section>
        <form>
          <input
            type='text'
            value={this.state.title}
            onChange={this.onChange.bind(this)}
            className='field col-5' />&nbsp;
          <button type='submit' onClick={this.onSave.bind(this)} className='btn btn-outline'><Icon name='save' /></button>
        </form>
      </section>
    )
  }

}

Comp.propTypes = {
  dispatch: PT.func.isRequired,
  onCommit: PT.func.isRequired,
  todo: PT.object.isRequired,
}

export default Comp
