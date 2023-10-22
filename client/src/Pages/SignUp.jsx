/* eslint-disable no-unused-vars */
import React from 'react'
import './SignUp.css'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div className='signup-container'>
      <h1>SIGN UP</h1>

      <form>
        <input type="text" placeholder='username' className='username' id='username' />
        <input type="email" placeholder='email' className='email' id='email' />
        <input type="password" placeholder='password' className='password' id='password' />

        <button className='manual-sign-up'>SIGN UP</button>
      </form>

      <div className='account-exist'>
        <p>Have an account ? <Link to={'/sign-in'}><span>SignIn</span></Link></p>
        
      </div>
    </div>
  )
}

export default SignUp
