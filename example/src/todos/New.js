import actions        from "./actions"
// import bows           from "bows"
import Form           from "./Form"
import invariant      from "invariant"
import React          from "react"

var PT                = React.PropTypes
// var log               = bows("todos-New")

class New extends React.Component {

	constructor(props, ctx) {
		super(props, ctx)
		this.state = this.getCleanState()
	}

	getCleanState() {
		return {
			todo: {
				title: "",
			},
		}
	}

	onCommit(todo) {
		const action = actions.create(todo)
		const dispatch = this.props.dispatch
		dispatch(action)
		this.setState(this.getCleanState())
	}

	render() {
		var { props, state } = this

		invariant(props.dispatch, "Required dispatch")

		return (
			<section>
				<Form
					dispatch={props.dispatch}
					todo={state.todo}
					onCommit={this.onCommit.bind(this)}
					/>
			</section>
		)
	}

}

New.propTypes = {
	dispatch: PT.func.isRequired,
}

export default New
