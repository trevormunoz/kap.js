import React, { Component } from 'react';

class SearchForm extends Component {
  constructor() {
    super();
    this.state = { query: '', type: '' };
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleQueryChange(event) {
    this.setState({query: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    const query = this.state.query.trim();
    if (!query) {
      return;
    }
    const queryRegex = /^["']/;
    let queryType = queryRegex.test(query)
      ? 'phrase'
      : 'simple';

    this.props.onQuerySubmit({query: query, type: queryType})
    this.setState({query: '', type: ''});
  }

  render() {
    return (
      <form className="search-form" onSubmit={this.handleSubmit}>
        <input
          type="search"
          placeholder="Enter search terms …"
          value={this.state.query}
          onChange={this.handleQueryChange} />
        <input type="submit" className="button" value="Search" />
      </form>
    );
  }
}

export default SearchForm;
