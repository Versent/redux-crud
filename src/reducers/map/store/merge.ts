import * as merge from "ramda/src/merge"

import {Config, Map} from "../../../types";

/*
Adds or replace one record
*/
export default function replace(
  config: Config,
  current: Map<any>,
  record: any
): Map<any> {
  var key = config.key;
  var recordKey = record[key];

  return merge(current, {[recordKey]: record});
}
