const reject            = require('lodash.reject');

import { Config, ResourceCollection } from '../../types'

export default function remove(config: Config, current: ResourceCollection, addedRecord: any) {
  var key = config.key;

  function predicate(record: any) {
    var recordKey = record[key];
    var isSameKey = addedRecord[key] === recordKey;
    return isSameKey;
  }

  return reject(current, predicate);
}
