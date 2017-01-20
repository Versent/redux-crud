"use strict";
const constants_1 = require("../../../constants");
const success_1 = require("./success");
const ava_1 = require("ava");
var subject = 'createSuccess: ';
var config = {
    key: constants_1.default.DEFAULT_KEY,
    resourceName: 'users',
};
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
ava_1.default(subject + 'it throws if it cannot find config.key', function (t) {
    var curr = getCurrent();
    var record = {};
    var config = {
        resourceName: 'users'
    };
    var f = function () {
        success_1.default(config, curr, record);
    };
    t.throws(f, /users.createSuccess: Expected config.key/);
});
ava_1.default(subject + 'doesnt mutate the original collection', function (t) {
    var curr = getCurrent();
    var record = {
        id: 3,
        name: 'Green'
    };
    var updated = success_1.default(config, curr, record);
    t.is(curr.length, 2);
});
ava_1.default(subject + 'throws if given an array', function (t) {
    var curr = getCurrent();
    var record = [];
    function fn() {
        success_1.default(config, curr, record);
    }
    t.throws(fn, TypeError);
});
ava_1.default(subject + 'adds the record', function (t) {
    var curr = getCurrent();
    var record = {
        id: 3,
        name: 'Green'
    };
    var updated = success_1.default(config, curr, record);
    t.is(updated.length, 3);
});
ava_1.default(subject + 'merges if exists', function (t) {
    var curr = getCurrent();
    var record = {
        id: 2,
        name: 'Green'
    };
    var updated = success_1.default(config, curr, record);
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
    var updated = success_1.default(config, curr, record);
    t.is(updated.length, 1);
});
ava_1.default(subject + 'it throws when record doesnt have an id', function (t) {
    var curr = getCurrent();
    var record = {
        name: 'Green'
    };
    var f = function () {
        success_1.default(config, curr, record);
    };
    t.throws(f, /users.createSuccess: Expected record to have .id/);
});
ava_1.default(subject + 'it uses the cid', function (t) {
    var cid = 'abc';
    var curr = [
        {
            id: cid,
            name: 'Blue'
        }
    ];
    var record = {
        id: 3,
        name: 'Green'
    };
    var updated = success_1.default(config, curr, record, cid);
    t.is(updated.length, 1);
});
ava_1.default(subject + 'removes busy and pendingCreate', function (t) {
    var curr = [{
            busy: true,
            id: 2,
            name: 'Green',
            pendingCreate: true,
        }];
    var record = {
        id: 2,
        name: 'Yellow'
    };
    var updated = success_1.default(config, curr, record);
    t.is(updated.length, 1);
    t.truthy(updated[0].busy == null, 'removes busy');
    t.truthy(updated[0].pendingCreate == null, 'removes pendingCreate');
});
