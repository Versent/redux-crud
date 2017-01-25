import React          from 'react'
import SI             from 'seamless-immutable'
import bows           from 'bows'
import actions        from './actions'
import Form           from './Form.jsx'

const PT              = React.PropTypes
const log             = bows('todos--New')

class Comp extends React.Component {

  constructor(props, ctx) {
    super(props, ctx)
    this.state = this.getCleanState()
  }

  getCleanState() {
    return {
      todo: SI({
        title: '',
      }),
    }
  }

  onCommit(todo) {
    const action = actions.create(todo)
    const dispatch = this.props.dispatch
    dispatch(action)
    this.setState(this.getCleanState())
  }

  render() {
    return (
      <section>
        <Form
          {...this.props}
          todo={this.state.todo}
          onCommit={this.onCommit.bind(this)} />
      </section>
    )
  }

}

Comp.propTypes = {
  dispatch: PT.func.isRequired,
}

export default Comp
