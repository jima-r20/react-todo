import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { signUp } from '../../actions';

const SignUp = (props) => {
  const { signUp } = props;
  const { register, errors, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    signUp(data);
  };

  // 新規登録フォーム
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
          {errors.email && 'Email is required'}
        </div>
      </div>
      <div className="field">
        <label>Display Name</label>
        <input
          name="displayName"
          ref={register({ required: true, maxLength: 20 })}
        />
        <div style={{ color: 'red' }}>
          {errors.displayName && 'Display Name is required'}
        </div>
      </div>
      <div className="field">
        <label>Password</label>
        <input
          name="password"
          ref={register({ required: true, minLength: 8 })}
        />
        <div style={{ color: 'red' }}>
          {errors.password && 'Password is required'}
        </div>
      </div>
      <div className="field">
        <label>Confirm Password</label>
        <input name="confirmPassword" ref={register({ required: true })} />
        <div style={{ color: 'red' }}>
          {errors.confirmPassword && 'Confirm Password is required'}
        </div>
      </div>
      <button className="ui button primary" type="submit">
        Sign Up
      </button>
    </form>
  );
};

export default connect(null, { signUp })(SignUp);
