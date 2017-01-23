import * as r from "ramda"

import assertNotArray from '../../../utils/assertNotArray'
import constants from '../../../constants'
import invariants from '../invariants'
import store from '../store'

import { Config, ReducerName } from '../../../types'

var reducerName: ReducerName = constants.REDUCER_NAMES.CREATE_START

export default function start(config: Config, current: Array<any>, record: any): Array<any> {
	assertNotArray(config, reducerName, record)
	invariants(config, current, record, reducerName)

	var recordStatus = {
		busy:          true,
		pendingCreate: true,
	}

	var newRecord = r.merge(record, recordStatus)

	// mark record as unsaved and busy
	return store.merge(current, newRecord, config.key)
}
