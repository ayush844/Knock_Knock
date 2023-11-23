/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './Listing.css';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle';
import PlaceIcon from '@mui/icons-material/Place';
import BathtubIcon from '@mui/icons-material/Bathtub';
import HotelIcon from '@mui/icons-material/Hotel';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import DeckIcon from '@mui/icons-material/Deck';
import { useSelector } from 'react-redux';
import Contact from '../Components/Contact';



const Listing = () => {

    SwiperCore.use([Navigation]);

    const params = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [contact, setContact] = useState(false);
    const {currentUser} = useSelector(state => state.user);

    useEffect(()=>{
        const fetchListing = async() => {

            try {
                setLoading(true);
                const res = await fetch(`/api/listing/get/${params.listingId}`);
                const data = await res.json();
                if(data.success === false){
                    setError(true);
                    setLoading(false);
                    return;
                }
                setListing(data);
                setLoading(false);
                setError(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }

        }

        fetchListing();
    }, [params.listingId]);

    console.log(listing);

  return (
    <main style={{padding: '0'}}>
      {loading && <p style={{textAlign:'center', marginTop:'3rem', fontSize:'2rem', color:'#A6FF96'}}>LOADING...</p>}

      {error && <p style={{textAlign:'center', marginTop:'3rem', fontSize:'2rem', color:'red'}}>SOMETHING WENT WRONG !</p>}

    {listing && !loading && !error && (
        <>
            <Swiper navigation style={{width:'100%'}}>

                {listing.imageUrls.map((url)=>(
                    <SwiperSlide key={url}>
                        <div style={{height:'700px', width:'100vw', background: `url(${url})`, backgroundRepeat: 'no-repeat', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundPosition: 'center', backgroundSize: 'cover'}}></div>
                    </SwiperSlide>
                ))}

            </Swiper>

            <h1 className='listing-heading'>{listing.name}</h1>

            <p className='propertyPrice'>
                
                {listing.offer ? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
                {listing.type == 'sale' ? "$" : "$/month"}
            </p>

            <div className="listingDetails">
                <p className="address"><PlaceIcon style={{fontSize: '2.5rem', paddingRight: '0.35rem', color: 'rgba(0, 159, 184, 255)'}}/>{listing.address}</p>

                <div className="price">
                    <p className='type'>{listing.type == 'sale' ? "FOR SALE" : "FOR RENT"}</p>
                    {listing.offer && (
                        <p className='discount'>{listing.regularPrice - listing.discountPrice}{listing.type == 'sale' ? "$" : "$/month"} discount</p>
                    )}
                </div>

                <p className="description">
                    <span>Description - </span>
                    {listing.description}
                </p>

                <div className="moreDetails" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '1.5rem', marginTop: '2rem'}}>
                    <div className="itemDetail" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}>
                        <BathtubIcon style={{fontSize:'2rem', color: '#F11A7B'}}/>
                        {listing.baths} Baths
                    </div>

                    <div className="itemDetail" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}>
                        <HotelIcon style={{fontSize:'2rem', color: '#F11A7B'}}/>
                        {listing.bedrooms} Bedrooms
                    </div>

                    <div className="itemDetail" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}>
                        <LocalParkingIcon style={{fontSize:'2rem', color: '#F11A7B'}}/>
                        {listing.parking ? " " : "No "}Parking
                    </div>

                    <div className="itemDetail" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}>
                        <DeckIcon style={{fontSize:'2rem', color: '#F11A7B'}}/>
                        {listing.furnished ? " " : "Not "}Furnished
                    </div>
                </div>

                <div className="contact">
                    {currentUser && listing.userRef !== currentUser._id && !contact && (
                        <button onClick={()=>setContact(true)} className="contactLandlord">CONTACT LANDLORD</button>
                    )}

                    {contact && <Contact listing={listing}/>}
                    
                </div>

            </div>
        </>
    )}
      
    </main>
  )
}

export default Listing
