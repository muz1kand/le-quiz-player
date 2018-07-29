import { AsyncStorage } from 'react-native'
import { path } from 'ramda'
import firebase from './firebase'

export default async (playerKey, navigation) => {
  const snapshot = await firebase.database().ref('/players/' + playerKey).once('value')
  const player = snapshot.val()
  const playerName = path(['name'], player)
  const activePlayKey = path(['activePlayKey'], player)
  if (!playerName) {
    navigation.navigate('Auth')
    return
  }
  await AsyncStorage.setItem('playerName', playerName)

  if (!activePlayKey) {
    navigation.navigate('Game')
    return
  }
  await AsyncStorage.setItem('activePlayKey', activePlayKey)

  navigation.navigate('Tour')
}
