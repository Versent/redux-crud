import * as r from "ramda";

import {Config, Map} from "../../../types";

export default function remove(
  config: Config,
  current: Map<any>,
  record: any
): Map<any> {
  var key = config.key;
  var recordKey = record[key];

  return r.omit([recordKey], current);
}
