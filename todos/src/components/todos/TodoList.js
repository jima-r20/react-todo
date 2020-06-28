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

  // stateからtodo一覧を取得し表示
  const renderList = () => {
    // @TODO
    // 表示順は "todo.id" が大きい方から順に表示したい
    // → まだできていない
    // ページをリロードするとユーザ情報のstateがリセットされる問題がある
    if (isSignedIn || sessionStorage.getItem('userId') !== null) {
      return todos.map((todo) => {
        return (
          <div className="item" key={todo.id}>
            <div className="ui avatar image">{todo.user.display_name}</div>
            <div className="content">
              <Link to={`todos/${todo.id}`} className="header">
                TODO Number: {todo.id}
              </Link>
              <div>TODO Title: {todo.title}</div>
              <div className="discription">Discription: {todo.content}</div>
            </div>
          </div>
        );
      });
    }
  };

  return (
    <div>
      <div>ToDo List</div>
      <div className="ui celled list">{renderList()}</div>
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
