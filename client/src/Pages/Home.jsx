/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation} from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../Components/ListingItem';





const Home = () => {

  SwiperCore.use([Navigation]);

  const [offerListing, setOfferListing] = useState([]);
  const [rentListing, setRentListing] = useState([]);
  const [saleListing, setSaleListing] = useState([]);

  console.log(offerListing);


  


  useEffect(()=>{
    const fetchOfferListing = async ()=>{
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=4`);
        const data = await res.json();
        setOfferListing(data);
        fetchRentListing();

      } catch (error) {
        console.log(error);
      }
    }

    const fetchRentListing = async ()=>{
      try {
        const res = await fetch(`/api/listing/get?type=rent&limit=4`);
        const data = await res.json();
        setRentListing(data);
        fetchSaleListing();
      } catch (error) {
        console.log(error);
      }
    }

    const fetchSaleListing = async ()=>{
      try {
        const res = await fetch(`/api/listing/get?type=sale&limit=4`);
        const data = await res.json();
        setSaleListing(data);
      } catch (error) {
        console.log(error);
      }
    }


    fetchOfferListing();
  }, [])

  return (
    <main>
      <div className="heading">
        <p style={{ display: 'inline' }}>Dream Homes Await: Your Perfect Space,<br /> Your Unique Story - <span style={{color:'#A6FF96'}}>Find it Here</span></p>
        <Link to={"/search"} style={{textDecoration:'none'}}>
          <button>START NOW</button>
        </Link>        
      </div>


      <Swiper navigation style={{width:'100%'}}>
        {offerListing && offerListing.length > 0 &&
          offerListing.map((listing)=>(
            <SwiperSlide key={listing._id}>
              <div className=""style={{background:`url(${listing.imageUrls[0]})`, display:'flex', alignItems:'center', justifyContent:'center', backgroundRepeat:'no-repeat', backgroundPosition:'center', backgroundSize:'cover', width:'100%', height:'700px'}} key={listing._id}></div>
            </SwiperSlide>
          ))
        }      
      </Swiper>


      <div className="offerRentSale">
        {
          offerListing && offerListing.length > 0 && (
            <div className="offer" style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
              <h2>RECENT OFFERS</h2>
              <div className="listingArea">
                {
                  offerListing.map((listing)=>(
                    <ListingItem listing={listing} key={listing._id} />
                  ))
                }
              </div>
              <Link to={'/search?offer=true'}>Show more offers</Link>
            </div>
          )
        }

        {
          rentListing && rentListing.length > 0 && (
            <div className="offer" style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
              <h2>RECENT PLACES FOR RENT</h2>
              <div className="listingArea">
                {
                  rentListing.map((listing)=>(
                    <ListingItem listing={listing} key={listing._id} />
                  ))
                }
              </div>
              <Link to={'/search?type=rent'}>Show more places</Link>
            </div>
          )
        }


        {
          saleListing && saleListing.length > 0 && (
            <div className="offer" style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
              <h2>RECENT PLACES FOR SALE</h2>
              <div className="listingArea">
                {
                  saleListing.map((listing)=>(
                    <ListingItem listing={listing} key={listing._id} />
                  ))
                }
              </div>
              <Link to={'/search?type=sale'}>Show more places</Link>
            </div>
          )
        }
      </div>

     


          





    </main>
  )
}

export default Home
