import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchTodo, editTodo } from '../../actions';

const TodoShow = (props) => {
  const { id } = props.match.params;
  const { todo, isSignedIn, fetchTodo, editTodo } = props;

  useEffect(() => {
    (async () => {
      if (isSignedIn || sessionStorage.getItem('userId') !== null) {
        try {
          // 選択したTodoのデータ取得
          await fetchTodo(id);
        } catch (err) {
          alert('Loading Error: Please reload this page.');
        }
      }
    })();
  }, [isSignedIn, id, fetchTodo]);

  // is_finishedの操作
  const onFinished = async () => {
    const params = { is_finished: !todo.is_finished };
    try {
      await editTodo(todo.id, params);
    } catch (err) {
      console.log(err);
    }
  };

  // 選択したTodoが自身が投稿したものであった場合のボタン表示
  const renderAdmin = (userId, todoId) => {
    if (userId === Number(sessionStorage.getItem('userId'))) {
      return (
        <div>
          <button onClick={onFinished} className="ui tiny button teal">
            {todo.is_finished ? 'Revert Status?' : 'Done this Todo?'}
          </button>
          <Link
            to={`/todos/delete/${todoId}`}
            className="ui tiny button negative right floated animated fade"
          >
            <div className="visible content">
              <i className="trash alternate icon"></i>
            </div>
            <div className="hidden content">Delete</div>
          </Link>
          <Link
            to={`/todos/edit/${todoId}`}
            className="ui tiny button primary right floated animated fade"
          >
            <div className="visible content">
              <i className="edit icon"></i>
            </div>
            <div className="hidden content">Edit</div>
          </Link>
        </div>
      );
    } else {
      return;
    }
  };

  // Todoの表示
  const renderTodo = () => {
    if (isSignedIn || sessionStorage.getItem('userId') !== null) {
      return (
        <React.Fragment>
          {todo ? (
            <div>
              <div className="ui raised segment">
                <div>
                  <div className="ui ribbon label">Title</div>
                  <span className="ui header">{todo.title}</span>
                </div>
                <br />
                <div>
                  <div className="ui ribbon label">Todo Number</div>
                  <span style={{ color: 'gray' }}>No. {todo.id}</span>
                </div>
                <br />
                <div>
                  <div className="ui ribbon label">Created User</div>
                  <span style={{ color: 'gray' }}>
                    {todo.user.display_name}
                  </span>
                </div>
                <br />
                <div>
                  <div className="ui ribbon label">Description</div>
                  <span style={{ fontWeight: 'bold' }}>{todo.content}</span>
                </div>
                <br />
                <div>
                  <div className="ui ribbon label">Status</div>
                  <span style={{ color: 'gray' }}>
                    {todo.is_finished ? 'Done' : 'Doing'}
                  </span>
                </div>
                <br />
                <Link to="/todos" className="ui bottom right attached label">
                  <i className="reply icon"></i>Back
                </Link>
              </div>
              <div>{renderAdmin(todo.user.id, todo.id)}</div>
            </div>
          ) : null}
        </React.Fragment>
      );
    }
  };

  // ページの表示
  return (
    <div>
      <div className="ui huge header" style={{ color: '#48834C' }}>
        Todo Details
      </div>
      {renderTodo()}
      <br />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    todo: state.todo[ownProps.match.params.id],
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { fetchTodo, editTodo })(TodoShow);
