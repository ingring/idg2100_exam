import React from 'react';
import './forms.css';
import useAxiosPrivate from '../../functions/useAxiosPrivate';
import useAuth from '../../functions/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import InputButton from '../Button/InputButton';






//registers a user
function EditPasswordForm() {
    const navigate = useNavigate()
    const axiosPrivate = useAxiosPrivate()
    const { auth } = useAuth()
    const [data, setData] = React.useState({
        oldpassword: '',
        password: '',
        confirmpassword: '',
        username: auth.username,
    });
    const [error, setError] = React.useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }


    const onSubmit = async (e) => {
        e.preventDefault()

        if (data.password !== data.confirmpassword) {
            setError('Passwords do not match')
            return
        }

        try {
            const response = await axiosPrivate.put(`/players/updatePassword`, data)
            Swal.fire({
                title: 'Password updated',
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/profile')
                }
            })
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: 'Error',
                text: error.response.data.message ? error.response.data.message : "Something went wrong",
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }


    }



    return (
        <main>
            <form onSubmit={onSubmit} className='form-page'>
                <label>
                    Old Password *
                    <input className='required' type="password" name='oldpassword' value={data.oldpassword} onChange={handleChange} required />
                </label>

                <label>
                    Password *
                    <input className='required' type="password" name='password' value={data.password} onChange={handleChange} required />
                </label>

                <label>
                    Confirm password *
                    <input className='required' type="password" name='confirmpassword' value={data.confirmpassword} onChange={handleChange} required />
                </label>

                <InputButton value={"Update password"} />

                {error && <p className="error-message">{error}</p>}
            </form>
        </main>
    )
}

export default EditPasswordForm;
