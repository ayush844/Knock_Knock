/* eslint-disable no-unused-vars */
import React from 'react'
import './CreateListing.css'

const CreateListing = () => {
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
            <input type="file" id='images' accept='image/*' multiple />
            <button>UPLOAD</button>
          </div>
          <button>CREATE LISTING</button>
        </div>
      </form>
    </main>
  )
}

export default CreateListing;
