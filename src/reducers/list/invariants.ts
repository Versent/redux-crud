import assertValidStore from './assertValidStore'
import invariants from '../invariants'

import { Config, Map, ReducerName } from '../../types'

export default function invariantsList(config: Config, current: Map<any>, record: any, reducerName: ReducerName) {
	invariants(config, current, record, reducerName, assertValidStore)
}
