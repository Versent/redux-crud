# Redux CRUD

[ ![Codeship Status for Versent/redux-crud](https://codeship.com/projects/41be3440-293a-0133-d1a0-76c73dc375da/status?branch=master)](https://codeship.com/projects/97928)

Redux CRUD is a convention driven way of building CRUD applications using Redux. After building several Flux applications we found that we always end up creating the same action types, actions and reducers for all our resources.

Redux CRUD gives you a standard set of:

- action types: e.g. `USER_UPDATE_SUCCESS`
- actions: e.g. `updateSuccess`, `updateError`
- reducers: for the action types above e.g. `updateSuccess`

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

## Stores

Redux-crud provides two stores:

- __List__. A plain JS array. This preserves the order of records.
- __Map__. A JS object where records are indexed by key. This provides faster writes and lookups.

## Docs

### [Actions](./docs/actions.md)
### [Reducers](./docs/reducers.md)
### [Using with Redux](./docs/redux.md)
### [Tips](./docs/tips.md)

## Testing

```
npm test
```

## Example

You can see [a basic example here](./example)

