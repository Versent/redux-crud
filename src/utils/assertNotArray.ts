import makeScope from '../utils/makeScope'

const isArray = require('lodash.isarray');

import { Config, ReducerName } from '../types'

export default function(config: Config, reducerName: ReducerName, record: any) {
  const scope = makeScope(config, reducerName)

  if (isArray(record)) throw new TypeError(scope + ': Expected record not to be an array')
}
