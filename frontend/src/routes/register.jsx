

//brought over from oblig 3 and changed quite a lot
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from '../functions/axios'
import RegisterForm from '../components/Forms/RegisterForm';
import Swal from 'sweetalert2';

const REGISTER_URL = '/players'

//registers a user
function Register() {
    const navigate = useNavigate()
    const [error, setError] = useState('');
    const [state, setState] = useState({
        username: '',
        email: '',
        firstname: '',
        surname: '',
        password: '',
        confirmPassword: '',
        department: ''
    })

    //updates the state based on user input
    const handleChange = (event) => {
        const { name, value } = event.target
        setState(prevState => ({ ...prevState, [name]: value }))
    }

    //handle the user input and post it to the API
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            if (state.password !== state.confirmPassword) {
                setError("Passwords do not match");
                return;
            }

            const data = {
                username: state.username,
                email: state.email,
                password: state.password,
            };

            if (state.firstname !== '') {
                data.firstName = state.firstname;
            }

            if (state.surname !== '') {
                data.surname = state.surname;
            }

            if (state.department !== '') {
                data.department = state.department;
            }

            const response = await axios.post(REGISTER_URL, data, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });


            if (response.status === 201) {
                // Redirect to another page
                Swal.fire({
                    title: 'Success!',
                    text: 'You have successfully registered!',
                    icon: 'success',
                    confirmButtonText: 'Continue'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/login')
                    }
                })
            }

        }
        catch (err) {
            console.log(err);
            setError(err.response.data);
        }
    }

    return (
        <>
            <div className='form-page'>
                <h1>Register</h1>

                <RegisterForm firstname={state.firstname} surname={state.surname} username={state.username} email={state.email} password={state.password} confirmPassword={state.confirmPassword} department={state.department} onChange={handleChange} onSubmit={handleSubmit} error={error} />

            </div>

        </>
    )
}

export default Register;

