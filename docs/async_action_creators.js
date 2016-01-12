import reduxCrud from 'redux-crud';
import _         from 'lodash';
import cuid      from 'cuid';

const baseActionCreators = reduxCrud.actionCreatorsFor('users');

let actionCreators = {

  fetchOne(id) {
    return function(dispatch) {
      const action = baseActionCreators.fetchStart();
      dispatch(action);

      // send the request
      const url = `/users/${id}`;
      const promise = someAjaxLibrary({
        url: url,
        method: 'GET'
      });

      promise.then(function(response) {
          const user = response.data.data;
          const action = baseActionCreators.fetchSuccess(user);
          dispatch(action);
        }, function(response) {
          // dispatch the error action
          // first param is the error
          const action = baseActionCreators.fetchError(response);
          dispatch(action);
        }).catch(function(err) {
          console.error(err.toString());
        });

      return promise;
    }
  },

  fetch(page, limit) {
    return function(dispatch) {
      const action = baseActionCreators.fetchStart();
      dispatch(action);

      // send the request
      // e.g. /users?page=1&limit=20
      const url = `/users`;
      const promise = someAjaxLibrary({
        url: url,
        method: 'GET',
        data: {
          page: page,
          limit : limit
        }
      });

      promise.then(function(response) {
          const users = response.data.data;
          const action = baseActionCreators.fetchSuccess(users);
          dispatch(action);
        }, function(response) {
          // dispatch the error action
          // first param is the error
          const action = baseActionCreators.fetchError(response);
          dispatch(action);
        }).catch(function(err) {
          console.error(err.toString());
        });

      return promise;
    }
  },

  create(user) {
    return function(dispatch) {
      // Generate a cid so we can match the records
      var cid = cuid();
      user = user.merge({id: cid});

      // optimistic creation
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

  update(user) {
    return function(dispatch) {
      // optimistic update
      const action = baseActionCreators.updateStart(user);
      dispatch(action);

      // send the request
      const url = `/users/${user.id}`;
      const promise = someAjaxLibrary({
        url: url,
        method: 'PATCH',
        data: {
          user
        }
      });

      promise.then(function(response) {
          const returnedUser = response.data.data;
          const action = baseActionCreators.updateSuccess(returnedUser);
          dispatch(action);
        }, function(response) {
          const action = baseActionCreators.updateError(response, user);
          dispatch(action);
        }).catch(function(err) {
          console.error(err.toString());
        });

      return promise;
    }
  },

  delete(user) {
    return function(dispatch) {
      // optimistic delete
      const action = baseActionCreators.deleteStart(user);
      dispatch(action);

      // send the request
      const url = `/users/${user.id}`;
      const promise = someAjaxLibrary({
        url: url,
        method: 'DELETE'
      });

      promise.then(function(response) {
          const returnedUser = response.data.data;
          const action = baseActionCreators.deleteSuccess(returnedUser);
          dispatch(action);
        }, function(response) {
          const action = baseActionCreators.deleteError(response, user);
          dispatch(action);
        }).catch(function(err) {
          console.error(err.toString());
        });

      return promise;
    }
  },

}

actionCreators = _.extend(baseActionCreators, actionCreators);

export default actionCreators;

