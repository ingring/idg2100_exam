import React from 'react';
import './forms.css';
import InputButton from '../Button/InputButton';

//registers a user
function RegisterForm({ firstname, surname, username, email, password, confirmPassword, department, error, onChange, onSubmit,}){
    return(
        <>
            <form onSubmit={onSubmit} className='form register'>
                <div className='form-name'>
                    <label>
                        Firstname
                        <input type="text" name='firstname' value={firstname} onChange={onChange} />
                    </label>
                    <label>
                        Surname
                        <input type="text" name='surname' value={surname} onChange={onChange} /> 
                    </label>
                </div>
               
                <label>
                    Username *
                    <input className='required' type="text" name='username' value={username} onChange={onChange} required/>
                </label>

                <label>
                    Email *
                    <input className='required' type="email" name='email' value={email} onChange={onChange} required/>
                </label>

                <label>
                    Department
                    <input type="text" name='department' value={department} onChange={onChange} />
                </label>

                <label>
                    Password *
                    <input className='required' type="password" name='password' value={password} onChange={onChange} required/>
                </label>

                <label>
                    Confirm password *
                    <input className='required' type="password" name='confirmPassword' value={confirmPassword} onChange={onChange} required/>
                </label>
                
                <InputButton value="Register" />

                {error && <p className="error-message">{error}</p>}
            </form>
        </>
    )
}
 
export default RegisterForm;
