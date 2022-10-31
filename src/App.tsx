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
          <input className="input" value={userInput} placeholder="Idea title" onChange={e => setUserInput(e.target.value)} maxLength={140}/>
          <textarea className="textarea" maxLength={140} placeholder="Idea title description" draggable={false}/>
          <button className="input_btn">Add idea</button>
        </div>
        <div className="boards_wrapper">

        </div>
      </body>
    </div>
  );
}

export default App;
