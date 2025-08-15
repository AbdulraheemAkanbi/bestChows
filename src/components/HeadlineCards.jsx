import React from 'react';
import {Link } from "react-router-dom"

const HeadlineCards = () => {
  return (
    <div className='max-w-[1640px] mx-auto p-4 py-12 grid md:grid-cols-3 gap-6'>
        {/**card */}
        <div className='rounded-xl relative'>
            {/**Overlay  */}
            <div className='transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-70 hover:bg-black/0 duration-300 absolute w-full h-full bg-black/50 rounded-xl text-white'>
                <p className='font-bold text-2xl px-2 pt-4'>Sun's out, Burgers are Out!!</p>
                <p className='px-2'>Through 24/7</p>
                <Link to="/orderpage">
                <button className='border-white bg-white text-black mx-2 absolute bottom-4'>Order Now</button>
                </Link>
                
            </div>
            <img 
            className='max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl'
            src="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
        </div>

         <div className='rounded-xl relative'>
            {/**Overlay  */}
            <div className='transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-70 hover:bg-black/0 duration-300 absolute w-full h-full bg-black/50 rounded-xl text-white'>
                <p className='font-bold text-2xl px-2 pt-4'>We deliver desserts too!</p>
                <p className='px-2'>Tasty treats</p>
                 <Link to="/orderpage">
                <button className='border-white bg-white text-black mx-2 absolute bottom-4'>Order Now</button>
                </Link>
            </div>
            <img 
            className='max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl'
            src="https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
        </div>


         <div className='rounded-xl relative'>
            {/**Overlay  */}
            <div className='transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-70 hover:bg-black/0 duration-300 absolute w-full h-full bg-black/50 rounded-xl text-white'>
                <p className='font-bold text-2xl px-2 pt-4'>New items on Menu</p>
                <p className='px-2'>Added daily!</p>
                <Link to="/orderpage">
                <button className='border-white bg-white text-black mx-2 absolute bottom-4'>Order Now</button>
                </Link>
            </div>
            <img 
            className='max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl'
            src="https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
        </div>

    </div>

    
  )
}

export default HeadlineCards