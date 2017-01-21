import constants from '../../../constants'
import invariants from '../invariants'

import { Config, ReducerName } from '../../../types'

var reducerName: ReducerName = "createSuccess"

export default function success(config: Config, current: Array<any>, addedRecord: any, clientGenKey?: string): Array<any> {
	invariants(config, current, addedRecord, reducerName)

	var key = config.key
	var done = false

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
