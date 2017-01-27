"use strict";
var constants_1 = require("../../../constants");
var start_1 = require("./start");
var ava_1 = require("ava");
var config = {
    key: constants_1.default.DEFAULT_KEY,
    resourceName: "users",
};
var subject = constants_1.default.REDUCER_NAMES.DELETE_START;
function getCurrent() {
    return {
        1: {
            id: 1,
            name: "Blue"
        },
        2: {
            id: 2,
            name: "Red"
        }
    };
}
function getValid() {
    return {
        id: 1,
        name: "Green"
    };
}
ava_1.default(subject + "throws if given an array", function (t) {
    var curr = getCurrent();
    var record = [];
    function fn() {
        start_1.default(config, curr, record);
    }
    t.throws(fn, TypeError);
});
ava_1.default(subject + "marks record as deleted and busy", function (t) {
    var curr = getCurrent();
    var record = getValid();
    var updated = start_1.default(config, curr, record);
    t.is(updated["1"].deleted, true);
    t.is(updated["1"].busy, true);
    t.truthy(updated["2"].deleted == null, "doesnt add deleted to others");
    t.truthy(updated["2"].busy == null, "doesnt add busy to others");
});
ava_1.default(subject + "doesnt mutate", function (t) {
    var curr = getCurrent();
    var record = getValid();
    var updated = start_1.default(config, curr, record);
    t.is(updated["1"].deleted, true);
    t.is(curr["1"]["deleted"], undefined);
});
ava_1.default(subject + "uses the given key", function (t) {
    var config = {
        key: "_id",
        resourceName: "users",
    };
    var curr = {
        1: {
            _id: 1,
        }
    };
    var record = {
        _id: 1,
    };
    var updated = start_1.default(config, curr, record);
    t.truthy(updated["1"].deleted, "adds deleted");
});
ava_1.default(subject + "it throws when record dont have an id", function (t) {
    var curr = getCurrent();
    var record = {
        name: "Green"
    };
    var f = function () {
        start_1.default(config, curr, record);
    };
    t.throws(f);
});
