import assertHasKey      from '../utils/assertHasKey'
import assertNotArray    from '../utils/assertNotArray'
import constants         from '../constants'
import makeScope         from '../utils/makeScope'
import wrapArray         from '../utils/wrapArray'

import { Config, ReducerName } from '../types'

export default function invariants(config: Config, current: any, record: any, reducerName: ReducerName, assertValidStore: (scope: string, current: any) => void) {
	if (!config.resourceName)     throw new Error('Expected config.resourceName')

	const scope = makeScope(config, reducerName)

	if (!config.key)              throw new Error(scope + ': Expected config.key')
	if (!record)                  throw new Error(scope + ': Expected record')

	assertValidStore(scope, current)
	assertNotArray(config, reducerName, record)
	assertHasKey(config, reducerName, record)
}
