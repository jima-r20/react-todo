import baseUrl from '../apis/baseUrl';
import history from '../history';
import { SIGN_UP, SIGN_IN, SIGN_OUT, FETCH_TODOS } from './types';

// 新規登録
export const signUp = (formValues) => async (dispatch) => {
  const response = await baseUrl.post('/api/users/', { ...formValues });
  dispatch({ type: SIGN_UP, payload: response.data });
  // 新規登録結果画面に遷移
  history.push('/signup/result');
};

// ログイン
export const signIn = (userId) => {
  return { type: SIGN_IN, payload: userId };
};

// ログアウト
export const signOut = () => {
  return { type: SIGN_OUT };
};

// Todoリスト一覧取得
export const fetchTodos = () => async (dispatch) => {
  const response = await baseUrl.get('/api/todos/');
  console.log(response.data);
  dispatch({ type: FETCH_TODOS, payload: response.data });
};
