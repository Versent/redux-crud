import common            from '../../common'
import mergeMutable      from '../../../utils/mergeMutable'
import constants         from '../../../constants'

const assign = require('lodash.assign')

import { Config, ReducerName } from '../../../types'

export default function start(config: Config, current: Array<any>, record: any): Array<any> {
	var reducerName: ReducerName = 'updateStart'

	record = common(config, current, record, reducerName)

	// mark record as unsaved and busy
	var recordStatus = {
		busy:          true,
		pendingUpdate: true,
	}

	var newRecord = assign({}, record, recordStatus)

	// replace record
	return mergeMutable(current, newRecord, config.key)
}
