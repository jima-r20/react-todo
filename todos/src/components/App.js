import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import MainPage from './pages/MainPage';
import SignUp from './ authentication/SignUp';
import SignIn from './ authentication/SignIn';
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
            <Route path="/signin" exact component={SignIn} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
