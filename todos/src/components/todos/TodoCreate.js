import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';

import { createTodo } from '../../actions';

const TodoCreate = (props) => {
  const { register, errors, handleSubmit } = useForm();
  const { createTodo } = props;

  const onSubmit = (formValues) => {
    const params = { ...formValues, is_finished: false };
    createTodo(params);
  };

  return (
    <form className="ui form" onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label>Title</label>
        <input name="title" ref={register({ required: true })} />
      </div>
      <div style={{ color: 'red' }}>
        {errors.title &&
          errors.title.type === 'required' &&
          'Email is required'}
      </div>
      <div className="field">
        <label>Content</label>
        <textarea name="content" ref={register} />
      </div>
      <button className="ui button positive" type="submit">
        Create
      </button>
    </form>
  );
};

export default connect(null, { createTodo })(TodoCreate);
