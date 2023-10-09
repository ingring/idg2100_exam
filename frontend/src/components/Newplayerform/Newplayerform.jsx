import React, { useState, useEffect, useRef } from 'react';
import './Newplayerform.css';
import useAxiosPrivate from '../../functions/useAxiosPrivate';
import Swal from 'sweetalert2'
import InputButton from '../Button/InputButton';
import OnClickButton from '../Button/OnClickButton';
import { useNavigate } from 'react-router-dom';

function NewPlayerForm({ setPlayer2Name, player1, match }) {
  const URL = '/players/validate';
  const axiosPrivate = useAxiosPrivate();

  const [input, setInput] = useState('');
  const dialogue = useRef(null);

  const navigate = useNavigate();

  // Go back to the page you came from. 
  // Since it isn't possible to use the header before you close the modal and start the game
  const goBack = () => {
    navigate('/');
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (player1 === input) {
      dialogue.current.close()
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Player 2 can not be the same user as player 1.',
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          dialogue.current.showModal()

        }
      });
      return;
    }
    try {
      let response = await axiosPrivate.post(URL, {
        player1: player1,
        player2: input

      },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        });
      if (response.status === 200) {
        Swal.fire(
          'Good job!',
          'Player 2 is now verified!',
          'success'
        )
        setPlayer2Name(input);
        dialogue.current.close();
      }
    } catch (err) {
      console.log(err)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.response.data ? `${err.response.data}!` : `User: ${input} does not exist!`,
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          dialogue.current.showModal()
        }
      });
      dialogue.current.close();
    }


  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  useEffect(() => {
    try {
      dialogue.current.showModal();
    } catch (err) { }
  }, []);

  return (
    <>

      <dialog ref={dialogue}>
        <h2>Select player 2</h2>
        <form onSubmit={handleFormSubmit} className='newPlayer-form'>
          <div className='text'>
            <p>Player 1: {player1}</p>
            <label htmlFor="player2">Player 2: </label>
            <input type="text" name="player2" placeholder='Username...' value={input} onChange={handleInputChange} />
          </div>
          <div className='buttons'>
            <OnClickButton click={goBack} value="Go home" type="button" />
            <InputButton value={"Submit"} />
          </div>
        </form>
      </dialog>
    </>
  );
}

export default NewPlayerForm;