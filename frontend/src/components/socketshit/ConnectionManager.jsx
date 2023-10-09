import React from 'react';
import socket from '../../socket';
import useAuth from '../../functions/useAuth';
import Swal from "sweetalert2";


export function ConnectionManager() {

    const { auth } = useAuth()


    function connect() {
        socket.connect()
        socket.emit(`userconn`, auth.username)
    }

    function disconnect() {
        socket.disconnect()
        Swal.fire({
            icon: 'info',
            title: "Disconnected",
            text: 'You have successfully disconnected!'
        })

    }

    return (
        <>
            <button onClick={connect}> Connect </button>
            <button onClick={disconnect}> Disconnect </button>
        </>
    )
}

