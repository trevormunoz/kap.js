import { client } from '../utilities/elasticsearch';
import { aggregations } from '../utilities/aggregations';
import { filterStanzaFactory } from '../utilities/filters';
const pad = require('pad-left');

/* Action Types */
export const PING_REQUEST_SUCCESS = 'PING_REQUEST_SUCCESS';
export const PING_REQUEST_FAILURE = 'PING_REQUEST_FAILURE';
export const UPDATE_QUERY = 'UPDATE_QUERY';
export const DO_SEARCH = 'DO_SEARCH';
export const START_SEARCH_REQUEST = 'START_SEARCH_REQUEST';
export const RECEIVE_RESULTS = 'RECEIVE_RESULTS';
export const SEARCH_REQUEST_FAILURE = 'SEARCH_REQUEST_FAILURE';
export const FACET_SELECTED = 'FACET_SELECTED';
export const FACET_DESELECTED = 'FACET_DESELECTED';
export const FACET_CLEAR_ALL = 'FACET_CLEAR_ALL';


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

export function updateQuery(value, queryType='simple', offset=0) {
  return {
    type: UPDATE_QUERY,
    value: value,
    queryType: queryType,
    offset: offset
  }
}

function startSearchRequest() {
  return {
    type: START_SEARCH_REQUEST
  }
}

function receiveResults(hitTotal, visibleHits, aggregations) {
  return {
    type: RECEIVE_RESULTS,
    total: hitTotal,
    items: visibleHits,
    facets: aggregations
  }
}

function searchRequestFailure(message) {
  return {
    type: SEARCH_REQUEST_FAILURE,
    message: message
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

function search(from, pageSize) {
  return function(body) {
    return function(dispatch) {
      return client.search({
        index: 'kap',
        sort: '_doc',
        body: body,
        from: from,
        size: pageSize
      }, (err, result) => {
        if(!err) {
          const { hits, aggregations } = result;
          const updatedHits = hits.hits.map(transformHits);
          dispatch(receiveResults(hits.total, updatedHits, aggregations));
        } else {
          dispatch(searchRequestFailure(err.message));
        }
      });
    }
  }
}


export function doSearch() {
  return function(dispatch, getState) {
    dispatch(startSearchRequest());

    const { filter, query } = getState();
    const searchFor = search(query.from, query.pageSize);

    const mustStmt = query.queryType === 'phrase'
      ? [{"match":{"_all":{"query":query.value,"type":"phrase"}}}]
      : [{"match":{"_all":{"query":query.value}}}];

    const byType = Object.keys(filter.activeFiltersByType).map((type, filterState) => {
      return filterStanzaFactory(type, filter.activeFiltersByType);
    });

    const filterStmt = byType.filter((v) => {
      return v !== undefined;
    }).reduce((prev, curr) => {
      return prev.concat(curr)
    }, []);

    const queryStanza = {
      "query": {
        "bool": {
          must: mustStmt,
          filter: filterStmt
        }
      }
    };

    const queryBody = Object.assign({}, queryStanza, aggregations);
    return searchFor(queryBody)(dispatch);
  }
}

export function pageResults(newOffset) {
  return function(dispatch, getState) {
    const { query } = getState();
    dispatch(updateQuery(query.value, query.queryType, newOffset));
    dispatch(doSearch());
  }
}

function facetSelected(filterObj) {
  return {
    type: FACET_SELECTED,
    filters: filterObj
  }
}

function facetDeselected(filterObj) {
  return {
    type: FACET_DESELECTED,
    filters: filterObj
  }
}

export function selectFacet(facetType, facetValue) {
  return function(dispatch, getState) {
    const { filter, query } = getState();
    // Set paginator back to the beginning when facet de/selected
    dispatch(updateQuery(query.value, query.queryType, 0))
    const currentSelections = filter.activeFiltersByType[facetType];

    if (currentSelections.indexOf(facetValue) === -1) {
      let updatedFilters = Object.assign({}, filter.activeFiltersByType, {
        [facetType]: [...currentSelections, facetValue]
      });
      dispatch(facetSelected(updatedFilters));
    } else {
      const targetIndex = currentSelections.indexOf(facetValue);
      // TOFIX
      currentSelections.splice(targetIndex, 1);
      let updatedFilters = Object.assign({}, filter.activeFiltersByType, {
        [facetType]: [...currentSelections]
      });
      dispatch(facetDeselected(updatedFilters))
    }
    dispatch(doSearch());
  }
}

function clear() {
  return {
    type: FACET_CLEAR_ALL
  }
}

export function clearAllFacets() {
  return function(dispatch) {
    dispatch(clear());
    dispatch(doSearch());
  }
}
