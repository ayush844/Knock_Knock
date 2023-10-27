/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import React from 'react'
import './Oauth.css'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase.js'
import { useDispatch } from 'react-redux'
import { signinSuccess } from '../Redux/user/userSlice'
import { useNavigate } from 'react-router-dom'


const Oauth = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleGoogleClick = async() => {
        try {

            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);

            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({name: result.user.displayName, email: result.user.email, photo: result.user.photoURL})
            })

            const data = await res.json();

            dispatch(signinSuccess(data));

            navigate("/");

            
        } catch (error) {
            console.log("could not sign in with google: ", error)
        }
    }





  return (
    <>
        <button onClick={handleGoogleClick} type='button' className='manual-oauth'> 
          CONTINUE WITH GOOGLE
        </button>
    </>
  )
}

export default Oauth
