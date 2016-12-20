import React, { Component, PropTypes } from 'react';

class ModeLink extends Component {
  render() {
    return (
      <div className="panel-controls">
        {this.props.mode === 'list' &&
          <a onClick={this.props.onClickCallback}>view as chart</a>
        }
        {this.props.mode === 'chart' &&
          <a onClick={this.props.onClickCallback}>view as list</a>
        }
      </div>
    );
  }
}

ModeLink.propTypes = {
  mode: PropTypes.string.isRequired,
  onClickCallback: PropTypes.func.isRequired
}

export default ModeLink
