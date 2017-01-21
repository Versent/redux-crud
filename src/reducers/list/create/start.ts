import assertNotArray    from '../../../utils/assertNotArray'
import common            from '../common'
import constants         from '../../../constants'
import mergeMutable      from '../../../utils/mergeMutable'

const assign = require('lodash.assign')

import { Config, ReducerName } from '../../../types'

export default function start(config: Config, current: Array<any>, record: any): Array<any> {
	var reducerName: ReducerName = "createStart"
	assertNotArray(config, reducerName, record)

	record = common(config, current, record, reducerName)

	var recordStatus = {
		busy:          true,
		pendingCreate: true,
	}

	var newRecord = assign({}, record, recordStatus)

	// mark record as unsaved and busy
	return mergeMutable(current, newRecord, config.key)
}
