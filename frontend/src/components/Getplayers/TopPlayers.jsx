import React, { useState, useEffect } from 'react';
import axios from '../../functions/axios';
import './getplayers.css';

const URL = '/players/top-players'

function TopPlayers() {
    const [players, setPlayers] = useState()

    useEffect(()=>{

        const getlist = async () => {
            try{

                const response = await axios.get(URL)
                setPlayers(response.data)

            }catch(err){
                console.error(err)}
        }

        getlist()

    },[])


    return(
        <div className="centered">
            <h2>Top five players</h2>
            {players?.length
            
            ? (

                <table className='leaderboard'>
                    <thead>
                        <th>Nr</th>
                        <th>Username</th>
                        <th>Points</th>
                    </thead>
                    <tbody>
                        {players.map((player,i)=>
                            <tr key={i} id={i + 1} className='leaderboard-player'>
                                <td className='centered'>
                                    {(()=>{
                                        if (i == 0){return(
                                            <li>
                                            <img src="images/Gold.svg" className='medals' alt='Gold medal, first place' /></li>
                                        )
                                    } else if (i == 1){return(
                                        <li>
                                        <img src="images/Silver.svg" className='medals' alt='Silver medal, second place' /></li>
                                    )
                                } else if (i == 2){return(
                                    <li>
                                    <img src="images/Bronze.svg" className='medals' alt='Bronze medal, third place' /></li>
                                )
                                }else{
                                    return(
                                    <li>{i + 1}
                                    </li>
                                )
                            }
                                    })()}
                                </td>
                                <td>{player?.username}</td>
                                <td className='centered'>{player?.points}</td>
                            </tr>
                        
                        )}
                    </tbody>
                </table>


            ) : <p>No players to display</p>

            
            }
        </div>
    )

}

export default TopPlayers
