import * as r from "ramda"

import invariants from "../invariants"
import constants         from "../../../constants"
import store from "../store"

import { Config, Map, ReducerName } from "../../../types"

var reducerName: ReducerName = constants.REDUCER_NAMES.DELETE_START

export default function start(config: Config, current: Map<any>, record: any): Map<any> {
	invariants(config, current, record, reducerName)

	var key = config.key
	var deleteId = record[key]
	var recordStatus = {
		deleted: true,
		busy:    true,
	}
	var deleteRecord = current[deleteId] 
	
	if (deleteRecord == null) {
		return current
	} else {
		deleteRecord = r.merge(deleteRecord, recordStatus)
		return store.merge(config, current, deleteRecord)
	}
}
