import useAuth from "../functions/useAuth";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../functions/useAxiosPrivate";
import Profileinfo from "../components/Profileinfo/Profileinfo";
import PlayerStats from "../components/PlayerStats/PlayerStats";
import { useNavigate } from "react-router-dom";
import OnClickButton from "../components/Button/OnClickButton";
import GetFavourites from "../components/Getplayers/GetFavourites";
//create the profile page
function Profile() {
  const navigate = useNavigate()
  const axiosPrivate = useAxiosPrivate()
  const { auth } = useAuth()
  const [playerData, setPlayerData] = useState(null);

  //URL endpoint for retrieving information from one user
  const profileURL = `players/${auth.username}`;


  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    //get the player information from the API
    const playa = async () => {
      try {
        const response = await axiosPrivate.get(profileURL, {
          signal: controller.signal
        })

        //save the data
        setPlayerData(response.data.onePlayer[0])
      } catch (err) {
        console.log(err)
      }

    }

    playa()

    return () => {
      isMounted = false
      controller.abort()
    }

  }, [auth.username, axiosPrivate, profileURL]);

  if (!playerData) {
    return <div>Loading...</div>
  }

  function editNav() {
    navigate(`/profile/edit/${auth.username}`)
  }

  function passnav() {
    navigate(`/updatepassword`)
  }


  return (
    <>
      <main className="profile">
        <h1>Profile</h1>
        <div className="flex-centered">
          <div className="profilecontainer">
            <Profileinfo username={playerData.username} firstName={playerData.firstName} lastName={playerData.surname} email={playerData.email} department={playerData.department} />
            <OnClickButton click={editNav} value={"Edit profile"} />
            <OnClickButton click={passnav} value={"Change password"} />

          </div>

          <PlayerStats wins={playerData.wins} points={playerData.points} />
        </div>
        <GetFavourites />
      </main>
    </>
  )

}

export default Profile;



