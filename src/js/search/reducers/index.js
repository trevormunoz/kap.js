import { combineReducers } from 'redux';
import { endpoint } from './endpoint';
import { query } from './query';


const rootReducer = combineReducers({
  endpoint,
  query
});

export default rootReducer;
