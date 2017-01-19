import assertNotArray    from '../../utils/assertNotArray'
import common            from '../common'
import constants         from '../../constants'
import removeFromList    from '../../stores/list/remove'
import removeFromMap     from '../../stores/map/remove'

import { Config, ResourceCollection, ReducerName } from '../../types'

export default function error(config: Config, current: ResourceCollection, addedRecord: any) {
  var reducerName: ReducerName = "createError"

  assertNotArray(config, reducerName, addedRecord)

  addedRecord = common(config, current, addedRecord, reducerName)

  if (config.store === constants.STORE_MAP) {
    return removeFromMap(config, current, addedRecord)
  } else {
    return removeFromList(config, current, addedRecord)
  }
}
