import React from 'react';
import './App.css';

// COMPONENTS
import GameOfLife from "./components/GameOfLife";
import About from "./components/About";
import Rules from "./components/Rules";

// ROUTES
// import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="title">
        GAME OF LIFE
      </div>
      <div className="componentsContainer">
        <Rules />
        <GameOfLife />
        <About />
      </div>
    </div>
  );
}

export default App;
