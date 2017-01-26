import axios from "axios"
import AxiosMock from "axios-mock-adapter"
import r from "ramda"
import fixture from "./todos/fixture"

var mock = new AxiosMock(axios, { delayResponse: 500 })
var nextMockId = 100

export default function init() {
	mock.onGet("/todos").reply(200, fixture)

	mock.onPost("/todos").reply(function(config) {
		nextMockId++
		var record = JSON.parse(config.data)
		record = r.merge(record, {
			id: nextMockId
		})
		return [200, record]
	})

	mock.onPatch(/\/todos\/\d+/).reply(function(config) {
		return [200, config.data]
	})

	mock.onDelete(/\/todos\/\d+/).reply(200)
}
