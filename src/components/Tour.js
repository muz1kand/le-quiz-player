import React from 'react'
import PropTypes from 'prop-types'
import { ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'
import { path } from 'ramda'
import tours from '../constants/tours'
import TourJeopardy from './TourJeopardy'
import TourBiathlon from './TourBiathlon'
import TourNumbers from './TourNumbers'
import TourStakes from './TourStakes'

class Tour extends React.Component {
  render() {
    const { tour } = this.props
    const type = path(['type'], tour)

    switch (type) {
    case tours.biathlon:
      return <TourBiathlon {...this.props}/>
    case tours.jeopardy:
      return <TourJeopardy {...this.props}/>
    case tours.numbers:
      return <TourNumbers {...this.props}/>
    case tours.stakes:
      return <TourStakes {...this.props}/>
    default:
      return <ActivityIndicator/>
    }
  }
}

Tour.propTypes = {
  tour: PropTypes.object,
}

export default compose(
  firebaseConnect(({ tourKey }) => [
    { path: `tours/${tourKey}` },
  ]),
  connect(({ auth, firebase }, { tourKey }) => ({
    tour: path(['data', 'tours', tourKey], firebase),
  })),
)(Tour)
