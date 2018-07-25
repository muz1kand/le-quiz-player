import React from 'react'
import { AsyncStorage, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import TopBar from '../components/TopBar'

export default class TourScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Текущий тур',
  }

  constructor() {
    super()
    this.state = {
      userName: '',
    }
  }

  componentDidMount = async () => {
    const userName = await AsyncStorage.getItem('userName')
    this.setState({ userName })
  }

  handleBuzz = () => {
    console.log('Buzz')
  }

  render() {
    return (
      <View style={styles.container}>
        <TopBar/>
        <Text style={styles.name}>{this.state.userName}</Text>
        <View style={styles.main}>
          <TouchableOpacity
            onPress={this.handleBuzz}>
            <View style={styles.button}/>
          </TouchableOpacity>
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
  name: {
    color: '#000',
    fontSize: 30,
    textAlign: 'center',
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -100,
  },
  button: {
    backgroundColor: '#ffae27',
    borderRadius: 100,
    height: 200,
    width: 200,
  },
})
