import assertNotArray    from '../../utils/assertNotArray'
import common            from '../common'
import constants         from '../../constants'
import mergeMutable      from '../../utils/mergeMutable'

const assign = require('lodash.assign')

import { Config, ResourceCollection, ReducerName } from '../../types'

export default function start(config: Config, current: any, record: any) {
  var reducerName: ReducerName = "createStart"
  assertNotArray(config, reducerName, record)

  record = common(config, current, record, reducerName)

  var recordStatus = {
    busy:          true,
    pendingCreate: true,
  };

  var newRecord = assign({}, record, recordStatus)

  // mark record as unsaved and busy
  return mergeMutable(current, newRecord, config.key)
}
