import assertNotArray    from '../../utils/assertNotArray';
import assign            from 'lodash.assign';
import common            from '../common';
import constants         from '../../constants';
import mergeMutable      from '../../utils/mergeMutable';

export default function start(config, current, record) {
  var reducerName = 'createStart';
  assertNotArray(config, reducerName, record);

  record = common(config, current, record, reducerName);

  var recordStatus = {
    busy:          true,
    pendingCreate: true,
  };

  var newRecord = assign({}, record, recordStatus);

  // mark record as unsaved and busy
  return mergeMutable(current, newRecord, config.key);
}
