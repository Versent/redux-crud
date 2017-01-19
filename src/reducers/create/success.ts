import common            from '../common';
import constants         from '../../constants';

import { Config, ResourceCollection, ReducerName } from '../../types'

export default function success(config: Config, current: any, addedRecord: any, clientGenKey?: string) {
  const reducerName: ReducerName = "createSuccess";

  addedRecord = common(config, current, addedRecord, reducerName);

  var key = config.key;
  var done = false;

  // Update existing records
  var updatedCollection = current.map(function (record) {
    var recordKey = record[key];
    if (recordKey == null) throw new Error('Expected record to have ' + key);
    var isSameKey = recordKey === addedRecord[key];
    var isSameClientGetKey = (clientGenKey != null && clientGenKey === recordKey);
    if (isSameKey || isSameClientGetKey) {
      done = true;
      return addedRecord;
    } else {
      return record;
    }
  });

  // Add if not updated
  if (!done) {
    updatedCollection = updatedCollection.concat([addedRecord]);
  }

  return updatedCollection;
}
