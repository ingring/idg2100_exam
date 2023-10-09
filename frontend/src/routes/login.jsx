//brought over from oblig 3 and changed quite a lot
import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from '../functions/axios'
import AuthContext from '../context/AuthProvider'
import Sendpass from '../components/Sendpass/Sendpass';
import LoginForm from '../components/Forms/LoginForm';
import LinkTo from '../components/LinkTo/LinkTo';
const LOGIN_URL = '/players/login';

function Login() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [state, setState] = useState({
    username: '',
    password: ''
  })

  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setState(prevState => ({ ...prevState, [name]: value}))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await axios.post(LOGIN_URL,{
          username: state.username,
          password: state.password
      },
      {
          headers: { 'Content-Type': 'application/json' },
                  withCredentials: true
      }
      )
      const accesstoken = response?.data?.accesstoken;
      setAuth({username: state.username, accesstoken:accesstoken})
      
      // Redirect to /Profile on successful login
      if(accesstoken) {
        navigate('/')
      };



    } catch (err) {
      console.log(err)
      let errorMsg = err?.request?.response;
      if (errorMsg) {
        setError(err?.request?.response);}
        else setError('error');
    }

    setState({
        username: '',
        password: ''
    })
  }

  return (
    <>
      <main className='form-page'>
          <h1>Login</h1>
          <LoginForm onSubmit={handleSubmit} error={error} username={state.username} password={state.password} onChange={handleChange} required/>
          <div className='login-links-container'>
            <LinkTo to="/register" className='link' value="Register new user" />
            <Sendpass />
          </div>
      </main>
    </>
  );
}

export default Login;
