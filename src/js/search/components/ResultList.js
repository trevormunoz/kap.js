import React, { Component, PropTypes } from 'react';

class ResultList extends Component {
  constructor(props) {
    super(props);
    this.renderResult = this.renderResult.bind(this);
  }

  render() {
    const { isFetching, total, items } = this.props;
    return (
      <div className="result-list">
        {isFetching && total === 0 &&
          <h4>Loading …</h4>
        }
        {!isFetching && total === 0 &&
          <h4>No results</h4>
        }
        {items.length > 0 &&
          <div className="results" style={{ opacity: isFetching ? 0.5 : 1 }}>
            <div className="search-stats"><em>{total} results</em></div>
            <ul>{items.map(this.renderResult)}</ul>
          </div>
        }
      </div>
    )
  }

  renderResult(result) {
    return (
      <div key={result._id} className="result">
        <figure><img src={result._source.thumbnails[0]} alt="1st page thumbnail"></img></figure>
        <div className="result-body">
          <h4><a href={result.linkAddr}>{result._source.title}</a></h4>
          <p><em>{result._source.size} page(s)</em></p>
        </div>
      </div>
    );
  }
}

ResultList.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  queryType: PropTypes.string,
  total: PropTypes.number,
  value: PropTypes.string.isRequired
};

export default ResultList;
