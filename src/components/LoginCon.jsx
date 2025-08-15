import React from 'react'
import Login from './Login'

const LoginCon = () => {
  return (
    <div className='bg-gray-100'>
        <div className='flex w-full h-screen'>
        <div className='w-full flex items-center justify-center lg:w-1/'>
            <Login />
        </div>
        <div className='hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200'>
            <div className='w-60 h-60 bg-gradient-to-tr from-orange-500 to-yellow-400 rounded-full animate-bounce'/>
            <div className='w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg'/>
            
        </div> 

    </div>
    </div>
    
  )
}

export default LoginCon   