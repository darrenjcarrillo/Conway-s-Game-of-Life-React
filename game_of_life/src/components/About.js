import React from 'react'


import "./About.scss";


const About = props => {
  console.log(props)
  return (
    <div className="about">
      <div>
        <h3>ABOUT</h3>
        <p>The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.</p>
        <p>It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. </p>
        <p>One interacts with the Game of Life by creating an initial configuration and observing how it evolves</p>
        <p>It is Turing complete and can simulate a universal constructor or any other Turing machine.</p>
      </div>
    </div>
  )
}

export default About;