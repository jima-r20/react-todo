import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOut } from '../actions';

const Header = (props) => {
  // ログアウト処理
  const handleSignOut = () => {
    sessionStorage.clear();
    props.signOut();
  };

  // ログイン状態によってボタンの表示を変更
  const renderAuthButton = () => {
    if (props.isSignedIn) {
      return (
        <Link to="/" className="ui button" onClick={handleSignOut}>
          Sign Out
        </Link>
      );
    } else {
      return (
        <React.Fragment>
          <Link to="/signin" className="ui button">
            Sign In
          </Link>
          <Link to="/signup" className="ui button">
            Sign Up
          </Link>
        </React.Fragment>
      );
    }
  };

  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        ToDo
      </Link>
      <div className="right menu">{renderAuthButton()}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signOut })(Header);
