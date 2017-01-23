# Tips

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
          const action = baseActionCreators.createSuccess(returnedUser, cid);
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

Adding a client generated `id` to a record doesn't mean that you need to use that `id` for saving it in the backend. You can still generate ids as usual in your DB. 

When the record comes back saved from the server the reducer will try to match `id` on the optimistically inserted record with `cid` on the `createSuccess` action. If it finds a match it will replace the optimistically inserted record with the given one. That record will now have the normal `id` given by the backend (The client generated id is thrown away at this point).

### Pending attributes

`createStart` and `updateStart` will add the following attributes:

- **createStart**: Adds `busy` and `pendingCreate`
- **updateStart**: Adds `busy` and `pendingUpdate`
- **updateError**: Removes `busy` but leaves `pendingUpdate`

You can use these special attributes for showing indicators and preventing navigation:

- Show a busy indicator when `busy` is true.
- Do not allow navigation to a resource when `pendingCreate` is true.
- Show a _retry_ button when an update fails: `busy` is false but `pendingUpdate` is true.
