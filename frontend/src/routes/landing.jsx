//brought over from oblig 3 and changed quite a lot
import React, { useState, useEffect } from 'react';

import axios from '../functions/axios';

import Landingtext from '../components/Landingtext/Landingtext';
import Landingdisplay from '../components/Landingdisplay/Landingdisplay';
import TopPlayers from '../components/Getplayers/TopPlayers';

function LandingPage() {
    const [playerCount, setPlayerCount] = useState(null);
    const [matchCount, setMatchCount] = useState(null);
  
    useEffect(() => {
      // Fetch player count and match count from API
      axios.get("/players/count").then((response) => {
        setPlayerCount(response.data.count);
      });
      
      // Fetch match count from API
      axios.get("/matches/count").then((response) => {
        setMatchCount(response.data.count);
      });
    }, []);


  return (
    <>
      <main>
        <h1 className='centered'>NTNU Ping Pong league</h1>
        <div className='landing'>
          <Landingtext />
          <Landingdisplay playerCount={playerCount} matchCount={matchCount}/>
          <TopPlayers />
        </div>
      </main>
    </>
  );
}

export default LandingPage;