import common            from '../common';
import constants         from '../../constants';
import findByKey         from '../../utils/findByKey';
import mergeMutable      from '../../utils/mergeMutable';

const omit = require('lodash.omit');

export default function error(config, current, record) {
  var reducerName = 'deleteError';

  record = common(config, current, record, reducerName);

  var key = config.key;
  var deleteId = record[key];
  var deleteRecord = findByKey(current, key, deleteId);
  deleteRecord = omit(deleteRecord, 'deleted', 'busy');

  return mergeMutable(current, deleteRecord, key);
}
