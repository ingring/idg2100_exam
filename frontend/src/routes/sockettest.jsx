import React, { useState, useEffect, useRef} from 'react'
import socket from '../socket'
import { ConnectionState } from '../components/socketshit/ConnectionState'
import { ConnectionManager } from '../components/socketshit/ConnectionManager'
import useAuth from '../functions/useAuth'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import SocketConfirmDialog from '../components/SocketConfirmDialog/SocketConfirmDialog'
import OnClickButton from '../components/Button/OnClickButton'
import InputButton from '../components/Button/InputButton'

export default function SocketTest () {
    const navigate = useNavigate()

    const [isConnected, setIsConnected] = useState(socket.connected)
    const [game, setGame] = useState({
        player1: {
            name: "player1",
            points: 0,
            sets: 0,
          },
          player2: {
            name: "player2",
            points: 0,
            sets: 0,
          },
          sets: "",
    })
    const [inputValue, setInputValue] = useState('')
    const [roomid, setRoomid] = useState('')
    const { auth } = useAuth()
    const [gameOver, setGameOver] =useState(false)
    const [user] = useState(auth.username)


    
    useEffect(() => {
        function onConnect() {
            setIsConnected(true)
        }
        function onDisconnect() {
            setIsConnected(false)
        }

        

        return () => {
            socket.on('connect', onConnect)
            socket.on('disconect', onDisconnect)
        }
    }, [])

    let player2;
    if (game.player1.name == auth.username){
        player2 = game.player2.name
    }else{
        player2 = game.player1.name
    }

    

    socket.on('players', (players) =>{
        setGame({
            player1: {
                name: players.player1.name,
                points: players.player1.points,
                sets: players.player1.sets,
            },
            player2: {
                name: players.player2.name,
                points: players.player2.points,
                sets: players.player2.sets,
            },
            sets: players.sets,
        })
    
     
    })

    socket.on("game over", () => {
        // showmodal
        setGameOver(true)
    })



    const addPoint = () => {
        socket.emit('point', auth.username, roomid)
    }

    const hostMatch = (e) => {
        e.preventDefault()
        socket.connect()
        socket.emit('userconn',auth.username)

        socket.emit('host-room',auth.username,message =>{setRoomid(message)
        if(!message){
            Swal.fire({
                icon: "error",
                title: "Oops",
                text: "Could not create match"
            })
        }else{
            Swal.fire({
                icon: "success",
                title: "success",
                text: `Hosting match: ${message}`
            })
        }})
    }

    const joinMatch = (e) => {
        socket.connect()
        e.preventDefault()
        socket.emit('userconn',auth.username)
        socket.emit('join-room', inputValue,auth.username, message => {if(!message){
            Swal.fire({
                icon: "error",
                title: "Oops",
                text: 'Room does not exist'
            })
        }else{
            Swal.fire({
                icon: "success",
                title: `Connected to ${message}`
            });
            setRoomid(message)
        }
        })
    }

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
      };

      let content

      if (game.player1.name == auth.username){
        content = <>
            <div><button onClick={() => addPoint()}>Add point</button></div><div></div>

            
        </>
    }else{
        content = <>
            <div></div><div><button onClick={() => addPoint()}>Add point</button></div>
        </>
    }
    
    
    

    return (
        <main className='socket'>
        
        {roomid
            ?( ""
            ): <h1>Connect to match</h1>
        }
        <div className={gameOver ? "hidden" : "socket"} >

            {roomid
            ? (<>
                <section className="scoreboard">
                    <div className="scoreboard">
                        <p className="sets">{game.player1.sets}</p>
                        <p className="points">{game.player1.points}</p>
                        <p className="points">{game.player2.points}</p>
                        <p className="sets">{game.player2.sets}</p>
                    </div>
                </section>
                <section className="table">
                    <div><p>{game.player1.name}</p></div>
                    <div><p>{game.player2.name}</p></div>
                    {content}
                    


                </section>
                <section className="scores">
                    <p>{game.sets}</p>
                </section>

                
                </>) : (
            <>
            <div className="socket-parent">
                <div className="socket-join">
                    <form onSubmit={hostMatch}>
                        <p>Host a match</p>
                        <InputButton value={"Host match"}/>
                    </form>
                </div>
                <div className='socket-join'>
                    <form onSubmit={joinMatch}>
                    <label htmlFor="join-match">Join another user</label>
                        <input type="text" onChange={handleInputChange} />
                        <InputButton value={"Join match"}/>
                    </form>
                </div>
            </div>
            </>
            ) 
            }


            

        </div>
        {gameOver ? 
        <main>
            <SocketConfirmDialog game={game} room={roomid} user={user}/>
        </main> : ""}
            

        </main>
    )
}