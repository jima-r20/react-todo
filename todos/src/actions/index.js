import baseUrl from '../apis/baseUrl';
import history from '../history';
import { SIGN_UP } from './types';

// 新規登録
export const signUp = (formValues) => async (dispatch) => {
  const response = await baseUrl.post('/api/users/', { ...formValues });
  dispatch({ type: SIGN_UP, payload: response.data });
  // 新規登録結果画面に遷移
  history.push('/signup/result');
};