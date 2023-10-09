// this component was brought over from oblig 3, with changes
import useAuth from "../../functions/useAuth";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../../functions/useAxiosPrivate";
import './getmatches.css';
import MatchList from "./MatchList";

//get the matches played by one user
function GetPlayerMatches() {
  const axiosPrivate = useAxiosPrivate()
  const { auth } = useAuth()
  const [playerData, setPlayerData] = useState();

  //URL endpoint for getting matches based on player
  const matchesURL = `matches/${auth.username}`;

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    //get the matches from the API and save them
    const faenskap = async () => {
      try {
        const response = await axiosPrivate.get(matchesURL, {
          signal: controller.signal
        })
        isMounted && setPlayerData(response.data)
      } catch (err) {
        console.log(err)
      }

    }

    faenskap()

    return () => {
      isMounted = false
      controller.abort()
    }



  }, [auth.username, axiosPrivate, matchesURL])


  //put the matches inside a single array
  const matches = playerData ? Object.values(playerData).flat() : []

  return (
    <>
      <h2>My matches</h2>

      <MatchList matchData={matches} auth={auth} />

    </>
  )
}
export default GetPlayerMatches

