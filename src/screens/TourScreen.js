import React from 'react'
import { StyleSheet, View } from 'react-native'
import TopBar from '../components/TopBar'
import Player from '../components/Player'
import { connect } from 'react-redux'
import { compose } from 'redux'

class TourScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Текущий тур',
  }

  render() {
    const { playerKey } = this.props
    return (
      <View style={styles.container}>
        <TopBar/>
        <View style={styles.main}>
          <Player playerKey={playerKey}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

export default compose(
  connect(({ auth }) => ({
    playerKey: auth.playerKey,
  })),
)(TourScreen)
