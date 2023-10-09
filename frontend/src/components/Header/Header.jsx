
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import useAuth from '../../functions/useAuth';
import './header.css';

function NavbarLinks() {
  const { auth } = useAuth()

  return (
    <>
      {/* If you are logged in */}
      {auth.username && (
      <>
      <li><Link to="/matches">Matches</Link></li>
      <li><Link to="/players">Players</Link></li>

      {/* Only show this if you are verified */}
      {auth.role !== "Admin" && <li><Link to="/Newmatch">New match</Link></li>}
      {auth.role === "Admin" && <li><Link to="/admin/match">New match</Link></li>}

      {auth.role !== 'Admin' && (
        <li><Link to="/profile">Profile</Link></li>
      )}

      {/* If you are admin, show this */}
      {auth.role === 'Admin' && (
        <li><Link to='/Admin'>Admin</Link></li>
      )}

      {auth.role === "User" && <li><Link to="/socket">Multiplayer</Link></li>}

      <li><Link to='/logout' className='logout'>Logout</Link></li>
      </>
      )}
    </>
  )
}

//returns a different header if the user is logged in or not
function Header() {
    const { auth } = useAuth()

    const [menuOpen, setMenuOpen] = useState(false)

    //Toggle the hamburger menu
    const navToggle = () => {
      setMenuOpen(!menuOpen)
    };
  
    return (
        <>
      <header>
        <nav>
        <Link to="/"><img src="/images/Logo.png" alt='Ping pong racket and NTNU PPL logo' className='logo'/>  </Link>
        {auth.username && (
          <>
          {menuOpen ? 
          <button className="toggle-button close" onClick={navToggle}>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.99979 4C6.74392 4 6.48776 4.09747 6.29276 4.29297L4.29276 6.29297C3.90176 6.68397 3.90176 7.31703 4.29276 7.70703L11.5857 15L4.29276 22.293C3.90176 22.684 3.90176 23.317 4.29276 23.707L6.29276 25.707C6.68376 26.098 7.31682 26.098 7.70682 25.707L14.9998 18.4141L22.2928 25.707C22.6828 26.098 23.3168 26.098 23.7068 25.707L25.7068 23.707C26.0978 23.316 26.0978 22.683 25.7068 22.293L18.4139 15L25.7068 7.70703C26.0978 7.31703 26.0978 6.68297 25.7068 6.29297L23.7068 4.29297C23.3158 3.90197 22.6828 3.90197 22.2928 4.29297L14.9998 11.5859L7.70682 4.29297C7.51132 4.09747 7.25567 4 6.99979 4Z" fill="white"/>
          </svg>
          </button> 
          : 
          <button className="toggle-button" onClick={navToggle}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
          </button> 
          } 
          </>
        )}
          <div className="navbar-links">
            <ul className='navbar-desktop'>
                {auth.username && (
                <>
                <NavbarLinks />
                </>
                )}
            </ul>
            {menuOpen ? <ul className="burger" onClick={navToggle}>
                {auth.username && (
                <>
                <li><Link to="/">Home</Link></li>
                <NavbarLinks />
                </>
                )}
            </ul> : null}
            
            {/* If you are not logged in */}
            {!auth.username && (
                <Link to="/login" className='login'>Login</Link>
            )}
            </div>
            </nav>
        </header>
        </>
    )
} 
 
export default Header;



