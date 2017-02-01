import * as r from "ramda"

import constants from '../../../constants'
import invariants from '../invariants'

import { Config, InvariantsBaseArgs, Map, ReducerName } from '../../../types'

var reducerName: ReducerName = constants.REDUCER_NAMES.CREATE_SUCCESS
var invariantArgs: InvariantsBaseArgs = {
	reducerName,
	canBeArray: false,
}

export default function success(config: Config, current: Map<any>, addedRecord: any, clientGenKey?: string): Map<any> {
	invariants(invariantArgs, config, current, addedRecord)

  var key = config.key
  var addedRecordKey = addedRecord[key]

  var addedRecordKeyLens = r.lensProp(addedRecordKey)
  var clientGenKeyLens = r.lensProp(clientGenKey)

  if (r.view(clientGenKeyLens, current)) {
    return r.set(addedRecordKeyLens, addedRecord, r.dissoc(clientGenKey, current))
  }

  return r.set(addedRecordKeyLens, addedRecord, current)
}
