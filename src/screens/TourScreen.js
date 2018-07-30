import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import TopBar from '../components/TopBar'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'
import { path } from 'ramda'

class TourScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Текущий тур',
  }

  handleBuzz = async () => {
    const { players, playerKey } = this.props
    const activePlayKey = path([playerKey, 'activePlayKey'], players)
    try {
      await this.props.firebase.update(`plays/${activePlayKey}`, {
        isPlaying: false,
        player: playerKey,
      })
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    const { players, playerKey } = this.props
    const name = path([playerKey, 'name'], players)
    const activePlayKey = path([playerKey, 'activePlayKey'], players)
    return (
      <View style={styles.container}>
        <TopBar/>
        <Text style={styles.name}>{name}</Text>
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
    borderRadius: (Dimensions.get('window').width - 50) / 2,
    height: Dimensions.get('window').width - 50,
    width: Dimensions.get('window').width - 50,
  },
})

export default compose(
  firebaseConnect((props) => [
    { path: 'players' },
  ]),
  connect(({ auth, firebase }) => ({
    players: firebase.data['players'],
    playerKey: auth.playerKey,
  })),
)(TourScreen)
