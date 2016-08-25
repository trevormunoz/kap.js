import React, { Component } from 'react';
const pad = require('pad-left');

class ResultList extends Component {
  constructor() {
    super();
    this.state = { linkAddr: '', updatedHits: [] };
    this.transformHits = this.transformHits.bind(this);
    this.renderResult = this.renderResult.bind(this);
  }

  transformHits(hitObj, id_length=4) {
    const linkBase = '/collection/items/kap-';
    const paddedId = pad(hitObj._id, 4, '0');

    let update = hitObj._id.length === id_length
      ? {linkAddr: `${linkBase}${hitObj._id}.html`}
      : {linkAddr: `${linkBase}${paddedId}.html`};

    const newHit = Object.assign(hitObj, update);
    return newHit;
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.hits.length > 0) {
      return;
    }

    const hitState = nextProps.hits.map(this.transformHits);
    this.setState({updatedHits: hitState});
  }

  render() {
    return (
      <div className="result-inner-list">
        <p>
          <em>{this.renderTotal(this.props.hitTotal)}</em>
        </p>
        <ul> {this.state.updatedHits.map(this.renderResult)} </ul>
      </div>
    );
  }

  renderTotal(total) {
    if(!total) {
      return;
    }
    return `${total} results`;
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

export default ResultList;
