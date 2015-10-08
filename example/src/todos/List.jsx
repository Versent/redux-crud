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

  onShow(user, event) {
    event.preventDefault()
    this.history.pushState(null, '/users/' + user.id)
  }

  onEdit(user, event) {
    event.preventDefault()
    this.history.pushState(null, '/users/' + user.id + '/edit')
  }

  onDelete(user, event) {
    event.preventDefault()
    const action = actions.delete(user)
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

  renderUsers() {
    return _.map(this.props.users, (user) => {
      return (
        <tr>
          <td>
            {user.attributes.name}
          </td>
          <td></td>
          <td>
            <a className='btn regular blue'
              href='javascript://'
              onClick={this.onShow.bind(this, user)}><Icon name='eye' /></a>
            <a className='btn regular blue'
              href='javascript://'
              onClick={this.onEdit.bind(this, user)}><Icon name='pencil' /></a>
            <a className='btn regular blue'
              href='javascript://'
              onClick={this.onDelete.bind(this, user)}><Icon name='trash' /></a>
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
              <th>Name</th>
              <th>Langs</th>
            <th></th>
            </tr>
          </thead>
          <tbody>
            {this.renderUsers()}
          </tbody>
        </table>
        <button
          className='btn'
          onClick={this.onRename.bind(this)}>Rename all Users</button>
        <button
          className='btn'
          onClick={this.onShuffleName.bind(this)}>Shuffle all</button>
      </section>
    )
  }
}

Comp.propTypes = {
  todos: PT.array.isRequired,
  dispatch: PT.func.isRequired,
}

export default Comp
