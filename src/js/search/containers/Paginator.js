import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pageResults } from '../actions/search';

class Paginator extends Component {
  constructor(props) {
    super(props);
    this.incrementPage = this.incrementPage.bind(this);
    this.decrementPage = this.decrementPage.bind(this);
  }

  incrementPage() {
    const { dispatch, offset, pageSize } = this.props;
    let newOffset = offset + pageSize;
    dispatch(pageResults(newOffset));
  }

  decrementPage() {
    const { dispatch, offset, pageSize } = this.props;
    let newOffset = offset - pageSize;
    dispatch(pageResults(newOffset));
  }

  render() {
    const { isFetching, total, offset, pageSize } = this.props;
    return (
      <div className="page-controls">
        {!isFetching && total > 0 &&
          <div className="page-controls-inner">
            {offset >= pageSize &&
              <a className="button" onClick={this.decrementPage}>Previous</a>
            }
            {offset + pageSize < total &&
              <a className="button" onClick={this.incrementPage}>Next</a>
            }
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    total: state.query.total,
    offset: state.query.from,
    pageSize: state.query.pageSize
  }
}

export default connect(mapStateToProps)(Paginator);
