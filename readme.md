# Redux CRUD

[ ![Codeship Status for Versent/redux-crud](https://codeship.com/projects/41be3440-293a-0133-d1a0-76c73dc375da/status?branch=master)](https://codeship.com/projects/97928)

A set of standard actions and reducers for CRUD Applications

__Work in progress__

## .reducersFor

Create a reducer function for the given resource.

```js
var crudReducers = require('redux-crud-reducers');
var reducers = crudReducers.reducersFor('users');

// reducers =>

function (state, action) {
  swith(action.type) {
    case 'USERS_FETCH_SUCCESS':
      ...
    case 'USERS_CREATE_START':
      ...
    case 'USERS_CREATE_SUCCESS':
      ...
  }
}

```

## Conventions

- These reducers user __seamless-immutable__ for storing data.
- Reducer expects standard action names from https://github.com/Versent/redux-crud-actions
- Reducer expects standard actions from https://github.com/Versent/redux-crud-actions
