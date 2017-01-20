import constants from '../constants'
import makeScope from '../utils/makeScope'

import { Config, ReducerName } from '../types'

export default function assertHasKey(config: Config, reducerName: ReducerName, record: any): void {
	var key = config.key

	var scope = makeScope(config, reducerName)

	if (record[key] == null) {
		throw new Error(scope + ': Expected record to have .' + key)
	}
}
