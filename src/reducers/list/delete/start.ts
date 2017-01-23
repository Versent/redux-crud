import * as r from "ramda"

import invariants from "../invariants"
import constants         from "../../../constants"
import findByKey         from "../../../utils/findByKey"
import store from "../store"

import { Config, ReducerName } from "../../../types"

var reducerName: ReducerName = constants.REDUCER_NAMES.DELETE_START

export default function start(config: Config, current: Array<any>, record: any): Array<any> {
	invariants(config, current, record, reducerName)

	var key = config.key
	var deleteId = record[key]
	var recordStatus = {
		deleted: true,
		busy:    true,
	}
	var deleteRecord = findByKey(current, key, deleteId)
	deleteRecord = r.merge(deleteRecord, recordStatus)

	return store.merge(current, deleteRecord, key)
}
