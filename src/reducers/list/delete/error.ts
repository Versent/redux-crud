import * as r from "ramda"

import constants from '../../../constants'
import findByKey from '../../../utils/findByKey'
import invariants from '../invariants'
import store from '../store'

import { Config, ReducerName } from '../../../types'

var reducerName: ReducerName = constants.REDUCER_NAMES.DELETE_ERROR

export default function error(config: Config, current: Array<any>, record: any): Array<any> {
	invariants(config, current, record, reducerName)

	var key = config.key
	var deleteId = record[key]
	var deleteRecord = findByKey(current, key, deleteId)
	deleteRecord = r.omit(['deleted', 'busy'], deleteRecord)

	return store.merge(current, deleteRecord, key)
}
