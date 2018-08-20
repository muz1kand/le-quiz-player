import React from 'react'
import PropTypes from 'prop-types'
import { AsyncStorage, Button, StyleSheet, TextInput, View } from 'react-native'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'
import auth from '../helpers/auth'
import { connect } from 'react-redux'
import { login } from '../redux/modules/auth'

class LoginScreen extends React.Component {
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
    if (!playerName) {
      return
    }

    const res = await this.props.firebase.push('players', {
      name: playerName,
    })

    const playerKey = res.getKey()
    this.props.login(playerKey)
    await AsyncStorage.setItem('playerKey', playerKey)
    setTimeout(() => {
      auth(playerKey, this.props.navigation, this.props.firebase)
    }, 1)
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Название команды"
          value={this.state.playerName}
          maxLength={50}
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

const mapDispatchToProps = dispatch =>
  ({
    login(playerKey) {
      dispatch(
        login(playerKey),
      )
    },
  })

LoginScreen.propTypes = {
  firebase: PropTypes.object,
  navigation: PropTypes.object,
  login: PropTypes.func,
}

export default compose(
  firebaseConnect(),
  connect(null, mapDispatchToProps),
)(LoginScreen)
