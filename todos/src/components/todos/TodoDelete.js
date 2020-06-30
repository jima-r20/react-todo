import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTodo, deleteTodo } from '../../actions';

import history from '../../history';
import Modal from '../Modal';

const ToDoDelete = (props) => {
  const { id } = props.match.params;
  const { todo, fetchTodo, deleteTodo } = props;

  useEffect(() => {
    fetchTodo(id);
  }, []);

  const renderActions = () => {
    return (
      <React.Fragment>
        <Link to="/todos" className="ui button">
          Cancel
        </Link>
        <button onClick={() => deleteTodo(id)} className="ui button negative">
          Delete
        </button>
      </React.Fragment>
    );
  };

  const renderContent = () => {
    if (!todo) {
      return 'Are you sure you want to DELETE this Todo?';
    }
    return `Are you sure you want to DELETE the Todo with title: [ ${todo.title} ]`;
  };

  return (
    <Modal
      title="Delete Todo"
      content={renderContent()}
      actions={renderActions()}
      onDismiss={() => history.push('/todos')}
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  return { todo: state.todo[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchTodo, deleteTodo })(ToDoDelete);
