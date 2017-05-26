import * as r from "ramda";

import {prepareRecord} from "../../common/update/start";
import constants from "../../../constants";
import invariants from "../invariants";
import store from "../store";

import {Config, InvariantsBaseArgs, ReducerName} from "../../../types";

var reducerName: ReducerName = constants.REDUCER_NAMES.UPDATE_START;
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

  // mark record as unsaved and busy
  var newRecord = prepareRecord(record);

  // replace record
  return store.merge(current, newRecord, config.key);
}
