import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'
import { path } from 'ramda'
import Tour from '../components/Tour'

class Play extends React.Component {
  render() {
    const { play, playKey, player, playerKey } = this.props
    const name = path(['name'], player)
    const score = path(['players', playerKey, 'score'], play)
    const tourKey = path(['currentTourKey'], play)
    return (
      <View style={styles.container}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.score}>{score}</Text>
        <View style={styles.main}>
          <Tour
            tourKey={tourKey}
            play={play}
            playKey={playKey}
            player={player}
            playerKey={playerKey}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {},
  name: {
    color: '#000',
    fontSize: 30,
    textAlign: 'center',
  },
  score: {
    color: '#000',
    fontSize: 30,
    textAlign: 'center',
  },
  main: {
    paddingTop: 20,
  },
})

export default compose(
  firebaseConnect(({ playKey }) => [
    { path: `plays/${playKey}` },
  ]),
  connect(({ auth, firebase }, { playKey }) => ({
    play: path(['data', 'plays', playKey], firebase),
  })),
)(Play)
