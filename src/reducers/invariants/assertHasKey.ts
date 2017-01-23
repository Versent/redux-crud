import constants from "../../constants"

import { Config, ReducerName } from "../../types"

export default function assertHasKey(config: Config, scope: string, record: any): void {
	var key = config.key

	if (record[key] == null) {
		throw new Error(scope + ": Expected record to have ." + key)
	}
}
