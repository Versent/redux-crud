import actionTypesFor from './actionTypesFor'
import assertNotArray from './utils/assertNotArray'
import constants from './constants'
import getDefaultConfig from './getDefaultConfig'

const assign = require('lodash.assign')

import { Config, ReducerName } from './types'

const invariant = require('invariant')

function actionCreatorsFor(resourceName: string, config?: Config) {
  if (resourceName == null) throw new Error('actionCreatorsFor: Expected resourceName')

  config = config || getDefaultConfig(resourceName)
  config = assign(config, {resourceName})

  const actionTypes = actionTypesFor(resourceName)
  const key = config.key || constants.DEFAULT_KEY

  function assertError(actionCreatorName: ReducerName, error) {
    invariant(error != null, 'Expected error in ' + actionCreatorName)
  }

  function assertOneRecord(actionCreatorName: ReducerName, record?: any) {
    invariant(record != null, 'Expected record in ' + actionCreatorName)
    assertNotArray(config, 'createStart', record)
    invariant(record[key] != null, 'Expected record.' + key + ' in ' + actionCreatorName)
  }

  function assertManyRecords(actionCreatorName, records) {
    invariant(records != null, 'Expected records ' + actionCreatorName)
  }

  return {
    fetchStart(data?) {
      return {
        data: data,
        type: actionTypes.fetchStart,
      }
    },

    fetchSuccess(records?, data?) {
      var name: ReducerName = 'fetchSuccess'
      assertManyRecords(name, records)

      return {
        data:    data,
        records: records,
        type:    actionTypes.fetchSuccess,
      }
    },

    fetchError(error?, data?) {
      var name: ReducerName = 'fetchError'
      assertError(name, error)

      return {
        data:  data,
        error: error,
        type:  actionTypes.fetchError,
      }
    },

    createStart(record?, data?) {
      var name: ReducerName = 'createStart'
      assertOneRecord(name, record)

      return {
        data:    data,
        record:  record,
        type:    actionTypes.createStart,
      }
    },

    createSuccess(record?, clientGeneratedKey?, data?) {
      var name: ReducerName = 'createSuccess'
      assertOneRecord(name, record)

      return {
        cid:     clientGeneratedKey,
        data:    data,
        record:  record,
        type:    actionTypes.createSuccess,
      }
    },

    createError(error?, record?, data?) {
      var name: ReducerName = 'createError'
      assertError(name, error)
      assertOneRecord(name, record)

      return {
        data:    data,
        error:   error,
        record:  record,
        type:    actionTypes.createError,
      }
    },

    updateStart(record?, data?) {
      var name: ReducerName = 'updateStart'
      assertOneRecord(name, record)

      return {
        data:    data,
        record:  record,
        type:    actionTypes.updateStart,
      }
    },

    updateSuccess(record?, data?) {
      var name: ReducerName = 'updateSuccess'
      assertOneRecord(name, record)

      return {
        data:    data,
        record:  record,
        type:    actionTypes.updateSuccess,
      }
    },

    updateError(error?, record?, data?) {
      var name: ReducerName = 'updateError'
      assertError(name, error)
      assertOneRecord(name, record)

      return {
        data:    data,
        error:   error,
        record:  record,
        type:    actionTypes.updateError,
      }
    },

    deleteStart(record?, data?) {
      var name: ReducerName = 'deleteStart'
      assertOneRecord(name, record)

      return {
        data:    data,
        record:  record,
        type:    actionTypes.deleteStart,
      }
    },

    deleteSuccess(record?, data?) {
      var name: ReducerName = 'deleteSuccess'
      assertOneRecord(name, record)

      return {
        data:    data,
        record:  record,
        type:    actionTypes.deleteSuccess,
      }
    },

    deleteError(error?, record?, data?) {
      var name: ReducerName = 'deleteError'
      assertError(name, error)
      assertOneRecord(name, record)

      return {
        data:    data,
        error:   error,
        record:  record,
        type:    actionTypes.deleteError,
      }
    }
  };
}

export default actionCreatorsFor;
