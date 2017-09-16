# Actions

## `.actionTypesFor`

Creates an object with standard CRUD action types:
```js
var reduxCrud      = require('redux-crud');
var actionTypes    = reduxCrud.actionTypesFor('users');

// actionTypes =>

{
  USERS_FETCH_START:    'USERS_FETCH_START',
  USERS_FETCH_SUCCESS:  'USERS_FETCH_SUCCESS',
  USERS_FETCH_ERROR:    'USERS_FETCH_ERROR',

  USERS_UPDATE_START:   'USERS_UPDATE_START',
  USERS_UPDATE_SUCCESS: 'USERS_UPDATE_SUCCESS',
  USERS_UPDATE_ERROR:   'USERS_UPDATE_ERROR',

  USERS_CREATE_START:   'USERS_CREATE_START',
  USERS_CREATE_SUCCESS: 'USERS_CREATE_SUCCESS',
  USERS_CREATE_ERROR:   'USERS_CREATE_ERROR',

  USERS_DELETE_START:   'USERS_DELETE_START',
  USERS_DELETE_SUCCESS: 'USERS_DELETE_SUCCESS',
  USERS_DELETE_ERROR:   'USERS_DELETE_ERROR',

  // Object also contains shortcuts

  fetchStart:    'USERS_FETCH_START',
  fetchSuccess:  'USERS_FETCH_SUCCESS',
  fetchError:    'USERS_FETCH_ERROR',

  updateStart:   'USERS_UPDATE_START',
  updateSuccess: 'USERS_UPDATE_SUCCESS',
  updateError:   'USERS_UPDATE_ERROR',

  createStart:   'USERS_CREATE_START',
  createSuccess: 'USERS_CREATE_SUCCESS',
  createError:   'USERS_CREATE_ERROR',

  deleteStart:   'USERS_DELETE_START',
  deleteSuccess: 'USERS_DELETE_SUCCESS',
  deleteError:   'USERS_DELETE_ERROR',
}
```

## `.actionCreatorsFor`

Generates the following action creators:
- `fetchStart`
- `fetchSuccess`
- `fetchError`
- `createStart`
- `createSuccess`
- `createError`
- `updateStart`
- `updateSuccess`
- `updateError`
- `deleteStart`
- `deleteSuccess`
- `deleteError`

```js
var reduxCrud       = require('redux-crud');
var actionCreators  = reduxCrud.actionCreatorsFor('users');

// actionCreators =>

{
  fetchStart: function(data) {
    return {
      data: data,
      type: 'USERS_FETCH_START',
    };
  },

  /*
  If data.replace is true, existing records in the store will
  be replaced instead of merged.
  */
  fetchSuccess: function(users, data) {
    return {
      data:    data,
      records: users,
      type:    'USERS_FETCH_SUCCESS',
    };
  },

  fetchError: function(error, data) {
    return {
      data:  data,
      error: error,
      type:  'USERS_FETCH_ERROR',
    };
  },

  /*
  The user record must have a client generated key
  so it can be inserted in the collection optimistically.
  */
  createStart: function(user, data) {
    return {
      data:   data,
      record: user,
      type:   'USERS_CREATE_START',
    };
  },

  createSuccess: function(user, data) {
    return {
      data:   data,
      record: user,
      type:   'USERS_CREATE_SUCCESS',
    };
  },

  /*
  The user record must have the client generated key
  so it can be matched with the record inserted optimistically.
  */
  createError: function(error, user, data) {
    return {
      data:   data,
      error:  error,
      record: user,
      type:   'USERS_CREATE_ERROR',
    };
  },

  updateStart: function(user, data) {
    return {
      data:   data,
      record: user,
      type:   'USERS_UPDATE_START',
    };
  },

  updateSuccess: function(user, data) {
    return {
      data:   data,
      record: user,
      type:   'USERS_UPDATE_SUCCESS',
    };
  },

  updateError: function(error, user, data) {
    return {
      data:   data,
      error:  error,
      record: user,
      type:   'USERS_UPDATE_ERROR',
    };
  },

  deleteStart: function(user, data) {
    return {
      data:   data,
      record: user,
      type:   'USERS_DELETE_START',
    };
  },

  deleteSuccess: function(user, data) {
    return {
      data:   data,
      record: user,
      type:   'USERS_DELETE_SUCCESS',
    };
  },

  deleteError: function(error, user, data) {
    return {
      data:   data,
      error:  error,
      record: user,
      type:   'USERS_DELETE_ERROR',
    };
  }
}
```

`actionCreatorsFor` takes an optional config object as second argument:

```js
reduxCrud.actionCreatorsFor('users', {key: '_id'});
```

Don't forget to do the same thing in reducers, with `reducersFor`:

```js
reduxCrud.Map.reducersFor('users', {key: '_id'});
```

### The `data` attribute

The `data` attribute in the actions payload is optional. The reducer doesn't do anything with this. This is only provided in case you want to pass extra information in the actions.
