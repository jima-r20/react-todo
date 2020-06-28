import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTodo } from '../../actions';

const TodoShow = (props) => {
  const { id } = props.match.params;
  const { todos, isSignedIn, fetchTodo } = props;

  // 選択したTodoのデータ取得
  useEffect(() => {
    if (isSignedIn || sessionStorage.getItem('userId') !== null) {
      fetchTodo(id);
    }
  }, []);

  // Todoの中身表示
  const renderTodo = () => {
    console.log(todos);
    if (isSignedIn) {
      return (
        <div>
          <div>Todo Number: {todos.id}</div>
          <div>Created User: {todos.user.display_name}</div>
          <div>Todo Title: {todos.title}</div>
          <div>Todo Discription: {todos.content}</div>
        </div>
      );
    }
  };

  return (
    <div>
      Todo Show
      {renderTodo()}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    todos: state.todo[ownProps.match.params.id],
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { fetchTodo })(TodoShow);
