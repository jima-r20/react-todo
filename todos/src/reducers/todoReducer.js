import _ from 'lodash';
import { FETCH_TODOS } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_TODOS:
      return { ...state, ..._.mapKeys(action.payload.results, 'id') };
    default:
      return state;
  }
};