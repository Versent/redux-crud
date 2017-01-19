import assertHasKey      from '../utils/assertHasKey'
import assertNotArray    from '../utils/assertNotArray'
import constants         from '../constants'
import makeScope         from '../utils/makeScope'
import wrapArray         from '../utils/wrapArray'

const isArray           = require('lodash.isarray')
const isObject          = require('lodash.isobject')

import { Config, ResourceCollection, ReducerName } from '../types'

export default function common(config: Config, current: any, record: any, reducerName: ReducerName) {
  if (!config.resourceName)     throw new Error('Expected config.resourceName')

  const scope = makeScope(config, reducerName)

  if (!config.key)              throw new Error(scope + ': Expected config.key')
  if (!record)                  throw new Error(scope + ': Expected record')

  if (config.store === constants.STORE_MAP) {
    if (!isObject(current)) throw new Error(scope + ': Expected current to be an object')
  } else {
    if (!isArray(current)) throw new Error(scope + ': Expected current to be an array')
  }

  assertNotArray(config, reducerName, record)
  assertHasKey(config, reducerName, record)

  return record
}
