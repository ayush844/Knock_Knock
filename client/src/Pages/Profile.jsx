/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import "./Profile.css"
import { useRef } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutFailure, signOutStart, signOutSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from '../Redux/user/userSlice';
import {Link} from 'react-router-dom'; 


const Profile = () => {
  const {currentUser, loading, error} = useSelector(state => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingError, setShowListingError] = useState(false);
  const [userListings, setUserListings] = useState([]);

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

  const handleShowListing = async() => {
    try {
      setShowListingError(false);
      const res = await fetch(`/api/user/listing/${currentUser._id}`);
      const data = await res.json();
      if(data.success === false){
        setShowListingError(true);
        return;
      }


      setUserListings([...data].reverse());


    } catch (error) {
      setShowListingError(true);
    }
  }

  const handleDeleteListing = async (id) => {
    try {
      const res = await fetch(`/api/listing/delete/${id}`,{
        method: 'DELETE'
      });
      const data = await res.json();
      if(data.success == false){
        console.log(data.message);
        return;
      }

      setUserListings((prev) => prev.filter((listing) => listing._id !== id));

    } catch (error) {
      console.log(error.message);
    }
  }


  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
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

        <Link to={'/create-listing'} className='createListingBtn'>
          CREATE A LISTING
        </Link>   
        

        <div className='options'>
          <span onClick={handleDeleteUser} className='delete'>Delete Account</span>
          <span onClick={handleSignOut} className='signOut'>Sign Out</span>
        </div>

          <p style={{color: 'red', marginTop: '3px'}}>{error ? error : ''}</p>

          <p style={{color: 'green', marginTop: '3px'}}>{updateSuccess ? "successfully updated profile" : ''}</p>

      </form>

      <div className="listingsInProfile">
          <button onClick={handleShowListing} id='showListing'>Show Listings</button>
          <p style={{fontSize: '1rem', color: 'red'}}>{showListingError ? "Error show listings" : ""}</p>
          {
            userListings && userListings.length > 0 && 
            <div className="" style={{display: 'flex', flexDirection: 'column', gap: '2'}}>
              <h1 style={{textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold', margin: '0 5px'}}>YOUR LISTINGS</h1>
              {
              userListings.map((listing) => (
              <div key={listing._id} className="listingBox" style={{margin: "0.6rem", padding:"4px 9px", backgroundColor: 'transparent', border: '1px solid #45474B', borderRadius: '5px', display: 'flex', flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '80vw', }}>

                <Link to={`/listing/${listing._id}`}>
                  <img style={{height: '9rem', width: '11rem', marginRight: '7px'}} src={listing.imageUrls[0]} alt="listing cover" />
                </Link>

                <Link to={`/listing/${listing._id}`} style={{color: 'black', textDecoration: 'none', fontSize: '1.3rem', textTransform: 'capitalize', fontWeight: 'bold', overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>
                  <p>{listing.name}</p>
                </Link>

                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', }}>
                  <button onClick={() => handleDeleteListing(listing._id)} style={{backgroundColor: 'transparent', border: 'none', color: 'red', fontSize: '1rem', padding: '5px', cursor: 'pointer'}}>DELETE</button>
                  <button style={{backgroundColor: 'transparent', border: 'none', color: 'green', fontSize: '1rem', padding: '5px', cursor: 'pointer'}}>EDIT</button>
                </div>

              </div>
              ))
            }</div>


          }
      </div>
      


    </div>
  )
}

export default Profile
