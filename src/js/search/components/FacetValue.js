import React, { Component, PropTypes } from 'react';

class FacetValue extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleContainerClick = this.handleContainerClick.bind(this);
  }

  handleChange(event) {
    const { name } = this.props;
    this.props.childClickCallback(name);
  }

  // Capture clicks anywhere on the list item
  handleContainerClick(event) {
    if (event.target.tagName !== 'INPUT') {
      this.handleChange();
    }
  }

  render() {
    const {name, count, selected} = this.props;
    return (
      <li key={name} onClick={this.handleContainerClick}>
        <input type="checkbox" disabled={count < 1} checked={selected} onChange={this.handleChange}></input>
        {name}
        <span className="facet-count">({count})</span>
      </li>
    );
  }

}

FacetValue.propTypes = {
  name: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
  childClickCallback: PropTypes.func.isRequired
}

export default FacetValue;
