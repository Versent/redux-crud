export interface Config {
  key?: string;
  resourceName: string;
  store?: string;
}

interface Map<T> {
    [key: string]: T;
}

export type ReducerName
  = "createError"
  | "createSuccess"
  | "createStart"
  | "deleteError"
  | "deleteSuccess"
  | "deleteStart"
  | "fetchSuccess"
  | "fetchError"
  | "updateError"
  | "updateSuccess"
  | "updateStart"

export type ResourceCollection
  = Array<any>
  | Map<any>

