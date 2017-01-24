import * as r from "ramda"

export function prepareRecord(record: Object) {
	var recordStatus = {
		deleted: true,
		busy:    true,
	}

	return r.merge(record, recordStatus)
}
