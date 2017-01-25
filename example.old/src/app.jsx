import '../node_modules/basscss/css/basscss.css'

import bows                              from 'bows'
import React                             from 'react'
import thunkMiddleware                   from 'redux-thunk'
import loggerMiddleware                  from 'redux-logger'
import { compose }                       from 'redux'
import { applyMiddleware }               from 'redux'
import { combineReducers }               from 'redux'
import { createStore }                   from 'redux'
import { Provider }                      from 'react-redux'
import reduxCrud                         from 'redux-crud'
import todosReducer                      from './todos/reducer'
import TodosIndex                        from './todos/Index.jsx'

const log           = bows('app')

const finalCreateStore = compose(
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)(createStore)

const allReducers = combineReducers({
  todos:           todosReducer,
})

const store = finalCreateStore(allReducers)

class AppComponent extends React.Component {
  render() {
    return (
      <section className='container clearfix'>
        <TodosIndex />
      </section>
    )
  }
}

const mountNode = document.getElementById('app')
React.render(
  <div>
    <Provider store={store}>
      {() => <AppComponent /> }
    </Provider>
  </div>,
  mountNode
)

