import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import TopBar from '../components/TopBar'
import { path } from 'ramda'

class GameScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Игра',
  }

  constructor() {
    super()
    this.state = {
      pin: '',
      pinError: false,
    }
  }

  handleChangePin = (pin) => {
    this.setState({ pin, pinError: false })
  }

  handleEnterPin = async () => {
    const { playerKey } = this.props
    let { pin } = this.state
    if (!pin) {
      return
    }

    let playKey = ''
    const pinUppercase = pin.toUpperCase()
    const snapshot = await this.props.firebase.ref('plays').orderByChild('pin').equalTo(pinUppercase).once('value')
    snapshot.forEach((play) => {
      playKey = play.key
      const isUserInPlay = path(['players', playerKey], play)
      if (!isUserInPlay) {
        this.props.firebase.update(`${'plays'}/${playKey}/players/${playerKey}`, {
          score: 0,
        })
      }
      this.props.firebase.update(`${'players'}/${playerKey}`, {
        activePlayKey: playKey,
      })
      this.props.navigation.navigate('Tour')
    })

    if (!playKey) {
      this.setState({
        pinError: true,
      })
    }
  }

  render() {
    const { pinError } = this.state
    const name = path(['name'], this.props.player)
    return (
      <View style={styles.container}>
        <TopBar/>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.main}>
          {pinError &&
          <Text>Неправильный PIN</Text>}
          <TextInput
            autoCapitalize="none"
            style={styles.input}
            placeholder="PIN игры"
            value={this.state.pin}
            onChangeText={this.handleChangePin}
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
    height: 40,
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

export default compose(
  firebaseConnect((props, store) => [
    { path: `players/${store.getState().auth.playerKey}` },
  ]),
  connect(({ auth, firebase }) => ({
    player: path(['data', 'players', auth.playerKey], firebase),
    playerKey: auth.playerKey,
  })),
)(GameScreen)
