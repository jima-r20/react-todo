import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchTodo } from '../../actions';

const TodoShow = (props) => {
  const { id } = props.match.params;
  const { todo, isSignedIn, fetchTodo } = props;

  // 選択したTodoのデータ取得
  useEffect(() => {
    // @TODO
    // 非同期処理にして例外処理を追加する
    if (isSignedIn || sessionStorage.getItem('userId') !== null) {
      fetchTodo(id);
    }
  }, []);

  const renderAdmin = (userId, todoId) => {
    if (userId === Number(sessionStorage.getItem('userId'))) {
      return (
        <div>
          <Link
            to={`/todos/edit/${todoId}`}
            className="ui tiny button primary left floated animated fade"
          >
            <div className="visible content">
              <i className="edit icon"></i>
            </div>
            <div className="hidden content">Edit</div>
          </Link>
          <Link
            to={`/todos/delete/${todoId}`}
            className="ui tiny button negative right floated animated fade"
          >
            <div className="visible content">
              <i className="trash alternate icon"></i>
            </div>
            <div className="hidden content">Delete</div>
          </Link>
        </div>
      );
    } else {
      return;
    }
  };

  // Todoの中身表示
  // @TODO: ページをリロードするとユーザ情報のstateがリセットされる問題がある
  const renderTodo = () => {
    // if (isSignedIn === null && sessionStorage.getItem('userId') !== null) {
    //   return <div>Loading...</div>;
    // }
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

export default connect(mapStateToProps, { fetchTodo })(TodoShow);
