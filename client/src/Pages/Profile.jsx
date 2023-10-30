/* eslint-disable no-unused-vars */
import React from 'react'
import "./Profile.css"
import {useSelector} from 'react-redux';


const Profile = () => {
  const {currentUser} = useSelector(state => state.user);

  return (
    <div>
      <h1>PROFILE</h1>

      <form className='userForm'>
        <img className='userInfoImg'   src={currentUser.avatar} alt="profile_pic" />
        <input className='userInfo' type="text" placeholder='username' id='username' />
        <input className='userInfo' type="email" placeholder='useremail' id='email' />
        <input className='userInfo' type="password" placeholder='password' id='password' />

        <button className='update_btn'>UPDATE</button>

        <div className='options'>
          <span className='delete'>Delete Account</span>
          <span className='signOut'>Sign Out</span>
        </div>
      </form>


    </div>
  )
}

export default Profile
