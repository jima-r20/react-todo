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
  // @TODO: ページをリロードするとユーザ情報のstateがリセットされる問題がある
  const renderTodo = () => {
    // if (isSignedIn === null && sessionStorage.getItem('userId') !== null) {
    //   return <div>Loading...</div>;
    // }
    if (isSignedIn || sessionStorage.getItem('userId') !== null) {
      return (
        <div>
          <div>No. {todos.id}</div>
          <div>Created User: {todos.user.display_name}</div>
          <div>Title: {todos.title}</div>
          <div>Discription: {todos.content}</div>
        </div>
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
    todos: state.todo[ownProps.match.params.id],
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { fetchTodo })(TodoShow);
