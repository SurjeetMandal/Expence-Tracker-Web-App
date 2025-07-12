import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()

  const handleClickLogin = () => {
    navigate("/login")
  }

  const handleClickSigin = () => {
    navigate("/signup")
  }

  return (
    <div className='padding h-16 flex items-center w-full border-b border-purple-100'>
      <div className='flex justify-between w-full'>
        <div className='text-lg text-primary font-semibold flex flex-col leading-3 justify-center'>
          EXTracker
          <span className='text-xs text-gray-500 font-light'>
            By Surjeet
          </span>
        </div>

        <div className='flex md:gap-4 gap-2'>
          <button onClick={handleClickLogin} className='px-6 py-2 rounded-sm text-xs text-primary border-primary border-2 hover:bg-primary hover:text-white transition-all cursor-pointer'>
            Log In
          </button>
          <button onClick={handleClickSigin} className='bg-primary px-6 py-2 rounded-sm text-xs text-white  hover:bg-purple-200 hover:text-primary transition-all cursor-pointer'>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header
