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
export const signIn = (params) => async (dispatch) => {
  // トークン認証　ログイン処理
  // /api/login/にログインのリクエストを送信し、レスポンスを取得
  // sessionStorageにセッション情報を格納
  // ログイン成功後、ToDoリストのページに遷移
  // ↓
  // 上記処理で取得したuserIdからユーザ情報を取得(Id, display_name)
  try {
    const res = await baseUrl.post('/api/login/', params);
    sessionStorage.setItem('userId', res.data.id);
    sessionStorage.setItem('token', res.data.token);
    const userId = sessionStorage.getItem('userId');
    const response = await baseUrl.get(`/api/users/${userId}`);
    dispatch({ type: SIGN_IN, payload: response.data });
    // ログイン後のメインページ(Todo一覧ページに遷移)
    history.push('/todos');
  } catch (err) {
    console.log('Login error');
  }
};

// ログアウト
export const signOut = () => {
  // セッション情報のクリア
  sessionStorage.clear();
  return { type: SIGN_OUT };
};

// Todoリスト一覧取得
export const fetchTodos = () => async (dispatch) => {
  const response = await baseUrl.get('/api/todos/');
  console.log(response.data);
  dispatch({ type: FETCH_TODOS, payload: response.data });
};
