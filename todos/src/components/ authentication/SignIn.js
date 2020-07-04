import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { signIn } from '../../actions';

const SignIn = (props) => {
  const { register, errors, handleSubmit } = useForm();
  const { signIn } = props;
  // const [message, setMessege] = useState('');

  const onSubmit = async (formValues) => {
    // ログインフォームのemailをREST APIのログイン処理用にusernameに変更
    const { email, password } = formValues;
    const params = { username: email, password };
    await signIn(params);
  };

  return (
    <form className="ui form" onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label>Email</label>
        <input
          name="email"
          ref={register({
            required: true,
            pattern: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/,
          })}
        />
        <div style={{ color: 'red' }}>
          {errors.email &&
            errors.email.type === 'required' &&
            'Email is required'}
          {errors.email &&
            errors.email.type === 'pattern' &&
            'This input format is invalid'}
        </div>
      </div>
      <div className="field">
        <label>Password</label>
        <input
          type="password"
          name="password"
          ref={register({ required: true })}
        />
        <div style={{ color: 'red' }}>
          {errors.password && 'Password is required'}
        </div>
      </div>
      <button className="ui button primary" type="submit">
        Sign In
      </button>
    </form>
  );
};

export default connect(null, { signIn })(SignIn);
