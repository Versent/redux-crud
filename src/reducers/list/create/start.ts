import * as r from "ramda";

import {prepareRecord} from "../../common/create/start";
import constants from "../../../constants";
import invariants from "../invariants";
import store from "../store";

import {Config, InvariantsBaseArgs, ReducerName} from "../../../types";

var reducerName: ReducerName = constants.REDUCER_NAMES.CREATE_START;
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

  return store.merge(current, newRecord, config.key);
}
