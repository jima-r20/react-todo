import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTodo, deleteTodo } from '../../actions';

import history from '../../history';
import Modal from '../Modal';

const TodoDelete = (props) => {
  const { id } = props.match.params;
  const { todo, fetchTodo, deleteTodo } = props;

  useEffect(() => {
    (async () => {
      try {
        await fetchTodo(id);
      } catch (err) {
        alert('Loading Error: Please try again');
      }
    })();
  }, [id, fetchTodo]);

  // ボタンの表示
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

  // モーダルのテキスト表示
  const renderContent = () => {
    if (!todo) {
      return 'Are you sure you want to DELETE this Todo?';
    }
    // return `Are you sure you want to DELETE the Todo with title: [ ${todo.title} ]`;
    return (
      <div>
        <div>Are you sure you want to DELETE the Todo with title:</div>
        <div className="ui large header" style={{ fontWeight: 'bold' }}>
          [ {todo.title} ]
        </div>
      </div>
    );
  };

  // モーダルの全体表示
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

export default connect(mapStateToProps, { fetchTodo, deleteTodo })(TodoDelete);
