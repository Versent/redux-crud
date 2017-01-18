"use strict";
const lodash_find_1 = require("lodash.find");
function findByKey(collection, key, id) {
    function predicate(record) {
        return record[key] === id;
    }
    return lodash_find_1.default(collection, predicate);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = findByKey;
