import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOut } from '../actions';

const Header = (props) => {
  const { signOut } = props;

  // ログアウト処理
  const handleSignOut = () => {
    try {
      signOut();
    } catch (err) {
      alert('LOGOUT ERROR: Please try again.');
    }
  };

  // ログイン状態によってボタンの表示を変更
  const renderAuthButton = () => {
    // ログインしている場合
    if (props.isSignedIn || sessionStorage.getItem('userId') !== null) {
      return (
        <div className="ui secondary pointing menu">
          <Link to="/todos" className="item ui large header">
            ToDo
          </Link>
          <div className="right menu">
            <div className="item">
              <Link to="/todos/new" className="ui button olive">
                <i className="plus icon"></i>
                Create New Todo
              </Link>
            </div>
            <div className="item">
              <Link
                to="/"
                className="ui animated fade inverted button red"
                onClick={handleSignOut}
              >
                <div className="visible content">Sign Out</div>
                <div className="hidden content">
                  <i className="sign-out icon"></i>
                </div>
              </Link>
            </div>
          </div>
        </div>
      );
    } else {
      // ログインしていない場合
      return (
        <div className="ui secondary pointing menu">
          <Link to="/" className="item ui large header">
            ToDo
          </Link>
          <div className="right menu">
            <div className="item">
              <Link to="/signin" className="ui animated fade button primary">
                <div className="visible content">Sign In</div>
                <div className="hidden content">
                  <i className="sign-in icon"></i>
                </div>
              </Link>
            </div>
            <div className="item">
              <Link to="/signup" className="ui animated fade button basic blue">
                <div className="visible content">Sign Up</div>
                <div className="hidden content">
                  <i className="user plus icon"></i>
                </div>
              </Link>
            </div>
          </div>
        </div>
      );
    }
  };

  // ページ全体の表示
  return <React.Fragment>{renderAuthButton()}</React.Fragment>;
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signOut })(Header);
