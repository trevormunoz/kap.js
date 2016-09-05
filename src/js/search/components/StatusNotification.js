import React, { Component, PropTypes } from 'react';

// TOFIX: Make this more reusable
class StatusNotification extends Component {
  getStatus(msg) {
    return {
      'No Living connections': 'Search server unavailable. Please try again later.'
    }[msg];
  }

  render() {
    return (
      <p className="msg error">{this.getStatus(this.props.message)}</p>
    );
  }
}

StatusNotification.propTypes = {
  status: PropTypes.string.isRequired,
  message: PropTypes.string
};

export default StatusNotification;
