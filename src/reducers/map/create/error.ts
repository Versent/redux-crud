import assertNotArray    from '../../../utils/assertNotArray'
import common            from '../common'
import constants         from '../../../constants'
import remove            from '../store/remove'

import { Config, Map, ReducerName } from '../../../types'

export default function error(config: Config, current: Map<any>, record: any):  Map<any> {
	var reducerName: ReducerName = constants.REDUCER_NAMES.CREATE_ERROR
	record = common(config, current, record, reducerName)
	return remove(config, current, record)
}
