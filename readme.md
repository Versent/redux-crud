# Redux CRUD

[ ![Codeship Status for Versent/redux-crud](https://codeship.com/projects/41be3440-293a-0133-d1a0-76c73dc375da/status?branch=master)](https://codeship.com/projects/97928)

Redux CRUD is an opinionated way of building CRUD applications using Redux. After building several Flux applications we found that we always end up duplicating the same actions types, actions and reducers for all our resources.

Redux CRUD gives you an standard set of:

- action types e.g. USER_UPDATE_SUCCESS
- actions e.g. updateSuccess, updateError
- reducers for the actions types above e.g. updateSuccess

Redux CRUD uses [__seamless-immutable__](https://github.com/rtfeldman/seamless-immutable) for storing data.

## Working with resources in Redux

When building an app you might have resources like __users__, __posts__ and __comments__.

You will probably end up with action types for them like:

- USERS_FETCH_SUCCESS
- POSTS_FETCH_SUCCESS
- COMMENTS_FETCH_SUCCESS

And action creators like:

- users.fetchSuccess
- posts.fetchSuccess
- comments.fetchSuccess

There is strong repetitive pattern between all of them. Redux CRUD aims to remove all this repetitive boilerplate by giving providing strong conventions on naming and processing data.

## API

### .actionTypesFor

See https://github.com/Versent/redux-crud-actions#actiontypesfor

### .actionCreatorsFor

See https://github.com/Versent/redux-crud-actions#actioncreatorsfor

### .reducersFor

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

Redux CRUD generates the following action creators:

- fetchStart
- fetchSuccess
- fetchError
- createStart
- createSuccess
- createError
- updateStart
- updateSuccess
- updateError
- deleteStart
- deleteSuccess
- deleteError

Create your action creators by extending the standard actions:

```js
import _            from 'lodash';
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

### Getting data to your components

-

## Best practices

### About nesting

Don't atttempt to store nested resources. e.g. `{id: 1, posts: [{...}]}`. This makes harder to keep the information in sync with the UI. Instead always normalize the resources when they arrive from the server and store them in collections of their own.

### Use plural resources

Use collection of resources and name them using the plural form e.g. `users` instead of `user`. Redux CRUD always expects to deal with collections.

### About optimistic updates

-

## Development

### Testing

```
npm test
```

