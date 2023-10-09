import { useState } from "react";
import AdminCreateMatch from "../Forms/AdminCreateMatch"
import { useParams } from "react-router-dom"
import useAxiosPrivate from "../../functions/useAxiosPrivate";
import Swal from "sweetalert2";
function AdminUpdateMatch() {
    let edit = true;
    const [foundGame, setFoundGame] = useState(false);
    const [loading, setLoading] = useState(true);
    const [match, setMatch] = useState(false)
    const axiosPrivate = useAxiosPrivate()
    let { matchid } = useParams();


    if (loading) connect();
    async function connect() {
        try {
            var response = await axiosPrivate.get(`matches/match/${matchid}`);
            setMatch(response.data)
            setLoading(false)
            setTimeout(() => {
                Swal.close();
            }, 700);

        }

        catch (err) {
            console.log(err)
        }


    }
    function loadingSwal() {
        Swal.fire({
            title: ' ',
            text: '',
            padding: '10em',
            color: '#716add',
            background: 'url(/images/table-tennis.gif)',
            backdrop: `
              rgba(0,0,123,0.4)
              left top
              no-repeat
            `,
            showConfirmButton: false,
            showCloseButton: false
        })
    }
    return (
        <main className='form-page'>
            {loading && (
                <button onClick={loadingSwal()}>t</button>
            )}
            <AdminCreateMatch match={match} edit={edit} />
        </main>
    )

}

export default AdminUpdateMatch
