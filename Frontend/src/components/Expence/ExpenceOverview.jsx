import React, { useEffect, useState } from 'react'
import { prepareExpenceLineChartData } from '../../utils/helper';
import { LuPlus } from 'react-icons/lu';
import CustomLineChart from '../Charts/CustomLineChart';

const ExpenceOverview = ({transactions, onExpenceIncome}) => {
  const[chartData, setChartData] = useState()

  useEffect(()=>{
    const result = prepareExpenceLineChartData(transactions);
    setChartData(result);
    
  },[transactions])

  return (
    <div className='card'>
      <div className='flex items-center justify-between gap-4'>
        <div>
            <h5 className='text-lg'>Expence Overview</h5>
            <p className='text-xs text-gray-400 mt-0.5'>Track your spending trends over time and gain insight into where you money goes.</p>
        </div>

        <button className='add-btn' onClick={onExpenceIncome}>
            <LuPlus className='text-lg'/>
            Add Expence
        </button>
    </div>

    <div className='mt-10'>
        <CustomLineChart data={chartData}/>
    </div>

    </div>
  )
}

export default ExpenceOverview
