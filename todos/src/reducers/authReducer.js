import { SIGN_UP, SIGN_IN, SIGN_OUT } from '../actions/types';

const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
  userName: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_UP:
      // SIGN_UPはstate更新いらない？？
      return state;
    case SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
        userId: action.payload.id,
        userName: action.payload.display_name,
      };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null, userName: null };
    default:
      return state;
  }
};
