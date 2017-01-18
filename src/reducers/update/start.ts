import assign            from 'lodash.assign';
import common            from '../common';
import mergeMutable      from '../../utils/mergeMutable';
import constants         from '../../constants';

export default function start(config, current, record) {
  var reducerName = 'updateStart';

  record = common(config, current, record, reducerName);

  // mark record as unsaved and busy
  var recordStatus = {
    busy:          true,
    pendingUpdate: true,
  };

  var newRecord = assign({}, record, recordStatus);

  // replace record
  return mergeMutable(current, newRecord, config.key);
}
