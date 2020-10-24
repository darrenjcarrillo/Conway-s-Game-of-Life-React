import React from 'react'


import "./About.scss";


const About = props => {
  console.log(props)
  return (
    <div className="about">
      <div>
        <h3>ABOUT</h3>
        <p>The creator of this "playerless game" was named John Conway.</p>
        <p>Turing complete,also called computationally universal, is a term used in computability theory to describe abstract machines, usually called automata.</p>
        <p>HTML is not Turing complete without JavaScript because HTML cannot actively change the state of the system without JavaScript.</p>
      </div>
    </div>
  )
}

export default About;