import assertValidStore from './assertValidStore'
import common from '../common'

import { Config, Map, ReducerName } from '../../types'

export default function commonMap(config: Config, current: Map<any>, record: any, reducerName: ReducerName) {
	return common(config, current, record, reducerName, assertValidStore)
}
