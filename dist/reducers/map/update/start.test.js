"use strict";
var r = require("ramda");
var ava_1 = require("ava");
var constants_1 = require("../../../constants");
var start_1 = require("./start");
var config = {
    key: constants_1.default.DEFAULT_KEY,
    resourceName: "users",
};
var subject = constants_1.default.REDUCER_NAMES.UPDATE_START;
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
        id: 2,
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
ava_1.default(subject + "adds the record if not there", function (t) {
    var curr = getCurrent();
    var record = {
        id: 3,
        name: "Green"
    };
    var updated = start_1.default(config, curr, record);
    t.is(r.values(updated).length, 3);
});
ava_1.default(subject + "doesnt mutate the original", function (t) {
    var curr = getCurrent();
    var record = {
        id: 3,
        name: "Green"
    };
    var updated = start_1.default(config, curr, record);
    t.is(r.values(curr).length, 2);
    t.is(r.values(updated).length, 3);
});
ava_1.default(subject + "updates existing", function (t) {
    var curr = getCurrent();
    var record = getValid();
    var updated = start_1.default(config, curr, record);
    t.is(r.values(updated).length, 2);
    t.is(updated["2"].id, 2);
    t.is(updated["2"].name, "Green");
});
ava_1.default(subject + "uses the given key", function (t) {
    var config = {
        key: "_id",
        resourceName: "users",
    };
    var curr = {
        2: {
            _id: 2,
            name: "Blue"
        }
    };
    var record = {
        _id: 2,
        name: "Green"
    };
    var updated = start_1.default(config, curr, record);
    t.is(r.values(updated).length, 1);
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
ava_1.default(subject + "adds busy and pendingUpdate", function (t) {
    var curr = getCurrent();
    var record = getValid();
    var updated = start_1.default(config, curr, record);
    t.deepEqual(updated["2"].name, "Green");
    t.truthy(updated["2"].busy, "adds busy");
    t.truthy(updated["2"].pendingUpdate, "adds pendingUpdate");
});
