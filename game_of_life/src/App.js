import React from 'react';
import './App.css';

// COMPONENTS
import GameOfLife from "./components/GameOfLife";

// ROUTES
// import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      GAME OF LIFE
      <GameOfLife />
    </div>
  );
}

export default App;
