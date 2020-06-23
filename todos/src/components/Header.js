import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        ToDo
      </Link>
      <div className="right menu">
        <Link to="/signin" className="ui button">
          Sign In
        </Link>
        <Link to="/signup" className="ui button">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Header;
