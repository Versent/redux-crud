var actionTypesFor = require('./actionTypesFor');
var assertNotArray = require('./utils/assertNotArray');


function actionCreatorsFor(resourceName, config) {
  config = config || {};
  var actionTypes   = actionTypesFor(resourceName);

  return {
    fetchStart: function() {
      return {
        type: actionTypes.fetchStart,
      }
    },

    fetchSuccess: function(payload) {
      return {
        type:    actionTypes.fetchSuccess,
        records: payload,
      }
    },

    fetchError: function(error) {
      return {
        type:  actionTypes.fetchError,
        error: error,
      }
    },

    createStart: function(payload) {
      assertNotArray(config, 'createStart', payload);
      return {
        type:    actionTypes.createStart,
        record:  payload,
      }
    },

    createSuccess: function(payload) {
      assertNotArray(config, 'createSuccess', payload);
      return {
        type:    actionTypes.createSuccess,
        record:  payload,
      }
    },

    createError: function(error, payload) {
      assertNotArray(config, 'createError', payload);
      return {
        type:    actionTypes.createError,
        error:   error,
        record:  payload,
      }
    },

    updateStart: function(payload) {
      assertNotArray(config, 'updateStart', payload);
      return {
        type:    actionTypes.updateStart,
        record:  payload,
      }
    },

    updateSuccess: function(payload) {
      assertNotArray(config, 'updateSuccess', payload);
      return {
        type:    actionTypes.updateSuccess,
        record:  payload,
      }
    },

    updateError: function(error, payload) {
      assertNotArray(config, 'updateError', payload);
      return {
        type:    actionTypes.updateError,
        error:   error,
        record:  payload,
      }
    },

    deleteStart: function(payload) {
      assertNotArray(config, 'deleteStart', payload);
      return {
        type:    actionTypes.deleteStart,
        record:  payload,
      }
    },

    deleteSuccess: function(payload) {
      assertNotArray(config, 'deleteSuccess', payload);
      return {
        type:    actionTypes.deleteSuccess,
        record:  payload,
      }
    },

    deleteError: function(error, payload) {
      assertNotArray(config, 'deleteError', payload);
      return {
        type:    actionTypes.deleteError,
        error:   error,
        record:  payload,
      }
    }
  };
}

module.exports = actionCreatorsFor;
