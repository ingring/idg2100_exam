import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosPrivate from '../../functions/useAxiosPrivate';
import './Edituser.css'
import InputButton from '../Button/InputButton';
import OnClickButton from '../Button/OnClickButton';

function Edituser() {
    const user = useParams()
    const navigate = useNavigate()
    const axiosPrivate = useAxiosPrivate()
    const [User, SetUser] = useState()
    const [userData, setUserData] = useState({
        firstName: '',
        surname: '',
        username: '',
        email: '',
        department: '',
    });

    const { firstName, surname, email, department } = userData;



    useEffect(() => {

        const getData = async () => {
            try {
                const response = await axiosPrivate.get(`/players/${user.username}`)
                SetUser(response.data.onePlayer[0])
                setUserData(response.data.onePlayer[0])
            } catch (error) {
                console.log(error)
            }
        }

        getData()





    }, [])


    const handleChange = (e) => {
        const { name, value } = e.target
        setUserData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await axiosPrivate.put(`/players/update/${User._id}`, {
                surname: surname,
                firstName: firstName,
                department: department,
                email: email
            })

            Swal.fire({
                title: "User info updated",
                icon: "success",
                allowEscapeKey: false,
                allowOutsideClick: false
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/')
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    function passwordChange(e) {
        e.preventDefault()
        try {
            axiosPrivate.post('/players/sendnewpass', { email: User.email, username: User.username })
            Swal.fire({
                title: "Succesfully sent password",
                icon: "success"
            })
        } catch (error) {
            console.error(error)
            Swal.fire({
                title: "couldn't send new password",
                icon: "error"
            })
        }
    }

    return (
        <main>
            <div className="centered">
                <h1>Edit user</h1>
                <form onSubmit={handleSubmit}>
                    <div className="aside">
                        <div className='input'>
                            <label htmlFor="firstName">Firstname</label>
                            <input type="text" name='firstName' value={firstName || ''} onChange={handleChange} />
                        </div>
                        <div className='input'>
                            <label htmlFor="surname">Surname</label>
                            <input type="text" name='surname' value={surname || ''} onChange={handleChange} />
                        </div>
                    </div>
                    <div className='input'><label htmlFor="email">Email</label>
                        <input type="text" name='email' value={email || ''} onChange={handleChange} /></div>

                    <div className='input'><label htmlFor="department">Department</label>
                        <input type="text" name='department' value={department || ''} onChange={handleChange} /></div>

                    <div className="aside">
                        <InputButton value={"Update user"} />
                        {/* <button onClick={passwordChange}>Send new password</button> */}
                        <OnClickButton click={passwordChange} value={"Send new password"} />
                    </div>
                </form>
            </div>


        </main>
    )
}

export default Edituser