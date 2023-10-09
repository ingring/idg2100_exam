// this component was brought over from oblig 3, with changes
import React from 'react';
import './playerStats.css';


//create the profile page
function PlayerStats(props) {
    return (
        <div className="playerstats">
            {props.rank && (<div><span>Rank </span><span className="green">{props.rank}</span></div>)}
            <div><span>Wins </span><span className="green">{props.wins}</span></div>
            {props.losses && (<div><span>Losses </span><span className="red">{props.losses}</span></div>)}
            <div><span>Points </span><span className="green">{props.points}</span></div>
        </div>
    )
}

export default PlayerStats;