import React from 'react'
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'
import { path } from 'ramda'

class TourJeopardy extends React.Component {
  handleBuzz = async () => {
    const { play, player, playerKey } = this.props
    const isPlaying = path(['isPlaying'], play)
    const currentPlayer = path(['player'], play)
    const activePlayKey = path(['activePlayKey'], player)
    const isBlocked = path(['blockedPlayers', playerKey], play)
    if (isBlocked || currentPlayer || !isPlaying) {
      return
    }
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
    const { play, playerKey } = this.props
    const isBlocked = path(['blockedPlayers', playerKey], play)
    return (
      <View style={styles.main}>
        {!isBlocked &&
        <TouchableOpacity>
          <View
            style={styles.button}
            onTouchStart={this.handleBuzz}
          />
        </TouchableOpacity>}
        {isBlocked &&
        <View
          style={styles.buttonDisabled}
        />}
      </View>
    )
  }
}

const button = {
  backgroundColor: '#EF7C4A',
  borderRadius: (Dimensions.get('window').width - 50) / 2,
  height: Dimensions.get('window').width - 50,
  width: Dimensions.get('window').width - 50,
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
  },
  button,
  buttonDisabled: {
    ...button,
    backgroundColor: '#ddd',
  },
})

export default compose(
  firebaseConnect(({ tourKey }) => [
    { path: `tours/${tourKey}` },
  ]),
  connect(({ auth, firebase }, { tourKey }) => ({
    tour: path(['data', 'tours', tourKey], firebase),
  })),
)(TourJeopardy)
