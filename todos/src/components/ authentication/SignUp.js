import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { signUp } from '../../actions';

const SignUp = (props) => {
  const { signUp } = props;
  const { register, errors, handleSubmit } = useForm();

  const onSubmit = (formValues) => {
    const data = { ...formValues, about: '', avatar_url: '' };
    signUp(data);
  };

  // 新規登録フォーム
  return (
    <form className="ui form" onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label>
          Email <span style={{ color: 'red' }}>(Required)</span>
        </label>
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
        <label>
          Display Name <span style={{ color: 'red' }}>(Required)</span>
        </label>
        <input
          name="display_name"
          ref={register({ required: true, maxLength: 20 })}
        />
        <div style={{ color: 'red' }}>
          {errors.display_name && 'Display Name is required'}
        </div>
      </div>

      <div className="field">
        <label>
          Password <span style={{ color: 'red' }}>(Required)</span>
        </label>
        <input
          name="password"
          ref={register({ required: true, minLength: 8 })}
        />
        <div style={{ color: 'red' }}>
          {errors.password &&
            errors.password.type === 'required' &&
            'Password is required'}
          {errors.password &&
            errors.password.type === 'minLength' &&
            'Password must be at least 8 characters'}
          {console.log(errors.password)}
        </div>
      </div>

      <button className="ui button primary" type="submit">
        Sign Up
      </button>
    </form>
  );
};

export default connect(null, { signUp })(SignUp);
