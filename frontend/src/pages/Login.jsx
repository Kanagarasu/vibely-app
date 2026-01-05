import React from 'react'
import { assets } from "../assets/assets.js";
import { Star } from 'lucide-react';
import {SignIn} from '@clerk/clerk-react';

function Login() {
  return (
    <div className='flex min-h-screen flex-col md:flex-row'>
      {/* background images */}
      <img src={assets.bgImage} alt="bgimg" className='absolute top-0 left-0 -z-1 w-full h-full object-cover' />

      {/* left side */}
      <div className='flex-1 flex flex-col items-start  justify-between p-6 md:p-10 lg:pl-40'>
        <img src={assets.logo} alt="logo" className='h-12 object-contain' />
        <div>
          <div className='flex item-center gap-3 mb-4 max-md:mt-10'>
            <img src={assets.group_users} alt="group users" className='h-8 md:h-10' />

            <div>
              <div className='flex'>
                {Array(5).fill(0).map((_, index) => (<Star key={index}
                  className='size-4 md:size-4.5 text-transparent fill-amber-500' />))}
              </div>
              <p>Used by 12k+ developers</p>
            </div>

          </div>

          <h1 className='text-3xl md:text-6xl md:pb-2 font-bold bg-linear-to-r from-indigo-950 to-indigo-800 bg-clip-text'>More then just friends truly connect</h1>
          <p>connect with global community on vibely</p>
        </div>
        <span className='md:h-10'></span>
      </div>
      {/* right side */}
      <div className='flex-1 flex items-center justify-center p-6 sm:p-10'>
        <SignIn />
      </div>
    </div>
  )
}

export default Login
