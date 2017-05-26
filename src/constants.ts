import {ReducerName} from "./types";

const CREATE_ERROR: ReducerName = "createError";
const CREATE_START: ReducerName = "createStart";
const CREATE_SUCCESS: ReducerName = "createSuccess";
const DELETE_ERROR: ReducerName = "deleteError";
const DELETE_START: ReducerName = "deleteStart";
const DELETE_SUCCESS: ReducerName = "deleteSuccess";
const FETCH_SUCCESS: ReducerName = "fetchSuccess";
const UPDATE_ERROR: ReducerName = "updateError";
const UPDATE_START: ReducerName = "updateStart";
const UPDATE_SUCCESS: ReducerName = "updateSuccess";

export default {
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
  },
  SPECIAL_KEYS: {
    BUSY: "busy",
    CLIENT_GENERATED_ID: "_cid",
    DELETED: "deleted",
    PENDING_CREATE: "pendingCreate",
    PENDING_UPDATE: "pendingUpdate"
  }
};
