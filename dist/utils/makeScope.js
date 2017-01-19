"use strict";
function makeScope(config, reducerName) {
    return config.resourceName + '.' + reducerName;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = makeScope;
