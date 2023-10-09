import React from 'react';
import { Link } from "react-router-dom";
import './linkTo.css';

function LinkTo({to, value}) {
    return (
        <Link to={to} className='linkTo'>{value}</Link>
    )
}

export default LinkTo