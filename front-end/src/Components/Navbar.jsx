import React from 'react';
import { Link } from "@reach/router";


const Navbar = () => {
                 return(
                    <nav className="navbar navbar-dark bg-dark">
                        <span className="navbar-brand mb-0 h1">GetYourWay</span>
                       
                        <button className="btn btn-outline-success my-2 my-sm-0" type="register"> <Link to="RegistrationForm"> Register</Link></button>
                        
                    </nav>
                 )};

export default Navbar;