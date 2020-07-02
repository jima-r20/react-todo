import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchTodo } from '../../actions';

const TodoShow = (props) => {
  const { id } = props.match.params;
  const { todo, isSignedIn, fetchTodo } = props;

  // 選択したTodoのデータ取得
  useEffect(() => {
    if (isSignedIn || sessionStorage.getItem('userId') !== null) {
      fetchTodo(id);
    }
  }, []);

  const renderAdmin = (userId, todoId) => {
    if (userId === Number(sessionStorage.getItem('userId'))) {
      return (
        <div className="ui right floated">
          <Link to={`/todos/edit/${todoId}`} className="ui tiny button primary">
            Edit
          </Link>
          <Link
            to={`/todos/delete/${todoId}`}
            className="ui tiny button negative"
          >
            Delete
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
              <div>No. {todo.id}</div>
              <div>Created User: {todo.user.display_name}</div>
              <div>Title: {todo.title}</div>
              <div>Discription: {todo.content}</div>
              {renderAdmin(todo.user.id, todo.id)}
            </div>
          ) : null}
        </React.Fragment>
      );
    }
  };

  return (
    <div>
      <h2>Todo Show</h2>
      {renderTodo()}
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
