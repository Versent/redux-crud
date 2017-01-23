"use strict";
const r = require("ramda");
const ava_1 = require("ava");
const constants_1 = require("../../../constants");
const success_1 = require("./success");
var subject = constants_1.default.REDUCER_NAMES.CREATE_SUCCESS;
var config = {
    key: constants_1.default.DEFAULT_KEY,
    resourceName: "users",
};
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
ava_1.default(subject + "it throws if it cannot find config.key", function (t) {
    var curr = getCurrent();
    var record = {};
    var config = {
        resourceName: "users"
    };
    var f = function () {
        success_1.default(config, curr, record);
    };
    t.throws(f, /users.createSuccess: Expected config.key/);
});
ava_1.default(subject + "doesnt mutate the original collection", function (t) {
    var curr = getCurrent();
    var record = {
        id: 3,
        name: "Green"
    };
    var updated = success_1.default(config, curr, record);
    t.is(r.values(curr).length, 2);
});
ava_1.default(subject + "throws if given an array", function (t) {
    var curr = getCurrent();
    var record = [];
    function fn() {
        success_1.default(config, curr, record);
    }
    t.throws(fn, TypeError);
});
ava_1.default(subject + "adds the record", function (t) {
    var curr = getCurrent();
    var record = {
        id: 3,
        name: "Green"
    };
    var updated = success_1.default(config, curr, record);
    var actual = r.keys(updated);
    var expected = ["1", "2", "3"];
    t.deepEqual(actual, expected);
});
ava_1.default(subject + "merges if exists", function (t) {
    var curr = getCurrent();
    var record = {
        id: 2,
        name: "Green"
    };
    var updated = success_1.default(config, curr, record);
    t.is(r.values(updated).length, 2);
    t.is(updated["2"].id, 2);
    t.is(updated["2"].name, "Green");
});
ava_1.default(subject + "uses the given key", function (t) {
    var config = {
        key: "_id",
        resourceName: "users",
    };
    var curr = [{
            _id: 2,
            name: "Blue"
        }];
    var record = {
        _id: 2,
        name: "Green"
    };
    var updated = success_1.default(config, curr, record);
    t.is(r.values(updated).length, 1);
});
ava_1.default(subject + "it throws when record doesnt have an id", function (t) {
    var curr = getCurrent();
    var record = {
        name: "Green"
    };
    var f = function () {
        success_1.default(config, curr, record);
    };
    t.throws(f, /users.createSuccess: Expected record to have .id/);
});
ava_1.default(subject + "it uses the cid", function (t) {
    var cid = "abc";
    var curr = [
        {
            id: cid,
            name: "Blue"
        }
    ];
    var record = {
        id: 3,
        name: "Green"
    };
    var updated = success_1.default(config, curr, record, cid);
    t.is(r.values(updated).length, 1);
});
ava_1.default(subject + "removes busy and pendingCreate", function (t) {
    var curr = {
        2: {
            busy: true,
            id: 2,
            name: "Green",
            pendingCreate: true,
        }
    };
    var record = {
        id: 2,
        name: "Yellow"
    };
    var updated = success_1.default(config, curr, record);
    t.is(r.values(updated).length, 1);
    t.truthy(updated["2"].busy == null, "removes busy");
    t.truthy(updated["2"].pendingCreate == null, "removes pendingCreate");
});
