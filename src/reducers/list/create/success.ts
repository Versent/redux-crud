import * as r from "ramda"
import constants from '../../../constants'
import invariants from '../invariants'

import { Config, InvariantsBaseArgs, ReducerName } from '../../../types'

var reducerName: ReducerName = constants.REDUCER_NAMES.CREATE_SUCCESS
var invariantArgs: InvariantsBaseArgs = {
	reducerName,
	canBeArray: false,
}

export default function success(config: Config, current: Array<any>, addedRecord: any, clientGenKey?: string): Array<any> {
	invariants(invariantArgs, config, current, addedRecord)

	var key = config.key
	var done = false

	// Keep the clientGenKey if provided
	addedRecord = r.merge(addedRecord, {
		[constants.SPECIAL_KEYS.CLIENT_GENERATED_ID]: clientGenKey,
	})

	// Update existing records
	var updatedCollection = current.map(function (record) {
		var recordKey = record[key]
		if (recordKey == null) throw new Error('Expected record to have ' + key)
		var isSameKey = recordKey === addedRecord[key]
		var isSameClientGetKey = (clientGenKey != null && clientGenKey === recordKey)
		if (isSameKey || isSameClientGetKey) {
			done = true
			return addedRecord
		} else {
			return record
		}
	})

	// Add if not updated
	if (!done) {
		updatedCollection = updatedCollection.concat([addedRecord])
	}

	return updatedCollection
}
