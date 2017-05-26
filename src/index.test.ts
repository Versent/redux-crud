import test from "ava";
import * as r from "ramda";
import index from "./index";

test("it has the expected functions", function(t) {
  t.truthy(r.is(Function, index.actionCreatorsFor));
  t.truthy(r.is(Function, index.actionTypesFor));
  t.truthy(r.is(Object, index.List));
  t.truthy(r.is(Function, index.List.reducersFor));
  t.truthy(r.is(Object, index.Map));
  t.truthy(r.is(Function, index.Map.reducersFor));
});
