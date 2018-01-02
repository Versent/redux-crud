import * as merge from "ramda/src/merge"
import constants from "../../../constants";

export function prepareRecord(record: Object) {
  var recordStatus = {
    [constants.SPECIAL_KEYS.DELETED]: true,
    [constants.SPECIAL_KEYS.BUSY]: true
  };

  return merge(record, recordStatus);
}
