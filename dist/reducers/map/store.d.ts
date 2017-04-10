import { Config, Map } from "../../types";
declare var _default: {
    assert: (scope: string, current: Map<any>) => void;
    merge: (config: Config, current: Map<any>, record: any) => Map<any>;
    remove: (config: Config, current: Map<any>, record: any) => Map<any>;
};
export default _default;
