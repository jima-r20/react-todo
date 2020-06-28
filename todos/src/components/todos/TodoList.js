import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTodos } from '../../actions';

const TodoList = (props) => {
  useEffect(() => {
    props.fetchTodos();
  }, []);

  // stateからtodo一覧を取得し表示
  const renderList = () => {
    // @TODO
    // 表示順は "todo.id" が大きい方から順に表示したい
    // → まだできていない
    return props.todos.map((todo) => {
      return (
        <div className="item" key={todo.id}>
          <div className="ui avatar image">{todo.user.display_name}</div>
          <div className="content">
            <div className="header">{todo.title}</div>
            <div className="discription">{todo.content}</div>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <div>ToDos</div>
      <div className="ui celled list">{renderList()}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { todos: Object.values(state.todo) };
};

export default connect(mapStateToProps, { fetchTodos })(TodoList);
