import assertAllHaveKeys from "../../../utils/assertAllHaveKeys";
import constants from "../../../constants";
import store from "../store";
import wrapArray from "../../../utils/wrapArray";
import invariants from "../invariants";

import {Config, InvariantsBaseArgs, ReducerName} from "../../../types";

const reducerName: ReducerName = constants.REDUCER_NAMES.FETCH_SUCCESS;
const invariantArgs: InvariantsBaseArgs = {
  reducerName,
  canBeArray: true
};

export default function success(
  config: Config,
  current: any[],
  records: any,
  emptyState: any,
  replace: boolean = false
): any[] {
  invariants(invariantArgs, config, current, records);

  // wrap array
  records = wrapArray(records);

  // All given records must have a key
  assertAllHaveKeys(config, reducerName, records);

  return store.merge(replace ? emptyState : current, records, config.key);
}
