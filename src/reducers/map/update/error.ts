import * as r from "ramda";

import {prepareRecord} from "../../common/update/error";
import constants from "../../../constants";
import invariants from "../invariants";
import store from "../store";

import {Config, InvariantsBaseArgs, Map, ReducerName} from "../../../types";

var reducerName: ReducerName = constants.REDUCER_NAMES.UPDATE_ERROR;
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

  // We don"t want to rollback
  var key = config.key;
  var updatedId = record[key];
  var updatedRecord = current[updatedId];

  if (updatedRecord == null) return current;

  updatedRecord = prepareRecord(updatedRecord);

  return store.merge(config, current, updatedRecord);
}
