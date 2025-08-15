import React from 'react';
import Navbar from './Navbar';
import about from "../assets/images/about.png";
import Footer from './Footer';


const MainAbout = () => {
  return (
    <>
    <Navbar/>

 <div className=" md:min-h-screen flex flex-col-reverse md:flex-row items-center gap-5 md:mx-32 mx-5 mt-14">
    <div className='w-full md:w-2/4'>
    <img src={about} className='mb-2' style={{ width: '80%', height: 'auto', borderRadius: "50px"

    }} alt="about us png" />


    </div>
  
  <div className="w-full md:w-2/4 text-center space-y-2 pb-70">
        
        <div>
            <h1 className='text-5xl font-bold inline border-b-4 border-orange-600'>About Us ?</h1>
        </div>
        <p className=" text-lightText font-bold">
          Welcome to Best Chows, the ultimate solution designed specifically for cashiers and attendance management in the food service industry. Our app streamlines the process of receiving and managing food orders, ensuring that customer requests are handled swiftly and accurately.
        </p>

        <div>
            <h1 className='text-5xl font-bold inline border-b-4 border-orange-600'>Our Mission</h1>
        </div>

        <p className='text-lightText font-bold'>
            Our mission is to enhance the efficiency and accuracy of food order management. We understand the challenges faced by cashiers and staff in busy environments, and our app is here to simplify your tasks, allowing you to focus on delivering exceptional customer service.
        </p>

         <div>
            <h1 className='mt-3 text-5xl font-bold inline border-b-4 border-orange-600'>Join Us!</h1>

        </div>

         <p className='text-lightText font-bold'>
            Join the growing number of food service establishments that trust Best Chows to handle their order management needs. Let us help you streamline your operations, enhance customer satisfaction, and take your service to the next level.

Best Chows – Where efficiency meets excellence in food service management.

        </p>
      </div>
 </div>
 <Footer />
    
    </>
    
  )
}

export default MainAbout