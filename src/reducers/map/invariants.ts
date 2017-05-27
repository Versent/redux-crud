import invariants from "../invariants";
import store from "./store";

import {Config, InvariantsBaseArgs, Map, ReducerName} from "../../types";

export default function invariantsMap(
  invariantArgs: InvariantsBaseArgs,
  config: Config,
  current: Map<any>,
  record: any
) {
  var extra = {
    assertValidStore: store.assert,
    config,
    current,
    record
  };

  invariants(invariantArgs, extra);
}
