import test from "ava";
import * as is from "ramda/src/is";
import index from "./index";

test("it has the expected functions", function(t) {
  t.truthy(is(Function, index.actionCreatorsFor));
  t.truthy(is(Function, index.actionTypesFor));
  t.truthy(is(Object, index.List));
  t.truthy(is(Function, index.List.reducersFor));
  t.truthy(is(Object, index.Map));
  t.truthy(is(Function, index.Map.reducersFor));
});
