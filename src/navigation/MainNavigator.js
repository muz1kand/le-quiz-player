import React from 'react'
import { createDrawerNavigator } from 'react-navigation'
import CustomDrawer from './CustomDrawer'

import TourScreen from '../screens/TourScreen'
import GameScreen from '../screens/GameScreen'

export default createDrawerNavigator({
  Game: {
    screen: GameScreen,
  },
  Tour: {
    screen: TourScreen,
  },
}, {
  contentComponent: CustomDrawer,
})
