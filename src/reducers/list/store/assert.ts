import * as r from "ramda";

export default function assert(scope: string, current: Array<any>): void {
  var isArray = r.is(Array, current);
  if (!isArray) throw new Error(scope + ": Expected current to be an array");
}
