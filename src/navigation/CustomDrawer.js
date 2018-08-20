import React from 'react'
import PropTypes from 'prop-types'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-navigation'

class CustomDrawer extends React.Component {
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
          <View style={styles.logo}>
            <Image
              source={require('../../assets/icon.png')}
              style={styles.logoImg}
            />
          </View>
          <View style={styles.menu}>
            <TouchableOpacity onPress={this.handleChangeGame}>
              <View style={styles.menuItem}>
                <Text style={styles.menuItemText}>ВОЙТИ В ДРУГУЮ ИГРУ</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handleLogout}>
              <View style={styles.menuItem}>
                <Text style={styles.menuItemText}>СМЕНИТЬ КОМАНДУ</Text>
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  logo: {
    alignItems: 'center',
  },
  logoImg: {
    height: 130,
    marginBottom: 20,
    width: 130,
  },
  menu: {
    borderTopColor: '#ddd',
    borderTopWidth: 1,
  },
  menuItem: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingBottom: 10,
    paddingTop: 10,
  },
  menuItemText: {
    fontSize: 16,
    textAlign: 'center',
  },
})

CustomDrawer.propTypes = {
  navigation: PropTypes.object,
}

export default CustomDrawer
