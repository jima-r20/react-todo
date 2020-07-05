import React from 'react';
import { Link } from 'react-router-dom';

const signUpResult = () => {
  return (
    <div style={{ textAlign: 'center', color: '#48834C', paddingTop: '10vh' }}>
      <h1 style={{ fontSize: '10vh' }}>Your Sign Up is Completed !!!</h1>
      <div>
        <h3 style={{ fontSize: '5vh' }}>Do you want to sign in ?</h3>
        <Link to="/signin" className="ui large button primary">
          YES
        </Link>
        <Link to="/" className="ui large button black">
          no
        </Link>
      </div>
    </div>
  );
};

export default signUpResult;
