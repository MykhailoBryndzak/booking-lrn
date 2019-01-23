import React, {Component} from 'react';
import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';

import './Events.css';

class EventsPage extends Component {
  state = {
    creating: false,
  };

  startEventHandler = () => {
    this.setState({
      creating: true
    })
  };

  modalConfirmHandler = () => {
    this.setState({
      creating: false
    })
  };
  modalCancelHandler = () => {
    this.setState({
      creating: false
    })
  };

  render() {
    return (
      <React.Fragment>
        {this.state.creating &&
        <React.Fragment>
          <Backdrop/>
          <Modal
            title="Add Event"
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalConfirmHandler}>
            <p> Modal Content</p>
          </Modal>
        </React.Fragment>
        }
        <div className="events-control">
          <p>Share your own events!</p>
          <button className="btn" onClick={this.startEventHandler}>Create Event</button>
        </div>
      </React.Fragment>
    );
  }
}

export default EventsPage;
