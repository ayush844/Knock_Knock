/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import './SignIn.css'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {siginStart, signinSuccess, signinFailure} from '../Redux/user/userSlice.js'
import Oauth from '../Components/Oauth'

const SignIn = () => {

  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state) => state.user);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      dispatch(siginStart());


      const res = await fetch("/api/auth/signin", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      console.log(data);

      if(data.success === false){
        dispatch(signinFailure(data.message));
        return;
      }

      dispatch(signinSuccess(data));

      navigate('/')
      
    } catch (error) {

      console.log("some error occured");
      dispatch(signinFailure(error.message));
      console.log(error);

    }

    
  }



  return (
    <div className='signup-container'>
      <h1>SIGN IN</h1>

      <form onSubmit={handleSubmit}>
        {/* <input type="text" placeholder='username' className='username' id='username' onChange={handleChange} /> */}
        <input type="email" placeholder='email' className='email' id='email' onChange={handleChange} />
        <input type="password" placeholder='password' className='password' id='password' onChange={handleChange}  />

        <button disabled={loading} className='manual-sign-up'> 
          {loading? "LOADING..." : "SIGN IN"}
        </button>

        <Oauth />

      </form>

      <div className='account-exist'>
        <p>Not registered yet? <Link to={'/sign-up'}><span>SignUp</span></Link></p>
      </div>

      {error && <p className='error-message'>{error}</p>}

    </div>
  )
}

export default SignIn;
