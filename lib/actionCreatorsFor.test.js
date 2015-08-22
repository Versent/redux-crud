var lib             = require('../index');
var test            = require('tape-catch');

test('actionCreatorsFor', function(t) {
  // this is fully tested in 
  // https://github.com/Versent/redux-crud-actions
  var actionCreators = lib.actionCreatorsFor('users');
  t.ok(actionCreators.fetchStart);
  t.end();
});
