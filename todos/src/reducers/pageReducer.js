import { NEXT_PAGE, PREVIOUS_PAGE } from '../actions/types';

const INITIAL_STATE = { currentPage: 1, previousPage: null };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NEXT_PAGE:
      return {
        ...state,
        currentPage: action.payload.config.params.page,
        previousPage: action.payload.data.previous,
        nextPage: action.payload.data.next,
      };
    default:
      return state;
  }
};
