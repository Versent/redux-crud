# Redux CRUD

[ ![Codeship Status for Versent/redux-crud](https://codeship.com/projects/41be3440-293a-0133-d1a0-76c73dc375da/status?branch=master)](https://codeship.com/projects/97928)

Redux CRUD is an opinionated way of building CRUD applications using Redux. Redux CRUD gives you an standard set of:

- action types e.g. USER_UPDATE_SUCCESS
- actions e.g. updateSuccess, updateError
- reducers for the actions types above e.g. updateSuccess

Redux CRUD uses [__seamless-immutable__](https://github.com/rtfeldman/seamless-immutable) for storing data.

__Work in progress__

## .actionTypesFor

See https://github.com/Versent/redux-crud-actions#actiontypesfor

## .actionCreatorsFor

See https://github.com/Versent/redux-crud-actions#actioncreatorsfor

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

## Using with Redux

### Action creators

Create your action creators by extending the standard actions:

```js
import reduxCrud    from 'redux-crud';

const standardActionCreators = reduxCrud.actionCreatorsFor('users');

let actionCreators = {
  update(user) {
    ...
  }
}

actionCreators = _.extend(actionCreators, standardActionCreators);

export default actionCreators;
```

### Async action creators

Redux CRUD only generates sync action creators. Async action creators still need to be added:

```js

const standardActionCreators = reduxCrud.actionCreatorsFor('users');

let actionCreators = {
  update(user) {
    return function(dispatch) {
      // dispatch a `updateStart` for optimistic updates
      const action = standardActionCreators.updateStart([user]);
      dispatch(action);

      // send the request
      const url = `/users/${user.id}`;
      const promise = someAjaxLibrary({
        url: url,
        method: 'PUT',
        data: {
          user
        }
      });

      promise.then(function(response) {
          // dispatch the success action
          const user = response.data.data;
          const action = standardActionCreators.updateSuccess([user]);
          dispatch(action);
        }, function(response) {
          // rejection
          // dispatch the error action
          const action = standardActionCreators.updateError([user]);
          dispatch(action);
        }).catch(function(err) {
          console.error(err.toString());
        });

      return promise;
    }
  },
  ...
}
```

### Reducers

Redux CRUD generates standard reducers for __fetch__, __create__, __update__ and __delete__.

Create your Redux application:

```js
import thunkMiddleware                   from 'redux-thunk';
import loggerMiddleware                  from 'redux-logger';
import { combineReducers }               from 'redux';
import { createStore, applyMiddleware }  from 'redux';
import reduxCrud                         from 'redux-crud';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware, // lets us dispatch() functions
  loggerMiddleware // neat middleware that logs actions
)(createStore);

const allReducers = combineReducers({
  users: reduxCrud.reducersFor('users'),
  posts: reduxCrud.reducersFor('posts'),
});

const store = createStoreWithMiddleware(allReducers);

```
