import React from 'react'
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'
import { path } from 'ramda'

class TourJeopardy extends React.Component {
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
    return (
      <View style={styles.main}>
        <TouchableOpacity>
          <View
            style={styles.button}
            onTouchStart={this.handleBuzz}
          />
        </TouchableOpacity>
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
  button: {
    backgroundColor: '#ffae27',
    borderRadius: (Dimensions.get('window').width - 50) / 2,
    height: Dimensions.get('window').width - 50,
    width: Dimensions.get('window').width - 50,
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
