import React, { useEffect, useState } from 'react'
import {assets} from "../assets/assets"

import { useNavigate } from 'react-router-dom';

const Navbar = ({toggleSignIn}) => {
  const navigate = useNavigate();
  const [showMobileMenu,setshowMobileMenu] = useState(false)


useEffect(()=>{
  if(showMobileMenu){
    document.body.style.overflow = 'hidden';
  }else{
    document.body.style.overflow = 'auto';
  }
  return()=>{
    document.body.style.overflow = 'auto';
  };
},[showMobileMenu])


  return (
    <div className='absolute top-0 left-0 w-full z-10 bg-transparent bg-opacity-50'>
      <div className='container mx-auto flex justify-between items-center py-4 px-6 md:px-20 lg:px-32'>
        <img src={assets.logo} alt="" className='w-3xs'/>
        <ul className='hidden md:flex gap-7 text-white font-semibold'>
          <a href="#Header" className='cursor-pointer hover:text-red-400 border-b-2 border-transparent hover:border-red-400 transition-all'>Home</a>
          <a href="#About" className='cursor-pointer hover:text-red-400 border-b-2 border-transparent hover:border-red-400 transition-all'>About</a>
          <a href="#Community" className='cursor-pointer hover:text-red-400 border-b-2 border-transparent hover:border-red-400 transition-all'>Community</a>
          <a href="#Join_Us" className='cursor-pointer hover:text-red-400 border-b-2 border-transparent hover:border-red-400 transition-all'>Join Us</a>
        </ul>
        <button className='hidden md:block bg-red-500 px-6 py-2 rounded-full text-white font-semibold hover:bg-red-600 transition-all' onClick={toggleSignIn} >Sign In</button>
        {/* onClick={() => navigate('/auth')} */}
        <img onClick={()=>setshowMobileMenu(true)} src={assets.menu_icon} className='md:hidden w-7 cursor-pointer' alt="" />
      </div>
      {/* -----------mobile-menu----------- */}
      <div className={`md:hidden ${showMobileMenu ?'fixed w-full':'h-0 w-0'}  right-0 top-0 bottom-0 overflow-hidden bg-white transition-all`}>
        <div className='flex justify-end p-6 cursor-pointer'>
          <img onClick={()=>setshowMobileMenu(false)} src={assets.cross_icon} className='w-6' alt="" />
        </div>
        <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
          <a onClick={()=>setshowMobileMenu(false)} href="#Header" className='px-4 py-3 rounded-full inline-block text-black hover:bg-red-100'>Home</a>
          <a onClick={()=>setshowMobileMenu(false)} href="#About" className='px-4 py-3 rounded-full inline-block text-black hover:bg-red-100'>About</a>
          <a onClick={()=>setshowMobileMenu(false)} href="#Community" className='px-4 py-3 rounded-full inline-block text-black hover:bg-red-100'>Community</a>
          <a onClick={()=>setshowMobileMenu(false)} href="#Join_Us" className='px-4 py-3 rounded-full inline-block text-black hover:bg-red-100'>Join Us</a>
        </ul>
      </div>
      
    </div>
  )
}

export default Navbar
