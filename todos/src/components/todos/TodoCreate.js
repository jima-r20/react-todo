import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { createTodo } from '../../actions';

const TodoCreate = (props) => {
  const { register, errors, handleSubmit } = useForm();
  const { createTodo } = props;
  const [failureMessage, setFailureMessege] = useState(''); //Todo投稿エラー時のメッセージ
  const [submitButton, setSubmitButton] = useState('ui olive button'); // ボタンクリック時のスタイル変更用

  const onSubmit = async (formValues) => {
    const params = { ...formValues, is_finished: false };
    setSubmitButton('ui disabled olive button');
    setFailureMessege('');
    try {
      await createTodo(params);
    } catch (err) {
      setSubmitButton('ui olive button');
      setFailureMessege('CREATE ERROR: Please try again to create new Todo');
    }
  };

  useEffect(() => {}, [submitButton, failureMessage]);

  return (
    <form className="ui form error" onSubmit={handleSubmit(onSubmit)}>
      <div className="ui error message">{failureMessage}</div>
      <div className="field">
        <label>Title</label>
        <input name="title" ref={register({ required: true })} />
        {errors.title ? (
          <div className="ui pointing red basic label">Title is required</div>
        ) : null}
      </div>
      <div className="field">
        <label>Content</label>
        <textarea name="content" ref={register({ required: true })} />
        {errors.content ? (
          <div className="ui pointing red basic label">Content is required</div>
        ) : null}
      </div>
      <button className={submitButton} type="submit">
        Create
      </button>
      <Link to="/todos" className="ui button right floated animated fade">
        <div className="visible content">
          <i className="reply icon"></i>
        </div>
        <div className="hidden content">Back</div>
      </Link>
    </form>
  );
};

export default connect(null, { createTodo })(TodoCreate);
