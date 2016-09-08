import React, { Component } from 'react'
import Modal from 'react-modal'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export default class Message extends Component {
	constructor () {
		super()
		this.state = {
			title: '',
			body: ''
		}
	}

	sendPush () {
		console.log(this.state)
		this.props.sendPush(this.state.title, this.state.body)

	}

	render () {
		return (
		<Modal
          isOpen={this.props.modalIsOpen}
          onRequestClose={this.props.closeModal}
          style={customStyles} >

          <h2 ref="subtitle">{'Push to ' + this.props.deviceName}</h2>
          <button onClick={this.props.closeModal}>close</button>
            Title:<input onChange={(event) => {this.setState({title: event.target.value})}}/>
            Body:<input onChange={(event) => {this.setState({body: event.target.value})}}/>
            <button onClick={() => this.sendPush()}>Send</button>
        </Modal>
		)
	}
}