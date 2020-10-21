import React from 'react';
import './App.css';

// COMPONENTS
import GameOfLife from "./components/GameOfLife";
import About from "./components/About";

// ROUTES
// import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="title">
        <h2>GAME OF LIFE</h2>
      </div>
      <GameOfLife />
      <About />
    </div>
  );
}

export default App;
