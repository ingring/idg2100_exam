// this component was brought over from oblig 3, with changes
import React, {useState, useEffect } from 'react';
import useAxiosPrivate from '../../functions/useAxiosPrivate';
import MatchList from './MatchList';
import './getmatches.css';
import useAuth from '../../functions/useAuth';


//URL endpoint for getting all matches
const matchURL = '/matches'

//creates a table of matches
function GetMatch() {
    const [matches, setMatches] = useState()
    const axiosPrivate = useAxiosPrivate()
    const { auth } = useAuth()
    console.log(auth)

    console.log('hi')

    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()
        
        //get the matches from the API
        const getMatches = async () => {
            try {
                const response = await axiosPrivate.get(matchURL, {
                    signal: controller.signal
                })
                //save the matches
                isMounted && setMatches(response.data)
                console.log(response.data)
                
            }catch(err){
                console.log(err)
            }
        }
        
        getMatches()

        return () => {
            isMounted = false
            controller.abort()
        }

    },[])

    return (
        <>
            <h1>Matches</h1>
            <MatchList matchData={matches} auth={auth}/>
        </>
    )

    }

export default GetMatch