import React from 'react';
import './Signup.css'
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    var navigate = useNavigate();
    function LoginUser(event) {
        event.preventDefault();
        axios.post('http://127.0.0.1:8000/login/',{
            email:email,
            password:password
        }).then(response=>{
            setErrorMessage('')
            console.log(response.data.token)
            localStorage.setItem('token',response.data.token)
            navigate('/dashboard');
        }).catch(error=>{
            if(error.response.data.errors){
                setErrorMessage(Object.values(error.response.data.errors).join(' '))
            }else if(error.response.data.message){
                setErrorMessage(error.response.data.message)
            }else{
                setErrorMessage('Failed to login user. Please contact admin')
            }
        })
    }


  return (
    <div className="row g-0 vh-100">
      <div className="col-md-6 d-none d-md-block bg-primary text-white d-flex align-items-center justify-content-center">
        <div className="text-center px-4">
          <h1 className="display-5 fw-bold">Level Up Your Skills</h1>
          <p className="lead mt-3">Track, learn, and grow faster.</p>
        </div>
      </div>
      <div className="col-md-6 d-flex align-items-center justify-content-center bg-white">
        <div className="p-4" style={{ width: '100%', maxWidth: '400px' }}>
          <h3 className="text-center mb-4 fw-bold">Login</h3>
          {errorMessage?<div className="alert alert-danger">{errorMessage}</div>:''}
          <form>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={email} onInput={(event)=>setEmail(event.target.value)} />
            </div>
            <div className="mb-4">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" value={password} onInput={(event)=>setPassword(event.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary w-100" onClick={LoginUser}>Login</button>
            <p className="text-center mt-3">
              Don't have an account? <a href="/">Register</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
