import * as dissoc from "ramda/src/dissoc"
import * as lensProp from "ramda/src/lensProp"
import * as set from "ramda/src/set"

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
  var addedRecordKeyLens = lensProp(addedRecordKey);
  var currentWithoutClientGeneratedKey = dissoc(clientGeneratedKey, current);

  return set(
    addedRecordKeyLens,
    addedRecord,
    currentWithoutClientGeneratedKey
  );
}
