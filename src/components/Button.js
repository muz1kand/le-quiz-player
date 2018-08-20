import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import colors from '../constants/colors'

class Button extends React.Component {
  constructor() {
    super()
    this.state = {
      pressed: false,
    }
  }

  handleTouchStart = () => {
    if (this.props.disabled) {
      return
    }

    this.setState({
      pressed: true,
    })

    if (this.props.onTouchStart) {
      this.props.onTouchStart()
    }
  }

  handleTouchEnd = () => {
    this.setState({
      pressed: false,
    })
  }

  render() {
    const { color, disabled, size } = this.props
    const { pressed } = this.state
    const buttonStyle = {
      justifyContent: 'center',
      backgroundColor: color,
      width: size,
      height: size,
      borderRadius: size / 2,
    }
    return (
      <View style={styles.main}>
        <View
          style={[buttonStyle, pressed && styles.pressed, disabled && styles.disabled]}
          onTouchStart={this.handleTouchStart}
          onTouchEnd={this.handleTouchEnd}
        >
          {this.props.children}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  disabled: {
    backgroundColor: '#ddd',
  },
  pressed: {
    top: 10,
  },
})

Button.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.number,
  onTouchStart: PropTypes.func,
}

Button.defaultProps = {
  color: colors.primary,
  size: 100,
}

export default Button
