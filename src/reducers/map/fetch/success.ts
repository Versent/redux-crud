import * as r from "ramda";

import assertAllHaveKeys from "../../../utils/assertAllHaveKeys";
import constants from "../../../constants";
import invariants from "../invariants";
import wrapArray from "../../../utils/wrapArray";

import {Config, InvariantsBaseArgs, Map, ReducerName} from "../../../types";

const reducerName: ReducerName = constants.REDUCER_NAMES.FETCH_SUCCESS;
const invariantArgs: InvariantsBaseArgs = {
  reducerName,
  canBeArray: true
};

export default function success(
  config: Config,
  current: Map<any>,
  records: any,
  emptyState: any,
  replace: boolean = false
): Map<any> {
  invariants(invariantArgs, config, current, records);

  // wrap array
  records = wrapArray(records);

  // All given records must have a key
  assertAllHaveKeys(config, reducerName, records);

  const merge = r.indexBy(r.prop(config.key), records);

  return r.merge(replace ? emptyState : current, merge);
}
