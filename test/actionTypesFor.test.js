var lib             = require('../index');
var test            = require('tape-catch');

test('actionTypesFor', function(t) {
  // this is fully tested in 
  // https://github.com/Versent/redux-crud-actions
  var actionTypes = lib.actionTypesFor('users');
  t.ok(actionTypes.fetchStart === 'USERS_FETCH_START');
  t.end();
});
