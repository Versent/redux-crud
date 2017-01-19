export interface Config {
  key?: string;
  store?: string;
}

interface Map<T> {
    [key: string]: T;
}

export type ResourceCollection
  = Array<any>
  | Map<any>
