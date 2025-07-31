import React from 'react';
import './Signup.css'
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  var [name, setName] = useState('');
  var [email, setEmail] = useState('');
  var [password, setPassword] = useState('');
  var [passwordConf, setPasswordConf] = useState('');
  var [errorMessage, setErrorMessage] = useState('');
  var navigate = useNavigate();
  function SignupUser(event){
    event.preventDefault();
    
    if (password !== passwordConf) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    var user = {
      name: name,
      email: email,
      password: password,
      password_confirmation: passwordConf
    };

    axios.post('http://127.0.0.1:8000/signup/', user)
      .then(response => {
          setErrorMessage('');
          navigate('/login'); 
      })
      .catch(error => {
          if (error.response?.data?.errors) {
              setErrorMessage(Object.values(error.response.data.errors).join(' '));
          } else {
              setErrorMessage('Failed to connect to API');
          }
      });
}
  
  return (
    <div className="row g-0 vh-100">
      <div className="col-md-6 d-none d-md-block bg-primary text-white d-flex align-items-center justify-content-center">
        {/* <div className="text-center px-4">
          <h1 className="display-5 fw-bold">Level Up Your Skills</h1>
          <p className="lead mt-3">Track, learn, and grow faster.</p>
        </div> */}
      </div>
      <div className="col-md-6 d-flex align-items-center justify-content-center bg-white">
        <div className="p-4" style={{ width: '100%', maxWidth: '400px' }}>
          <h3 className="text-center mb-4 fw-bold">Signup</h3>
          {errorMessage?<div className="alert alert-danger">{errorMessage}</div>:''}
          <form>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input type="text" className="form-control" value={name} onInput={(event)=>setName(event.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={email} onInput={(event)=>setEmail(event.target.value)} />
            </div>
            <div className="mb-4">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" value={password} onInput={(event)=>setPassword(event.target.value)} />
            </div>
            <div className="mb-4">
              <label className="form-label">Confirm Password</label>
              <input type="password" className="form-control" value={passwordConf} onInput={(event)=>setPasswordConf(event.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary w-100" onClick={SignupUser}>Signup</button>
            <p className="text-center mt-3">
              Already have an account? <a href="/login">Login</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
