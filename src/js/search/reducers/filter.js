import { FACET_SELECTED, FACET_DESELECTED, FACET_CLEAR_ALL } from '../actions/search';

const initialState = {
  activeFiltersByType: {
    recipient: [],
    year: [],
    continent: []
  }
}

export default function filter(state = initialState, action) {
  switch(action.type) {
    case FACET_SELECTED:
    case FACET_DESELECTED:
      return Object.assign({}, state, {
        activeFiltersByType: action.filters
      });
    case FACET_CLEAR_ALL:
      return initialState;
    default:
      return state;
  }
}
