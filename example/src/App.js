import { Provider } from 'react-redux'
import * as redux from "redux"
import bows from "bows"
import loggerMiddleware from 'redux-logger'
import React from "react"
import thunkMiddleware from 'redux-thunk'

import todosReducer from './todos/reducer'
import TodosIndex from './todos/Index'

const log = bows("App")

const finalCreateStore = redux.compose(
	redux.applyMiddleware(
		thunkMiddleware,
		loggerMiddleware
	)
)(redux.createStore)

const allReducers = redux.combineReducers({
	todos: todosReducer,
})

const store = finalCreateStore(allReducers)

class App extends React.Component {
	render() {
		return (
      <Provider store={store}>
        <section className="container clearfix">
          <TodosIndex />
        </section>
      </Provider>
		);
	}
}

export default App
