/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import './ListingItem.css'
import { Link } from 'react-router-dom'
import PlaceIcon from '@mui/icons-material/Place';
import HotelIcon from '@mui/icons-material/Hotel';
import BathtubIcon from '@mui/icons-material/Bathtub';

const ListingItem = ({listing}) => {
  return (
    <Link to={`/listing/${listing._id}`} style={{textDecoration:'none'}}>
        <div className='card' style={{backgroundColor:'black'}}>
            <img src={listing.imageUrls[0]} alt="listing_pic" />
            <div className="details">
                <h2 id='name'>{listing.name}</h2>
                <div className="address">
                  <PlaceIcon style={{color:'#A6FF96'}}/>
                  <p>{listing.address}</p>
                </div>
                <div className="description">
                  <p>{listing.description}</p>  
                </div>    
                <p className='price' style={{fontSize:'1.8rem', color:'#A6FF96'}}>$ {listing.offer ? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}{listing.type==='rent'?'/month':''}</p>
                <div className="bedsAndBaths" style={{display:'flex', flexDirection:'row', gap:'1rem'}}>
                  <div className="beds" style={{display:'flex', flexDirection:'row', gap:'2px',  alignItems:'center'}}>
                    <HotelIcon style={{color:'#A6FF96'}}/>
                    {listing.bedrooms > 1 ? <p style={{color:'white'}}>{listing.bedrooms} beds</p> : <p style={{color:'white'}}>`{listing.bedrooms} bed`</p>}
                  </div>
                  <div className="baths" style={{display:'flex', flexDirection:'row', gap:'2px',  alignItems:'center'}}>
                    <BathtubIcon style={{color:'#A6FF96'}}/>
                    {listing.baths > 1 ? <p style={{color:'white'}}>`{listing.baths} baths`</p> : <p style={{color:'white'}}>`{listing.baths} bath`</p>}
                  </div>
                </div>
            </div>          
        </div>
    </Link>
  )
}

export default ListingItem
