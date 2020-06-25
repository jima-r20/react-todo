import React from 'react';
import { useForm } from 'react-hook-form';
import history from '../../history';
import { connect } from 'react-redux';

import baseUrl from '../../apis/baseUrl';

const SignIn = () => {
  const { register, errors, handleSubmit } = useForm();

  const onSubmit = async (formValues) => {
    const { email, password } = formValues;
    // ログインフォームのemailをREST APIのログイン処理ようにusernameに変更
    // /api/login/にログインのリクエストを送信し、レスポンスを取得
    // sessionStorageにセッション情報を格納
    // ログイン成功後、ToDoリストのページに遷移
    const params = { username: email, password };
    const response = await baseUrl.post('/api/login/', params);
    sessionStorage.setItem('userId', response.data.id);
    sessionStorage.setItem('token', response.data.token);
    history.push('/todo');

    // isSignedIn的なstateを変更するためのactionがほしい
  };

  return (
    <form className="ui form" onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label>Email</label>
        <input name="email" ref={register({ required: true })} />
      </div>
      <div className="field">
        <label>Password</label>
        <input
          type="password"
          name="password"
          ref={register({ required: true })}
        />
      </div>
      <button className="ui button primary" type="submit">
        Sign In
      </button>
    </form>
  );
};

export default SignIn;
