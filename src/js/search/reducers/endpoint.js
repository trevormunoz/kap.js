import { PING_REQUEST_SUCCESS, PING_REQUEST_FAILURE } from '../actions/search';

const initialState = {
  status: ''
};

export default function endpoint(state = initialState, action) {
  switch (action.type) {
    case PING_REQUEST_SUCCESS:
      return Object.assign({}, state, {
        status: 'available'
      });
    case PING_REQUEST_FAILURE:
      return Object.assign({}, state, {
        status: 'error',
        message: action.message
      })
    default:
      return state;
  }
}
