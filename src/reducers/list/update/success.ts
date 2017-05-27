import constants from "../../../constants";
import invariants from "../invariants";
import store from "../store";

import {Config, InvariantsBaseArgs, ReducerName} from "../../../types";

var reducerName: ReducerName = constants.REDUCER_NAMES.UPDATE_SUCCESS;
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

  return store.merge(current, record, config.key);
}
