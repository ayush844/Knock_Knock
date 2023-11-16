/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import './CreateListing.css'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



const CreateListing = () => {

  const {currentUser} = useSelector(state => state.user);

  const navigate = useNavigate();

  const [files, setFiles] = useState([]);

  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    baths: 1,
    regularPrice: 0,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });

  const [imageUploadError, setImageUploadError] = useState(false);

  const [uploading, setUploading] = useState(false);

  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(false);

  console.log(formData);


  const handleImageSubmit = (e) => {

    if(files.length > 0 && files.length + formData.imageUrls.length < 7){

      setUploading(true);
      setImageUploadError(false);

      const promises = [];

      for(let i = 0; i < files.length; i++){
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises).then((urls)=>{
        setFormData({...formData, imageUrls: formData.imageUrls.concat(urls)});
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
      imageUrls: formData.imageUrls.filter((_, i) => i !== index)
    })
  }



  const handleChange = (e)=> {

    if(e.target.id === 'sale' || e.target.id === 'rent'){
      setFormData({
        ...formData,
        type: e.target.id,
      })
    }

    if(e.target.id === "parking"){
      setFormData({
        ...formData,
        parking: !(formData.parking)
      })
    }

    if(e.target.id === "furnished"){
      setFormData({
        ...formData,
        furnished: !(formData.furnished)
      })
    }

    if(e.target.id === "offer"){
      setFormData({
        ...formData,
        offer: !(formData.offer)
      })
    }

    if(e.target.type === 'number' || e.target.type === 'text' ||e.target.type === 'textarea'){
      setFormData({
        ...formData,
        [e.target.id]: e.target.value
      })
    }

  }


  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {

      if(formData.imageUrls.length < 1){
        return setError("you must upload at least one image");
      }

      if(+formData.regularPrice < +formData.discountPrice){
        return setError("discount price should be less than regular price");
      }

      setLoading(true);
      setError(false);

      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...formData, userRef: currentUser._id})
      });

      const data = await res.json();

      setLoading(false);

      if(data.success == false){
        setError(data.message);
      }

      navigate(`/listing/${data._id}`);


    } catch (error) {
      setError(error.message);
      setLoading(false);
    }

  } 


  return (
    <main>
      <h1>Create a <span>Listing</span></h1>
      <form onSubmit={handleSubmit}>
        <div className="input-area">
          <input type="text" placeholder='Name' id='name' maxLength={62} minLength={10} required onChange={handleChange} value={formData.name}/>
          <textarea type="text" placeholder='Description...' id='description' required onChange={handleChange} value={formData.description}/>
          <input type="text" placeholder='Address' id='address' required onChange={handleChange} value={formData.address} />

          <div className="checkbox_area">
            <div className="checkbox_item">
              <input type="checkbox" id="sale" onChange={handleChange} checked={formData.type=='sale'} />
              <span>SELL</span>
            </div>
            <div className="checkbox_item">
              <input type="checkbox" id="rent" onChange={handleChange} checked={formData.type=='rent'} />
              <span>RENT</span>
            </div>
            <div className="checkbox_item">
              <input type="checkbox" id="parking" onChange={handleChange} checked={formData.parking} />
              <span>PARKING SPOT</span>
            </div>
            <div className="checkbox_item">
              <input type="checkbox" id="furnished" onChange={handleChange} checked={formData.furnished} />
              <span>FURNISHED</span>
            </div>
            <div className="checkbox_item">
              <input type="checkbox" id="offer" onChange={handleChange} checked={formData.offer} />
              <span>OFFER</span>
            </div>
          </div>

          <div className="details">
            <div className="details_item">
              <input type="number" id="bedrooms" max={20} min={1} required onChange={handleChange} value={formData.bedrooms}/>
              <p>Beds</p>
            </div>
            <div className="details_item">
              <input type="number" id="baths" max={20} min={1} required onChange={handleChange} value={formData.baths}/>
              <p>Baths</p>
            </div>
            <div className="details_item price">
              <input type="number" id="regularPrice" required onChange={handleChange} value={formData.regularPrice}/>
              <div>
                <p>Regular Price</p>
                <span>($ / month)</span>
              </div>
              
            </div>
            {formData.offer && 
            <div className="details_item price">
              <input type="number" id="discountPrice" required onChange={handleChange} value={formData.discountPrice}/>
              <div>
                <p>Discount Price</p>
                <span>($ / month)</span>
              </div>
            </div>
            }
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
            formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (

              <div className="" key={url} style={{display: 'flex', flexDirection: 'row', gap:'2rem', alignItems: 'center', justifyContent: 'space-between', border: '1px solid black', borderRadius: '10px', padding: '0.7rem 2rem', margin: '0.5rem 0'}}>

                <img src={url} alt="listing image" key={url} style={{width: '10rem', height: '8rem', objectFit: 'cover', marginBottom: '0.5rem'}} />

                <button type='button' onClick={() => handleRemoveImage(index)} style={{color: 'red', backgroundColor: 'transparent', border: 'none', fontSize: '1.3rem', cursor: 'pointer' }} > DELETE </button>

              </div>

            ))
          }
          <button disabled={loading || uploading} type='submit'>{loading ? "creating..." : "CREATE LISTING"}</button>
          {error && <p style={{color: 'red', fontSize: '1rem'}}>{error}</p>}
        </div>
      </form>
    </main>
  )
}

export default CreateListing;
