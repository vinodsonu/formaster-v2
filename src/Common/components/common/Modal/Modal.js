import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'
import {observer} from 'mobx-react'


@observer
class ReactModal extends Component {
  state = { open: false }

  show = (size) => () => this.setState({ size, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open, size } = this.state

    return (
      <div className="h-screen" data-testid="modal-body">
        <Button onClick={this.show('mini')} data-testid="mini-modal">Mini</Button>
        <Button onClick={this.show('tiny')}>Tiny</Button>
        <Button onClick={this.show('small')}>Small</Button>
        <Button onClick={this.show('large')}>Large</Button>
        <Button onClick={this.show('fullscreen')}>Fullscreen</Button>

        <Modal size={size} open={open} onClose={this.close}>
          <Modal.Header>Delete Your Account</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete your account</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative>No</Button>
            <Button
              positive
              icon='checkmark'
              labelPosition='right'
              content='Yes'
            />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export {ReactModal}