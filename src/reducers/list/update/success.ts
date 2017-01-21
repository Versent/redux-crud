import common            from '../common'
import constants         from '../../../constants'
import mergeMutable      from '../../../utils/mergeMutable'

import { Config, ReducerName } from '../../../types'

export default function success(config: Config, current: Array<any>, record: any): Array<any> {
	let reducerName: ReducerName = 'updateSuccess'

	record = common(config, current, record, reducerName)

	// replace record
	return mergeMutable(current, record, config.key)
}
