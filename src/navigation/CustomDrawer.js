import React from 'react'
import { Button, ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-navigation'

export default class CustomDrawer extends React.Component {

  handleChangeGame = () => {
    this.props.navigation.navigate('Game')
  }

  handleLogout = () => {
    this.props.navigation.navigate('Auth')
  }

  render() {
    return (
      <ScrollView>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
          <Button
            title="Войти в другую игру"
            onPress={this.handleChangeGame}
          />
          <Button
            title="Сменить команду"
            onPress={this.handleLogout}
          />
        </SafeAreaView>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
})
