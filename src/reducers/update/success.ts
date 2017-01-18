import common            from '../common';
import constants         from '../../constants';
import mergeMutable      from '../../utils/mergeMutable';

export default function success(config, current, record) {
  var reducerName = 'updateSuccess';

  record = common(config, current, record, reducerName);

  // replace record
  return mergeMutable(current, record, config.key);
}
