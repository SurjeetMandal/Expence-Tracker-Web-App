import React from 'react'
import CustomPieChart from '../Charts/CustomPieChart'

const COLORS = ["#875cf5", "#fa2c37", "#ff6900"];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpence }) => {
  const balanceData = [
    { name: "Total Balance", amount: totalBalance || 0 },
    { name: "Total Income", amount: totalIncome || 0 },
    { name: "Total Expence", amount: totalExpence || 0 },
  ];

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Finance Overview</h5>
      </div>

      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`$${totalBalance}`}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  );
};

export default FinanceOverview;
