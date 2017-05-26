import * as r from "ramda";

import {Map} from "../../../types";

export default function assertValidStore(
  scope: string,
  current: Map<any>
): void {
  if (!r.is(Object, current))
    throw new Error(scope + ": Expected current to be an object");
}
