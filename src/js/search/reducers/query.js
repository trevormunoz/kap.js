import {
  UPDATE_QUERY, START_SEARCH_REQUEST, RECEIVE_RESULTS
} from '../actions/search';

const initialState = {
  isFetching: false,
  value: '',
  queryType: '',
  pageSize: 25,
  from: 0,
  total: null,
  items: []
};

export default function query(state = initialState, action) {
  switch (action.type) {
    case UPDATE_QUERY:
      return Object.assign({}, state, {
        value: action.value,
        queryType: action.queryType,
        from: action.offset
      });
    case START_SEARCH_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_RESULTS:
      return Object.assign({}, state, {
        isFetching: false,
        total: action.total,
        items: action.items
      });
    default:
      return state;
  }
}
