import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchTodo, editTodo } from '../../actions';

const TodoEdit = (props) => {
  const { register, errors, handleSubmit } = useForm();
  const { id } = props.match.params;
  const { todo, fetchTodo, editTodo } = props;
  const [onceLoaded, setOnceLoaded] = useState(false); // ページ読み込み時に一度だけfetchTodoを呼ぶためのもの
  const [failureMessage, setFailureMessage] = useState(''); // Todo更新エラー時のメッセージ
  const [submitButton, setSubmitButton] = useState('ui olive button'); // ボタンクリック時のスタイル変更用

  useEffect(() => {
    (async () => {
      // @TODO: URL直打ちでuserがAuthorでなくても編集できる問題を直す
      if (!onceLoaded) {
        try {
          // 選択したTodoの内容取得
          await fetchTodo(id);
        } catch (err) {
          setFailureMessage('LOADING ERROR: Please try again to load Todo');
        }
      }
    })();
  }, [fetchTodo, id, onceLoaded, submitButton, failureMessage]);

  const onSubmit = async (formValues) => {
    // @TODO
    // formからis_finishedを渡せるようにする
    const params = { ...formValues, is_finished: false };
    setOnceLoaded(true);
    setSubmitButton('ui disabled olive button');
    setFailureMessage('');
    try {
      await editTodo(id, params);
    } catch (err) {
      setSubmitButton('ui olive button');
      setFailureMessage('UPDATE ERROR: Please try again to update Todo');
    }
  };

  return (
    <form className="ui form error" onSubmit={handleSubmit(onSubmit)}>
      <div className="ui error message">{failureMessage}</div>
      <div className="field">
        <label>Title</label>
        {todo ? (
          <input
            name="title"
            ref={register({ required: true })}
            defaultValue={todo.title}
          />
        ) : null}
        {errors.title ? (
          <div className="ui pointing red basic label">Title is required</div>
        ) : null}
      </div>
      <div className="field">
        <label>Content</label>
        {todo ? (
          <textarea
            name="content"
            ref={register({ required: true })}
            defaultValue={todo.content}
          />
        ) : null}
        {errors.content ? (
          <div className="ui pointing red basic label">Content is required</div>
        ) : null}
      </div>
      <button className={submitButton} type="submit">
        Update
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

const mapStateToProps = (state, ownProps) => {
  return { todo: state.todo[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchTodo, editTodo })(TodoEdit);
