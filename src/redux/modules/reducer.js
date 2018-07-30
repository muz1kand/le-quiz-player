import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'

import auth from './auth'

export default combineReducers({
  auth,
  firebase: firebaseReducer,
})
