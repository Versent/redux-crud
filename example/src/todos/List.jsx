import React          from 'react'
import { connect }    from 'react-redux'
import actions        from './actions'
import Icon           from 'react-fa'
import bows           from 'bows'

const PT              = React.PropTypes
const baseClass       = 'todos--List'
const log             = bows(baseClass)

class Comp extends React.Component {

  get dispatch() {
    return this.props.dispatch
  }

  onEdit(todo, event) {
    event.preventDefault()
    this.history.pushState(null, '/users/' + todo.id + '/edit')
  }

  onDelete(todo, event) {
    event.preventDefault()
    const action = actions.delete(todo)
    this.dispatch(action)
  }

  onRename() {
    const action = actions.renameAll()
    this.dispatch(action)
  }

  onShuffleName() {
    const action = actions.shuffleName()
    this.dispatch(action)
  }

  renderTodos() {
    return _.map(this.props.todos, (todo) => {
      return (
        <tr>
          <td>
            {todo.title}
          </td>
          <td>
            <a className='btn regular blue'
              href='javascript://'
              onClick={this.onEdit.bind(this, todo)}><Icon name='pencil' /></a>
            <a className='btn regular blue'
              href='javascript://'
              onClick={this.onDelete.bind(this, todo)}><Icon name='trash' /></a>
          </td>
        </tr>
      )
    })
  }

  render() {
    return (
      <section className=''>
        <table className='table-light'>
          <thead>
            <tr>
              <th>Title</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.renderTodos()}
          </tbody>
        </table>
        <button
          className='btn'
          onClick={this.onRename.bind(this)}>Rename all Users</button>
      </section>
    )
  }
}

Comp.propTypes = {
  todos: PT.array.isRequired,
  dispatch: PT.func.isRequired,
}

export default Comp
