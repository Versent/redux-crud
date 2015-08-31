# Async action creators

## Fetch

```js

const standardActionCreators = reduxCrud.actionCreatorsFor('users');

let actionCreators = {
  fetch() {
    return function(dispatch) {
      // dispatch a `updateStart` for optimistic updates
      const action = standardActionCreators.fetchStart();
      dispatch(action);

      // send the request
      const url = `/users/`;
      const promise = someAjaxLibrary({
        url: url,
        method: 'GET'
      });

      promise.then(function(response) {
          const users = response.data.data;
          const action = standardActionCreators.fetchSuccess(users);
          dispatch(action);
        }, function(response) {
          // dispatch the error action
          // first param is the error
          const action = standardActionCreators.fetchError(response);
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
