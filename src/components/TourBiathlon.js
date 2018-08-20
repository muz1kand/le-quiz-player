import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'
import { path } from 'ramda'
import Button from '../components/Button'
import BiathlonScores from '../components/BiathlonScores'
import colors from '../constants/colors'
import layout from '../constants/layout'

class TourBiathlon extends React.Component {
  handleBuzz = async (answer) => {
    const { play, playKey, playerKey } = this.props
    const isPlaying = path(['isPlaying'], play)
    const finalAnswer = path(['finalAnswers', playerKey], play)
    if (!isPlaying || finalAnswer) {
      return
    }
    try {
      await this.props.firebase.update(`plays/${playKey}/finalAnswers`, {
        [playerKey]: answer,
      })
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    const { play, playerKey, round } = this.props
    const answerA = path(['answers', 'a'], round)
    const answerB = path(['answers', 'b'], round)
    const finalAnswer = path(['finalAnswers', playerKey], play)
    const finalAnswers = path(['players', playerKey, 'finalAnswers'], play)
    return (
      <View style={styles.container}>
        <View style={styles.scores}>
          <BiathlonScores scores={finalAnswers}/>
        </View>
        <View style={styles.buttons}>
          <View style={styles.buttonView}>
            <Button
              disabled={finalAnswer === 'b'}
              size={layout.window.width / 2 - 20}
              onTouchStart={() => this.handleBuzz('a')}
            >
              <Text style={styles.text}>{answerA}</Text>
            </Button>
          </View>
          <View style={styles.buttonView}>
            <Button
              color={colors.secondary}
              disabled={finalAnswer === 'a'}
              size={layout.window.width / 2 - 20}
              onTouchStart={() => this.handleBuzz('b')}
            >
              <Text style={styles.text}>{answerB}</Text>
            </Button>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginLeft: 15,
    marginRight: 15,
  },
  scores: {
    marginBottom: 20,
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonView: {
    height: layout.window.width / 2,
    width: layout.window.width / 2 - 20,
  },
  text: {
    color: '#fff',
    fontSize: layout.window.width / 20,
    padding: 10,
    textAlign: 'center',
  },
})

TourBiathlon.propTypes = {
  firebase: PropTypes.object,
  play: PropTypes.object,
  playerKey: PropTypes.string,
  round: PropTypes.object,
}

export default compose(
  firebaseConnect(({ play }) => [
    { path: `finalTourRounds/${path(['currentFinalRoundKey'], play)}` },
  ]),
  connect(({ auth, firebase }, { play }) => ({
    round: path(['data', 'finalTourRounds', path(['currentFinalRoundKey'], play)], firebase),
  })),
)(TourBiathlon)
