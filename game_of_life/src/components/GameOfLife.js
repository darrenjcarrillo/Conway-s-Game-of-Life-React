import React, { useCallback, useState, useRef, useEffect } from "react";
import produce from "immer"
// import Preset from "./Presets.js";

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


const GameOfLife = (props) => {
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

    setTimeout(runSimulation, 50)
  }, [])



  useEffect(() => {
    const interval = setInterval(() => {
      setGeneration(counter => counter + 1);
    }, 50);

    return () => {
      clearInterval(interval)
    }
  }, [])


  return (
    <>
      <button onClick={() => {
        setActive(!active)

        if (!active) {
          activeRef.current = true;
          runSimulation();
          setGeneration(generation + 1)

        }
      }}>
        {active ? 'stop' : 'start'}
      </button>

      <button onClick={() => {
        setGeneration(0)
        setGrid(generateGrid())
        if (active) {
          return setActive(!active)
        }


      }}>
        clear
      </button>

      <div>
        <h3>PRESETS</h3>
        {/* <button onClick={() => {
          const rows = [];

          for (let i = 0; i < numRows; i++) {
            rows.push(Array.from(Array(numCols), () => Math.random() > .5 ? 1 : 0))
          }
          setGrid(rows)
        }}>
          random
        </button> */}
        <button onClick={randomSeed}>
          Random
        </button>
        <button onClick={oscillatorSeed}>
          Oscillator
        </button>
        <button onClick={gliderSeed}>
          Glider
        </button>
        <button onClick={spaceShipSeed}>
          Space Ship
        </button>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${numCols}, 20px)`
      }}>
        {grid.map((rows, i) =>
          rows.map((col, k) =>
            <div id='div'
              key={`${i}-${k}`}
              // Update grid when clicked/toggle
              onClick={() => {
                const newGrid = produce(grid, gridCopy => {
                  gridCopy[i][k] = grid[i][k] ? 0 : 1;
                });
                setGrid(newGrid)
              }}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][k] ? 'rgb(60, 179, 113)' : undefined,
                border: 'solid 1px black'
              }}></div>
          )
        )}
      </div>
      <div><h2>GENERATION {active ? generation : 'Inactive'}</h2></div>
    </>
  )
}



export default GameOfLife;