import assertNotArray    from '../../../utils/assertNotArray'
import common            from '../../common'
import constants         from '../../../constants'
import remove            from '../store/remove'

import { Config, ReducerName } from '../../../types'

export default function error(config: Config, current: Array<any>, record: any):  Array<any> {
	var reducerName: ReducerName = "createError"

	record = common(config, current, record, reducerName)

	return remove(config, current, record)
}
