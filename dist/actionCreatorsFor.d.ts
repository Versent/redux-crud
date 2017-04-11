import { Config } from "./types";
declare function actionCreatorsFor<T>(resourceName: string, config?: Config): {
    fetchStart(data?: any): {
        data: any;
        type: any;
    };
    fetchSuccess(records?: T[], data?: any): {
        data: any;
        records: T[];
        type: any;
    };
    fetchError(error?: any, data?: any): {
        data: any;
        error: any;
        type: any;
    };
    createStart(record?: T, data?: any): {
        data: any;
        record: T;
        type: any;
    };
    createSuccess(record?: T, clientGeneratedKey?: any, data?: any): {
        cid: any;
        data: any;
        record: T;
        type: any;
    };
    createError(error?: any, record?: T, data?: any): {
        data: any;
        error: any;
        record: T;
        type: any;
    };
    updateStart(record?: T, data?: any): {
        data: any;
        record: T;
        type: any;
    };
    updateSuccess(record?: T, data?: any): {
        data: any;
        record: T;
        type: any;
    };
    updateError(error?: any, record?: T, data?: any): {
        data: any;
        error: any;
        record: T;
        type: any;
    };
    deleteStart(record?: T, data?: any): {
        data: any;
        record: T;
        type: any;
    };
    deleteSuccess(record?: T, data?: any): {
        data: any;
        record: T;
        type: any;
    };
    deleteError(error?: any, record?: T, data?: any): {
        data: any;
        error: any;
        record: T;
        type: any;
    };
};
export default actionCreatorsFor;
