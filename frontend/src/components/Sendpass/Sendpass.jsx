import React, { useState, useContext, useEffect, useRef } from 'react';
import axios from '../../functions/axios';
import './sendpass.css';
import '../LinkTo/LinkTo';
import Swal from 'sweetalert2';



function Sendpass() {
  const [input, setInput] = useState('')
  const dialogue = useRef()


  function openmodal() {
    try {
      dialogue.current.showModal()
    } catch (err) { }
  }

  function closemodal() {
    try {
      dialogue.current.close()
    } catch (err) { }
  }

  const handleInput = (event) => {
    setInput(event.target.value)
  }



  const handleSubmit = async () => {
    try {
      const response2 = await axios.post('/players/sendnewpass', {
        username: input
      })

      if (response2.status == 200) {
        Swal.fire({
          icon: 'success',
          text: ' Recovery mail sent! '
        })
      }



    } catch (err) {
      console.error(err)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: ' No user found',
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        if (result.isConfirmed) {
          dialogue.current.showModal()
        }
      })
    }

  }

  return (
    <>
      <dialog ref={dialogue} className='passmodal'>
        <form method='dialog' onSubmit={handleSubmit}>
          <label htmlFor="username">Enter username</label>
          <input type="text" name='username' placeholder='Username. . .' value={input} onChange={handleInput} />
          <input type="submit" value={"Send recovery mail"} />
        </form>
        <button onClick={() => closemodal()}>Close</button>

      </dialog>
      <button className='forgotpasswordbtn' onClick={() => openmodal()}>Forgot password</button>
    </>
  )

}

export default Sendpass