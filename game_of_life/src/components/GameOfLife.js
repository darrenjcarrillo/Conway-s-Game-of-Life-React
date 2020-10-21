import React, { useCallback, useState, useRef, useEffect } from "react";
import produce from "immer"
// import Preset from "./Presets.js";
import "./GameOfLife.scss";

const numRows = 50;
const numCols = 50;




const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0]
]

const generateGrid = () => {
  const rows = [];

  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0))
  }
  return rows
}


const GameOfLife = props => {
  const [grid, setGrid] = useState(() => {
    return generateGrid()
  });


  // Set state to button
  const [active, setActive] = useState(false);

  const [generation, setGeneration] = useState(0)

  const activeRef = useRef(active);
  activeRef.current = active

  // PRESETS

  const randomSeed = () => {
    const newGrid = generateGrid(grid)

    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        if (Math.floor(Math.random() * 4) === 1) {
          newGrid[i][j] = true
        }
      }
    }
    setGrid(newGrid)
  }

  const oscillatorSeed = () => {
    let newGrid = generateGrid(grid)

    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        if (i === 4 && j === 3) {
          newGrid[i][j] = true
        }
        if (i === 4 && j === 4) {
          newGrid[i][j] = true
        }
        if (i === 4 && j === 5) {
          newGrid[i][j] = true
        }
      }
    }
    setGrid(newGrid)
  }

  const gliderSeed = () => {
    let newGrid = generateGrid(grid);

    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        if (i === 0 && j === 2) {
          newGrid[i][j] = true
        }
        if (i === 1 && j === 0) {
          newGrid[i][j] = true
        }
        if (i === 1 && j === 2) {
          newGrid[i][j] = true
        }
        if (i === 2 && j === 1) {
          newGrid[i][j] = true
        }
        if (i === 2 && j === 2) {
          newGrid[i][j] = true
        }
      }
    }
    setGrid(newGrid)
  }

  const spaceShipSeed = () => {
    let newGrid = generateGrid(grid)
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        //make a quarter of the cells alive at start
        if (i === 1 && j === 1) {
          newGrid[i][j] = true
        }
        if (i === 1 && j === 4) {
          newGrid[i][j] = true
        }
        if (i === 2 && j === 5) {
          newGrid[i][j] = true
        }
        if (i === 3 && j === 1) {
          newGrid[i][j] = true
        }
        if (i === 3 && j === 5) {
          newGrid[i][j] = true
        }
        if (i === 4 && j === 2) {
          newGrid[i][j] = true
        }
        if (i === 4 && j === 3) {
          newGrid[i][j] = true
        }
        if (i === 4 && j === 4) {
          newGrid[i][j] = true
        }
        if (i === 4 && j === 5) {
          newGrid[i][j] = true
        }
      }
    }
    // set new grid to state
    setGrid(newGrid)
  }

  const acornSeed = () => {
    let newGrid = generateGrid(grid)

    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        if (i === 26 && j === 32) {
          newGrid[i][j] = true
        }
        if (i === 28 && j === 31) {
          newGrid[i][j] = true
        }
        if (i === 28 && j === 32) {
          newGrid[i][j] = true
        }
        if (i === 28 && j === 37) {
          newGrid[i][j] = true
        }
        if (i === 28 && j === 36) {
          newGrid[i][j] = true
        }
        if (i === 28 && j === 35) {
          newGrid[i][j] = true
        }
        if (i === 27 && j === 34) {
          newGrid[i][j] = true
        }
      }
    }
    setGrid(newGrid)
  }

  const gosperGliderGun = () => {
    let newGrid = generateGrid(grid)

    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        // first box
        if (i === 10 && j === 4) {
          newGrid[i][j] = true
        }
        if (i === 9 && j === 4) {
          newGrid[i][j] = true
        }
        if (i === 10 && j === 5) {
          newGrid[i][j] = true
        }
        if (i === 9 && j === 5) {
          newGrid[i][j] = true
        }
        // Glider
        if (i === 11 && j === 14) {
          newGrid[i][j] = true
        }
        if (i === 10 && j === 14) {
          newGrid[i][j] = true
        }
        if (i === 9 && j === 14) {
          newGrid[i][j] = true
        }
        if (i === 8 && j === 15) {
          newGrid[i][j] = true
        }
        if (i === 7 && j === 16) {
          newGrid[i][j] = true
        }
        if (i === 7 && j === 17) {
          newGrid[i][j] = true
        }
        if (i === 12 && j === 15) {
          newGrid[i][j] = true
        }
        if (i === 13 && j === 16) {
          newGrid[i][j] = true
        }
        if (i === 13 && j === 17) {
          newGrid[i][j] = true
        }
        if (i === 10 && j === 18) {
          newGrid[i][j] = true
        }
        if (i === 8 && j === 19) {
          newGrid[i][j] = true
        }
        if (i === 12 && j === 19) {
          newGrid[i][j] = true
        }
        if (i === 9 && j === 20) {
          newGrid[i][j] = true
        }
        if (i === 10 && j === 20) {
          newGrid[i][j] = true
        }
        if (i === 11 && j === 20) {
          newGrid[i][j] = true
        }
        if (i === 10 && j === 21) {
          newGrid[i][j] = true
        }
        if (i === 9 && j === 24) {
          newGrid[i][j] = true
        }
        if (i === 8 && j === 24) {
          newGrid[i][j] = true
        }
        if (i === 7 && j === 24) {
          newGrid[i][j] = true
        }
        if (i === 9 && j === 25) {
          newGrid[i][j] = true
        }
        if (i === 8 && j === 25) {
          newGrid[i][j] = true
        }
        if (i === 7 && j === 25) {
          newGrid[i][j] = true
        }
        if (i === 6 && j === 26) {
          newGrid[i][j] = true
        }
        if (i === 10 && j === 26) {
          newGrid[i][j] = true
        }
        if (i === 5 && j === 28) {
          newGrid[i][j] = true
        }
        if (i === 6 && j === 28) {
          newGrid[i][j] = true
        }
        if (i === 10 && j === 28) {
          newGrid[i][j] = true
        }
        if (i === 11 && j === 28) {
          newGrid[i][j] = true
        }
        if (i === 7 && j === 38) {
          newGrid[i][j] = true
        }
        if (i === 8 && j === 38) {
          newGrid[i][j] = true
        }
        if (i === 7 && j === 39) {
          newGrid[i][j] = true
        }
        if (i === 8 && j === 39) {
          newGrid[i][j] = true
        }
      }
    }
    setGrid(newGrid)
  }

  // useCallback - to not be recreated every render
  const runSimulation = useCallback(() => {
    // Base Case - Kind of like recursion
    if (!activeRef.current) {
      return;
    }
    // simulation
    // Update values in the grid
    setGrid(g => {
      return produce(g, gridCopy => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbor = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              // for a given cell, how many neighbor it has
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbor += g[newI][newK]
              }
            });
            // live cell fewer than 2 or more than 3 dies
            if (neighbor < 2 || neighbor > 3) {
              gridCopy[i][k] = 0
            } else if (g[i][k] === 0 && neighbor === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });

    // Generation render update
    const runGeneration = (() => {
      setGeneration(counter => counter + 1);
    })

    setTimeout(runSimulation, 50)
    setTimeout(runGeneration)

  }, [])

  // BUTTONS Function

  const playPausedButton = () => {
    setActive(!active)
    if (!active) {
      activeRef.current = true;
      runSimulation();
    } else {
      const interval = setInterval(() => {
        clearInterval(interval)
      })
    }
  }

  const clearButton = () => {
    setGeneration(0)
    setGrid(generateGrid())
    if (active) {
      return setActive(!active)
    }
  }

  const fastForwardButton = () => {
    setTimeout(runSimulation, 20)
  }

  return (
    <div className="main-container">
      <div className="generationContainer" >
        <h2>GENERATION {generation}</h2>
      </div>
      <div className='mainGrid'>
        {grid.map((rows, i) =>
          rows.map((col, k) =>
            <div id='grid-container'
              key={`${i}-${k}`}
              // Update grid when clicked/toggle
              onClick={() => {
                const newGrid = produce(grid, gridCopy => {
                  gridCopy[i][k] = grid[i][k] ? 0 : 1;
                });
                setGrid(newGrid)
              }}
              style={{
                width: 15,
                height: 12,
                backgroundColor: grid[i][k] ? 'rgb(0, 255, 65)' : undefined,
                border: 'solid .1px black'
              }}></div>
          )
        )}
      </div>
      <div className="buttonsContainer">
        <div className="rightButtons">
          <button onClick={playPausedButton}>
            {active ? 'stop' : 'start'}
          </button>
        </div>
        <div className="leftButtons">
          <div>
            <button className="clearButton" onClick={clearButton}>
              Clear
            </button>
          </div>
          <div>
            <button className="fastForwardButton" onClick={fastForwardButton}>
              Fast
            </button>
          </div>
          <div>
            <button onClick={randomSeed}>
              Random
            </button>
          </div>
          <div>
            <button onClick={oscillatorSeed}>
              Osci
            </button>
          </div>
          <div>
            <button onClick={gliderSeed}>
              Glider
            </button>
          </div>
          <div>
            <button onClick={spaceShipSeed}>
              S-Ship
            </button>
          </div>
          <div>
            <button onClick={acornSeed}>
              Acorn
            </button>
          </div>
          <div>
            <button onClick={gosperGliderGun}>
              G-Gun
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default GameOfLife;