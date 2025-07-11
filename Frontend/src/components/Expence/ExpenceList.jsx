import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

const ExpenceList = ({transactions, onDelete, onDownload}) => {
  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>All Expence</h5>
        <button className='card-btn' onClick={onDownload}><LuDownload className='text-base'/>Download</button>
      </div>

        <div className='grid grid-cols-1 md:grid-cols-2'>
            {
                transactions?.map((expence) => (
                    <TransactionInfoCard 
                        key={expence._id}
                        title={expence.category}
                        icon={expence.icon}
                        date={moment(expence.date).format("Do MMM YYYY")}
                        amount={expence.amount}
                        type='expence'
                        onDelete={()=>onDelete(expence._id)}
                    />
                ))
            }
        </div>
    </div>
  )
}

export default ExpenceList
