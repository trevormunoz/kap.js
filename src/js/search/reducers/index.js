import { combineReducers } from 'redux';
import endpoint from './endpoint';
import query from './query';
import filter from './filter';

const rootReducer = combineReducers({
  endpoint,
  filter,
  query
});

export default rootReducer;
