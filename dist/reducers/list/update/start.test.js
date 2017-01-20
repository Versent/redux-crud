"use strict";
const constants_1 = require("../../../constants");
const start_1 = require("./start");
const ava_1 = require("ava");
var config = {
    key: constants_1.default.DEFAULT_KEY,
    resourceName: 'users',
};
var subject = 'updateStart: ';
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
        id: 2,
        name: 'Green'
    };
}
ava_1.default(subject + 'throws if given an array', function (t) {
    var curr = getCurrent();
    var record = [];
    function fn() {
        start_1.default(config, curr, record);
    }
    t.throws(fn, TypeError);
});
ava_1.default(subject + 'adds the record if not there', function (t) {
    var curr = getCurrent();
    var record = {
        id: 3,
        name: 'Green'
    };
    var updated = start_1.default(config, curr, record);
    t.is(updated.length, 3);
});
ava_1.default(subject + 'doesnt mutate the original', function (t) {
    var curr = getCurrent();
    var record = {
        id: 3,
        name: 'Green'
    };
    var updated = start_1.default(config, curr, record);
    t.is(curr.length, 2);
    t.is(updated.length, 3);
});
ava_1.default(subject + 'updates existing', function (t) {
    var curr = getCurrent();
    var record = getValid();
    var updated = start_1.default(config, curr, record);
    t.is(updated.length, 2);
    t.is(updated[1].id, 2);
    t.is(updated[1].name, 'Green');
});
ava_1.default(subject + 'uses the given key', function (t) {
    var config = {
        key: '_id',
        resourceName: 'users',
    };
    var curr = [{
            _id: 2,
            name: 'Blue'
        }];
    var record = {
        _id: 2,
        name: 'Green'
    };
    var updated = start_1.default(config, curr, record);
    t.is(updated.length, 1);
});
ava_1.default(subject + 'it throws when record dont have an id', function (t) {
    var curr = getCurrent();
    var record = {
        name: 'Green'
    };
    var f = function () {
        start_1.default(config, curr, record);
    };
    t.throws(f);
});
ava_1.default(subject + 'adds busy and pendingUpdate', function (t) {
    var curr = getCurrent();
    var record = getValid();
    var updated = start_1.default(config, curr, record);
    t.deepEqual(updated[1].name, 'Green');
    t.truthy(updated[1].busy, 'adds busy');
    t.truthy(updated[1].pendingUpdate, 'adds pendingUpdate');
});
