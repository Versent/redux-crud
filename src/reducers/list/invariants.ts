import invariants from "../invariants";
import store from "./store";

import {Config, InvariantsBaseArgs, ReducerName} from "../../types";

export default function invariantsList(
  invariantArgs: InvariantsBaseArgs,
  config: Config,
  current: Array<any>,
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
