const omit              = require('lodash.omit');

import { Config, Map } from '../../types'

export default function remove(config: Config, current: Map<any>, addedRecord: any): Map<any> {
  var key = config.key;
  return omit(current, addedRecord[key]);
}
