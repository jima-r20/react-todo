import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOut } from '../actions';

const Header = (props) => {
  // ログアウト処理
  const handleSignOut = () => {
    props.signOut();
  };

  // ログイン状態によってボタンの表示を変更
  const renderAuthButton = () => {
    // ログインしている場合
    if (props.isSignedIn || sessionStorage.getItem('userId') !== null) {
      return (
        <div className="ui secondary pointing menu">
          <Link to="/todos" className="item">
            ToDo
          </Link>
          <div className="right menu">
            <Link
              to="/"
              className="ui button basic red"
              onClick={handleSignOut}
            >
              Sign Out
            </Link>
          </div>
        </div>
      );
    } else {
      // ログインしていない場合
      return (
        <div className="ui secondary pointing menu">
          <Link to="/" className="item">
            ToDo
          </Link>
          <div className="right menu">
            <Link to="/signin" className="ui button primary">
              Sign In
            </Link>
            <Link to="/signup" className="ui button basic blue">
              Sign Up
            </Link>
          </div>
        </div>
      );
    }
  };

  return <React.Fragment>{renderAuthButton()}</React.Fragment>;
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signOut })(Header);
