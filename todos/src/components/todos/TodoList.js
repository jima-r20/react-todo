import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTodos } from '../../actions';
import { Link } from 'react-router-dom';

const TodoList = (props) => {
  const { todos, isSignedIn, fetchTodos } = props;

  useEffect(() => {
    if (isSignedIn || sessionStorage.getItem('userId') !== null) {
      fetchTodos();
    }
  }, []);

  const renderAdmin = (userId, todoId) => {
    if (userId === Number(sessionStorage.getItem('userId'))) {
      return (
        <div className="ui right floated">
          <Link to={`/todos/edit/${todoId}`} className="ui tiny button primary">
            Edit
          </Link>
          <div className="ui tiny button negative">Delete</div>
        </div>
      );
    } else {
      return;
    }
  };

  // stateからtodo一覧を取得し表示
  const renderList = () => {
    // @TODO
    // 表示順は "todo.id" が大きい方から順に表示したい
    // → まだできていない
    // ページをリロードするとユーザ情報のstateがリセットされる問題がある
    //
    // @TODO
    // 新規Todo投稿後に一覧画面に遷移すると、Todoが４件される問題がある(通常は３件)
    if (isSignedIn || sessionStorage.getItem('userId') !== null) {
      return todos.map((todo) => {
        return (
          <div className="ui card" key={todo.id}>
            <div className="content">
              <Link to={`todos/${todo.id}`} className="header">
                No. {todo.id} <br />
                Title: {todo.title}
              </Link>
              <div className="discription">Discription: {todo.content}</div>
            </div>
            <div className="extra content">
              <div>
                Author: {todo.user.display_name}
                {renderAdmin(todo.user.id, todo.id)}
              </div>
            </div>
          </div>
        );
      });
    }
  };

  return (
    <div>
      <div>
        <div className="ui left floated">ToDo List</div>
        <Link to="/todos/new" className="ui button positive">
          Create New Todo
        </Link>
      </div>
      <br />
      <div>{renderList()}</div>
      <div>
        <i className="angle left icon" />
        <i className="angle right icon" />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    todos: Object.values(state.todo),
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { fetchTodos })(TodoList);
