import React, { useState } from 'react';
import { AiFillTag, AiOutlineClose, AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import { BsFillCartFill, BsFillSaveFill, BsLock, BsMoonFill } from 'react-icons/bs';
import { FaUserFriends, FaWallet } from 'react-icons/fa';
import { MdFavorite, MdHelp } from 'react-icons/md';
import { TbTruckDelivery } from 'react-icons/tb';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [nav, setNav] = useState(false);

  return (
    <div className='max-w-[1640px] mx-auto flex justify-between items-center p-4'>
      {/* Left Side */}
      <div className='flex items-center'>
        <div onClick={() => setNav(!nav)} className='cursor-pointer sm:hidden'>
          <AiOutlineMenu size={30} />
        </div>

        <Link to="/">
          <h1 className='text-2xl sm:text-3xl lg:text-4xl px-2'>
            Best<span className='font-bold'>Chows</span>
          </h1>
        </Link>
        
       {/** */}
      </div>

      <div className="hidden sm:ml-6 sm:block">
        <div className="flex space-x-4">
          <Link to="/" className="rounded-md px-3 py-2 text-lg font-bold text-black-300 hover:bg-orange-400 hover:text-white">Home</Link>
          <Link to="/aboutpage" className="rounded-md px-3 py-2 text-lg font-bold text-black-300 hover:bg-orange-400 hover:text-white">About Us</Link>
          {/*<Link to="/" className="rounded-md px-3 py-2 text-lg font-bold text-black-300 hover:bg-orange-400 hover:text-white">Contact</Link>*/}
          <Link to="/orderpage" className="rounded-md px-3 py-2 text-lg font-bold text-black-300 hover:bg-orange-400 hover:text-white">Order</Link>
        </div>
      </div>

<Link to="/loginpage">
<button className='bg-black text-white hidden md:flex items-center py-2 rounded-full'>
        log out
        <BsLock size={20} className='mr-2' />
      </button>
</Link>
      

      {/* Mobile Menu */}
      {/* Overlay */}
      {nav && (
        <div
          onClick={() => setNav(false)}
          className='bg-black/80 fixed w-full h-screen z-10 top-0 left-0'
        ></div>
      )}

      {/* Side Drawer Menu */}
      <div
        className={
          nav
            ? 'fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300'
            : 'fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300'
        }
      >
        <AiOutlineClose
          onClick={() => setNav(!nav)}
          size={30}
          className='absolute right-4 top-4 cursor-pointer'
        />
        <h2 className='text-2xl p-4'>
          Best <span className='font-bold'>Chows</span>
        </h2>
        <nav>
          <ul className='flex flex-col p-4 text-gray-800'>
            <Link to="/">
              <li className='text-xl py-4 flex font-extrabold'>
                <TbTruckDelivery size={25} classNme='mr-4' /> Home
              </li>
            </Link>
            {/* Other menu items */}
            <li className='text-xl py-4 flex'>
              <MdFavorite size={25} className='mr-4' /> About Us
            </li>
            <li className='text-xl py-4 flex'>
              <FaWallet size={25} className='mr-4' /> Contact 
            </li>
            <Link to="/orderpage">
            <li className='text-xl py-4 flex'>
              <MdHelp size={25} className='mr-4' /> Order
            </li>
            </Link>
            
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
