import * as is from "ramda/src/is"

import {Map} from "../../../types";

export default function assertValidStore(
  scope: string,
  current: Map<any>
): void {
  if (!is(Object, current))
    throw new Error(scope + ": Expected current to be an object");
}
