"use strict";
const r = require("ramda");
const ava_1 = require("ava");
const constants_1 = require("../../../constants");
const error_1 = require("./error");
var subject = constants_1.default.REDUCER_NAMES.CREATE_ERROR;
var config = {
    key: constants_1.default.DEFAULT_KEY,
    resourceName: 'users',
};
function getCurrent() {
    return {
        1: {
            id: 1,
            name: 'Blue'
        },
        2: {
            id: 'abc',
            name: 'Green'
        }
    };
}
ava_1.default(subject + 'throws if given an array', function (t) {
    var curr = getCurrent();
    var created = [];
    function fn() {
        error_1.default(config, curr, created);
    }
    t.throws(fn, TypeError);
});
ava_1.default(subject + 'removes the record', function (t) {
    var curr = getCurrent();
    t.deepEqual(r.values(curr).length, 2);
    var created = {
        id: 'abc',
        name: 'Green'
    };
    var updated = error_1.default(config, curr, created);
    t.deepEqual(r.values(updated).length, 2);
});
