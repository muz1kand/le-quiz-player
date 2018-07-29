import React from 'react'
import { AsyncStorage, Button, StyleSheet, TextInput, View } from 'react-native'

import firebase from '../firebase'
import auth from '../auth'

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Не тупи!',
  }

  constructor() {
    super()
    this.state = {
      playerName: '',
    }
  }

  handleEnter = async () => {
    const { playerName } = this.state
    const playerKey = firebase.database().ref().child('players').push({
      name: playerName,
    }).key
    if (playerName) {
      await AsyncStorage.setItem('playerKey', playerKey)
      auth(playerKey, this.props.navigation)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Название команды"
          value={this.state.playerName}
          onChangeText={(playerName) => this.setState({ playerName })}
          onSubmitEditing={this.handleEnter}
        />
        <Button
          title="Войти"
          onPress={this.handleEnter}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
