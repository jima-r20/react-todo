import _ from 'lodash';
import { FETCH_TODOS, FETCH_TODO } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_TODOS:
      return { ...state, ..._.mapKeys(action.payload.results, 'id') };
    case FETCH_TODO:
      // return state;
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};
