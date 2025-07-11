import React from 'react'
import { LuArrowBigRight } from "react-icons/lu"

const FeaturePage = () => {
  return (
    <div className='flex flex-col justify-center px-4 md:px-28 items-center md:auto'>
      <p className='bg-green-200 border mt-20 border-green-300 px-5 py-1 rounded-full text-sm text-green-800'># Save More</p>
      <p className='text-4xl font-semibold mt-4 text-center'><span className='text-primary'>Track</span> Smart. <span className='text-primary'>Spend</span> Smarter.</p>
      <p className='mt-2 font-base text-gray-500 max-w-[320px] md:max-w-[700px] text-center'>Your all-in-one personal finance tracker — control your budget, visualize your spending, and build better financial habits.</p>
      <ul className='flex gap-4 mt-6 md:mt-4 md:flex-row flex-wrap justify-center'>
        <li className='flex items-center font-medium text-sm bg-primary text-purple-100 rounded-full px-4 py-1'><LuArrowBigRight />Real-Time Insights</li>
        <li className='flex items-center font-medium text-sm bg-primary text-purple-100 rounded-full px-4 py-1'><LuArrowBigRight />Smarter Budgeting</li>
        <li className='flex items-center font-medium text-sm bg-primary text-purple-100 rounded-full px-4 py-1'><LuArrowBigRight />Secure & Private</li>
      </ul>
      <img src="image 14.png" alt="" className='md:w-3/4 mt-14'/>
    </div>
  )
}

export default FeaturePage
