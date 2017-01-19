"use strict";
const find = require('lodash.find');
function findByKey(collection, key, id) {
    function predicate(record) {
        return record[key] === id;
    }
    return find(collection, predicate);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = findByKey;
