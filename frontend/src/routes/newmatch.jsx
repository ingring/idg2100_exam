
import React, { useEffect, useState } from 'react';
import './route.css';
import '../components/Table-tennis-board/scoreboard.js'
import useAuth from "../functions/useAuth";
import Newplayerform from '../components/Newplayerform/Newplayerform';
import ValidatePlayersForm from '../components/ValidatePlayersForm/ValidatePlayersForm'


function Newmatch() {
  const [player2, setPlayer2] = React.useState("player2");
  const { auth } = useAuth();
  const settings = "false";
  const player1 = auth.username;
  let isEventListenerAdded = false;
  const [showDialog, setShowDialog] = useState(false);
  const [showUsernameForm, setUsernameForm] = useState(true)
  const [result, setResult] = useState('');


  useEffect(() => {
    const handleGameFinished = async (e) => {
      setShowDialog(true)
      setUsernameForm(false)
      setResult(e.detail.result);

    };

    // Add the event listener only if it hasn't been added before
    if (!isEventListenerAdded) {
      document.addEventListener("game-finished", handleGameFinished);
      isEventListenerAdded = true;
    }

  }, []);

  const setPlayer2Name = (player2) => {
    setPlayer2(player2);
  };

  return (
    <>
      <main className='flex-centered newmatch'>
        {showUsernameForm && (
          <Newplayerform player1={player1} setPlayer2Name={setPlayer2Name} />
        )};
        
        {showDialog && (
          <ValidatePlayersForm
            player1={player1}
            player2={player2}
            result={result}
          />)}
        <scoreboard-counter settings={settings} player1={player1} player2={player2}></scoreboard-counter>
      </main>
    </>
  );
}

export default Newmatch;
