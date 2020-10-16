import React from 'react';
import './App.css';

// COMPONENTS
import GliderGun from "./components/GliderGun";

// ROUTES
// import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      GAME OF LIFE
      <GliderGun />
    </div>
  );
}

export default App;
