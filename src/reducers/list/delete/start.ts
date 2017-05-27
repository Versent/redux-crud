import * as r from "ramda";

import {prepareRecord} from "../../common/delete/start";
import constants from "../../../constants";
import findByKey from "../../../utils/findByKey";
import invariants from "../invariants";
import store from "../store";

import {Config, InvariantsBaseArgs, ReducerName} from "../../../types";

var reducerName: ReducerName = constants.REDUCER_NAMES.DELETE_START;
var invariantArgs: InvariantsBaseArgs = {
  reducerName,
  canBeArray: false
};

export default function start(
  config: Config,
  current: Array<any>,
  record: any
): Array<any> {
  invariants(invariantArgs, config, current, record);

  var key = config.key;
  var deleteId = record[key];

  var deleteRecord = findByKey(current, key, deleteId);
  deleteRecord = prepareRecord(deleteRecord);

  return store.merge(current, deleteRecord, key);
}
