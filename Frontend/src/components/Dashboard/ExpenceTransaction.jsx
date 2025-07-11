import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

const ExpenceTransaction = ({transactions, onSeeMore}) => {
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Expence</h5>
            <button className='card-btn' onClick={onSeeMore}>
                See All<LuArrowRight className='text-base'/>
            </button>
        </div>

        <div>
            {
                transactions?.slice(0,5)?.map((expence) => (
                    <TransactionInfoCard 
                        key={expence._id}
                        title={expence.category}
                        icon={expence.icon}
                        date={moment(expence.date).format("Do MMM YYYY")}
                        amount={expence.amount}
                        type="expence"
                        hideDeleteBtn
                    />
                ))
            }
        </div>
    </div>
  )
}

export default ExpenceTransaction
