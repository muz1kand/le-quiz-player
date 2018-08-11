import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'
import { path } from 'ramda'
import tours from '../constants/tours'
import TourJeopardy from './TourJeopardy'
import TourBiathlon from './TourBiathlon'

class Tour extends React.Component {
  render() {
    const { tour } = this.props
    const type = path(['type'], tour)

    switch (type) {
      case tours.numbers:
        return <TourJeopardy {...this.props}/>
      case tours.biathlon:
        return <TourBiathlon {...this.props}/>
      case tours.jeopardy:
      default:
        return <TourJeopardy {...this.props}/>
    }
  }
}

export default compose(
  firebaseConnect(({ tourKey }) => [
    { path: `tours/${tourKey}` },
  ]),
  connect(({ auth, firebase }, { tourKey }) => ({
    tour: path(['data', 'tours', tourKey], firebase),
  })),
)(Tour)
