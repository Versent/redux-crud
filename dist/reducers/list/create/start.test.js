"use strict";
var constants_1 = require("../../../constants");
var start_1 = require("./start");
var ava_1 = require("ava");
var config = {
    key: constants_1.default.DEFAULT_KEY,
    resourceName: 'users',
};
var subject = 'createStart: ';
function getCurrent() {
    return [
        {
            id: 1,
            name: 'Blue'
        }, {
            id: 2,
            name: 'Red'
        }
    ];
}
function getValid() {
    return {
        id: 3,
        name: 'Green'
    };
}
ava_1.default(subject + 'throws if given an array', function (t) {
    var curr = getCurrent();
    var created = [];
    function fn() {
        start_1.default(config, curr, created);
    }
    t.throws(fn, TypeError);
});
ava_1.default(subject + 'adds the new record', function (t) {
    var curr = getCurrent();
    var other = {
        id: 3,
        name: 'Green'
    };
    var updated = start_1.default(config, curr, other);
    t.deepEqual(updated.length, 3, 'adds the record');
});
ava_1.default(subject + 'it throws when record doesnt have an id', function (t) {
    var curr = getCurrent();
    var record = {
        name: 'Green'
    };
    var f = function () {
        start_1.default(config, curr, record);
    };
    t.throws(f, /users.createStart: Expected record to have .id/);
});
ava_1.default(subject + 'adds busy and pendingCreate', function (t) {
    var curr = getCurrent();
    var record = getValid();
    var updated = start_1.default(config, curr, record);
    t.deepEqual(updated[2].name, 'Green');
    t.truthy(updated[2].busy, 'adds busy');
    t.truthy(updated[2].pendingCreate, 'adds pendingCreate');
});
