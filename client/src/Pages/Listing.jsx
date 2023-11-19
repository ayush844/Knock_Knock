/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './Listing.css';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle';

const Listing = () => {

    SwiperCore.use([Navigation]);

    const params = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

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

    console.log(loading);
    console.log(listing);

  return (
    <main style={{padding: '0'}}>
      {loading && <p style={{textAlign:'center', marginTop:'3rem', fontSize:'2rem', color:'rgba(0, 159, 184, 255)'}}>LOADING...</p>}

      {error && <p style={{textAlign:'center', marginTop:'3rem', fontSize:'2rem', color:'red'}}>SOMETHING WENT WRONG !</p>}

    {listing && !loading && !error && (
        <>
            <Swiper navigation>

                {listing.imageUrls.map((url)=>(
                    <SwiperSlide key={url}>
                        <div style={{height:'700px', width:'100vw', background: `url(${url})`, backgroundRepeat: 'no-repeat', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundPosition: 'center', backgroundSize: 'cover'}}></div>
                    </SwiperSlide>
                ))}

            </Swiper>
        </>
    )}
      
    </main>
  )
}

export default Listing
