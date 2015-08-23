var reducer         = require('./start');
var test            = require('tape-catch');
var SI              = require('seamless-immutable');
var config          = {
  key:           'id',
  resourcesName: 'users',
}

function getCurrent() {
  return SI([
    {
      id: 1,
      name: 'Blue'
    },{
      id: 2,
      name: 'Red'
    }
  ]);
}

test('create.start', function(t) {
  t.test('returns current', function(tt){
    var curr    = getCurrent();
    var created = [{
      name: 'Green'
    }];
    var updated = reducer(config, curr, created);

    tt.equal(updated, curr);
    tt.end();
  });

  t.test('can take one record', function(tt){
    var curr    = getCurrent();
    var created = {
      name: 'Green'
    };
    var updated = reducer(config, curr, created);

    tt.equal(updated, curr);
    tt.end();
  });
});
