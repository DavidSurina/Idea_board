import React, { useState, useEffect } from 'react';
import './App.css';

function App(): JSX.Element {
  const [userInput, setUserInput ] = useState('');

  useEffect(() => {
    console.log(userInput);
  }, [userInput])
  
  return (
    <div className="app">
      <header className="header">
        <h1 className="main_heading">Idea Board</h1>
      </header>
      <body className="body">
        <div className="input_wrapper">
          <input className="main_heading" value={userInput} placeholder="Idea input" onChange={e => setUserInput(e.target.value)}></input>
        </div>
        <div className="boards_wrapper">

        </div>
      </body>
    </div>
  );
}

export default App;
