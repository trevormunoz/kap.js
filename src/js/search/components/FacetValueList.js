import React, { Component, PropTypes } from 'react';
import FacetValue from './FacetValue';

class FacetValueList extends Component {
  constructor(props) {
    super(props);
    this.renderValue = this.renderValue.bind(this);
    this.childClickCallback = this.childClickCallback.bind(this);
    this.checkSelected = this.checkSelected.bind(this);
  }

  childClickCallback(value) {
    const { facetType } = this.props;
    this.props.callback(facetType, value);
  }

  checkSelected(value) {
    const { activeFilters } = this.props
    if (activeFilters.indexOf(value) !== -1) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <ul>
        { this.props.values.map(this.renderValue) }
      </ul>
    );
  }

  renderValue(value, index) {
    return (
      <FacetValue
        key={index}
        name={value.key}
        count={value.doc_count}
        selected={this.checkSelected(value.key)}
        childClickCallback={this.childClickCallback}
      />
    );
  }
}

FacetValueList.propTypes = {
  facetType: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  activeFilters: PropTypes.array.isRequired,
  callback: PropTypes.func.isRequired
}

export default FacetValueList;
