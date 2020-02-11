import React from 'react';
import logo from './assets/images/spy.png';
import Typical from 'react-typical';
import './App.css';
import Feed from './components/Feed';

const steps = [
    'Hello 👋', 1000,
    'Welcome to the Web-Dev Feed', 1000,
    'Here you can post whatever you feel like', 1000,
    'You can comment on other posts', 3000,
    'You can vote on any post or comment 😈', 4000,
    'You can even edit your posts and comments', 1000,
    '...Or even delete them 👽', 4000,
    'Insert your username below', 1000,
    'And you are good to go chief 👌', 2000,

];



function App() {
  return (
    <div className="App">
     <header id="header" className="App-header">
        <img src={logo} className={"App-logo-spy"} alt="logo" />
         <Typical wrapper="span" steps={steps} loop={1} className={'caca'} />
      </header>
    <Feed />
    </div>
  );
}

export default App;
