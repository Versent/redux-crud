// import bows from "bows"
import actions from "./actions"
import Icon from "react-fa"
import invariant from "invariant"
import r from "ramda"
import React from "react"

var PT = React.PropTypes
var baseClass = "todos-List"
// var log = bows(baseClass)

class List extends React.Component {

	onToggle(todo, done, event) {
		event.preventDefault()
		todo = r.merge(todo, {done})
		const action = actions.update(todo)
		this.props.dispatch(action)
	}

	onDelete(todo, event) {
		event.preventDefault()
		const action = actions.delete(todo)
		this.props.dispatch(action)
	}

	onRename() {
		const action = actions.renameAll()
		this.props.dispatch(action)
	}

	onShuffleName() {
		const action = actions.shuffleName()
		this.props.dispatch(action)
	}

	renderCheck(todo) {
		if (todo.done) {
			return (
				<a className="btn regular blue"
					href="javascript://"
					onClick={this.onToggle.bind(this, todo, false)}
					>
					<Icon name="check-square-o" />
				</a>
			)
		} else {
			return (
				<a className="btn regular blue"
					href="javascript://"
					onClick={this.onToggle.bind(this, todo, true)}
					>
					<Icon name="square-o" />
				</a>
			)
		}
	}

	renderTodos() {
		return this.props.todos.map(todo => {
			return (
				<tr key={todo.id}>
					<td>
						{todo.title}
					</td>
					<td>
						{this.renderCheck(todo)}
						<a className="btn regular blue"
							href="javascript://"
							onClick={this.onDelete.bind(this, todo)}><Icon name="trash" /></a>
					</td>
				</tr>
			)
		})
	}

	render() {
		var props = this.props

		invariant(props.todos, "Required todos")
		invariant(props.dispatch, "Required dispatch")

		return (
			<section className="">
				<table className="table-light">
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
			</section>
		)
	}
}

List.propTypes = {
	todos: PT.array.isRequired,
	dispatch: PT.func.isRequired,
}

export default List
