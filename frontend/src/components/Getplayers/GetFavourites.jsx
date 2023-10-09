import React, { useState, useEffect } from 'react';
import useAuth from '../../functions/useAuth';
import useAxiosPrivate from '../../functions/useAxiosPrivate';

function GetFavourites() {
    const [players, setPlayers] = useState()
    const { auth  } = useAuth()
    const URL = `/players/favourites/${auth.username}`
    const axiosPrivate = useAxiosPrivate()


    useEffect(()=>{

        const getlist = async () => {
            try{

                const response = await axiosPrivate.get(URL)
                setPlayers(response.data.response.favourites)
                console.log(response.data.response.favourites)

            }catch(err){
                console.error(err)}
        }

        getlist()

    },[])


    return(
        <div className="centered">
            <h2>Favourite players</h2>
            {players?.length
            
            ? (

                <table className='leaderboard'>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Points</th>
                            <th>Wins</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player,i)=>
                            <tr key={i} className='leaderboard-player'>
                                <td>{player.username}</td>
                                <td>{player.points}</td>
                                <td>{player.wins}</td>
                                
                            </tr>
                        
                        )}
                    </tbody>
                </table>


            ) : <p>No players to display</p>

            
            }
        </div>
    )

}

export default GetFavourites
