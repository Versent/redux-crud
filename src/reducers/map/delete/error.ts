import * as r from "ramda";

import constants from "../../../constants";
import findByKey from "../../../utils/findByKey";
import invariants from "../invariants";
import store from "../store";

import {Config, InvariantsBaseArgs, Map, ReducerName} from "../../../types";

var reducerName: ReducerName = constants.REDUCER_NAMES.DELETE_ERROR;
var invariantArgs: InvariantsBaseArgs = {
  reducerName,
  canBeArray: false
};

export default function error(
  config: Config,
  current: Map<any>,
  record: any
): Map<any> {
  invariants(invariantArgs, config, current, record);

  var key = config.key;
  var deleteId = record[key];

  // Find the record
  var deleteRecord = current[deleteId];

  if (deleteRecord == null) {
    return current;
  } else {
    // Remove deleted and busy
    deleteRecord = r.omit(["deleted", "busy"], deleteRecord);

    return r.merge(current, {[deleteId]: deleteRecord});
  }
}
