import React, { useCallback, useState, useRef } from "react";
import produce from "immer"

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


  const activeRef = useRef(active);
  activeRef.current = active

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

    setTimeout(runSimulation, 100);
  }, [])

  return (
    <>
      <button onClick={() => {
        setActive(!active)
        if (!active) {
          activeRef.current = true;
          runSimulation();
        }
      }}>
        {active ? 'stop' : 'start'}
      </button>

      <button onClick={() => {
        setGrid(generateGrid())
        if (active) {
          return setActive(!active)
        }
      }}>
        clear
      </button>
      <button onClick={() => {
        const rows = [];

        for (let i = 0; i < numRows; i++) {
          rows.push(Array.from(Array(numCols), () => Math.random() > .5 ? 1 : 0))
        }
        setGrid(rows)
      }}>
        random
      </button>
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
    </>
  )
}



export default GameOfLife;