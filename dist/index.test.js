"use strict";
var ava_1 = require("ava");
var r = require("ramda");
var index_1 = require("./index");
ava_1.default("it has the expected functions", function (t) {
    t.truthy(r.is(Function, index_1.default.actionCreatorsFor));
    t.truthy(r.is(Function, index_1.default.actionTypesFor));
    t.truthy(r.is(Object, index_1.default.List));
    t.truthy(r.is(Function, index_1.default.List.reducersFor));
    t.truthy(r.is(Object, index_1.default.Map));
    t.truthy(r.is(Function, index_1.default.Map.reducersFor));
});
