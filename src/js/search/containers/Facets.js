import React, { Component } from 'react';
import { connect } from 'react-redux';
import FacetValueList from '../components/FacetValueList';
import { selectFacet, clearAllFacets } from '../actions/search';

class Facets extends Component {
  constructor(props) {
    super(props);
    this.renderFacet = this.renderFacet.bind(this);
    this.mapFacetTypeToKey = this.mapFacetTypeToKey.bind(this);
    this.facetChangeCallback = this.facetChangeCallback.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  mapFacetTypeToKey(name) {
    return {
      recipients: 'recipient',
      decades: 'year',
      locations: 'continent'
    }[name];
  }

  facetChangeCallback(type, value) {
    const { dispatch } = this.props;
    dispatch(selectFacet(type, value));
  }

  handleReset(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    dispatch(clearAllFacets())
  }

  render() {
    const { facets } = this.props;
    const facetNames = Object.keys(facets);
    return (
      <div className="search-facets">
        <div className="facet-contents">
          { facetNames.map(this.renderFacet) }
        </div>
        <div className="facet-controls">
          <div><a onClick={this.handleReset}>clear filters</a></div>
        </div>
      </div>
    );
  }

  renderFacet(facetName) {
    const { facets, filters } = this.props;

    const facetDisplayName = facetName.toUpperCase();
    const facetType = this.mapFacetTypeToKey(facetName);

    return (
      <div key={facetName} className="facet">
        <h4>{facetDisplayName}</h4>
        <FacetValueList
          facetType={facetType}
          values={facets[facetName].buckets}
          activeFilters={filters[facetType]}
          callback={this.facetChangeCallback}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    facets: state.query.facets,
    filters: state.filter.activeFiltersByType
  }
}

export default connect(mapStateToProps)(Facets);
