import { client } from '../utilities/elasticsearch';
const pad = require('pad-left');

/* Action Types */
export const PING_REQUEST_SUCCESS = 'PING_REQUEST_SUCCESS';
export const PING_REQUEST_FAILURE = 'PING_REQUEST_FAILURE';
export const UPDATE_QUERY = 'UPDATE_QUERY';
export const DO_SEARCH = 'DO_SEARCH';
export const START_SEARCH_REQUEST = 'START_SEARCH_REQUEST';
export const RECEIVE_RESULTS = 'RECEIVE_RESULTS';


/* Action Creators */
export function ping() {
  return function(dispatch) {
    client.ping({
        requestTimeout: 30000,
        hello: "elasticsearch"
      }, (error) => {
        if (error) {
          dispatch(receivePing('error', error.message));
        } else {
          dispatch(receivePing('available'));
        }
      });
  }
}

function receivePing(status, message) {
  if (status === 'available') {
    return {
      type: PING_REQUEST_SUCCESS
    }
  } else {
    return {
      type: PING_REQUEST_FAILURE,
      message: message
    }
  }
}

export function updateQuery(value, queryType='simple') {
  return {
    type: UPDATE_QUERY,
    value: value,
    queryType: queryType
  }
}

function startSearchRequest() {
  return {
    type: START_SEARCH_REQUEST
  }
}

function receiveResults(hitTotal, visibleHits) {
  return {
    type: RECEIVE_RESULTS,
    total: hitTotal,
    items: visibleHits
  }
}

function transformHits(hitObj, id_length=4) {
  const linkBase = '/collection/items/kap-';
  const paddedId = pad(hitObj._id, 4, '0');

  let update = hitObj._id.length === id_length
    ? {linkAddr: `${linkBase}${hitObj._id}.html`}
    : {linkAddr: `${linkBase}${paddedId}.html`};

  const newHit = Object.assign({}, hitObj, update);
  return newHit;
}


export function doSearch() {
  return function(dispatch, getState) {
    const { query } = getState();
    dispatch(startSearchRequest());

    let queryBody = query.queryType === 'phrase'
      ? {"query":{"match":{"_all":{"query":query.value,"type":"phrase"}}}}
      : {"query":{"match":{"_all":{"query":query.value}}}};

    return client.search({
      index: 'kap',
      sort: '_doc',
      body: queryBody,
      from: query.from,
      size: query.pageSize
    }, (err, result) => {
      if (!err) {
        const { hits } = result;
        const updatedHits = hits.hits.map(transformHits);
        dispatch(receiveResults(hits.total, updatedHits));
      }
    });
  }
}
