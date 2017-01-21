import invariants            from '../invariants'
import constants         from '../../../constants'

const reject            = require('lodash.reject')

import { Config, ReducerName } from '../../../types'

var reducerName: ReducerName = 'deleteSuccess'

export default function success(config: Config, current: Array<any>, record: any): Array<any> {
	invariants(config, current, record, reducerName)

	var key = config.key
	var deleteId = record[key]

	function predicate(existingRecord) {
		return deleteId == existingRecord[key]
	}
	
	return reject(current, predicate)
}
