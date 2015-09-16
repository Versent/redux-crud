var actionTypesFor = require('./actionTypesFor');
var assertNotArray = require('./utils/assertNotArray');
var invariant       = require('invariant');

function actionCreatorsFor(resourceName, config) {
  if (resourceName == null) throw new Error('actionCreatorsFor: Expected resourceName');

  config = config || {};
  var actionTypes   = actionTypesFor(resourceName);
  var key           = config.key || 'id';

  function assertError(actionCreatorName, error) {
    invariant(error != null, 'Expected error in ' + actionCreatorName);
  }

  function assertOneRecord(actionCreatorName, record) {
    invariant(record != null, 'Expected record in ' + actionCreatorName);
    assertNotArray(config, 'createStart', record);
    invariant(record[key] != null, 'Expected record.' + key + ' in ' + actionCreatorName);
  }

  function assertManyRecords(actionCreatorName, records) {
    invariant(records != null, 'Expected records ' + actionCreatorName);
  }

  return {
    fetchStart: function() {
      return {
        type: actionTypes.fetchStart,
      }
    },

    fetchSuccess: function(records) {
      var name = 'fetchSuccess';
      assertManyRecords(name, records);
      return {
        type:    actionTypes.fetchSuccess,
        records: records,
      }
    },

    fetchError: function(error) {
      var name = 'fetchError';
      assertError(name, error);
      return {
        type:  actionTypes.fetchError,
        error: error,
      }
    },

    createStart: function(record) {
      var name = 'createStart';
      assertOneRecord(name, record);
      
      return {
        type:    actionTypes.createStart,
        record:  record,
      }
    },

    createSuccess: function(record, clientGeneratedKey) {
      var name = 'createSuccess';
      assertOneRecord(name, record);

      return {
        type:    actionTypes.createSuccess,
        record:  record,
        cid:     clientGeneratedKey,
      }
    },

    createError: function(error, record) {
      var name = 'createError';
      assertError(name, error);
      assertOneRecord(name, record);

      return {
        type:    actionTypes.createError,
        error:   error,
        record:  record,
      }
    },

    updateStart: function(record) {
      var name = 'updateStart';
      assertOneRecord(name, record);

      return {
        type:    actionTypes.updateStart,
        record:  record,
      }
    },

    updateSuccess: function(record) {
      var name = 'updateSuccess';
      assertOneRecord(name, record);

      return {
        type:    actionTypes.updateSuccess,
        record:  record,
      }
    },

    updateError: function(error, record) {
      var name = 'updateError';
      assertError(name, error);
      assertOneRecord(name, record);

      return {
        type:    actionTypes.updateError,
        error:   error,
        record:  record,
      }
    },

    deleteStart: function(record) {
      var name = 'deleteStart';
      assertOneRecord(name, record);

      return {
        type:    actionTypes.deleteStart,
        record:  record,
      }
    },

    deleteSuccess: function(record) {
      var name = 'deleteSuccess';
      assertOneRecord(name, record);

      return {
        type:    actionTypes.deleteSuccess,
        record:  record,
      }
    },

    deleteError: function(error, record) {
      var name = 'deleteError';
      assertError(name, error);
      assertOneRecord(name, record);

      return {
        type:    actionTypes.deleteError,
        error:   error,
        record:  record,
      }
    }
  };
}

module.exports = actionCreatorsFor;
