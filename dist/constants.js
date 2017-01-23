"use strict";
const CREATE_ERROR = "createError";
const CREATE_START = "createStart";
const CREATE_SUCCESS = "createSuccess";
const DELETE_ERROR = "deleteError";
const DELETE_START = "deleteStart";
const DELETE_SUCCESS = "deleteSuccess";
const FETCH_SUCCESS = "fetchSuccess";
const UPDATE_ERROR = "updateError";
const UPDATE_START = "updateStart";
const UPDATE_SUCCESS = "updateSuccess";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    DEFAULT_KEY: "id",
    STORE_LIST: "STORE_LIST",
    STORE_MAP: "STORE_MAP",
    REDUCER_NAMES: {
        CREATE_ERROR,
        CREATE_START,
        CREATE_SUCCESS,
        DELETE_ERROR,
        DELETE_START,
        DELETE_SUCCESS,
        FETCH_SUCCESS,
        UPDATE_ERROR,
        UPDATE_START,
        UPDATE_SUCCESS
    }
};
