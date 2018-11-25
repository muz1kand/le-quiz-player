import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import Button from '../components/Button'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'
import { path } from 'ramda'
import layout from '../constants/layout'

class TourJeopardy extends React.Component {
  constructor() {
    super()
    this.state = {
      answerValue: '',
      stakeErrorMin: false,
      stakeErrorMax: false,
      stakeValue: '',
    }
  }

  handleStakeChange = (value) => {
    this.setState({
      stakeValue: value,
      stakeErrorMin: false,
      stakeErrorMax: false,
    })
  }

  handleStakeSubmit = async () => {
    const { play, playKey, playerKey } = this.props
    const stakeValue = parseInt(this.state.stakeValue, 10)
    const currentTourKey = path(['currentTourKey'], play)
    const score = path(['players', playerKey, 'score'], play)

    if (stakeValue > score) {
      this.setState({
        stakeErrorMax: true,
      })
    } else if (stakeValue <= 0) {
      this.setState({
        stakeErrorMin: true,
      })
    } else {
      try {
        this.props.firebase.update(`plays/${playKey}/tours/${currentTourKey}/answers/${playerKey}`, {
          stake: stakeValue,
        })
        this.setState({
          stakeValue: '',
        })
      } catch (e) {
        console.log(e)
      }
    }
  }

  handleAnswerChange = (value) => {
    this.setState({ answerValue: value })
  }

  handleAnswerSubmit = async () => {
    const { play, playKey, playerKey } = this.props
    const { answerValue } = this.state
    const currentTourKey = path(['currentTourKey'], play)

    if (answerValue) {
      try {
        this.props.firebase.update(`plays/${playKey}/tours/${currentTourKey}/answers/${playerKey}`, {
          answer: answerValue,
        })
        this.setState({
          answerValue: '',
        })
      } catch (e) {
        console.log(e)
      }
    }
  }

  render() {
    const { play, playerKey } = this.props
    const {
      answerValue,
      stakeErrorMin,
      stakeErrorMax,
      stakeValue,
    } = this.state
    const currentTourKey = path(['currentTourKey'], play)
    const stake = path(['tours', currentTourKey, 'answers', playerKey, 'stake'], play)
    const answer = path(['tours', currentTourKey, 'answers', playerKey, 'answer'], play)
    const score = path(['players', playerKey, 'score'], play)
    return (
      <View style={styles.main}>
        {stake &&
        <View style={styles.answerBlock}>
          <Text style={styles.answer}>Ставка:</Text>
          <Text style={styles.answer}>{stake}</Text>
        </View>}
        {answer &&
        <View style={styles.answerBlock}>
          <Text style={styles.answer}>Ваш ответ:</Text>
          <Text style={styles.answer}>{answer}</Text>
        </View>}
        {!stake &&
        <View style={styles.form}>
          <TextInput
            keyboardType='numeric'
            underlineColorAndroid="transparent"
            style={styles.input}
            placeholder="Ставка"
            value={stakeValue}
            onChangeText={this.handleStakeChange}
            onSubmitEditing={this.handleStakeSubmit}
          />
          {stakeErrorMin &&
          <Text style={styles.error}>Ставка должна быть больше 0</Text>}
          {stakeErrorMax &&
          <Text style={styles.error}>Ставка не может быть больше {score}</Text>}
          <Button
            size={layout.window.width / 2}
            onTouchStart={this.handleStakeSubmit}
          >
            <Text style={styles.text}>Поставить</Text>
          </Button>
        </View>}
        {stake && !answer &&
        <View style={styles.form}>
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.input}
            placeholder="Ваш ответ"
            value={answerValue}
            onChangeText={this.handleAnswerChange}
            onSubmitEditing={this.handleAnswerSubmit}
          />
          <Button
            size={layout.window.width / 2}
            onTouchStart={this.handleAnswerSubmit}
          >
            <Text style={styles.text}>Ответить</Text>
          </Button>
        </View>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {},
  form: {
    alignItems: 'center',
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
  error: {
    color: '#f00',
    marginBottom: 20,
  },
  text: {
    color: '#fff',
    fontSize: layout.window.width / 20,
    padding: 10,
    textAlign: 'center',
  },
  answerBlock: {
    marginBottom: 20,
  },
  answer: {
    color: '#000',
    fontSize: 30,
    textAlign: 'center',
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
