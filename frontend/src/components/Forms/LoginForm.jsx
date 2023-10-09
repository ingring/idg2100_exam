import React from 'react';
import './forms.css';
import InputButton from '../Button/InputButton';

function LoginForm({username, password, onChange, onSubmit, error}) {
  return (
    <>
      <form onSubmit={onSubmit} className='form'>
          <label>
            Username
            <input type="text" name="username" value={username} onChange={onChange} required/>
          </label>
          <label>
            Password
            <input type="password" name="password" value={password} onChange={onChange} required/>
          </label>
          <InputButton value="Login" />
          {error && <p className="error-message">{error}</p>}
      </form>
      
    </>
  );
}

export default LoginForm;
