import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'
import { path } from 'ramda'
import BiathlonScores from '../components/BiathlonScores'

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
            {finalAnswer !== 'b' &&
            <TouchableOpacity>
              <View
                style={styles.button}
                onTouchStart={() => this.handleBuzz('a')}
              >
                <Text style={styles.text}>{answerA}</Text>
              </View>
            </TouchableOpacity>}
            {finalAnswer === 'b' &&
            <View
              style={styles.buttonDisabled}
            >
              <Text style={styles.text}>{answerA}</Text>
            </View>}
          </View>
          <View style={styles.buttonView}>
            {finalAnswer !== 'a' &&
            <TouchableOpacity>
              <View
                style={styles.buttonRight}
                onTouchStart={() => this.handleBuzz('b')}
              >
                <Text style={styles.text}>{answerB}</Text>
              </View>
            </TouchableOpacity>}
            {finalAnswer === 'a' &&
            <View
              style={styles.buttonDisabled}
            >
              <Text style={styles.text}>{answerB}</Text>
            </View>}
          </View>
        </View>
      </View>
    )
  }
}

const button = {
  alignItems: 'center',
  backgroundColor: '#EF7C4A',
  borderRadius: Dimensions.get('window').width,
  justifyContent: 'center',
  height: '100%',
  padding: 10,
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
    height: Dimensions.get('window').width / 2 - 20,
    width: Dimensions.get('window').width / 2 - 20,
  },
  button,
  buttonRight: {
    ...button,
    backgroundColor: '#4999DB',
  },
  buttonDisabled: {
    ...button,
    backgroundColor: '#ddd',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
})

export default compose(
  firebaseConnect(({ play }) => [
    { path: `finalTourRounds/${path(['currentFinalRoundKey'], play)}` },
  ]),
  connect(({ auth, firebase }, { play }) => ({
    round: path(['data', 'finalTourRounds', path(['currentFinalRoundKey'], play)], firebase),
  })),
)(TourBiathlon)
