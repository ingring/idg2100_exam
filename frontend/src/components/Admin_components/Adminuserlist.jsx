import useAxiosPrivate from '../../functions/useAxiosPrivate';
import React, { useState, useEffect } from 'react'
import './Adminuserlist.css'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


function Userlist() {

    //skal til siden isteden
    const axiosPrivate = useAxiosPrivate()
    const [Users, SetUsers] = useState()
    const playerURL = '/players/'
    const navigate = useNavigate()



    useEffect(() => {

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get(playerURL)
                SetUsers(response.data)
            } catch (err) { console.log(err) }
        }

        getUsers()


    }, [])

    async function editUser(e) {
        const userid = e.target.parentElement.getAttribute("data")
        const user = Users.find((user) => user._id === userid)
        navigate(`/admin/edit/${user.username}`)
    }

    async function deleteUser(e) {
        const userid = e.target.parentElement.getAttribute("data")

        try {
            const response = await axiosPrivate.delete(`/players/delete/${userid}`)
            Swal.fire({
                icon: 'success',
                text: 'User deleted'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload()
                }
            })
        } catch (err) {
            Swal.fire({
                icon: 'error',
                text: 'Something went wrong'
            })
        }

    }

    return (
        <div className="centered">
            <h1>Users</h1>
            {Users?.length
                ? (
                    <table className='usertable'>
                        <thead className='user'>
                            <th>Username</th>
                            <th>Full name</th>
                        </thead>
                        <tbody>
                            {Users.map((User, i) =>
                                <tr key={i} className='user'>
                                    <td>{User.username}</td>
                                    <td>{User.firstName} {User.surname}</td>
                                    <td><button className='editbtn' data={User._id} onClick={editUser}><img src="images/Edit.svg" alt="pencil" /></button></td>
                                    <td><button className='deletetbtn' data={User.username} onClick={deleteUser}><img src="images/delete.svg" alt="x" /></button></td>
                                </tr>

                            )}
                        </tbody>
                    </table>
                ) : (<p> No users to show </p>)

            }
        </div>
    )

}

export default Userlist