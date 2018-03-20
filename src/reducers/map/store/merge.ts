import * as merge from "ramda/src/merge";
import * as mergeDeepRight from "ramda/src/mergeDeepRight";

import {Config, Map} from "../../../types";

/*
Replace or merge one record
*/
export default function replace(
	config: Config,
	current: Map<any>,
	record: any,
	partial: boolean = false
): Map<any> {
	var key = config.key;
	var recordKey = record[key];

	return merge(current, {
		[recordKey]: partial ? mergeDeepRight(current[recordKey], record) : record
	});
}
