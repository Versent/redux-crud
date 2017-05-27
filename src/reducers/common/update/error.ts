import * as r from "ramda";
import constants from "../../../constants";

export function prepareRecord(record: Object) {
  return r.dissoc(constants.SPECIAL_KEYS.BUSY, record);
}
