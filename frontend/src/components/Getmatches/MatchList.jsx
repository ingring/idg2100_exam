import React, {useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './getmatches.css';

//creates a table of matches
function MatchList({matchData, auth}) {


    //checks who won the match and changes the font-weight to bold and background color to a darker one for the winner
    const getScoreStyle = (score1, score2) => {
        if (score1 > score2) {
        return {
            backgroundColor: "#E9E9E9",
            // backgroundColor: "#C2C2C2"
        };
        } else if (score2 > score1) {
        return {
            backgroundColor: "#E9E9E9",
        };
        }
        return {};
    };

    return (
        <>

        {matchData?.length
            ? (
                <div className='matchlist'>
                    {matchData.map((match, i) => 
                    <div key={i}>
                        <div className="date">
                            <p>
                                {/* slices the new Date function from javascript so it looks better and also sets the timezone to the correct one so it displays the correct Time */}
                                {/* also splitting the date and time for displaying reasons for each match */}
                                {new Date(match?.date)
                                    .toLocaleString("sv-SE", { 
                                        timeZone: "Europe/Stockholm",
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                    })
                                    .split("-")
                                    .reverse()
                                    .join(".")
                                }
                            </p>
                            {auth.role === 'Admin' ?(
                            <Link to={`/match/${match.matchId}`} className='gameNum-button'>
                                {match.matchId}
                            </Link>
                            ):(
                            auth.username === match.player1.username || auth.username === match.player2.username ? (
                                <Link to={`/match/${match.matchId}`} className='gameNum-button'>
                                    {match.matchId}
                                </Link>
                                ) : (
                            <div className='gameNum'>
                                {match.matchId}
                            </div>
                            )
                            )}
                        </div>
                        <div className="display-scores">
                            <div className="player1-stats"
                                style={getScoreStyle(match.scorePlayer1, match.scorePlayer2)}>
                                <p>{match?.player1.username}</p>
                                <p style={{ fontWeight: match.scorePlayer1 > match.scorePlayer2 ? "bold" : "normal" }}>{match?.scorePlayer1}</p>
                            </div>
                            <div className="player2-stats"
                                style={getScoreStyle(match.scorePlayer2, match.scorePlayer1)}>
                                <p style={{ fontWeight: match.scorePlayer1 < match.scorePlayer2 ? "bold" : "normal" }}>{match?.scorePlayer2}</p>
                                <p>{match?.player2.username}</p>
                            </div>
                        </div>
                    
                    </div>
                    )}
                </div>
        ) : <p>No matches to display</p>
            
        }
        </>)

    }

export default MatchList