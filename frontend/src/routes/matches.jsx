import React from 'react';
import GetMatch from '../components/Getmatches/Getmatches';
import useAuth from '../functions/useAuth';
import GetPlayerMatches from '../components/Getmatches/Getplayermatches';

function Matches() {
    const { auth } = useAuth()
    
    return (
        <main>
        {auth.role === 'Admin' ? <GetMatch/> : <GetPlayerMatches />}
        </main>
    );
}
 
export default Matches;