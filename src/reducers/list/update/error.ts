import * as r from "ramda";

import {prepareRecord} from "../../common/update/error";
import constants from "../../../constants";
import findByKey from "../../../utils/findByKey";
import invariants from "../invariants";
import store from "../store";

import {Config, InvariantsBaseArgs, ReducerName} from "../../../types";

var reducerName: ReducerName = constants.REDUCER_NAMES.UPDATE_ERROR;
var invariantArgs: InvariantsBaseArgs = {
  reducerName,
  canBeArray: false
};

export default function error(
  config: Config,
  current: Array<any>,
  record: any
): Array<any> {
  invariants(invariantArgs, config, current, record);

  // We don"t want to rollback
  var key = config.key;
  var updatedId = record[key];
  var updatedRecord = findByKey(current, key, updatedId);

  if (updatedRecord == null) return current;

  updatedRecord = prepareRecord(updatedRecord);

  return store.merge(current, updatedRecord, key);
}
