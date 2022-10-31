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
        <h1>Idea Board</h1>
      </header>
      <body className="body">
        <form className="input_wrapper">
          <input className="input" value={userInput} placeholder="Idea title" onChange={e => setUserInput(e.target.value)} minLength={5} maxLength={30}/>
          <textarea className="textarea" minLength={10} maxLength={140} rows={3} placeholder="Idea title description" />
          <button className="input_btn" type='submit'>Add idea</button>
        </form>
        <div className='divider' />
        <div className="boards_wrapper">

        </div>
      </body>
    </div>
  );
}

export default App;
