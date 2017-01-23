import * as r from "ramda"

import invariants from "../invariants"
import constants from "../../../constants"
import findByKey from "../../../utils/findByKey"
import store from "../store"

import { Config, ReducerName } from "../../../types"

var reducerName: ReducerName = constants.REDUCER_NAMES.UPDATE_ERROR

export default function error(config: Config, current: Array<any>, record: any): Array<any> {
	invariants(config, current, record, reducerName)

	// We don"t want to rollback
	var key = config.key
	var updatedId = record[key]
	var updatedRecord = findByKey(current, key, updatedId)

	if (updatedRecord) {
		updatedRecord = r.omit(["busy"], updatedRecord)
		return store.merge(current, updatedRecord, key)
	} else {
		return current
	}
}
