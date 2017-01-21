import constants from '../../../constants'
import findByKey from '../../../utils/findByKey'
import invariants from '../invariants'
import mergeMutable from '../../../utils/mergeMutable'

import { Config, ReducerName } from '../../../types'

var omit = require('lodash.omit')
var reducerName: ReducerName = 'deleteError'

export default function error(config: Config, current: Array<any>, record: any): Array<any> {
	invariants(config, current, record, reducerName)

	var key = config.key
	var deleteId = record[key]
	var deleteRecord = findByKey(current, key, deleteId)
	deleteRecord = omit(deleteRecord, 'deleted', 'busy')

	return mergeMutable(current, deleteRecord, key)
}
