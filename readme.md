# Redux CRUD

[ ![Codeship Status for Versent/redux-crud](https://codeship.com/projects/41be3440-293a-0133-d1a0-76c73dc375da/status?branch=master)](https://codeship.com/projects/97928)

Redux CRUD is a convention driven way of building CRUD applications using Redux. After building several Flux applications we found that we always end up creating the same action types, actions and reducers for all our resources.

Redux CRUD gives you an standard set of:

- action types: e.g. `USER_UPDATE_SUCCESS`
- actions: e.g. `updateSuccess`, `updateError`
- reducers: for the action types above e.g. `updateSuccess`

Redux CRUD uses [__seamless-immutable__](https://github.com/rtfeldman/seamless-immutable) for storing data.

# Working with resources in Redux

When building an app you might have resources like __`users`__, __`posts`__ and __`comments`__.

You'll probably end up with action types for them like:

- `USERS_FETCH_SUCCESS`
- `POSTS_FETCH_SUCCESS`
- `COMMENTS_FETCH_SUCCESS`

And action creators like:

- `users.fetchSuccess`
- `posts.fetchSuccess`
- `comments.fetchSuccess`

There's obvious repetition there. Redux CRUD aims to remove this boilerplate by providing strong conventions on naming and processing data.

# API

## `.actionTypesFor`

Creates an object with standard CRUD action types:
```js
var crudActions      = require('redux-crud-actions');
var actionTypes      = crudActions.actionTypesFor('users');

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
var crudActions      = require('redux-crud-actions');
var actionCreators   = crudActions.actionCreatorsFor('users');

// actionCreators =>

{
  fetchStart: function() {
    return {
      type: 'USERS_FETCH_START',
    };
  },

  fetchSuccess: function(users) {
    return {
      type:    'USERS_FETCH_SUCCESS',
      records: users,
    };
  },

  fetchError: function(error) {
    return {
      type:  'USERS_FETCH_ERROR',
      error: error,
    };
  },

  /*
  The user record must have a client generated key
  so it can be inserted in the collection optimistically.
  */
  createStart: function(user) {
    return {
      type:   'USERS_CREATE_START',
      record: user,
    };
  },

  createSuccess: function(user) {
    return {
      type:   'USERS_CREATE_SUCCESS',
      record: user,
    };
  },

  /*
  The user record must have the client generated key
  so it can be matched with the record inserted optimistically.
  */
  createError: function(error, user) {
    return {
      type:   'USERS_CREATE_ERROR',
      error:  error,
      record: user,
    };
  },

  updateStart: function(user) {
    return {
      type:   'USERS_UPDATE_START',
      record: user,
    };
  },

  updateSuccess: function(user) {
    return {
      type:   'USERS_UPDATE_SUCCESS',
      record: user,
    };
  },

  updateError: function(error, user) {
    return {
      type:   'USERS_UPDATE_ERROR',
      error:  error,
      record: user,
    };
  },

  deleteStart: function(user) {
    return {
      type:   'USERS_DELETE_START',
      record: user,
    };
  },

  deleteSuccess: function(user) {
    return {
      type:   'USERS_DELETE_SUCCESS',
      record: user,
    };
  },

  deleteError: function(error, user) {
    return {
      type:   'USERS_DELETE_ERROR',
      error:  error,
      record: user,
    };
  }
}


```

## `.reducersFor`

Creates a reducer function for the given resource. Redux CRUD assumes that all records will have a unique key, e.g. `id`. It generates the following reducers:
- `fetchSuccess`
- `createStart`
- `createSuccess`
- `createError`
- `updateStart`
- `updateSuccess`
- `updateError`
- `deleteStart`
- `deleteSuccess`
- `deleteError`

*Note: There are no `fetchStart` and `fetchError` reducers.*

```js
var crudReducers = require('redux-crud-reducers');
var reducers = crudReducers.reducersFor('users');

// reducers =>

function (state, action) {
  switch (action.type) {
    case 'USERS_FETCH_SUCCESS':
      ...
    case 'USERS_CREATE_START':
      ...
    case 'USERS_CREATE_SUCCESS':
      ...
  }
}
```

`reducersFor` takes a config object as second argument:
```
crudReducers.reducersFor('users', {key: '_id'});
```

__config object:__
```js
{
  key: 'id' // key to be used for merging records
}
```

## What each reducer does

### `fetchSuccess`

Listens for an action like this (generated by `actionCreatorsFor`):
```js
{
  type:   'USERS_FETCH_SUCCESS',
  records: users
}
```
Takes one record or an array of records and adds them to the current state. Uses the given `key` or `id` by default to merge.

### `createStart`

Listens for an action like:

```js
{
  type:   'USERS_CREATE_START',
  record: user,
}
```

Adds the record optimistically to the collection. The record must have a client generated key e.g. `id`, otherwise the reducer will throw an error. This key is necessary for matching records on `createSuccess` and `createError`.

For generating keys see [cuid](https://github.com/ericelliott/cuid).

### `createSuccess`

Listens for an action like this (generated by `actionCreatorsFor`):
```js
{
  type:   'USERS_CREATE_SUCCESS',
  record: user,
  cid:    clientGeneratedId
}
```
Takes one record and adds it to the current state. Uses the given `key` (or `id` by default) to merge. 

The `cid` attribute is optional but it should be used when dispatching `createStart`. This `cid` will be used for matching the record.

### `createError`

Listens for an action like:

```js
{
  type: 'USERS_CREATE_ERROR',
  record: user,
}
```

This reducer removes the record from the collection. The record key is used for matching the records. So if a record was added optimistically using `createStart` then the keys must match.

### `updateStart`

Listens for an action like this (generated by `actionCreatorsFor`):
```js
{
  type:  'USERS_UPDATE_START',
  record: user
}
```

Takes one record and merges it to the current state. Uses the given `key` or `id` by default to merge.

It also add these two properties to the record:
- `unsaved`
- `busy`

You can use this to display relevant information in the UI e.g. a spinner.

### `updateSuccess`

Listens for an action like this (generated by `actionCreatorsFor`):
```js
{
  type:   'USERS_UPDATE_SUCCESS',
  record: user
}
```
Takes one record and merges it to the current state. Uses the given `key` or `id` by default to merge.

### `updateError`

Listens for an action like this (generated by `actionCreatorsFor`):
```js
{
  type:   'USERS_UPDATE_ERROR',
  record: user,
  error:  error
}
```
This reducer will remove `busy` from the given record. It will not rollback the record to their previous state as we don't want users to lose their changes. The record will keep the `unsaved` attribute set to true.

## `deleteStart`

Listens for an action like this (generated by `actionCreatorsFor`):
```js
{
  type:   'USERS_DELETE_START',
  record: user
}
```
Marks the given record as `deleted` and `busy`. This reducer doesn't actually remove it. In your UI you can filter out records with `deleted` to hide them.

## `deleteSuccess`

Listens for an action like this (generated by `actionCreatorsFor`):
```js
{
  type:   'USERS_DELETE_SUCCESS',
  record: user
}
```
This reducer removes the given record from the store.

## `deleteError`

Listens for an action like this (generated by `actionCreatorsFor`):
```js
{
  type:   'USERS_DELETE_ERROR',
  record: user,
  error:  error
}
```
Removes `deleted` and `busy` from the given record.

## Using with Redux

### Action creators

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
      const action = standardActionCreators.updateStart(user);
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
          const action = standardActionCreators.updateSuccess(user);
          dispatch(action);
        }, function(response) {
          // rejection
          // dispatch the error action
          // first param is the error
          const action = standardActionCreators.updateError(response, user);
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

[See a list of examples here](./docs/async_action_creators.js)

### Reducers

Redux CRUD generates standard reducers for __`fetch`__, __`create`__, __`update`__ and __`delete`__.

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

### Extending reducers

There are many cases when the generated reducers are not enough. For example you might want to delete relevant `comments` when a `post` is deleted. You can extend a reducer function like this:

```js
// comments/reducers.js

import SI         from 'seamless-immutable';
import reduxCrud  from 'redux-crud';

const standardReducers = reduxCrud.reducersFor('comments');

function reducers(state=SI([]), action) {
  switch(action.type) {
    case 'POSTS_DELETE_SUCCESS':
      // ...delete comments for the given post and return a new state for comments
      return state;
    default:
      // pass to the generated reducers
      return standardReducers(state, action);
  }
}

export default reducers;
```

Then you can use this reducer:

```js
import commentsReducers from './comments/reducers';

const allReducers = combineReducers({
  comments: commentsReducers,
  posts:    reduxCrud.reducersFor('posts'),
});
```

# Notes

### Getting data to your components

With React use [React-Redux](https://github.com/rackt/react-redux).

## Avoid nesting

Don't atttempt to store nested resources. e.g. `{id: 1, posts: [{...}]}`. This makes harder to keep the information in sync with the UI. Instead always normalize the resources when they arrive from the server and store them in collections of their own.

### Normalizing records

Your API might return something like:

```js
{
  id: 1,
  label: 'Some post',
  comments: [
    {id: 1, body: '...'},
    {id: 2, body: '...'},
  ]
}
```

Instead of trying to work with nested records in your views, you should normalize them in your async action creator:

```js

const baseActionCreators         = reduxCrud.actionCreatorsFor('posts');
const baseCommentsActionCreators = reduxCrud.actionCreatorsFor('comments');

fetch() {
  return function(dispatch) {
    const action = baseActionCreators.fetchStart();
    dispatch(action);

    const url = `/posts/`;
    const promise = someAjaxLibrary({
      url: url,
      method: 'GET'
    });

    promise.then(function(response) {
        const posts = response.data.data;
        const action = baseActionCreators.fetchSuccess(posts);
        dispatch(action);

        /***********************************************/
        /* Get the comments and send them to the store */
        const comments = _(posts).map(function(post) {
          return post.comments;
        }).flatten().value();

        const commentsAction = baseCommentsActionCreators.fetchSuccess(comments);
        dispatch(commentsAction);
        /**********************************************/
      }, function(response) {
        const action = baseActionCreators.fetchError(response);
        dispatch(action);
      }).catch(function(err) {
        console.error(err.toString());
      });

    return promise;
  }
},
```

### Use plural resources

Use a collection of resources and name them using the plural form e.g. `users` instead of `user`.

### About optimistic changes

Dispatching `createStart`, `updateStart` and `deleteStart` will result in optimistic changes to your store. See the description of what each reducer does above. `updateStart` and `deleteStart` will just work out of the box. `createStart` needs additional code from you.

This is an example async action creator with optimistic creation:

```js
  create(user) {
    return function(dispatch) {
      // Generate a cid so we can match the records
      var cid = cuid();

      // Add the cid as the primary key
      user = user.merge({id: cid});

      // Optimistic creation
      // This action creator will throw if user doesn't have a primary key
      const action = baseActionCreators.createStart(user);
      dispatch(action);

      // send the request
      const url = `/users/`;
      const promise = someAjaxLibrary({
        url: url,
        method: 'POST',
        data: {
          user
        }
      });

      promise.then(function(response) {
          const returnedUser = response.data.data;
          // We need to pass the cid as the second argument
          const action = baseActionCreators.createSuccess(createdUser, cid);
          dispatch(action);
        }, function(response) {
          const action = baseActionCreators.createError(response, user);
          dispatch(action);
        }).catch(function(err) {
          console.error(err.toString());
        });

      return promise;
    }
  },
```

Note how we need to pass the `cid` as the second argument to `createSuccess`. __If we don't the reducer will not be able to match the records and you will end up with duplicates__.

### Mapping over records in components

Most likely you will get a `seamless-immutable` collection in you components. Don't map over it to create a list because then `seamless-immutable` will attempt to make the react components immutable, which doesn't work.

Don't do this:
```js
var lis = records.map(function(record) {
  return <li key={record.id}>{record.name}</li>;
});
```

Instead, use lodash to map or convert to mutable first:
```js
var lis = _.map(records, function(record) {
  return <li key={record.id}>{record.name}</li>;
});
```
or:
```
var lis = records.asMutable().map(function(record) {
  return <li key={record.id}>{record.name}</li>;
});
```

### Why `seamless-immutable`

[Immutable.js](https://github.com/facebook/immutable-js/) is nice but we prefer [seamless-immutable](https://github.com/rtfeldman/seamless-immutable)'s [stronger immutable guarantees](https://github.com/facebook/immutable-js/issues/546).

## Development

### Testing

```
npm test
```
