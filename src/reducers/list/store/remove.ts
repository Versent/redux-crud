import * as r from "ramda";

import {Config} from "../../../types";

export default function remove(
  config: Config,
  current: Array<any>,
  addedRecord: any
): Array<any> {
  var key = config.key;

  function predicate(record: any) {
    var recordKey = record[key];
    var isSameKey = addedRecord[key] === recordKey;
    return isSameKey;
  }

  return r.reject(predicate, current);
}
