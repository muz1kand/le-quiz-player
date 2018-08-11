import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'
import { path } from 'ramda'
import Play from './Play'

class Player extends React.Component {
  render() {
    const { player, playerKey } = this.props
    const playKey = path(['activePlayKey'], player)
    return (
      <Play
        playKey={playKey}
        player={player}
        playerKey={playerKey}
      />
    )
  }
}

export default compose(
  firebaseConnect(({ playerKey }) => [
    { path: `players/${playerKey}` },
  ]),
  connect(({ auth, firebase }, { playerKey }) => ({
    player: path(['data', 'players', playerKey], firebase),
  })),
)(Player)
