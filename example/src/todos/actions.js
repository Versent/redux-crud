import axios from "axios"
import AxiosMock from 'axios-mock-adapter'
import bows from "bows"
import cuid from "cuid"
import r from "ramda"
import reduxCrud from "../../../dist/index"
import fixture from './fixture'

var baseActionCreators = reduxCrud.actionCreatorsFor("todos")
var log = bows("todos--actions")
var mock = new AxiosMock(axios, { delayResponse: 500 })

mock.onGet('/todos').reply(200, fixture)

let actionCreators = {

	fetch() {
		log("fetch")
		return function(dispatch, getState) {

			const action = baseActionCreators.fetchStart()
			dispatch(action)

			// send the request
			const url = "/todos"
			const promise = axios({
				url: url,
			})

			promise.then(function(response) {
					log("success", response)
					// dispatch the success action
					const returned = response.data
					const successAction = baseActionCreators.fetchSuccess(returned)
					dispatch(successAction)
				}, function(response) {
					log("rejection", response)
					// rejection
					// dispatch the error action
					const errorAction = baseActionCreators.fetchError(response)
					dispatch(errorAction)
				}).catch(function(err) {
					console.error(err.toString())
				})

			return promise
		}
	},

	create(todo) {
		return function(dispatch) {
			const cid = cuid()
			todo = r.merge(todo, {id: cid})

			const optimisticAction = baseActionCreators.createStart(todo)
			dispatch(optimisticAction)

			const url = "/todos"
			const promise = axios({
				url: url,
				method: "POST",
				data: todo,
			})

			promise.then(function(response) {
					// dispatch the success action
					const returned = response.data
					const successAction = baseActionCreators.createSuccess(returned, cid)
					dispatch(successAction)
				}, function(response) {
					// rejection
					// dispatch the error action
					const errorAction = baseActionCreators.createError(response, todo)
					dispatch(errorAction)
				}).catch(function(err) {
					console.error(err.toString())
				})

			return promise

		}
	},

	update(todo) {
		return function(dispatch) {
			const optimisticAction = baseActionCreators.updateStart(todo)
			dispatch(optimisticAction)

			const url = `/todos/${todo.id}`
			const promise = axios({
				url: url,
				method: "PATCH",
				data: todo,
			})

			promise.then(function(response) {
					// dispatch the success action
					const returned = response.data
					const successAction = baseActionCreators.updateSuccess(returned)
					dispatch(successAction)
				}, function(response) {
					// rejection
					// dispatch the error action
					const errorAction = baseActionCreators.updateError(response, todo)
					dispatch(errorAction)
				}).catch(function(err) {
					console.error(err.toString())
				})

			return promise

		}
	},

	delete(todo) {
		return function(dispatch) {
			const optimisticAction = baseActionCreators.deleteStart(todo)
			dispatch(optimisticAction)

			const url = `/todos/${todo.id}`
			const promise = axios({
				url: url,
				method: "DELETE",
			})

			promise.then(function(response) {
					// dispatch the success action
					const successAction = baseActionCreators.deleteSuccess(todo)
					dispatch(successAction)
				}, function(response) {
					// rejection
					// dispatch the error action
					const errorAction = baseActionCreators.deleteError(response, todo)
					dispatch(errorAction)
				}).catch(function(err) {
					console.error(err.toString())
				})

			return promise
		}
	},

}

actionCreators = r.merge(baseActionCreators, actionCreators)

export default actionCreators
