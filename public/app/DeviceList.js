import React, { Component } from 'react'
import Message from './Message'

export default class DeviceList extends Component {
  constructor () {
    super()
    this.state = {
      devices: [],
      isLoading: true
    }
  }
  componentDidMount () {
    fetch('/api/devices')
    .then(response => response.json())
    .then(json => {
      this.setState({
        devices: json,
        isLoading: false,
        modalIsOpen: false,
        activeItem: {name: ''}
      })
    })
  }

  _renderList (list) {
    return list.map((item, index) => {
      return (
        <li className="list-item" key={index}>
          <div className="device-name" onClick={() => this.openModal(item)}>{item.name} {' ' + item.deviceToken + ' ' + item._id }</div>
          <div className="close-button" onClick={() => this._handleDelete(item._id)}>X</div>
        </li>
      )
    })
  }

  openModal(item)  {
    this.setState({
      activeItem: item,
      modalIsOpen: true
    })
  }

  closeModal() {
    this.setState({modalIsOpen: false})
  }

  sendPush(title, body) {
    fetch('/api/send_push', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        body,
        deviceToken: this.state.activeItem.deviceToken
      })
    })
    .then(response => response.json())
    .then(json => {
      console.log(json)
    })
  }

  _handleDelete (id) {
    console.log('hello mate', id)
    fetch('/api/devices/' + id, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(json => {
      console.log(json)
      if(json.status === 'OK') {
        const newList = this.state.devices.filter(item => item._id !== id)
        this.setState({
          devices: newList
        })
      } else {
        console.log('couldn\'t delete')
      }
    })
  }


	render () {
    if (this.state.isLoading) {
      return(<div>Loading...</div>)
    }

		return(
      <div>
        <ul className="list">
          {this._renderList(this.state.devices)}
        </ul>
        <Message
          modalIsOpen={this.state.modalIsOpen}
          openModal={() => this.openModal()}
          closeModal={() => this.closeModal()}
          deviceName={this.state.activeItem.name}
          sendPush={(title, body) => this.sendPush(title, body)}
        />
      </div>
    )
	}
}