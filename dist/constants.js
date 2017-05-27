"use strict";
var CREATE_ERROR = "createError";
var CREATE_START = "createStart";
var CREATE_SUCCESS = "createSuccess";
var DELETE_ERROR = "deleteError";
var DELETE_START = "deleteStart";
var DELETE_SUCCESS = "deleteSuccess";
var FETCH_SUCCESS = "fetchSuccess";
var UPDATE_ERROR = "updateError";
var UPDATE_START = "updateStart";
var UPDATE_SUCCESS = "updateSuccess";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    DEFAULT_KEY: "id",
    STORE_LIST: "STORE_LIST",
    STORE_MAP: "STORE_MAP",
    REDUCER_NAMES: {
        CREATE_ERROR: CREATE_ERROR,
        CREATE_START: CREATE_START,
        CREATE_SUCCESS: CREATE_SUCCESS,
        DELETE_ERROR: DELETE_ERROR,
        DELETE_START: DELETE_START,
        DELETE_SUCCESS: DELETE_SUCCESS,
        FETCH_SUCCESS: FETCH_SUCCESS,
        UPDATE_ERROR: UPDATE_ERROR,
        UPDATE_START: UPDATE_START,
        UPDATE_SUCCESS: UPDATE_SUCCESS
    },
    SPECIAL_KEYS: {
        BUSY: "busy",
        CLIENT_GENERATED_ID: "_cid",
        DELETED: "deleted",
        PENDING_CREATE: "pendingCreate",
        PENDING_UPDATE: "pendingUpdate"
    }
};
