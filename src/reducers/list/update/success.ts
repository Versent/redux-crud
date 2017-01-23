import invariants        from '../invariants'
import constants         from '../../../constants'
import mergeMutable      from '../../../utils/mergeMutable'

import { Config, ReducerName } from '../../../types'

var reducerName: ReducerName = constants.REDUCER_NAMES.UPDATE_SUCCESS

export default function success(config: Config, current: Array<any>, record: any): Array<any> {
	invariants(config, current, record, reducerName)

	// replace record
	return mergeMutable(current, record, config.key)
}
