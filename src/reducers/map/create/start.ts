import * as r from "ramda"

import assertNotArray from "../../../utils/assertNotArray"
import constants from "../../../constants"
import invariants from "../invariants"
import store from "../store"

import { Config, InvariantsBaseArgs, Map, ReducerName } from "../../../types"

var reducerName: ReducerName = constants.REDUCER_NAMES.CREATE_START
var invariantArgs: InvariantsBaseArgs = {
	reducerName,
	canBeArray: false,
}

export default function start(config: Config, current: Map<any>, record: any): Map<any> {
	invariants(invariantArgs, config, current, record)

	var recordStatus = {
		busy:          true,
		pendingCreate: true,
	}

	var newRecord = r.merge(record, recordStatus)

	// mark record as unsaved and busy
	return store.merge(config, current, newRecord)
}
