import Swal from 'sweetalert2';
import useAxiosPrivate from '../../functions/useAxiosPrivate';
import InputButton from '../Button/InputButton';
import OnClickButton from '../Button/OnClickButton';
import React, { useEffect, useState } from 'react';
import './forms.css';



function AdminCreateMatch(props) {
    let toEdit = true;
    let { match } = props
    let axiosSuccessMsg = 'Match Updated!';
    const [datalist, SetDatalist] = useState([])
    const [amount, setAmount] = useState(1)
    const axiosPrivate = useAxiosPrivate()
    if (props.edit == false) {
        toEdit = false;
        axiosSuccessMsg = 'Match created!'
    }
    const [matchData, setMatchData] = useState({
        player1: 'player1',
        player2: "player2",
        scorePlayer1: 0,
        scorePlayer2: 0,
        winner: '',
        result: ''

    });

    const [result, setResult] = useState('');

    const [matchSetsP1] = useState([false, false, false, false, false]);
    const [matchSetsP2] = useState([false, false, false, false, false]);

    const [checkSet, setCheckSet] = useState(false);


    const [validGame, setValidGame] = useState(false);


    const { player1, player2, scorePlayer1, scorePlayer2, winner } = matchData;
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [amountOfSets, setAmountOfSets] = useState(3)
    const handleChange = (e) => {
        const { name, value } = e.target
        setMatchData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const checkSets = (e) => {
        e.preventDefault();
        const { name, value } = e.target
        const setNr = e.target.getAttribute('setnr')
        if (checkSet) console.log(name, value)
        let nextSet = amount + 1;
        if (amount == 3) setCheckSet(true)

        if (checkSet) {
            let filteredSetP1 = matchSetsP1.filter(item => item !== false);
            let filteredSetP2 = matchSetsP2.filter(item => item !== false)
            let validScore = isValidScore(filteredSetP1, filteredSetP2);
            if (!validScore) {
                setErrorMsg('The sets are not a valid score')
                setSuccessMsg('')
                setValidGame(false)
                return;
            }
            setErrorMsg('')
            if (validScore === 'finished') {
                setSuccessMsg('game completed')
                let completedSets = "";
                for (let i = 0; i < 4; i++) {
                    if (matchSetsP1[i] === false || matchSetsP2[i] === false) {
                        break
                    } else {
                        let stringset = "(" + matchSetsP1[i] + " - " + matchSetsP2[i] + ")";
                        completedSets += stringset
                    }
                }
                setResult(completedSets);
                setValidGame(true)
                setSuccessMsg(`${result}`);
                return
            }
        }
        let greie = parseInt(setNr)

        if (nextSet == greie + 2) {
            if (matchSetsP1[setNr] !== false && matchSetsP2[setNr] !== false) {
                if (greie <= 3) {
                    setAmount(nextSet);
                }
            }
        }
    }

    const handleSetChange = (e) => {
        const { name, value } = e.target
        const setNr = e.target.getAttribute('setnr')

        if (name == 'p1') {
            matchSetsP1[setNr] = value
        } else {
            matchSetsP2[setNr] = value
        }


        // // 

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validGame) {
            setErrorMsg('Game is not valid')
            return;
        }

        let tosend = {
            player1: matchData.player1,
            player2: matchData.player2,
            result: result
        }


        if (player1 === player2) {
            Swal.fire({
                icon: "error",
                title: "Oops",
                text: "Player1 and Player2 can not be the same"
            })
        }
        else {
            try {
                let response;
                if (!toEdit) {
                    response = await axiosPrivate.post('/matches/new', tosend)
                } else response = await axiosPrivate.put(`/matches/${match.matchId}`, tosend);
                if (response.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: axiosSuccessMsg,
                        text: axiosSuccessMsg
                    }).then((result) => {
                        if (result.isConfirmed) {

                        }
                    })
                } else {

                }

            } catch (error) {
                console.log(error)
                Swal.fire({
                    icon: "error",
                    title: "Oops",
                    text: error.response.data ? `${error.response.data}` : 'Something went wrong'
                })
            }


        }


    }



    //for updating scores and amount of set inputs
    useEffect(() => {
        if (scorePlayer1 > scorePlayer2) {
            if (player2.username != "player2") {
                setMatchData((prevData) => ({
                    ...prevData,
                    winner: player1
                }))
            }
        } else if (scorePlayer1 < scorePlayer2) {
            if (player2.username != "player2") {
                setMatchData((prevData) => ({
                    ...prevData,
                    winner: player2

                }))
            }
        }

        // let amountOfSets = (parseInt(scorePlayer1) + parseInt(scorePlayer2));

        if (amountOfSets > 5) amountOfSets = 5;
        setAmount(amountOfSets)
    }, [scorePlayer1, scorePlayer2])

    //for populating datalists
    useEffect(() => {
        dataforlist()
    }, [])

    function isValidScore(matchsetp1, matchsetp2) {
        let p1SetsWon = 0;
        let p2SetsWon = 0;

        for (let i = 0; i < matchsetp1.length; i++) {
            const score1 = parseInt(matchsetp1[i]);
            const score2 = parseInt(matchsetp2[i]);

            if ((score1 < 11 && score2 < 11) || Math.abs(score1 - score2) < 2) {
                return false;
            }
            if ((score1 > 10 && score2 > 10) && Math.abs(score1 - score2) !== 2) {
                return false;
            }
            if ((score1 > 11 || score2 > 11) && Math.abs(score1 - score2) !== 2) {
                return false;
            }

            if (score1 > score2) {
                p1SetsWon++;
            } else {
                p2SetsWon++;
            }
        }

        if (p1SetsWon === 3 || p2SetsWon === 3) {
            return 'finished';
        }

        return true;
    }

    const dataforlist = async () => {
        try {
            const response = await axiosPrivate.get('/players/')
            SetDatalist(response.data)

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <h1>Create Match</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="player1">Player1</label>
                {match ? (
                    <input list='datalist' readOnly value={match.player1.username} name='player1' />
                ) :
                    (<input list='datalist' name='player1' onChange={handleChange} required />)}
                <datalist id='datalist' >
                    {datalist.map((player, i) =>
                        <option key={i} value={player.username} />

                    )}
                </datalist>
                <label htmlFor="player2">Player2</label>
                {match ? (
                    <input list='datalist' readOnly value={match.player2.username} name='player2' />
                ) :
                    (<input list='datalist' name='player2' onChange={handleChange} required />)}
                <datalist id='datalist'>
                    {datalist.map((player, i) =>
                        <option key={i} value={player.username} />

                    )}
                </datalist>
                {match && (
                    <>
                        <p className='text-centered'>Result of previously stored match</p>
                        <p className='text-centered'>{match.result}</p>
                    </>
                )}

                <div className='adminsets'>
                    {Array.from({ length: amount }, (_, index) => (
                        <div>
                            <label htmlFor={`set${index + 1}`} key={index + 100}>{`Set ${index + 1}`}</label>
                            <div className="fullset">
                                <input type='text' placeholder='0' onBlur={checkSets} onChange={handleSetChange} setNr={index} name={'p1'} key={index + 'p'} />
                                <p>  -  </p>
                                <input type='text' placeholder='0' onBlur={checkSets} onChange={handleSetChange} setNr={index} name={'p2'} key={index} />
                            </div>
                        </div>
                    ))}
                </div>
                {errorMsg && <p className="error-message">{errorMsg}</p>}
                {successMsg && <p className="success-message">{successMsg}</p>}
                <OnClickButton click={checkSets} value='Add set' />
                <InputButton value={"Submit"} />
            </form>

        </>
    )
}

export default AdminCreateMatch

