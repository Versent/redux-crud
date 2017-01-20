const find = require('lodash.find')

export default function findByKey(collection, key, id) {
	function predicate(record) {
		return record[key] === id
	}

	return find(collection, predicate)
}
