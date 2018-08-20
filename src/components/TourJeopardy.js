import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import Button from '../components/Button'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'
import { path } from 'ramda'
import layout from '../constants/layout'

class TourJeopardy extends React.Component {
  handleBuzz = async () => {
    const { play, player, playerKey } = this.props
    const isPlaying = path(['isPlaying'], play)
    const currentPlayer = path(['player'], play)
    const activePlayKey = path(['activePlayKey'], player)
    const disabled = path(['blockedPlayers', playerKey], play)
    if (disabled || currentPlayer || !isPlaying) {
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
    const disabled = path(['blockedPlayers', playerKey], play)
    return (
      <View style={styles.main}>
        <Button
          disabled={disabled}
          size={layout.window.width - 50}
          onTouchStart={this.handleBuzz}
        />
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
  },
})

TourJeopardy.propTypes = {
  firebase: PropTypes.object,
  play: PropTypes.object,
  playerKey: PropTypes.string,
}

export default compose(
  firebaseConnect(({ tourKey }) => [
    { path: `tours/${tourKey}` },
  ]),
  connect(({ auth, firebase }, { tourKey }) => ({
    tour: path(['data', 'tours', tourKey], firebase),
  })),
)(TourJeopardy)
