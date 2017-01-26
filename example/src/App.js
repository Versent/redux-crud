// import loggerMiddleware from 'redux-logger'
import { Provider } from 'react-redux'
import * as redux from "redux"
import bows from "bows"
import initMocks from "./mocks"
import React from "react"
import thunkMiddleware from 'redux-thunk'

import todosReducer from './todos/reducer'
import TodosIndex from './todos/Index'

var log = bows("App")

log("App")

initMocks()

const allReducers = redux.combineReducers({
	todos: todosReducer,
})

const store = redux.createStore(
	allReducers,
	redux.compose(
		redux.applyMiddleware(thunkMiddleware)
	)
)

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<section className="container clearfix">
					<TodosIndex />
				</section>
			</Provider>
		)
	}
}

export default App
