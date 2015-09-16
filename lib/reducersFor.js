var actionTypesFor  = require('./actionTypesFor');
var SI              = require('seamless-immutable');
var _               = require('lodash');

var fetchSuccess    = require('./reducers/fetch/success');
var createStart     = require('./reducers/create/start');
var createSuccess   = require('./reducers/create/success');
var createError     = require('./reducers/create/error');
var updateStart     = require('./reducers/update/start');
var updateSuccess   = require('./reducers/update/success');
var updateError     = require('./reducers/update/error');
var deleteStart     = require('./reducers/delete/start');
var deleteSuccess   = require('./reducers/delete/success');
var deleteError     = require('./reducers/delete/error');

function reducersFor(resourceName, args) {
  if (resourceName == null) throw new Error('reducersFor: Expected resourceName');

  args = args || {};

  var defaults    = {
    key:          'id',
    resourceName: resourceName,
  };

  var config      = _.defaults(args, defaults);

  return function reducers(state, action) {
    state = state || SI([]);

    if (action == null) throw new Error(resourceName + ' reducers: Expected action');

    var actionTypes = actionTypesFor(resourceName);
    var record      = action.record;

    switch (action.type) {

      case actionTypes.fetchSuccess:
        return fetchSuccess(config, state, action.records);

      case actionTypes.createStart:
        return createStart(config, state, record);

      case actionTypes.createSuccess:
        return createSuccess(config, state, record, action.cid);

      case actionTypes.createError:
        return createError(config, state, record);

      case actionTypes.updateStart:
        return updateStart(config, state, record);

      case actionTypes.updateSuccess:
        return updateSuccess(config, state, record);

      case actionTypes.updateError:
        return updateError(config, state, record);

      case actionTypes.deleteStart:
        return deleteStart(config, state, record);

      case actionTypes.deleteSuccess:
        return deleteSuccess(config, state, record);

      case actionTypes.deleteError:
        return deleteError(config, state, record);

      default:
        return state;
    }

  }

}

module.exports = reducersFor;
