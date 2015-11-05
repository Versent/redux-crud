import reduxCrud   from '../redux-crud'
import actionTypes from './actionTypes'
import bows        from 'bows'

const baseReducers = reduxCrud.reducersFor('todos', { store: reduxCrud.STORE_MUTABLE });
const log = bows('todos--reducer')

function reducer(state=[], action) {
  switch (action.type) {
  default:
    return baseReducers(state, action)
  }
}

export default reducer
