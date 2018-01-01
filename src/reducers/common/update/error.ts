import * as dissoc from "ramda/src/dissoc"
import constants from "../../../constants";

export function prepareRecord(record: Object) {
  return dissoc(constants.SPECIAL_KEYS.BUSY, record);
}
