import { SIGN_UP } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case SIGN_UP:
      return { ...state, [action.payload.id]: action.payload }; // SIGN_UPはstate更新いらない？？
    default:
      return state;
  }
};
