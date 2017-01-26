import reduxCrud from "../../../dist/index"
import bows from "bows"

var baseReducers = reduxCrud.List.reducersFor("todos")
var log = bows("todos-reducer")

export default function reducer(state=[], action) {
	log(action)

	switch (action.type) {
	default:
		return baseReducers(state, action)
	}
}
