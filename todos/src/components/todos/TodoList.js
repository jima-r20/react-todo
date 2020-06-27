import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTodos } from '../../actions';

const TodoList = () => {
  // useEffect(() => {
  //   fetchTodos();
  // }, []);

  return (
    <div>
      <div>ToDos</div>
      <button onClick={fetchTodos}>list</button>
    </div>
  );
};

export default connect(null, { fetchTodos })(TodoList);
