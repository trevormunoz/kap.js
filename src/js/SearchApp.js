import React, { Component } from 'react';
import { Client } from 'elasticsearch';
import SearchForm from './SearchForm';
import ResultList from './ResultList';

class SearchApp extends Component {
  constructor() {
    super();
    this.state = { client: '', hitTotal: '', hits: [] };
    this.handleQuerySubmit = this.handleQuerySubmit.bind(this);
  }

  componentDidMount() {
    const client = new Client({
      host: 'search-kap-demo-r25a5v2bybbg325pg3k4h3goh4.us-east-1.es.amazonaws.com'
    });

    client.ping({
      requestTimeout: 30000,
      hello: "elasticsearch"
    }, (error) => {
      if (error) {
        console.error('elasticsearch cluster is down!');
      } else {
        this.setState({ client: client });
        console.log('elasticsearch cluster is up');
      }
    });
  }

  handleQuerySubmit(query) {
    let queryBody = query.type === 'phrase'
      ? {"query":{"match":{"_all":{"query":query.query,"type":"phrase"}}}}
      : {"query":{"match":{"_all":{"query":query.query}}}};

    this.state.client.search({
      index: 'kap',
      sort: '_doc',
      body: queryBody
    }, (err, res) => {
      if(err) {
        console.error(err.message)
      }
      this.setState({
        hitTotal: res.hits.total,
        hits: res.hits.hits
      });
    });
  }

  render() {
    return (
      <div className="search-container">
        <SearchForm onQuerySubmit={this.handleQuerySubmit} />
        <ResultList hitTotal={this.state.hitTotal} hits={this.state.hits} />
      </div>
    );
  }
}

export default SearchApp;
