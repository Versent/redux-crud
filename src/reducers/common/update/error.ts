import * as r from "ramda"

export function prepareRecord(record: Object) {
	return r.omit(["busy"], record)
}
