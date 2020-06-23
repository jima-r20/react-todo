import React from 'react';
import Header from './Header';

const App = () => {
  return (
    <div className="ui container">
      <Header />
      <button className="ui button">ログイン</button>
      <button className="ui button">新規登録</button>
    </div>
  );
};

export default App;
