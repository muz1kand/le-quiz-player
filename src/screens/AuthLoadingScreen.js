import React from 'react'
import { ActivityIndicator, AsyncStorage, StyleSheet, Text, View } from 'react-native'
import auth from '../auth'

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props)
    this._bootstrapAsync()
  }

  _bootstrapAsync = async () => {
    const playerKey = await AsyncStorage.getItem('playerKey')
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
