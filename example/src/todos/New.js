import React          from "react"
import bows           from "bows"
import actions        from "./actions"
import Form           from "./Form"

var PT                = React.PropTypes
var log               = bows("todos--New")

class Comp extends React.Component {

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
		return (
			<section>
				<Form
					todo={this.state.todo}
					onCommit={this.onCommit.bind(this)} 
					/>
			</section>
		)
	}

}

Comp.propTypes = {
	dispatch: PT.func.isRequired,
}

export default Comp
