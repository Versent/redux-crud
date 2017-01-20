"use strict";
const constants_1 = require("../../../constants");
const error_1 = require("./error");
const ava_1 = require("ava");
var assign = require('lodash.assign');
var values = require('lodash.values');
var subject = 'createError: ';
var config = {
    key: constants_1.default.DEFAULT_KEY,
    resourceName: 'users',
};
var configAsMap = assign({}, config, {
    store: constants_1.default.STORE_MAP,
});
function getCurrent() {
    return [
        {
            id: 1,
            name: 'Blue'
        }, {
            id: 'abc',
            name: 'Green'
        }
    ];
}
function getCurrentAsMap() {
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
    var created = {
        id: 'abc',
        name: 'Green'
    };
    var updated = error_1.default(config, curr, created);
    t.deepEqual(updated.length, 1);
});
// test(subject + 'removes the record with map store', function(t) {
//   var curr    = getCurrentAsMap()
//   t.deepEqual(values(curr).length, 2)
//   var created = {
//     id: 'abc',
//     name: 'Green'
//   }
//   var updated = reducer(configAsMap, curr, created)
//   t.deepEqual(values(updated).length, 2)
// })
