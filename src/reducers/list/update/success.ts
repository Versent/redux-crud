import constants from "../../../constants"
import invariants from "../invariants"
import store from '../store'

import { Config, ReducerName } from "../../../types"

var reducerName: ReducerName = constants.REDUCER_NAMES.UPDATE_SUCCESS

export default function success(config: Config, current: Array<any>, record: any): Array<any> {
	invariants(config, current, record, reducerName)

	return store.merge(current, record, config.key)
}
