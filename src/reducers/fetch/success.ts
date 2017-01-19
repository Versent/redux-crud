import assertAllHaveKeys  from '../../utils/assertAllHaveKeys'
import constants          from '../../constants'
import makeScope          from '../../utils/makeScope'
import mergeMutable       from '../../utils/mergeMutable'
import wrapArray          from '../../utils/wrapArray'

const isArray            = require('lodash.isarray')

import { Config, ResourceCollection, ReducerName } from '../../types'

export default function success(config: Config, current: any, records: any): any {
  var reducerName: ReducerName = 'fetchSuccess'
  var scope = makeScope(config, reducerName)

  if (!config.key)              throw new Error(scope + ': Expected config.key');
  if (!isArray(current))        throw new Error(scope + ': Expected current to be an array');
  if (!records)                 throw new Error(scope + ': Expected records');

  // wrap array
  records = wrapArray(records);

  // All given records must have a key
  assertAllHaveKeys(config, reducerName, records);
  
  return mergeMutable(current, records, config.key);
}
