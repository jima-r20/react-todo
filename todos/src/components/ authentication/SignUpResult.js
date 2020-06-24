import React from 'react';
import { Link } from 'react-router-dom';

const signUpResult = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Your Sign Up is Completed !!!</h1>
      <div>
        <h3>Do you want to sign in ?</h3>
        <Link to="/signin" className="ui button primary">
          YES
        </Link>
        <Link to="/" className="ui button">
          no
        </Link>
      </div>
    </div>
  );
};

export default signUpResult;
