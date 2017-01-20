export interface Config {
	key?: string;
	resourceName: string;
	store?: StoreKind;
}

export interface Map<T> {
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

type StoreKind
	= 'map'
	| 'list'

export interface StoreList {
	remove: (config: Config, current: Array<any>, record: any) => Array<any>
}

export interface StoreMap {
	remove: (config: Config, current: Map<any>, record: any) => Map<any>
}
