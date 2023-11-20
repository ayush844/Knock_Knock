/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './Contact.css'
import { Link } from 'react-router-dom';

const Contact = ({ listing }) => {

    const [landLord, setLandLord] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(()=>{
        const fetchLandLoard = async () => {
            try {
                const res = await fetch(`/api/user/${listing.userRef}`);
                const data = await res.json();
                setLandLord(data);


            } catch (error) {
                console.log(error);
            }
        } 

        fetchLandLoard();

    }, [listing.userRef])

    console.log(landLord);

    const handleMessage = (e)=>{
        setMessage(e.target.value);
    }

  return (

    <>
        {landLord && (
            <div className="contactForm">
                <p className='contactHeading'>Contact <span style={{color: 'rgba(0, 159, 184, 255)'}}>{landLord.username}</span> for <span style={{color: 'rgba(0, 159, 184, 255)'}}>{listing.name.toLowerCase()}</span></p>
                <textarea name="message" id="message" cols="50" rows="10" placeholder='drop your message here...' value={message}onChange={handleMessage}></textarea>

                <Link to={`mailto:${landLord.email}?subject=Regarding ${listing.name}&body=${message}`} className='sendMessage'>
                    SEND MESSAGE
                </Link>
            </div>
        )}
    </>    

  );
};

export default Contact
