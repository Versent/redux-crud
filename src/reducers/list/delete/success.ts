import * as r from "ramda";

import invariants from "../invariants";
import constants from "../../../constants";

import {Config, InvariantsBaseArgs, ReducerName} from "../../../types";

var reducerName: ReducerName = constants.REDUCER_NAMES.DELETE_SUCCESS;
var invariantArgs: InvariantsBaseArgs = {
  reducerName,
  canBeArray: false
};

export default function success(
  config: Config,
  current: Array<any>,
  record: any
): Array<any> {
  invariants(invariantArgs, config, current, record);

  var key = config.key;
  var deleteId = record[key];

  function predicate(existingRecord) {
    return deleteId == existingRecord[key];
  }

  return r.reject(predicate, current);
}
