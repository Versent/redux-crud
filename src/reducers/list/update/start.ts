import invariants from '../invariants'
import mergeMutable      from '../../../utils/mergeMutable'
import constants         from '../../../constants'

import { Config, ReducerName } from '../../../types'

var assign = require('lodash.assign')
var reducerName: ReducerName = 'updateStart'

export default function start(config: Config, current: Array<any>, record: any): Array<any> {
	invariants(config, current, record, reducerName)

	// mark record as unsaved and busy
	var recordStatus = {
		busy:          true,
		pendingUpdate: true,
	}

	var newRecord = assign({}, record, recordStatus)

	// replace record
	return mergeMutable(current, newRecord, config.key)
}
