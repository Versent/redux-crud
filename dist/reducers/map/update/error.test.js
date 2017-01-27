"use strict";
var r = require("ramda");
var ava_1 = require("ava");
var constants_1 = require("../../../constants");
var error_1 = require("./error");
var config = {
    key: constants_1.default.DEFAULT_KEY,
    resourceName: "users",
};
var subject = constants_1.default.REDUCER_NAMES.UPDATE_ERROR;
function getCurrent() {
    return {
        1: {
            id: 1,
            name: "Blue",
            busy: true,
            pendingUpdate: true,
        },
        2: {
            id: 2,
            name: "Red",
            busy: true,
            pendingUpdate: true,
        }
    };
}
function getValid() {
    return {
        id: 2,
        name: "Green"
    };
}
ava_1.default(subject + "throws if given an array", function (t) {
    var curr = getCurrent();
    var record = [];
    function fn() {
        error_1.default(config, curr, record);
    }
    t.throws(fn, TypeError);
});
ava_1.default(subject + "doesnt add record if not there", function (t) {
    var curr = getCurrent();
    var record = {
        id: 3,
        name: "Green"
    };
    var updated = error_1.default(config, curr, record);
    t.is(r.values(updated).length, 2);
});
ava_1.default(subject + "removes busy", function (t) {
    var curr = getCurrent();
    var record = getValid();
    var updated = error_1.default(config, curr, record);
    t.truthy(updated["1"].busy, "doesnt remove on others");
    t.truthy(updated["2"].busy == null, "removes busy");
});
ava_1.default(subject + "doesnt mutate the original collection", function (t) {
    var curr = getCurrent();
    var record = getValid();
    var updated = error_1.default(config, curr, record);
    t.is(curr["2"].busy, true);
    t.is(updated["2"].busy, undefined);
});
ava_1.default(subject + "doesnt remove pendingUpdate", function (t) {
    var curr = getCurrent();
    var record = getValid();
    var updated = error_1.default(config, curr, record);
    t.truthy(updated["2"].pendingUpdate);
});
ava_1.default(subject + "uses the given key", function (t) {
    var config = {
        key: "_id",
        resourceName: "users",
    };
    var curr = {
        2: {
            _id: 2,
            name: "Blue",
            busy: true,
            unsaved: true,
        }
    };
    var record = {
        _id: 2,
    };
    var updated = error_1.default(config, curr, record);
    t.truthy(updated["2"].busy == null, "removes busy");
});
ava_1.default(subject + "it throws when record dont have an id", function (t) {
    var curr = getCurrent();
    var record = {
        name: "Green"
    };
    var f = function () {
        error_1.default(config, curr, record);
    };
    t.throws(f);
});
