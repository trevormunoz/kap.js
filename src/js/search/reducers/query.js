import {
  UPDATE_QUERY, START_SEARCH_REQUEST, RECEIVE_RESULTS, SEARCH_REQUEST_FAILURE
} from '../actions/search';

const initialState = {
  isFetching: false,
  value: '',
  queryType: '',
  pageSize: 25,
  from: 0,
  total: null,
  items: [],
  errors: ''
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
    case SEARCH_REQUEST_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errors: action.message
      })
    default:
      return state;
  }
}
