import baseUrl from '../apis/baseUrl';
import history from '../history';
import {
  SIGN_UP,
  SIGN_IN,
  SIGN_OUT,
  FETCH_TODOS,
  FETCH_TODO,
  CREATE_TODO,
  EDIT_TODO,
  DELETE_TODO,
} from './types';

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

    // @TODO
    // ページをリフレッシュするとセッション情報は残るが、
    // ユーザ情報のstateがリセットされる問題が残っている
    // Header.jsでuseEffectを使えばなんとかなりそう？
    // → signInの引数的にsessionStorage系はactionに入れない方がやりやすいかも
    // → 引数をuserIdにした方がいい？

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
  dispatch({ type: FETCH_TODOS, payload: response.data });
};

// Todoリスト個別取得
export const fetchTodo = (id) => async (dispatch) => {
  const response = await baseUrl.get(`/api/todos/${id}`);
  dispatch({ type: FETCH_TODO, payload: response.data });
};

// Todoの作成
export const createTodo = (params) => async (dispatch) => {
  const token = sessionStorage.getItem('token');
  const response = await baseUrl.post('/api/todos/', params, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  dispatch({ type: CREATE_TODO, payload: response.data });
  history.push('/todos');
};

// Todoの編集
export const editTodo = (todoId, params) => async (dispatch) => {
  const token = sessionStorage.getItem('token');
  const response = await baseUrl.patch(`/api/todos/${todoId}/`, params, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  dispatch({ type: EDIT_TODO, payload: response.data });
  history.push('/todos');
};

// Todoの削除
export const deleteTodo = (id) => async (dispatch) => {
  const token = sessionStorage.getItem('token');
  await baseUrl.delete(`/api/todos/${id}`, {
    headers: { Authorization: `Token ${token}` },
  });
  dispatch({ type: DELETE_TODO, payload: id });
  history.push('/todos');
};
