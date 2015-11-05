import React       from 'react'
import { connect } from 'react-redux'
import actions     from './actions'
import New         from './New.jsx'
import List        from './List.jsx'
const PT           = React.PropTypes

class Comp extends React.Component {

  componentDidMount() {
    this.fetchTodos()
  }

  get dispatch() {
    return this.props.dispatch
  }

  fetchTodos() {
    const action = actions.fetch()
    this.dispatch(action)
  }

  render() {
    return (
      <section className='p1'>
        <h2>Todos</h2>
        <New {...this.props} />
        <List {...this.props} />
      </section>
    )
  }
}

Comp.propTypes = {
  dispatch: PT.func.isRequired,
}

export default connect(state => state)(Comp);
