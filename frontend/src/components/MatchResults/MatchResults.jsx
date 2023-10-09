import React from 'react';
import './MatchResults.css';

//create the profile page
function MatchResults(props) {
  let match = props.match;
  return (
    <>
      <div className="show-match">

        <p> Match: <span className='match-id'>{match.matchId}</span></p>

        <div className='match-container'>
          <div className='score'>
            <p className='text-centered'>Score:</p>
            <div>
              {match.scorePlayer1} - {match.scorePlayer2}
            </div>
          </div>

          <div className='sets'>
            <p className='text-centered'>Sets:</p>
            {props.result.map((set, index) => {
              const scores = set.split("-");
              const score1 = parseInt(scores[0]);
              const score2 = parseInt(scores[1]);

              return (
                <li key={index}>
                  <span className='set-score'>{score1}</span><span className='separator'> - </span><span className='set-score'>{score2}</span>
                </li>
              );
            })}
          </div>
        </div>
        <p className='match-date'>{props.date}</p>
        <p className='match-winner'>The winner is {match.winner}!</p>
      </div>
    </>
  )

}

export default MatchResults;
