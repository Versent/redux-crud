import * as r from "ramda";

import {prepareRecord} from "../../common/delete/start";
import invariants from "../invariants";
import constants from "../../../constants";
import store from "../store";

import {Config, InvariantsBaseArgs, Map, ReducerName} from "../../../types";

var reducerName: ReducerName = constants.REDUCER_NAMES.DELETE_START;
var invariantArgs: InvariantsBaseArgs = {
  reducerName,
  canBeArray: false
};

export default function start(
  config: Config,
  current: Map<any>,
  record: any
): Map<any> {
  invariants(invariantArgs, config, current, record);

  var key = config.key;
  var deleteId = record[key];
  var deleteRecord = current[deleteId];

  if (deleteRecord == null) {
    return current;
  } else {
    deleteRecord = prepareRecord(deleteRecord);

    return store.merge(config, current, deleteRecord);
  }
}
