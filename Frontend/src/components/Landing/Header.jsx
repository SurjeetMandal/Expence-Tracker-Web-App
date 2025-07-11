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
    <div className='flex justify-between px-4 md:px-28 h-14 items-center bg-white border-b border-gray-200'>
      <p className='text-xl font-semibold'>Expence Tracker</p>

      <div className='flex gap-2 items-center'>
        <button onClick={handleClickLogin} className='px-6 text-sm font-medium cursor-pointer text-white bg-violet-500 shadow-xl shadow-purple-600/5 py-2 rounded-md hover:bg-purple-600/15 hover:text-purple-600 transition-all'>
          Login
        </button>
        <button onClick={handleClickSigin} className='flex items-center text-sm md:text-sm font-medium text-purple-600 whitespace-nowrap bg-purple-50 border border-purple-100 rounded-lg px-6 py-2 cursor-pointer'>
          Signup
        </button>
      </div>
    </div>
  )
}

export default Header
