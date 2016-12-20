import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import FacetValueList from '../components/FacetValueList';
import ModeLink from '../components/ModeLink';
import { changeFacetMode } from '../actions/search';

class FacetPanel extends Component {
  constructor(props) {
    super(props);
    this.modeCallback = this.modeCallback.bind(this);
  }

  modeCallback() {
    const { dispatch } = this.props;
    const updatedMode = this.props.mode === 'list'
    ? 'chart'
    : 'list';
    dispatch(changeFacetMode(updatedMode));
  }

  render() {
    const { filters } = this.props;
    return (
      <div className="facet-panel-inner">
        <div className="facet-panel-body">
          {this.props.mode === 'list' &&
            <FacetValueList
              facetType={this.props.facetType}
              values={this.props.values}
              activeFilters={filters[this.props.facetType]}
              callback={this.props.callback}
            />
          }
          {this.props.mode === 'chart' &&
            <img src="http://placehold.it/320x200.png" role="presentation"></img>
          }
        </div>
        <div className="facet-panel-footer">
          <ModeLink mode={this.props.mode} onClickCallback={this.modeCallback}/>
        </div>
      </div>
    );
  }
}

FacetPanel.propTypes = {
  facetType: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  callback: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    mode: state.filter.uiMode,
    filters: state.filter.activeFiltersByType
  }
}

export default connect(mapStateToProps)(FacetPanel);
