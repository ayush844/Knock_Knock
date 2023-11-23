/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react'
import './About.css'

const About = () => {
  return (
    <div className='about' style={{width:`100%`, display:'flex', alignItems:'center', justifyContent:'center'}}>
      <div className="about-Content">
      <h2>about the <span>website</span></h2>
      <p>"Knock Knock" is a dynamic MERN stack website that revolutionizes the real estate marketplace, offering users a seamless and comprehensive platform for buying and selling properties. Users can create captivating property listings, complete with vivid images, detailed descriptions, and crucial information about availability for rent or sale. The platform caters to both sellers and buyers, ensuring a diverse range of properties to suit various needs.

      The website prioritizes user convenience with a secure authentication system, allowing users to effortlessly sign in and out of their "Knock Knock" accounts. Sellers benefit from easy management and editing features for their listings, maintaining accuracy and keeping potential buyers informed.

      A standout feature is the robust sorting and filtering options that empower users to efficiently navigate through listings based on criteria such as price range, location, and property type. This advanced search functionality ensures a personalized experience, helping users find properties that precisely match their requirements.

      "Knock Knock" fosters transparent and direct communication between users. Prospective buyers can easily contact property listers, facilitating negotiations and inquiries. This interactive environment ensures a smooth transaction process and builds trust among users.

      With its intuitive design, secure authentication, detailed listings, and powerful search functionalities, "Knock Knock" stands as a user-friendly and comprehensive platform for individuals eager to engage in the real estate market.</p>

      </div>
    </div>
  )
}

export default About
