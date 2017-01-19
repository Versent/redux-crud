import common            from '../common';
import constants         from '../../constants';
import findByKey         from '../../utils/findByKey';
import mergeMutable      from '../../utils/mergeMutable';

const omit = require('lodash.omit');

export default function error(config, current, record) {
  // We don't want to rollback
  var reducerName = 'updateError';

  record = common(config, current, record, reducerName);

  var key = config.key;
  var updatedId = record[key];
  var updatedRecord = findByKey(current, key, updatedId);

  if (updatedRecord) {
    updatedRecord = omit(updatedRecord, 'busy');
    return mergeMutable(current, updatedRecord, key);
  } else {
    return current;
  }
}
