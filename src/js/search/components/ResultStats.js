import React, { Component, PropTypes } from 'react';

class ResultStats extends Component {
  render() {
    const { from, pageSize, total } = this.props;
    return (
      <div className="search-stats">
        {total < pageSize
          ? <em>Displaying results {from + 1} to {total} of {total} total results</em>
          : <em>Displaying results {from + 1} to {from + pageSize} of {total} total results</em>
        }
      </div>
    );
  }
}

ResultStats.propTypes = {
  total: PropTypes.number.isRequired,
  from: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired
}

export default ResultStats;
