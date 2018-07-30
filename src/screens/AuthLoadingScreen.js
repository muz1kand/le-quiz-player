import React from 'react'
import { ActivityIndicator, AsyncStorage, StyleSheet, Text, View } from 'react-native'
import auth from '../auth'
import { connect } from 'react-redux'
import { login, load as loadAuth } from '../redux/modules/auth'

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props)
    this._bootstrapAsync()
  }

  _bootstrapAsync = async () => {
    const playerKey = await AsyncStorage.getItem('playerKey')
    if (playerKey) {
      this.props.login(playerKey)
    }
    auth(playerKey, this.props.navigation)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
        <ActivityIndicator/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const mapStateToProps = state =>
  ({
    auth: state.auth,
  })

const mapDispatchToProps = dispatch =>
  ({
    loadAuth() {
      dispatch(
        loadAuth(),
      )
    },
    login(playerKey) {
      dispatch(
        login(playerKey),
      )
    },
  })

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen)
