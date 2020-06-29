import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchTodo } from '../../actions';

const TodoEdit = (props) => {
  const { register, errors, handleSubmit } = useForm();
  const { id } = props.match.params;
  const { fetchTodo, todo } = props;
  console.log(props);

  // 選択したTodoの内容取得
  useEffect(() => {
    fetchTodo(id);
  }, []);

  const onSubmit = (formValues) => {
    console.log(formValues);
  };

  return (
    <form className="ui form" onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label>Title</label>
        {todo ? (
          <input
            name="title"
            ref={register({ required: true })}
            defaultValue={todo.title}
          />
        ) : null}
      </div>
      <div style={{ color: 'red' }}>
        {errors.title &&
          errors.title.type === 'required' &&
          'Email is required'}
      </div>
      <div className="field">
        <label>Content</label>
        {todo ? (
          <textarea name="content" ref={register} defaultValue={todo.content} />
        ) : null}
      </div>
      <button className="ui button positive" type="submit">
        Create
      </button>
    </form>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { todo: state.todo[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchTodo })(TodoEdit);
