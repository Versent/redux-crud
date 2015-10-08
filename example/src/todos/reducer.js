import SI          from 'seamless-immutable'
import reduxCrud   from 'redux-crud'
import actionTypes from './actionTypes'
import bows        from 'bows'

const baseReducers = reduxCrud.reducersFor('todos')
const log = bows('todos--reducer')

function reducer(state=SI([]), action) {
  switch (action.type) {
  default:
    return baseReducers(state, action)
  }
}

export default reducer
