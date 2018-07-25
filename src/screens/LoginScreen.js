import React from 'react'
import { AsyncStorage, Button, StyleSheet, TextInput, View } from 'react-native'

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Не тупи!',
  }

  constructor() {
    super()
    this.state = {
      userName: '',
    }
  }

  handleEnter = async () => {
    const { userName } = this.state
    if (userName) {
      await AsyncStorage.setItem('userName', userName)
      this.props.navigation.navigate('App')
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Название команды"
          value={this.state.userName}
          onChangeText={(userName) => this.setState({ userName })}
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
