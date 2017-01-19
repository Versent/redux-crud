import common            from '../common'
import constants         from '../../constants'
import findByKey         from '../../utils/findByKey'
import mergeMutable      from '../../utils/mergeMutable'

const assign            = require('lodash.assign')

import { Config, ResourceCollection, ReducerName } from '../../types'

export default function start(config: Config, current: any, record: any): any {
  const reducerName: ReducerName = 'deleteStart'

  record = common(config, current, record, reducerName)

  var key = config.key
  var deleteId = record[key]
  var recordStatus = {
    deleted: true,
    busy:    true,
  };
  var deleteRecord = findByKey(current, key, deleteId)
  deleteRecord = assign({}, deleteRecord, recordStatus)

  return mergeMutable(current, deleteRecord, key)
}
