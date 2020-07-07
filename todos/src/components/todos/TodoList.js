import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  fetchTodos,
  editTodo,
  moveNextPage,
  movePreviousPage,
} from '../../actions';
import { Link } from 'react-router-dom';

const TodoList = (props) => {
  const {
    todos,
    isSignedIn,
    page,
    nextPage,
    previousPage,
    fetchTodos,
    editTodo,
    moveNextPage,
    movePreviousPage,
  } = props;

  useEffect(() => {
    if (isSignedIn || sessionStorage.getItem('userId') !== null) {
      fetchTodos(page);
    }
  }, [page, isSignedIn, fetchTodos]);

  // is_finishedの操作
  const onFinished = (todo) => {
    const params = { is_finished: !todo.is_finished };
    try {
      editTodo(todo.id, params);
    } catch (err) {
      console.log(err);
    }
  };

  // is_finishedを操作するためのボタン表示
  const renderFinished = (todo) => {
    // 自身のTodo
    if (todo.user.id === Number(sessionStorage.getItem('userId'))) {
      return (
        <React.Fragment>
          {todo.is_finished ? (
            <a
              className="ui right ribbon label teal"
              onClick={() => onFinished(todo)}
            >
              <i className="check circle icon"></i>
              Done
            </a>
          ) : (
            <a
              className="ui right ribbon label teal basic"
              onClick={() => onFinished(todo)}
            >
              <i className="circle outline icon"></i>
              Doing
            </a>
          )}
        </React.Fragment>
      );
    }
    // 他ユーザのTodo
    if (todo.user.id !== Number(sessionStorage.getItem('userId'))) {
      return (
        <React.Fragment>
          {todo.is_finished ? (
            <div className="ui right ribbon label">
              <i className="check circle outline icon"></i>
              Done
            </div>
          ) : (
            <div
              className="ui right ribbon label basic"
              onClick={() => onFinished(todo)}
            >
              <i className="circle outline icon"></i>
              Doing
            </div>
          )}
        </React.Fragment>
      );
    }
  };

  // Editボタン, Deleteボタンの表示
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
        // @TODO: Linkタグの中にLinkタグが入ってしまう場合もありエラーを吐く可能性がある
        return (
          <div className="ui raised card" key={todo.id}>
            <div className="content">
              {renderFinished(todo)}
              <Link to={`todos/${todo.id}`} className="header">
                <div className="header">
                  No. {todo.id} <br />
                  Title: {todo.title}
                </div>
              </Link>
              <div className="discription" style={{ color: 'gray' }}>
                Discription: {todo.content}
              </div>
            </div>
            <div className="extra content">
              <i className="user icon"></i>
              {todo.user.display_name}
              {renderAdmin(todo.user.id, todo.id)}
            </div>
          </div>
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
        {/* <div className="ui huge header" style={{ color: '#48834C' }}>
          ToDo List
        </div> */}
      </div>
      <br />
      {renderPagenation()}
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
  editTodo,
  moveNextPage,
  movePreviousPage,
})(TodoList);
