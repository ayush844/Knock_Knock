/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import './SignIn.css'
import { Link, useNavigate } from 'react-router-dom'

const SignIn = () => {

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);

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
        setLoading(false);
        setError(data.message);
        return;
      }

      setLoading(false);
      setError(null);

      navigate('/')
      
    } catch (error) {

      console.log("some error occured");
      setLoading(false);
      setError(error.message);
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
      </form>

      <div className='account-exist'>
        <p>Not registered yet? <Link to={'/sign-up'}><span>SignUp</span></Link></p>
      </div>

      {error && <p className='error-message'>{error}</p>}

    </div>
  )
}

export default SignIn;
