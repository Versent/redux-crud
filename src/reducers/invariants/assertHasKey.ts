import * as forEach from "ramda/src/forEach"

import constants from "../../constants";
import wrapArray from "../../utils/wrapArray";

import {Config, ReducerName} from "../../types";

export default function assertHasKey(
  config: Config,
  scope: string,
  recordOrRecords: any
): void {
  var key = config.key;
  var records = wrapArray(recordOrRecords);

  forEach(function(record) {
    if (record[key] == null) {
      throw new Error(scope + ": Expected record to have ." + key);
    }
  })(records);
}
