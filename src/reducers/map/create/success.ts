import * as r from "ramda"

import constants from '../../../constants'
import invariants from '../invariants'

import { Config, InvariantsBaseArgs, Map, ReducerName } from '../../../types'

var reducerName: ReducerName = constants.REDUCER_NAMES.CREATE_SUCCESS
var invariantArgs: InvariantsBaseArgs = {
	reducerName,
	canBeArray: false,
}

export default function success(config: Config, current: Map<any>, addedRecord: any, clientGenKey?: string): Map<any> {
	invariants(invariantArgs, config, current, addedRecord)

	var key = config.key
	var done = false
	var addedRecordKey = addedRecord[key]

	// Update existing records
	var updatedCollection = r.map((existingRecord) => {
		var recordKey = existingRecord[key]
		if (recordKey == null) throw new Error('Expected record to have ' + key)
		var isSameKey = recordKey === addedRecordKey
		var isSameClientGetKey = (clientGenKey != null && clientGenKey === recordKey)
		if (isSameKey || isSameClientGetKey) {
			done = true
			return addedRecord
		} else {
			return existingRecord
		}
	})(current)

	// Add if not updated
	if (!done) {
		var merge = {
			[addedRecordKey]: addedRecord
		}
		updatedCollection = r.merge(updatedCollection, merge)
	}

	return updatedCollection
}
