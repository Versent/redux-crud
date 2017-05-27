import makeScope from "../utils/makeScope";

import * as r from "ramda";

import {Config, ReducerName} from "../types";

export default function(config: Config, reducerName: ReducerName, record: any) {
  var scope = makeScope(config, reducerName);
  var isArray = r.is(Array, record);

  if (isArray)
    throw new TypeError(scope + ": Expected record not to be an array");
}
