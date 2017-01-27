"use strict";
var r = require("ramda");
var ava_1 = require("ava");
var constants_1 = require("../../../constants");
var success_1 = require("./success");
var config = {
    key: constants_1.default.DEFAULT_KEY,
    resourceName: "users",
};
var subject = constants_1.default.REDUCER_NAMES.DELETE_SUCCESS;
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
        success_1.default(config, curr, record);
    }
    t.throws(fn, TypeError);
});
ava_1.default(subject + "removes the record", function (t) {
    var curr = getCurrent();
    var record = getValid();
    var updated = success_1.default(config, curr, record);
    t.is(r.values(updated).length, 1, "removes the record");
    t.is(updated["1"], undefined);
});
ava_1.default(subject + "doesnt mutate the original collection", function (t) {
    var curr = getCurrent();
    var record = getValid();
    var updated = success_1.default(config, curr, record);
    t.is(r.values(curr).length, 2);
    t.is(r.values(updated).length, 1);
});
ava_1.default(subject + "uses the given key", function (t) {
    var config = {
        key: "_id",
        resourceName: "users",
    };
    var curr = [{
            _id: 1,
        }];
    var record = {
        _id: 1,
    };
    var updated = success_1.default(config, curr, record);
    t.deepEqual(r.values(updated).length, 0, "removes the record");
});
ava_1.default(subject + "it throws when record dont have an id", function (t) {
    var curr = getCurrent();
    var record = {
        name: "Green"
    };
    var f = function () {
        success_1.default(config, curr, record);
    };
    t.throws(f);
});
