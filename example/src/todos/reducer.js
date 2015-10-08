import SI          from 'seamless-immutable'
import reduxCrud   from 'redux-crud'
import actionTypes from './actionTypes'
import bows        from 'bows'

const baseReducers = reduxCrud.reducersFor('todos')
const log = bows('todos--reducer')


function toggle(state, action) {
  return state
  // let attributes = user.attributes
  // let name = attributes.name
  // name = name.split('').sort(()=> 0.5 - Math.random()).join('')
  // attributes = attributes.merge({name})
  // return user.merge({attributes})
}

function reducer(state=SI([]), action) {
  switch (action.type) {
  case actionTypes.toggle:
    return toggle(state, action)
    // return state.map(toggle)
  default:
    return baseReducers(state, action)
  }
}

export default reducer
