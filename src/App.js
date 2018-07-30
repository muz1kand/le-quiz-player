import React from 'react'
import { Provider } from 'react-redux'
import createStore from './redux/create'
import Root from './Root'
const store = createStore()

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Root/>
      </Provider>
    )
  }
}
