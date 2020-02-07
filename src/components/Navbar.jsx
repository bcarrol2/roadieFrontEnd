import React from 'react';

export const Navbar = () => {
    return(
        <div className="navbar">            
            <a href="http://localhost:3001/login" id="loginText">Login</a>    
            <a href="http://localhost:3001/signup" id="loginText">Sign Up</a>    
            <a href="http://localhost:3001/about">About</a>
            <a href="http://localhost:3001/home">Roadie Tech</a>
        </div>
    )
}