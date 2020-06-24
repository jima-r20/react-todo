import baseUrl from '../apis/baseUrl';
import history from '../history';
import { SIGN_UP } from './types';

// 新規登録
export const signUp = (formValues) => async (dispatch, getState) => {
  const response = await baseUrl.get('/api/users/');
  console.log(response.data);
  dispatch({ type: SIGN_UP, payload: response.data });
  // 新規登録結果画面に遷移
  history.push('/signup/result');
};
