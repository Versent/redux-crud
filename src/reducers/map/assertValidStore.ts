const isObject = require('lodash.isobject')

import { Map } from '../../types'

export default function assertValidStore(scope: string, current: Map<any>): void {
	if (!isObject(current)) throw new Error(scope + ': Expected current to be an object')
}
