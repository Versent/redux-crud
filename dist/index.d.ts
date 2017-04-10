import { Config } from "./types";
declare var _default: {
    actionCreatorsFor: (resourceName: string, config?: Config) => {
        fetchStart(data?: any): {
            data: any;
            type: any;
        };
        fetchSuccess(records?: any, data?: any): {
            data: any;
            records: any;
            type: any;
        };
        fetchError(error?: any, data?: any): {
            data: any;
            error: any;
            type: any;
        };
        createStart(record?: any, data?: any): {
            data: any;
            record: any;
            type: any;
        };
        createSuccess(record?: any, clientGeneratedKey?: any, data?: any): {
            cid: any;
            data: any;
            record: any;
            type: any;
        };
        createError(error?: any, record?: any, data?: any): {
            data: any;
            error: any;
            record: any;
            type: any;
        };
        updateStart(record?: any, data?: any): {
            data: any;
            record: any;
            type: any;
        };
        updateSuccess(record?: any, data?: any): {
            data: any;
            record: any;
            type: any;
        };
        updateError(error?: any, record?: any, data?: any): {
            data: any;
            error: any;
            record: any;
            type: any;
        };
        deleteStart(record?: any, data?: any): {
            data: any;
            record: any;
            type: any;
        };
        deleteSuccess(record?: any, data?: any): {
            data: any;
            record: any;
            type: any;
        };
        deleteError(error?: any, record?: any, data?: any): {
            data: any;
            error: any;
            record: any;
            type: any;
        };
    };
    actionTypesFor: any;
    constants: {
        DEFAULT_KEY: string;
        STORE_LIST: string;
        STORE_MAP: string;
        REDUCER_NAMES: {
            CREATE_ERROR: "createError";
            CREATE_START: "createStart";
            CREATE_SUCCESS: "createSuccess";
            DELETE_ERROR: "deleteError";
            DELETE_START: "deleteStart";
            DELETE_SUCCESS: "deleteSuccess";
            FETCH_SUCCESS: "fetchSuccess";
            UPDATE_ERROR: "updateError";
            UPDATE_START: "updateStart";
            UPDATE_SUCCESS: "updateSuccess";
        };
        SPECIAL_KEYS: {
            BUSY: string;
            CLIENT_GENERATED_ID: string;
            DELETED: string;
            PENDING_CREATE: string;
            PENDING_UPDATE: string;
        };
    };
    List: {
        reducersFor: (resourceName: string, args?: {}, deps?: any) => (state: any, action: any) => any;
    };
    Map: {
        reducersFor: (resourceName: string, args?: {}, deps?: any) => (state: any, action: any) => any;
    };
};
export default _default;
