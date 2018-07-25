import React from 'react'
import { AsyncStorage, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import TopBar from '../components/TopBar'

export default class GameScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Игра',
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

  handleEnter = () => {
    this.props.navigation.navigate('Tour')
  }

  render() {
    return (
      <View style={styles.container}>
        <TopBar/>
        <Text style={styles.name}>{this.state.userName}</Text>
        <View style={styles.main}>
          <TextInput
            style={styles.input}
            placeholder="PIN игры"
          />
          <Button
            onPress={this.handleEnter}
            title="Войти"
          />
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
  input: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    fontSize: 30,
    height: 40,
    marginBottom: 10,
    textAlign: 'center',
    width: '80%',
  },
})
