import assertNotArray from '../../../utils/assertNotArray'
import constants from '../../../constants'
import invariants from '../invariants'
import remove from '../store/remove'

import { Config, ReducerName } from '../../../types'

var reducerName: ReducerName = constants.REDUCER_NAMES.CREATE_ERROR

export default function error(config: Config, current: Array<any>, record: any):  Array<any> {
	invariants(config, current, record, reducerName)

	return remove(config, current, record)
}
