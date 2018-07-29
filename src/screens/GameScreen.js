import React from 'react'
import { AsyncStorage, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import TopBar from '../components/TopBar'
import firebase from '../firebase'
import { path } from 'ramda'

export default class GameScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Игра',
  }

  constructor() {
    super()
    this.state = {
      playerName: '',
      pin: '',
    }
  }

  componentDidMount = async () => {
    const playerName = await AsyncStorage.getItem('playerName')
    this.setState({ playerName })
  }

  handleEnterPin = async () => {
    let { pin } = this.state
    if (!pin) {
      return
    }
    const playerKey = await AsyncStorage.getItem('playerKey')

    const pinUppercase = pin.toUpperCase()
    const snapshot = await firebase.database().ref('plays').orderByChild('pin').equalTo(pinUppercase).once('value')
    snapshot.forEach((data) => {
      const playKey = data.key
      const isUserInPlay = path([playKey, 'players', playerKey], data)
      if (!isUserInPlay) {
        firebase.database().ref(`plays/${playKey}/players/${playerKey}`).update({
          score: 0,
        })
      }
      firebase.database().ref(`players/${playerKey}`).update({
        activePlayKey: playKey,
      })
      this.props.navigation.navigate('Tour')
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TopBar/>
        <Text style={styles.name}>{this.state.playerName}</Text>
        <View style={styles.main}>
          <TextInput
            autoCapitalize="none"
            style={styles.input}
            placeholder="PIN игры"
            value={this.state.pin}
            onChangeText={(pin) => this.setState({ pin })}
            onSubmitEditing={this.handleEnterPin}
          />
          <Button
            onPress={this.handleEnterPin}
            title="Войти"
          />
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
  input: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    fontSize: 30,
    height: 40,
    marginBottom: 10,
    textAlign: 'center',
    width: '80%',
  },
})
