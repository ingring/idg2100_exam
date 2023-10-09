import React, { useState, useEffect, useRef } from 'react';
import useAxiosPrivate from '../../functions/useAxiosPrivate';
import './ValidatePlayersForm.css';
import Swal from 'sweetalert2';
import OnClickButton from '../Button/OnClickButton';
import { useNavigate } from 'react-router-dom';

function ValidatePlayersForm({ player1, player2, result }) {
  const [dialogVisible, setDialogVisible] = useState(true);
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()

  const [state, setState] = useState({
    player1: '',
    player2: ''
  })
  const URL = '/matches/new';
  const modalRef = useRef();

  useEffect(() => {
    const handleEscClose = (event) => {
      if (event.key === 'Escape') {
        setDialogVisible(false); // Close the dialog when Escape key is pressed
      }
    };

    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, []);

  useEffect(() => {
    if (dialogVisible) {
      try {
        modalRef.current.showModal(); // Show the dialog
      }
      catch {
        console.log('modal open')
      }
    } else {
      modalRef.current.close(); // Close the dialog
    }
  }, [dialogVisible]);

  const handleChange = (event) => {
    const { name, value } = event.target
    setState(prevState => ({ ...prevState, [name]: value }))
  }

  const sendMatch = async (e) => {
    e.preventDefault()

    let dataToDb = {
      p1Password: state.player1,
      p2Password: state.player2,
      result,
      player1,
      player2
    }
    try {

      const response = await axiosPrivate.post(URL, dataToDb);

      if (response.status === 200) {
        Swal.fire('Good job!', 'Your match is now registered', 'success').then((result) => {
          if (result.isConfirmed) {
            navigate(`/match/${response.data.matchId}`)
          }
        })
        modalRef.current.close();
      }

    }
    catch (error) {
      modalRef.current.close();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data ? `${error.response.data}!` : 'Something went wrong!',
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          modalRef.current.showModal();
        }
      });

    }

  }

  return (
    <>
      <dialog ref={modalRef}>
        <h2>Confirm match</h2>
        <form onSubmit={() => sendMatch}>
          <label htmlFor="player1">{player1}</label>
          <input type="password" name="player1" placeholder="Password" required onChange={handleChange} />
          <label htmlFor="player2">{player2}</label>
          <input type="password" name="player2" placeholder="Password" required onChange={handleChange} />


          <OnClickButton click={sendMatch} value={"Approve game"} />
        </form>
        <p className='text-center'>{player1} vs {player2}</p>
        <p className='text-center'>{result}</p>
      </dialog>
    </>
  );
}

export default ValidatePlayersForm;



