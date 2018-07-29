import React from 'react'
import { AsyncStorage, StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native'
import TopBar from '../components/TopBar'
import firebase from '../firebase'

export default class TourScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Текущий тур',
  }

  constructor() {
    super()
    this.state = {
      activePlayKey: '',
      playerName: '',
    }
  }

  componentDidMount = async () => {
    const playerKey = await AsyncStorage.getItem('playerKey')
    const playerName = await AsyncStorage.getItem('playerName')
    const activePlayKey = await AsyncStorage.getItem('activePlayKey')
    this.setState({ activePlayKey, playerName, playerKey })
  }

  handleBuzz = () => {
    const { activePlayKey, playerKey } = this.state
    Vibration.vibrate(100)
    firebase.database().ref(`plays/${activePlayKey}`).update({
      isPlaying: false,
      player: playerKey,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TopBar/>
        <Text style={styles.name}>{this.state.playerName}</Text>
        <View style={styles.main}>
          <TouchableOpacity>
            <View
              style={styles.button}
              onTouchStart={this.handleBuzz}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  name: {
    color: '#000',
    fontSize: 30,
    textAlign: 'center',
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -100,
  },
  button: {
    backgroundColor: '#ffae27',
    borderRadius: 100,
    height: 200,
    width: 200,
  },
})
