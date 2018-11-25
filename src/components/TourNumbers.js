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
      value: '',
    }
  }

  handleValueChange = (value) => {
    this.setState({ value })
  }

  handleSubmit = async () => {
    const { play, playKey, playerKey } = this.props
    const value = parseInt(this.state.value, 10)
    const currentTourKey = path(['currentTourKey'], play)

    if (value > 0) {
      try {
        this.props.firebase.update(`plays/${playKey}/tours/${currentTourKey}/answers/`, {
          [playerKey]: {
            value,
          },
        })
        this.setState({
          value: null,
        })
      } catch (e) {
        console.log(e)
      }
    }
  }

  render() {
    const { play, playerKey } = this.props
    const currentTourKey = path(['currentTourKey'], play)
    const answer = path(['tours', currentTourKey, 'answers', playerKey, 'value'], play)
    return (
      <View style={styles.main}>
        {!answer &&
        <TextInput
          keyboardType='numeric'
          underlineColorAndroid="transparent"
          style={styles.input}
          placeholder="Ваш ответ"
          value={this.state.value}
          onChangeText={this.handleValueChange}
          onSubmitEditing={this.handleSubmit}
        />}
        {!answer &&
        <Button
          size={layout.window.width / 2}
          onTouchStart={this.handleSubmit}
        >
          <Text style={styles.text}>Ответить</Text>
        </Button>}
        {answer &&
        <View>
          <Text style={styles.answer}>Ваш ответ:</Text>
          <Text style={styles.answer}>{answer}</Text>
        </View>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
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
  text: {
    color: '#fff',
    fontSize: layout.window.width / 20,
    padding: 10,
    textAlign: 'center',
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
