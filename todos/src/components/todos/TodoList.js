import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTodos } from '../../actions';

const TodoList = (props) => {
  // useEffect(() => {
  //   fetchTodos();
  // }, []);

  const handleTodo = () => {
    props.fetchTodos();
  };

  return (
    <div>
      <div>ToDos</div>
      <button onClick={handleTodo}>list</button>
    </div>
  );
};

export default connect(null, { fetchTodos })(TodoList);
