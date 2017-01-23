import * as r from "ramda"

import assertNotArray from '../../../utils/assertNotArray'
import constants from '../../../constants'
import invariants from '../invariants'
import store from '../store'

import { Config, Map, ReducerName } from '../../../types'

var reducerName: ReducerName = constants.REDUCER_NAMES.CREATE_START

export default function start(config: Config, current: Map<any>, record: any): Map<any> {
	assertNotArray(config, reducerName, record)
	invariants(config, current, record, reducerName)

	var recordStatus = {
		busy:          true,
		pendingCreate: true,
	}

	var newRecord = r.merge(record, recordStatus)

	// mark record as unsaved and busy
	return store.replace(config, current, newRecord)
}
