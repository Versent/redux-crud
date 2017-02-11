# Using with Redux

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

actionCreators = _.assign(standardActionCreators, actionCreators);

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
          const returnedUser = response.data.data;
          const action = standardActionCreators.updateSuccess(returnedUser);
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

[See a list of examples here](./async_action_creators.js)

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
  users: reduxCrud.Map.reducersFor('users'),
  posts: reduxCrud.Map.reducersFor('posts'),
});

const store = createStoreWithMiddleware(allReducers);
```

### Extending reducers

There are many cases when the generated reducers are not enough. For example you might want to delete relevant `comments` when a `post` is deleted. You can extend a reducer function like this:

```js
// comments/reducers.js

import reduxCrud  from 'redux-crud';

const standardReducers = reduxCrud.Map.reducersFor('comments');

function reducers(state=[], action) {
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
  posts:    reduxCrud.Map.reducersFor('posts'),
});
```
