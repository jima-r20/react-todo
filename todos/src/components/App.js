import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import MainPage from './pages/MainPage';
import SignUp from './ authentication/SignUp';
import SignUpResult from './ authentication/SignUpResult';
import SignIn from './ authentication/SignIn';
import TodoList from './todos/TodoList';
import TodoShow from './todos/TodoShow';
import TodoCreate from './todos/TodoCreate';
import history from '../history';

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={MainPage} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/signup/result" exact component={SignUpResult} />
            <Route path="/signin" exact component={SignIn} />
            <Route path="/todos" exact component={TodoList} />
            <Route path="/todos/new" exact component={TodoCreate} />
            <Route path="/todos/:id" exact component={TodoShow} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
