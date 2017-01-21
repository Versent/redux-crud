import common            from '../common'
import constants         from '../../../constants'

const reject            = require('lodash.reject')

import { Config, ReducerName } from '../../../types'

export default function success(config: Config, current: Array<any>, record: any): Array<any> {
	const reducerName: ReducerName = 'deleteSuccess'

	record = common(config, current, record, reducerName)

	var key = config.key
	var deleteId = record[key]

	function predicate(existingRecord) {
		return deleteId == existingRecord[key]
	}
	
	return reject(current, predicate)
}
