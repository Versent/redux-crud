import assertNotArray from "../../../utils/assertNotArray";
import constants from "../../../constants";
import invariants from "../invariants";
import remove from "../store/remove";

import {Config, InvariantsBaseArgs, ReducerName} from "../../../types";

var reducerName: ReducerName = constants.REDUCER_NAMES.CREATE_ERROR;
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

  return remove(config, current, record);
}
