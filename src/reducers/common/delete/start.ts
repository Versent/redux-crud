import * as r from "ramda";
import constants from "../../../constants";

export function prepareRecord(record: Object) {
  var recordStatus = {
    [constants.SPECIAL_KEYS.DELETED]: true,
    [constants.SPECIAL_KEYS.BUSY]: true
  };

  return r.merge(record, recordStatus);
}
