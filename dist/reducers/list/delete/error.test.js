"use strict";
var constants_1 = require("../../../constants");
var error_1 = require("./error");
var ava_1 = require("ava");
var config = {
    key: constants_1.default.DEFAULT_KEY,
    resourceName: 'users',
};
var subject = constants_1.default.REDUCER_NAMES.DELETE_ERROR;
function getCurrent() {
    return [
        {
            id: 1,
            name: 'Blue',
            deleted: true,
            busy: true,
        }, {
            id: 2,
            name: 'Red',
            deleted: true,
            busy: true,
        }
    ];
}
ava_1.default(subject + 'throws if given an array', function (t) {
    var curr = getCurrent();
    var record = [];
    function fn() {
        error_1.default(config, curr, record);
    }
    t.throws(fn, TypeError);
});
ava_1.default(subject + 'doesnt mutate', function (t) {
    var curr = getCurrent();
    var record = {
        id: 1,
    };
    var updated = error_1.default(config, curr, record);
    t.is(curr[0].deleted, true);
    t.is(curr[0].busy, true);
    t.is(updated[0].deleted, undefined);
    t.is(updated[0].busy, undefined);
});
ava_1.default(subject + 'removes deleted and busy', function (t) {
    var curr = getCurrent();
    var record = {
        id: 1,
    };
    var updated = error_1.default(config, curr, record);
    t.deepEqual(updated.length, 2, 'doesnt remove record');
    t.truthy(updated[0].deleted == null, 'removes deleted');
    t.truthy(updated[0].busy == null, 'removes busy');
    t.truthy(updated[1].deleted, 'doesnt removes deleted from others');
    t.truthy(updated[1].busy, 'doesnt removes busy from others');
});
ava_1.default(subject + 'uses the given key', function (t) {
    var config = {
        key: '_id',
        resourceName: 'users',
    };
    var curr = [{
            _id: 1,
            deleted: true,
            busy: true,
        }];
    var record = {
        _id: 1,
    };
    var updated = error_1.default(config, curr, record);
    t.truthy(updated[0].deleted == null, 'removes deleted');
    t.truthy(updated[0].busy == null, 'removes busy');
});
ava_1.default(subject + 'it throws when record doesnt have an id', function (t) {
    var curr = getCurrent();
    var record = {
        name: 'Green'
    };
    var f = function () {
        error_1.default(config, curr, record);
    };
    t.throws(f);
});
