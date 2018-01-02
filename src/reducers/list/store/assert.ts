import * as is from "ramda/src/is"

export default function assert(scope: string, current: Array<any>): void {
  var isArray = is(Array, current);
  if (!isArray) throw new Error(scope + ": Expected current to be an array");
}
