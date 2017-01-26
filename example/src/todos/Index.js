import { connect } from "react-redux"
import actions     from "./actions"
import invariant from "invariant"
import List        from "./List"
import New         from "./New"
import React       from "react"

const PT           = React.PropTypes

class Index extends React.Component {

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
		var props = this.props

		invariant(props.dispatch, "Required dispatch")
		invariant(props.todos, "Required todos")

		return (
			<section className="p1">
				<h2>Todos</h2>
				<New dispatch={props.dispatch} />
				<List 
					dispatch={props.dispatch} 
					todos={props.todos}
					/>
			</section>
		)
	}
}

Index.propTypes = {
	dispatch: PT.func.isRequired,
}

export default connect(state => state)(Index)
