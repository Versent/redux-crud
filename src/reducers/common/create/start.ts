import * as r from "ramda"

export function prepareRecord(record: Object) {
	var recordStatus = {
		busy:          true,
		pendingCreate: true,
	}

	return r.merge(record, recordStatus)
}
