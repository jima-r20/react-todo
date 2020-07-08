import React, { useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { checkSignedIn } from '../actions';

import Header from './Header';
import MainPage from './pages/MainPage';
import SignUp from './ authentication/SignUp';
import SignUpResult from './ authentication/SignUpResult';
import SignIn from './ authentication/SignIn';
import TodoList from './todos/TodoList';
import TodoShow from './todos/TodoShow';
import TodoCreate from './todos/TodoCreate';
import TodoEdit from './todos/TodoEdit';
import TodoDelete from './todos/TodoDelete';
import history from '../history';

const App = (props) => {
  const { checkSignedIn } = props;
  const userId = sessionStorage.getItem('userId');

  // リロード時にログイン済みであった場合、ユーザ情報をstoreに格納
  useEffect(() => {
    (async () => {
      if (userId !== null) {
        try {
          checkSignedIn(userId);
        } catch (err) {
          alert('Session Loading Error: Please reload this page.');
        }
      }
    })();
  }, [userId, checkSignedIn]);

  return (
    <div style={{ backgroundColor: '#eee', height: '100vh' }}>
      <Router history={history}>
        <div>
          <Header />
          <div className="ui two column very relaxed stackable grid">
            <div className="column">
              <img
                className="ui image"
                src="To do list-amico.png"
                alt="main-todo"
              />
            </div>
            <div className="column" style={{ width: '80vh', margin: '0 auto' }}>
              <Switch>
                <Route path="/" exact component={MainPage} />
                <Route path="/signup" exact component={SignUp} />
                <Route path="/signup/result" exact component={SignUpResult} />
                <Route path="/signin" exact component={SignIn} />
                <Route path="/todos" exact component={TodoList} />
                <Route path="/todos/new" exact component={TodoCreate} />
                <Route path="/todos/edit/:id" exact component={TodoEdit} />
                <Route path="/todos/delete/:id" exact component={TodoDelete} />
                <Route path="/todos/:id" exact component={TodoShow} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default connect(null, { checkSignedIn })(App);
