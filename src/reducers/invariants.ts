import assertHasKey from "./invariants/assertHasKey";
import assertNotArray from "../utils/assertNotArray";
import constants from "../constants";
import makeScope from "../utils/makeScope";
import wrapArray from "../utils/wrapArray";

import {
  Config,
  InvariantsBaseArgs,
  InvariantsExtraArgs,
  ReducerName
} from "../types";

export default function invariants(
  baseArgs: InvariantsBaseArgs,
  extraArgs: InvariantsExtraArgs
) {
  var config = extraArgs.config;

  if (!config.resourceName) throw new Error("Expected config.resourceName");

  const scope = makeScope(config, baseArgs.reducerName);

  if (!config.key) throw new Error(scope + ": Expected config.key");
  if (!extraArgs.record) throw new Error(scope + ": Expected record/s");

  extraArgs.assertValidStore(scope, extraArgs.current);

  if (!baseArgs.canBeArray) {
    assertNotArray(extraArgs.config, baseArgs.reducerName, extraArgs.record);
  }

  assertHasKey(extraArgs.config, scope, extraArgs.record);
}
