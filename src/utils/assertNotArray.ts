import * as is from "ramda/src/is"

import makeScope from "../utils/makeScope";

import {Config, ReducerName} from "../types";

export default function(config: Config, reducerName: ReducerName, record: any) {
  var scope = makeScope(config, reducerName);
  var isArray = is(Array, record);

  if (isArray)
    throw new TypeError(scope + ": Expected record not to be an array");
}
