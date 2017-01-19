import common            from '../common'
import constants         from '../../constants'
import mergeMutable      from '../../utils/mergeMutable'

import { Config, ResourceCollection, ReducerName } from '../../types'

export default function success(config: Config, current: any, record: any): any {
  let reducerName: ReducerName = 'updateSuccess'

  record = common(config, current, record, reducerName)

  // replace record
  return mergeMutable(current, record, config.key)
}
