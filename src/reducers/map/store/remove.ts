import * as r from 'ramda'

import { Config, Map } from '../../../types'

export default function remove(config: Config, current: Map<any>, addedRecord: any): Map<any> {
  var key = config.key;
  return r.omit([addedRecord[key]], current);
}
