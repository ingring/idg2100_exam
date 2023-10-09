import React, { useState, useEffect } from 'react'
import useAxiosPrivate from '../../functions/useAxiosPrivate'
import './getplayers.css'
import Swal from 'sweetalert2'
import useAuth from '../../functions/useAuth'

//URL endpoint for getting all players
const playerURL = '/players/leaderboard'

//create the playerlist
function PlayerList() {
    const [players, setPlayers] = useState()
    const axiosPrivate = useAxiosPrivate()

    const { auth } = useAuth()

    useEffect(() => {
        let isMounted = true

        const controller = new AbortController()

        const getPlayers = async () => {
            try {
                const response = await axiosPrivate.get(playerURL, {
                    signal: controller.signal
                })
                isMounted && setPlayers(response.data)



            } catch (err) {
                console.log(err)
            }
        }

        getPlayers()

        return () => {
            isMounted = false
            controller.abort()
        }

    }, [])

    function makeFavourite(e) {
        let newFavUrl = '/players/newFav'
        let target = e.target;
        let username = target.getAttribute('username');
        Swal.fire({
            title: `New favourite?`,
            icon: 'question',
            html: `Are you sure you want <b>${username}</b> as a favourite?`,
            showCloseButton: true,
            showCancelButton: true,
            cancelButtonText: 'Cancel'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axiosPrivate.post(newFavUrl, {
                        username,
                    });

                    Swal.fire(
                        'Yay!',
                        `${username} is now a favourite!`,
                        'success'
                    );
                    const updatedPlayers = players.map((player) => {
                        if (player.username === username) {
                            return { ...player, favourited: true };
                        }
                        return player;

                    });
                    setPlayers(updatedPlayers);
                    //if request to API failed
                } catch (err) {
                    let errorMsg = err?.response?.data;
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: errorMsg ? `${errorMsg}!` : 'Something went wrong!'
                    })
                }
            }
        });
    }

    function removeFavourite(e) {
        let removeFavUrl = '/players/removeFav';
        let target = e.target;
        let username = target.getAttribute('username');
        Swal.fire({
            title: `Remove ${username}?`,
            icon: 'question',
            html: `Are you sure you want to remove <b>${username}</b> as a favourite?`,
            showCloseButton: true,
            showCancelButton: true,
            cancelButtonText: 'Cancel'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axiosPrivate.post(removeFavUrl, {
                        username,
                    });

                    //show successMsg if the removal was successfull
                    Swal.fire(
                        'Yay!',
                        `${username} is now removed as a favourite!`,
                        'success'
                    );
                    const updatedPlayers = players.map((player) => {
                        if (player.username === username) {
                            return { ...player, favourited: false };
                        }
                        return player;
                    });
                    setPlayers(updatedPlayers);
                } catch (err) {
                    let errorMsg = err?.response?.data;
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: errorMsg ? `${errorMsg}!` : 'Something went wrong!',
                    })
                }
            }
        });
    }

    return (
        <div className='centered'>
            <div>
                <h1>Leaderboard</h1>

                {players?.length
                    ? (
                        <table className='leaderboard'>
                            <thead>
                                <th>Nr</th>
                                <th>Username</th>
                                <th>Points</th>
                                <th>Favorites</th>
                            </thead>
                            <tbody>
                                {players.map((player, i) =>
                                    <tr className={`leaderboard-player ${auth.username === player.username ? 'current-player' : ''}`} key={i}>
                                        <td className='centered'>
                                            {(() => {
                                                if (i == 0) {
                                                    return (
                                                        <li>
                                                            <img src="images/Gold.svg" className='medals' alt='Gold medal, first place' /></li>
                                                    )
                                                } else if (i == 1) {
                                                    return (
                                                        <li>
                                                            <img src="images/Silver.svg" className='medals' alt='Silver medal, second place' /></li>
                                                    )
                                                } else if (i == 2) {
                                                    return (
                                                        <li>
                                                            <img src="images/Bronze.svg" className='medals' alt='Bronze medal, third place' /></li>
                                                    )
                                                } else {
                                                    return (
                                                        <li>{i + 1}
                                                        </li>
                                                    )
                                                }
                                            })()}
                                        </td>
                                        <td>{player?.username}</td>
                                        <td className='centered'>{player?.points}</td>
                                        {auth.username !== player.username ? (
                                            <td className='centered'>{player.favourited ? (
                                                <button id="btn-fav" className='btn-star' username={player?.username} onClick={removeFavourite}></button>
                                            ) : (
                                                <button className='btn-star' username={player?.username} onClick={makeFavourite}></button>
                                            )}
                                            </td>
                                        ) : <td></td>}
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    ) : <p>No players to display</p>

                }
            </div>
        </div>)

}
//<button className='btn-star' username={player?.username} onClick={makeFavourite}></button>
export default PlayerList