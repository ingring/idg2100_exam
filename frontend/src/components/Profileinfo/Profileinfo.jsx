// this component was brought over from oblig 3, with changes
import React from 'react';
import './profileinfo.css';

//create the profile page
function Profileinfo(props) {
  return (
    <>
      <div className="profile-info">
        <div>
          <div>
            <p>Username: </p>
            <p>{props.username}</p>
          </div>
          <div>
            <p>Name: </p>
            <p>
              <span> {props.firstName} </span>
              <span>{props.surname}</span>
            </p>
          </div>
          <div>
            <p>Email: </p>
            <p>{props.email}</p>
          </div>
          {props.department && (
            <div>
              <p>Department: </p>
              <p>{props.department}</p>
            </div>
          )}
        </div>
      </div>
    </>
  )

}

export default Profileinfo;