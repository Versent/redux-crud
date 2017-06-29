import * as r from "ramda";

import constants from "../../../constants";
import invariants from "../invariants";

import {Config, InvariantsBaseArgs, Map, ReducerName} from "../../../types";

var reducerName: ReducerName = constants.REDUCER_NAMES.CREATE_SUCCESS;
var invariantArgs: InvariantsBaseArgs = {
  reducerName,
  canBeArray: false
};

export default function success(
  config: Config,
  current: Map<any>,
  addedRecord: any,
  clientGeneratedKey?: string
): Map<any> {
  invariants(invariantArgs, config, current, addedRecord);

  var key = config.key;
  var addedRecordKey: string = addedRecord[key];
  var addedRecordKeyLens = r.lensProp(addedRecordKey);
  var currentWithoutClientGeneratedKey = r.dissoc(clientGeneratedKey, current);

  return r.set(
    addedRecordKeyLens,
    addedRecord,
    currentWithoutClientGeneratedKey
  );
}
