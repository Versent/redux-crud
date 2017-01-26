// import bows from "bows"
import Icon from "react-fa"
import r from "ramda"
import React from "react"

const PT              = React.PropTypes
// const log             = bows("todos--Form")

class Form extends React.Component {

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
		var todo = r.merge(this.props.todo, this.state)
		this.props.onCommit(todo)
	}

	render() {
		return (
			<section>
				<form className="col col-12">
					<input
						type="text"
						value={this.state.title}
						onChange={this.onChange.bind(this)}
						className="input col col-6" 
					/>
					<div className="col col-6 pl2">
						<button type="submit" onClick={this.onSave.bind(this)} className="btn btn-outline">
							<Icon name="save" />
						</button>
					</div>
				</form>
			</section>
		)
	}

}

Form.propTypes = {
	dispatch: PT.func.isRequired,
	onCommit: PT.func.isRequired,
	todo: PT.object.isRequired,
}

export default Form
