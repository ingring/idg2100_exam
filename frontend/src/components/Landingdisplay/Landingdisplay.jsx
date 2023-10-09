// this component was brought over from oblig 3
import React from 'react';
import './landingdisplay.css';

//gets the amount of matches and players, and creates a component
function Landingdisplay(props) {

  
    return (
      <>
        <div className='landingdisplay'>
          <p>
            We currently have:
          </p>
          <p> <span className="green bold">{props.playerCount}</span> players</p>
          <p> <span className="green bold">{props.matchCount}</span> matches</p>
        </div>
      </>
    );
  }
  
 
export default Landingdisplay;



 