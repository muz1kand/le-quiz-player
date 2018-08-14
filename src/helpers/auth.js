import { path } from 'ramda'

export default async (playerKey, navigation, firebase) => {
  const snapshot = await firebase.ref('/players/' + playerKey).once('value')
  const player = snapshot.val()
  const playerName = path(['name'], player)
  const activePlayKey = path(['activePlayKey'], player)
  if (!playerName) {
    navigation.navigate('Auth')
    return
  }

  if (!activePlayKey) {
    navigation.navigate('Game')
    return
  }

  navigation.navigate('Tour')
}
