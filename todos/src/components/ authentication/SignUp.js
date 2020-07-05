import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { signUp } from '../../actions';

const SignUp = (props) => {
  const { signUp } = props;
  const { register, errors, handleSubmit } = useForm();
  const [failureMessage, setFailureMessage] = useState('');
  const [submitButton, setSubmitButton] = useState('ui primary button');

  const onSubmit = async (formValues) => {
    const data = { ...formValues, about: '', avatar_url: '' };
    setSubmitButton('ui disabled primary button');
    setFailureMessage('');
    try {
      await signUp(data);
    } catch (err) {
      setSubmitButton('ui primary button');
      setFailureMessage('RESISTATION ERROR: This email is already registered');
    }
  };

  useEffect(() => {}, [submitButton, failureMessage]);

  // 新規登録フォーム
  return (
    <form className="ui form error" onSubmit={handleSubmit(onSubmit)}>
      <div className="ui error message">{failureMessage}</div>
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
        <label>
          Display Name <span style={{ color: 'red' }}>(Required)</span>
        </label>
        <input
          name="display_name"
          ref={register({ required: true, maxLength: 20 })}
        />
        {errors.display_name ? (
          <div className="ui pointing red basic label">
            Display Name is required
          </div>
        ) : null}
      </div>

      <div className="field">
        <label>
          Password <span style={{ color: 'red' }}>(Required)</span>
        </label>
        <input
          name="password"
          ref={register({ required: true, minLength: 8 })}
        />
        {errors.password && errors.password.type === 'required' ? (
          <div className="ui pointing red basic label">
            Password is required
          </div>
        ) : null}
        {errors.display_name && errors.password.type === 'minLength' ? (
          <div className="ui pointing red basic label">
            Password must be at least 8 characters
          </div>
        ) : null}
      </div>

      <button className={submitButton} type="submit">
        Sign Up
      </button>
    </form>
  );
};

export default connect(null, { signUp })(SignUp);
