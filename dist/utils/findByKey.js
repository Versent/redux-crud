"use strict";
var r = require("ramda");
function findByKey(collection, key, id) {
    function predicate(record) {
        return record[key] === id;
    }
    return r.find(predicate, collection);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = findByKey;
