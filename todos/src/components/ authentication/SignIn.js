import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { signIn } from '../../actions';

const SignIn = (props) => {
  const { register, errors, handleSubmit } = useForm();
  const { signIn } = props;
  const [message, setMessege] = useState(''); // ログインエラー時のメッセージ
  const [submitButton, setSubmitButton] = useState('ui primary button'); // ボタンクリック時のスタイル変更用

  const onSubmit = async (formValues) => {
    // ログインフォームのemailをREST APIのログイン処理用にusernameに変更
    const { email, password } = formValues;
    const params = { username: email, password };
    setSubmitButton('ui disabled primary button');
    setMessege('');
    try {
      await signIn(params);
    } catch (err) {
      setSubmitButton('ui primary button');
      setMessege(
        'LOGIN ERROR: Email or Password is incorrect. Please enter the correct registration information.'
      );
    }
  };

  useEffect(() => {}, [submitButton, message]);

  return (
    <form className="ui form error" onSubmit={handleSubmit(onSubmit)}>
      <div className="ui error message">{message}</div>
      <div className="field">
        <label>Email</label>
        <input
          name="email"
          ref={register({
            required: true,
            pattern: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/,
          })}
        />
        {errors.email && errors.email.type === 'required' ? (
          <div className="ui pointing red basic label">Email is required</div>
        ) : null}
        {errors.email && errors.email.type === 'pattern' ? (
          <div className="ui pointing red basic label">
            This input format is invalid
          </div>
        ) : null}
      </div>
      <div className="field">
        <label>Password</label>
        <input
          type="password"
          name="password"
          ref={register({ required: true })}
        />
        {errors.password ? (
          <div className="ui pointing red basic label">
            Password is required
          </div>
        ) : null}
      </div>
      <button className={submitButton} type="submit">
        Sign In
      </button>
    </form>
  );
};

export default connect(null, { signIn })(SignIn);
