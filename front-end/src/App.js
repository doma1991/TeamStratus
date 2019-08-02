import React from 'react';
import './App.css';
import  Navbar  from './Components/Navbar.jsx';
import  Main  from './Components/Main';
import  RegistrationForm  from './Components/RegistrationForm.jsx';
import  LoginForm  from "./Components/LoginForm";
import { Router } from "@reach/router";
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker } from "react-datepicker";
import CurrentLocation from './CurrentMapLocation';
import MapContainer from './Map';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Main path='/' />
        <RegistrationForm path='RegistrationForm' />
        <LoginForm path='LoginForm' /> 
      </Router>
    </div>
  );
}

export default App;
