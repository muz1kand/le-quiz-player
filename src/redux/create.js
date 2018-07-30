import { createStore as _createStore, applyMiddleware, compose } from 'redux'
import createMiddleware from './middleware/clientMiddleware'
import { reactReduxFirebase } from 'react-redux-firebase'
import firebase from 'firebase'
import config from '../config'

firebase.initializeApp(config.firebase)

export default function createStore(client, data) {
  const middleware = [createMiddleware(client)]

  const finalCreateStore = compose(
    applyMiddleware(...middleware),
    reactReduxFirebase(firebase, config.firebasePaths),
  )(_createStore)

  const reducer = require('./modules/reducer').default
  const store = finalCreateStore(reducer, data)

  if (__DEV__ && module.hot) {
    module.hot.accept('./modules/reducer', () => {
      store.replaceReducer(require('./modules/reducer'))
    })
  }

  return store
}
