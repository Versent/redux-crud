"use strict";
var r = require("ramda");
var ava_1 = require("ava");
var constants_1 = require("../../../constants");
var start_1 = require("./start");
var config = {
    key: constants_1.default.DEFAULT_KEY,
    resourceName: "users",
};
var subject = constants_1.default.REDUCER_NAMES.CREATE_START;
function getCurrent() {
    return {
        1: {
            id: 1,
            name: "Blue"
        },
        2: {
            id: "abc",
            name: "Green"
        }
    };
}
function getValid() {
    return {
        id: 3,
        name: "Green"
    };
}
ava_1.default(subject + " throws if given an array", function (t) {
    var curr = getCurrent();
    var created = [];
    function fn() {
        start_1.default(config, curr, created);
    }
    t.throws(fn, TypeError);
});
ava_1.default(subject + " adds the new record", function (t) {
    var curr = getCurrent();
    var other = {
        id: 3,
        name: "Green"
    };
    var updated = start_1.default(config, curr, other);
    t.is(r.values(updated).length, 3, "adds the record");
});
ava_1.default(subject + "it throws when record doesnt have an id", function (t) {
    var curr = getCurrent();
    var record = {
        name: "Green"
    };
    var f = function () {
        start_1.default(config, curr, record);
    };
    t.throws(f, /users.createStart: Expected record to have .id/);
});
ava_1.default(subject + "adds busy and pendingCreate", function (t) {
    var curr = getCurrent();
    var record = getValid();
    var updated = start_1.default(config, curr, record);
    t.is(updated["3"].name, "Green");
    t.truthy(updated["3"].busy, "adds busy");
    t.truthy(updated["3"].pendingCreate, "adds pendingCreate");
});
