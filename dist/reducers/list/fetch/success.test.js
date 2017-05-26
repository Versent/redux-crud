"use strict";
var constants_1 = require("../../../constants");
var success_1 = require("./success");
var ava_1 = require("ava");
var config = {
    key: constants_1.default.DEFAULT_KEY,
    resourceName: "users"
};
var subject = "fetchSuccess: ";
function getCurrent() {
    return [
        {
            id: 1,
            name: "Blue"
        },
        {
            id: 2,
            name: "Red"
        }
    ];
}
ava_1.default(subject + " adds the records", function (t) {
    var curr = getCurrent();
    var more = [
        {
            id: 3,
            name: "Green"
        }
    ];
    var updated = success_1.default(config, curr, more, []);
    t.is(updated.length, 3);
});
ava_1.default(subject + " doesnt mutate the original collection", function (t) {
    var curr = getCurrent();
    var more = [
        {
            id: 3,
            name: "Green"
        }
    ];
    var updated = success_1.default(config, curr, more, []);
    t.is(curr.length, 2);
    t.is(updated.length, 3);
});
ava_1.default(subject + " merges", function (t) {
    var curr = getCurrent();
    var more = [
        {
            id: 2,
            name: "Green"
        }
    ];
    var updated = success_1.default(config, curr, more, []);
    t.is(updated.length, 2);
    t.is(updated[1].id, 2);
    t.is(updated[1].name, "Green");
});
ava_1.default(subject + " replaces", function (t) {
    var curr = getCurrent();
    var more = [
        {
            id: 2,
            name: "Green"
        }
    ];
    var updated = success_1.default(config, curr, more, [], true);
    t.is(updated.length, 1);
    t.is(updated[0].id, 2);
    t.is(updated[0].name, "Green");
});
ava_1.default(subject + "preserves the order", function (t) {
    var curr = [];
    var more = [
        {
            id: 11,
            label: "Eleven"
        },
        {
            id: 7,
            label: "Sevent"
        }
    ];
    var updated = success_1.default(config, curr, more, []);
    t.is(updated.length, 2, "it has two");
    t.is(updated[0].id, 11, "it is in the right position");
});
ava_1.default(subject + "uses the given key", function (t) {
    var config = {
        key: "_id",
        resourceName: "users"
    };
    var curr = [
        {
            _id: 2,
            name: "Blue"
        }
    ];
    var more = [
        {
            _id: 2,
            name: "Green"
        }
    ];
    var updated = success_1.default(config, curr, more, []);
    t.is(updated.length, 1);
});
ava_1.default(subject + "it throws when records dont have an id", function (t) {
    var curr = getCurrent();
    var more = [
        {
            name: "Green"
        }
    ];
    var f = function () {
        success_1.default(config, curr, more, []);
    };
    t.throws(f);
});
ava_1.default(subject + "can take one record", function (t) {
    var curr = getCurrent();
    var one = {
        id: 3,
        name: "Green"
    };
    var updated = success_1.default(config, curr, one, []);
    t.is(updated.length, 3);
});
