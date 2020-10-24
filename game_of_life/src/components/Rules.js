import React from 'react'


import "./Rules.scss";


const Rules = props => {
  console.log(props)
  return (
    <div className="rules">
      <div>
        <h3>Rules</h3>
        <p>Any live cell with two or three live neighbors survives.</p>
        <p>Any dead cell with three live neighbors becomes a live cell.</p>
        <p>All other live cells die in the next generation. Similarly, all other dead cells stay dead.</p>
      </div>
    </div>
  )
}

export default Rules;