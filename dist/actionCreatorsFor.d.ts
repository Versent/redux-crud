import { Config } from "./types";
declare function actionCreatorsFor(resourceName: string, config?: Config): {
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
export default actionCreatorsFor;
