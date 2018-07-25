import React from 'react'
import { createSwitchNavigator } from 'react-navigation'

import MainNavigator from './MainNavigator'
import AuthLoadingScreen from '../screens/AuthLoadingScreen'
import LoginScreen from '../screens/LoginScreen'

const AuthStack = createSwitchNavigator({ SignIn: LoginScreen })

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: MainNavigator,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
)
