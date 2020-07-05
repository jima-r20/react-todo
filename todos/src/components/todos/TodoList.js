import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTodos, moveNextPage, movePreviousPage } from '../../actions';
import { Link } from 'react-router-dom';

const TodoList = (props) => {
  const {
    todos,
    isSignedIn,
    page,
    nextPage,
    previousPage,
    fetchTodos,
    moveNextPage,
    movePreviousPage,
  } = props;

  useEffect(() => {
    if (isSignedIn || sessionStorage.getItem('userId') !== null) {
      fetchTodos(page);
    }
  }, [page]);

  const renderAdmin = (userId, todoId) => {
    if (userId === Number(sessionStorage.getItem('userId'))) {
      return (
        <div className="ui right floated">
          <Link
            to={`/todos/edit/${todoId}`}
            className="ui tiny button primary animated fade"
          >
            <div className="visible content">
              <i className="edit icon"></i>
            </div>
            <div className="hidden content">Edit</div>
          </Link>
          <Link
            to={`/todos/delete/${todoId}`}
            className="ui tiny button negative animated fade"
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

  // stateからtodo一覧を取得し表示
  const renderList = () => {
    // @TODO
    // ページをリロードするとユーザ情報のstateがリセットされる問題がある
    if (isSignedIn || sessionStorage.getItem('userId') !== null) {
      return todos.map((todo) => {
        return (
          <Link
            to={`todos/${todo.id}`}
            className="ui raised link card"
            key={todo.id}
          >
            <div className="content">
              {/* <Link to={`todos/${todo.id}`} className="header"> */}
              <div className="header">
                No. {todo.id} <br />
                Title: {todo.title}
              </div>
              {/* </Link> */}
              <div className="discription" style={{ color: 'gray' }}>
                Discription: {todo.content}
              </div>
            </div>
            <div className="extra content">
              Author: {todo.user.display_name}
              {renderAdmin(todo.user.id, todo.id)}
            </div>
          </Link>
        );
      });
    }
  };

  // ページネーションボタンの活性化・非活性化判別
  const renderPagenation = () => {
    if (previousPage === null) {
      return (
        <div>
          <button
            onClick={() => movePreviousPage(page)}
            className="ui button disabled"
          >
            <i className="angle left icon" />
          </button>
          <button onClick={() => moveNextPage(page)} className="ui button">
            <i className="angle right icon" />
          </button>
        </div>
      );
    } else if (previousPage !== null && nextPage !== null) {
      return (
        <div>
          <button onClick={() => movePreviousPage(page)} className="ui button">
            <i className="angle left icon" />
          </button>
          <button onClick={() => moveNextPage(page)} className="ui button">
            <i className="angle right icon" />
          </button>
        </div>
      );
    } else if (nextPage === null) {
      return (
        <div>
          <button onClick={() => movePreviousPage(page)} className="ui button">
            <i className="angle left icon" />
          </button>
          <button
            onClick={() => moveNextPage(page)}
            className="ui button disabled"
          >
            <i className="angle right icon" />
          </button>
        </div>
      );
    }
  };

  return (
    <React.Fragment>
      <div>
        <div className="ui huge header" style={{ color: '#48834C' }}>
          ToDo List
        </div>
        <Link to="/todos/new" className="ui button olive">
          <i className="plus icon"></i>
          Create New Todo
        </Link>
      </div>
      <br />
      {renderPagenation()}
      <br />
      {renderList()}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    todos: Object.values(state.todo).reverse(),
    isSignedIn: state.auth.isSignedIn,
    page: state.page.currentPage,
    nextPage: state.page.nextPage,
    previousPage: state.page.previousPage,
  };
};

export default connect(mapStateToProps, {
  fetchTodos,
  moveNextPage,
  movePreviousPage,
})(TodoList);
