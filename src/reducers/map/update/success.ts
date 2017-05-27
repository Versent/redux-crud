import constants from "../../../constants";
import invariants from "../invariants";
import store from "../store";

import {Config, InvariantsBaseArgs, Map, ReducerName} from "../../../types";

var reducerName: ReducerName = constants.REDUCER_NAMES.UPDATE_SUCCESS;
var invariantArgs: InvariantsBaseArgs = {
  reducerName,
  canBeArray: false
};

export default function success(
  config: Config,
  current: Map<any>,
  record: any
): Map<any> {
  invariants(invariantArgs, config, current, record);

  return store.merge(config, current, record);
}
