import React, { useEffect, useState } from 'react'
import { prepareExpenceBarChartData } from '../../utils/helper';
import CustomBarChart from '../Charts/CustomBarChart';


const Last30DaysExpence = ({data = []}) => {
  const[chartData, setChartData] = useState()
  
  useEffect(()=>{
    const result = prepareExpenceBarChartData(data);
    setChartData(result)

    return () => {};
  },[data])

  return (
    <div className='card col-span-1'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Last 30 Days Expences</h5>
        </div>

        <CustomBarChart data={chartData}/>
    </div>
  )
}

export default Last30DaysExpence
