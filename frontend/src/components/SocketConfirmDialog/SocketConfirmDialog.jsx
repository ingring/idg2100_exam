import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import socket from '../../socket';
import InputButton from '../Button/InputButton'
import { useNavigate } from 'react-router-dom';

function SocketConfirmDialog({ game, room, user }) {
  const input = useRef(null);
  const [validated, setValidated] = useState(false)

  const navigate = useNavigate();

  let player1

  const [statusp1, setStatusp1] = useState({
    player1: true
  });

  const [statusp2, setStatusp2] = useState({
    player2: true

  })


  const modalRef = useRef();

  try {
    if (!validated) modalRef.current.showModal(); // Show the dialog
  }
  catch (err) {
    console.log(err)
  }


  const handleChange = (event) => {
    input.current = event.target.value;
  }

  const sendMatch = (e) => {
    e.preventDefault()
    socket.emit('send-password', user, input.current, room, cbMessage => {
      if (!cbMessage) {
        modalRef.current.close()
        Swal.fire({
          icon: "error",
          title: "Oops",
          text: "wrong password"
        }).then((result) => {
          if (result.isConfirmed) {
            modalRef.current.showModal()
          }
        })
      } else {
        setValidated(true)
        modalRef.current.close()
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Password confirmed"
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            modalRef.current.showModal()

          }
        })
      }
    });




    // {player2: `${game.player2.name} ✅`}

  }
  socket.on('confirmed', (user) => {
    if (user == game.player1.name) {
      setStatusp1(false)
    } else {
      setStatusp2(false)
    }
  })

  socket.on('match-status', (status) => {
    if (Number.isInteger(status)) {
      try {
        modalRef.current.close()
      } catch (err) {
        console.error(err)
      }
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Match results stored to database",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).
        then((result) => {
          if (result.isConfirmed) {
            navigate(`/match/${status}`);
          }
        })
    } else {
      try {
        modalRef.current.close()
      } catch (err) {
        console.error(err)
      }
      Swal.fire({
        icon: "error",
        title: 'Oops',
        text: status,
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).
        then((result) => {
          if (result.isConfirmed) {
            navigate('/');
          }
        })
    }
  })


  return (
    <>
      <dialog ref={modalRef}>
        <h2>Status</h2>
        <p>{game.player1.name} {statusp1 ? <div className='loader'></div> : '✅'}</p>
        <p> {game.player2.name} {statusp2 ? <div className='loader'></div> : '✅'}</p>
        {validated ? null : (
          <form onSubmit={sendMatch}>
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" placeholder="password" onChange={handleChange} />
            <InputButton value="Submit" />
          </form>
        )}
      </dialog>
    </>
  );

}

export default SocketConfirmDialog;



//ta imot game over her
//skrive inn passord
// sende passordet til backend
// her tar imot ferdig passord med brukernavn
//vise hvem som er ferdig
// kan bare vise begge
//når begge er ferdig lokke denne også sende til db
// når sendt til db, swal/redirect på socket sia