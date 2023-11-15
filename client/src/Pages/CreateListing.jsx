/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import './CreateListing.css'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';

const CreateListing = () => {

  const [files, setFiles] = useState([]);

  const [formData, setFormData] = useState({
    imageURL: [],
  });

  const [imageUploadError, setImageUploadError] = useState(false);

  const [uploading, setUploading] = useState(false);

  console.log(formData);

  const handleImageSubmit = (e) => {

    if(files.length > 0 && files.length + formData.imageURL.length < 7){

      setUploading(true);
      setImageUploadError(false);

      const promises = [];

      for(let i = 0; i < files.length; i++){
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises).then((urls)=>{
        setFormData({...formData, imageURL: formData.imageURL.concat(urls)});
        setImageUploadError(false);
        setUploading(false);
      }).catch((error) => {
        setImageUploadError('image upload failed (5mb max per image)');
        setUploading(false);
      });
    }else{
      setImageUploadError("you can only upload 6 images per listing");
      setUploading(false);
    }
  }

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
          console.log(`upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        ()=> {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          })
        }
      );

    })
  }

  const handleRemoveImage = (index)=>{
    setFormData({
      ...formData,
      imageURL: formData.imageURL.filter((_, i) => i !== index)
    })
  }



  return (
    <main>
      <h1>Create a <span>Listing</span></h1>
      <form>
        <div className="input-area">
          <input type="text" placeholder='Name' id='name' maxLength={62} minLength={10} required />
          <textarea type="text" placeholder='Description...' id='description' required />
          <input type="text" placeholder='Address' id='address' required />

          <div className="checkbox_area">
            <div className="checkbox_item">
              <input type="checkbox" id="sale" />
              <span>SELL</span>
            </div>
            <div className="checkbox_item">
              <input type="checkbox" id="rent"/>
              <span>RENT</span>
            </div>
            <div className="checkbox_item">
              <input type="checkbox" id="parking"/>
              <span>PARKING SPOT</span>
            </div>
            <div className="checkbox_item">
              <input type="checkbox" id="furnished"/>
              <span>FURNISHED</span>
            </div>
            <div className="checkbox_item">
              <input type="checkbox" id="offer"/>
              <span>OFFER</span>
            </div>
          </div>

          <div className="details">
            <div className="details_item">
              <input type="number" id="bedrooms" max={20} min={1} required/>
              <p>Beds</p>
            </div>
            <div className="details_item">
              <input type="number" id="baths" max={20} min={1} required/>
              <p>Baths</p>
            </div>
            <div className="details_item price">
              <input type="number" id="regularPrice" required/>
              <div>
                <p>Regular Price</p>
                <span>($ / month)</span>
              </div>
              
            </div>
            <div className="details_item price">
              <input type="number" id="discountPrice" required/>
              <div>
                <p>Discount Price</p>
                <span>($ / month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="image-area" >
          <p>Images: <span>the first image will be cover image (max 6)</span></p>
          <div className="imageBox">
            <input onChange={(e) => setFiles(e.target.files)} type="file" id='images' accept='image/*' multiple />
            <button type='button' onClick={handleImageSubmit} disabled={uploading}>{uploading ? "uploading...":"UPLOAD"}</button>
          </div>
          <p style={{color: 'red', fontSize: '1rem'}}>{imageUploadError && imageUploadError}</p>
          {
            formData.imageURL.length > 0 && formData.imageURL.map((url, index) => (

              <div className="" key={url} style={{display: 'flex', flexDirection: 'row', gap:'2rem', alignItems: 'center', justifyContent: 'space-between', border: '1px solid black', borderRadius: '10px', padding: '0.7rem 2rem', margin: '0.5rem 0'}}>

                <img src={url} alt="listing image" key={url} style={{width: '10rem', height: '8rem', objectFit: 'cover', marginBottom: '0.5rem'}} />

                <button type='button' onClick={() => handleRemoveImage(index)} style={{color: 'red', backgroundColor: 'transparent', border: 'none', fontSize: '1.3rem', cursor: 'pointer' }} > DELETE </button>

              </div>

            ))
          }
          <button>CREATE LISTING</button>
        </div>
      </form>
    </main>
  )
}

export default CreateListing;
