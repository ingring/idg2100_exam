// this component was brought over from oblig 3, with changes
import React from 'react';
import { Link } from "react-router-dom";
import './landingtext.css';

function Landingtext() {
    return (
        <div className="landingtext"><p>Welcome to the NTNU Ping Pong League! Our league is exclusively for students and employees of NTNU who love to play table tennis. Whether you're a seasoned pro or a beginner looking to improve, our league is the perfect place to test your skills and meet new people who share your passion for the sport</p>
        <p>Don't miss your chance to be part of the NTNU Ping Pong League - <Link to="/login">sign up now!</Link></p></div>
    );
}
 
export default Landingtext;