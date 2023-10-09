import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../functions/axios';
import Swal from 'sweetalert2';

function Validatemail() {
    const routeParams = useParams()
    const navigate = useNavigate();

    useEffect(() => {

        const val = async () => {
            try {
                const response = await axios.post(`/players/validateemail/${routeParams.token}`)

                if (response.status == 200) {
                    Swal.fire({
                        icon: 'success',
                        title: "success!",
                        text: "Email was succesfully validated",
                        allowEscapeKey: false,
                        allowOutsideClick: false
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate('/logout')
                        }
                    })
                }

            } catch (err) {
                console.log(err)
                Swal.fire({
                    icon: 'error',
                    title: "error",
                    text: "Couldn't find user associated with token",
                    allowEscapeKey: false,
                    allowOutsideClick: false
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/')
                    }
                })
            }
        }


        val()

    }, [])



    return (
        <main>
            <h1>
                Validation page
            </h1>
        </main>

    )


}

export default Validatemail