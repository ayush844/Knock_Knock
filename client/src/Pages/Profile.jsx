/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import "./Profile.css"
import { useRef } from 'react';
import {useSelector} from 'react-redux';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';


const Profile = () => {
  const {currentUser} = useSelector(state => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});


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


  return (
    <div>
      <h1>PROFILE</h1>

      <form className='userForm'>
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
