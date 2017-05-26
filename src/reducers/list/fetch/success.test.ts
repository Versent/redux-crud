import constants from "../../../constants";
import reducer from "./success";
import test from "ava";

var config = {
  key: constants.DEFAULT_KEY,
  resourceName: "users"
};
var subject = "fetchSuccess: ";

function getCurrent() {
  return [
    {
      id: 1,
      name: "Blue"
    },
    {
      id: 2,
      name: "Red"
    }
  ];
}

test(subject + " adds the records", function(t) {
  var curr = getCurrent();
  var more = [
    {
      id: 3,
      name: "Green"
    }
  ];
  var updated = reducer(config, curr, more, []);

  t.is(updated.length, 3);
});

test(subject + " doesnt mutate the original collection", function(t) {
  var curr = getCurrent();
  var more = [
    {
      id: 3,
      name: "Green"
    }
  ];
  var updated = reducer(config, curr, more, []);

  t.is(curr.length, 2);
  t.is(updated.length, 3);
});

test(subject + " merges", function(t) {
  var curr = getCurrent();
  var more = [
    {
      id: 2,
      name: "Green"
    }
  ];
  var updated = reducer(config, curr, more, []);

  t.is(updated.length, 2);
  t.is(updated[1].id, 2);
  t.is(updated[1].name, "Green");
});

test(subject + " replaces", function(t) {
  const curr = getCurrent();
  const more = [
    {
      id: 2,
      name: "Green"
    }
  ];
  const updated = reducer(config, curr, more, [], true);

  t.is(updated.length, 1);
  t.is(updated[0].id, 2);
  t.is(updated[0].name, "Green");
});

test(subject + "preserves the order", function(t) {
  var curr = [];
  var more = [
    {
      id: 11,
      label: "Eleven"
    },
    {
      id: 7,
      label: "Sevent"
    }
  ];
  var updated = reducer(config, curr, more, []);

  t.is(updated.length, 2, "it has two");
  t.is(updated[0].id, 11, "it is in the right position");
});

test(subject + "uses the given key", function(t) {
  var config = {
    key: "_id",
    resourceName: "users"
  };
  var curr = [
    {
      _id: 2,
      name: "Blue"
    }
  ];
  var more = [
    {
      _id: 2,
      name: "Green"
    }
  ];
  var updated = reducer(config, curr, more, []);

  t.is(updated.length, 1);
});

test(subject + "it throws when records dont have an id", function(t) {
  var curr = getCurrent();
  var more = [
    {
      name: "Green"
    }
  ];

  var f = function() {
    reducer(config, curr, more, []);
  };
  t.throws(f);
});

test(subject + "can take one record", function(t) {
  var curr = getCurrent();
  var one = {
    id: 3,
    name: "Green"
  };
  var updated = reducer(config, curr, one, []);

  t.is(updated.length, 3);
});
