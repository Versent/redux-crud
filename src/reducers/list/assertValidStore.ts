var isArray = require('lodash.isarray')

export default function assertValidStore(scope: string, current: Array<any>): void {
	if (!isArray(current)) throw new Error(scope + ': Expected current to be an array')
}
