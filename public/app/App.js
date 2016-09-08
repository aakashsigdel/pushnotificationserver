import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import DeviceList from './DeviceList'

class App extends Component {
  componentDidMount () {
    fetch('/api/devices')
    .then(response => response.json())
    .then(json => console.log(json))
  }

	render () {
		return (
			<div>{<DeviceList />}</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'))