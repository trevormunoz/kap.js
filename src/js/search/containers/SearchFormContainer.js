import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateQuery, doSearch } from '../actions/search';

class SearchFormContainer extends Component {
  constructor(props) {
    super(props);
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleQueryChange(event) {
    const { dispatch } = this.props;
    const queryRegex = /^["']/;
    const query = event.target.value;

    let queryType = queryRegex.test(query)
      ? 'phrase'
      : 'simple';
    dispatch(updateQuery(query, queryType));
  }

  handleSubmit(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    if (!this.props.inputString) {
      return;
    }
    dispatch(doSearch());
  }

  render() {
    return (
      <form className="search-form" onSubmit={this.handleSubmit}>
        <input
          type="search"
          placeholder="Enter search terms …"
          value={this.props.inputString || ''}
          onChange={this.handleQueryChange} />
        <input type="submit" className="button" value="Search" />
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    inputString: state.query.value
  };
}

export default connect(mapStateToProps)(SearchFormContainer)
