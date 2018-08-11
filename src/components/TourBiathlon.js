import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'
import { path } from 'ramda'

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
    const { round } = this.props
    const answerA = path(['answers', 'a'], round)
    const answerB = path(['answers', 'b'], round)
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <TouchableOpacity>
            <View
              style={styles.button}
              onTouchStart={this.handleBuzz}
            >
              <Text style={styles.text}>{answerA}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.main}>
          <TouchableOpacity>
            <View
              style={styles.button1}
              onTouchStart={this.handleBuzz}
            >
              <Text style={styles.text}>{answerB}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    marginLeft: 15,
    marginRight: 15,
  },
  main: {
    height: Dimensions.get('window').width / 2 - 25,
    width: Dimensions.get('window').width / 2 - 25,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#00f',
    borderRadius: Dimensions.get('window').width,
    justifyContent: 'center',
    height: '100%',
  },
  button1: {
    alignItems: 'center',
    backgroundColor: '#ffae27',
    borderRadius: Dimensions.get('window').width,
    justifyContent: 'center',
    height: '100%',
  },
  text: {
    color: '#fff',
    fontSize: 20,
  }
})

export default compose(
  firebaseConnect(({ play }) => [
    { path: `finalTourRounds/${path(['currentFinalRoundKey'], play)}` },
  ]),
  connect(({ auth, firebase }, { play }) => ({
    round: path(['data', 'finalTourRounds', path(['currentFinalRoundKey'], play)], firebase),
  })),
)(TourBiathlon)
