import assign            from 'lodash.assign';
import common            from '../common';
import constants         from '../../constants';
import findByKey         from '../../utils/findByKey';
import mergeMutable      from '../../utils/mergeMutable';

export default function start(config, current, record) {
  var reducerName = 'deleteStart';

  record = common(config, current, record, reducerName);

  var key = config.key;
  var deleteId = record[key];
  var recordStatus = {
    deleted: true,
    busy:    true,
  };
  var deleteRecord = findByKey(current, key, deleteId);
  deleteRecord = assign({}, deleteRecord, recordStatus);

  return mergeMutable(current, deleteRecord, key);
}
