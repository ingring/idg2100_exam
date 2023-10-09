import useAuth from "../functions/useAuth";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../functions/useAxiosPrivate";
import { useParams } from 'react-router-dom';
import MatchResults from "../components/MatchResults/MatchResults";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import DeleteButton from "../components/Button/DeleteButton";
import EditButton from "../components/Button/EditButton";

//create the profile page
function ShowMatch() {
  const routeParams = useParams()
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const matchId = routeParams.nr;
  const { auth } = useAuth()
  const [match, setMatch] = useState(null);
  const [result, setResult] = useState(null);
  const [date, setDate] = useState(null);

  //URL endpoint for retrieving information from one user
  const matchURL = `matches/match/${matchId}`;


  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    //get the player information from the API
    const match = async () => {
      try {
        const response = await axiosPrivate.get(matchURL, {
          signal: controller.signal
        })
        //save the data

        const results = response.data.result;
        const regex = /\((\d+ - \d+)\)/g;
        const resultArray = results.match(regex).map(mapMatch => mapMatch.slice(1, -1));
        setResult(resultArray);


        let date = new Date(response.data.date);
        // Get the day, month, and year components
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = String(date.getFullYear());

        // Create the date string in the desired format
        const formattedDate = `${day}.${month}.${year}`;

        setMatch(response.data);
        setDate(formattedDate);

      } catch (err) {

        if (err.name === 'CanceledError') return;

        console.log(err);
        // if(err?.response?.status !== 418) return;
        let errorMsg = err?.response?.data;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorMsg ? `${errorMsg}!` : 'Something went wrong!',
        })
          .then((response) => {
            if (response.isConfirmed) {
              navigate('/Newmatch');
            }
          })

      }

    }

    match()

    return () => {
      isMounted = false
      controller.abort()
    }

  }, [auth.username, axiosPrivate]);

  if (!match) {
    return null
  }


  return (
    <>
      <main className="flex-column">
        <h1>{match.player1.username} vs {match.player2.username}</h1>
        <MatchResults match={match} date={date} result={result} />
        {auth.role === 'Admin' && (
          <div className="flex">
            <DeleteButton url={`/matches/${match.matchId}`} />
            <EditButton url={`/admin/match/${match.matchId}`} />
          </div>)}
      </main>
    </>
  )

}

export default ShowMatch;



