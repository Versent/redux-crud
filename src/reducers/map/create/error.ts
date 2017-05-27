import constants from "../../../constants";
import invariants from "../invariants";
import store from "../store";

import {Config, InvariantsBaseArgs, Map, ReducerName} from "../../../types";

var reducerName: ReducerName = constants.REDUCER_NAMES.CREATE_ERROR;
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

  return store.remove(config, current, record);
}
