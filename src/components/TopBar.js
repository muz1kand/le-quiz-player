import React from 'react'
import { StyleSheet, View } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'

class TopBar extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Ionicons
          name="md-menu"
          size={32}
          color="#aaa"
          onPress={() => this.props.navigation.openDrawer()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 30,
    paddingLeft: 20,
    zIndex: 10,
  },
})

export default withNavigation(TopBar)
