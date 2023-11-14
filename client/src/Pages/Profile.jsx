/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import "./Profile.css"
import { useRef } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutFailure, signOutStart, signOutSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from '../Redux/user/userSlice';


const Profile = () => {
  const {currentUser, loading, error} = useSelector(state => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const dispatch = useDispatch();


  useEffect(() => {
    if(file){
      handleFileUpload(file);
    }
  }, [file])


  const handleFileUpload = (file)=>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.ceil(progress));
      },
      (err) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(
          (downloadURL) => {
            setFormData({...formData, avatar: downloadURL});
          }
        )
      }
    );
  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      dispatch(updateUserStart());

      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json();

      if(data.success === false){
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);

    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }

  }

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method: 'DELETE'
      });
      const data = await res.json();

      if(data.success === false){
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));

    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());
      const res = await fetch(`/api/auth/signout`,{
        method: 'GET'
      });
      const data = await res.json();

      if(data.success === false){
        dispatch(signOutFailure(data.message));
        return;
      }

      dispatch(signOutSuccess(data));

    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  }


  return (
    <div>
      <h1>PROFILE</h1>

      <form className='userForm' onSubmit={handleSubmit}>
        <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*'/>
        <img onClick={()=>fileRef.current.click()} className='userInfoImg'   src={formData.avatar || currentUser.avatar} alt="profile_pic" />
        <p>
          {
          fileUploadError ? 
            (<span style={{ color: 'red' }}>error in uploading image</span>) : 
            filePerc > 0 && filePerc < 100 ? (<span style={{ color: 'green', fontFamily: 'Mukta' }}>{`uploading ${filePerc}%`}</span>) : (filePerc === 100) ?
            (<span style={{ color: 'green' }}>image uploaded successfully</span>) : ""
          }
        </p>
        <input className='userInfo' type="text" placeholder='username' defaultValue={currentUser.username} id='username' onChange={handleChange}/>
        <input className='userInfo' type="email" placeholder='useremail' defaultValue={currentUser.email} id='email' onChange={handleChange}/>
        <input className='userInfo' type="password" placeholder='password' id='password' onChange={handleChange}/>

        <button disabled={loading} className='update_btn'>{loading ? "loading..." : "UPDATE"}</button>

        <div className='options'>
          <span onClick={handleDeleteUser} className='delete'>Delete Account</span>
          <span onClick={handleSignOut} className='signOut'>Sign Out</span>
        </div>

          <p style={{color: 'red', marginTop: '3px'}}>{error ? error : ''}</p>

          <p style={{color: 'green', marginTop: '3px'}}>{updateSuccess ? "successfully updated profile" : ''}</p>

      </form>


    </div>
  )
}

export default Profile
