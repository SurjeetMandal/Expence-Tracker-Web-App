import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth"
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import InfoCard from "../../components/Cards/InfoCard";

import { LuCoins, LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io"
import { addThousandSeperator } from "../../utils/helper";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import ExpenceTransaction from "../../components/Dashboard/ExpenceTransaction";
import Last30DaysExpence from "../../components/Dashboard/Last30DaysExpence";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";
import RecentIncome from "../../components/Dashboard/RecentIncome";

const Home = () => {
  useUserAuth()

  const navigate = useNavigate();

  const[dashboardData, setDashboardData] = useState(null);
  const[loading, setLoading] = useState(false);

  const fetchData = async() => {
    if (loading) return;

    setLoading(true);

    try{
      const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`);

      if(response.data){
        setDashboardData(response.data)
      }
    }
    catch(error){
      console.log("Something went wrong. Please try again.", error)
    }
    finally{
      setLoading(false);
    }
  };

  useEffect(()=>{
    fetchData();
    return () => {};
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard 
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandSeperator(dashboardData?.totalBalance || 0)}
            color="bg-primary"
          />

          <InfoCard 
            icon={<LuCoins />}
            label="Total Income"
            value={addThousandSeperator(dashboardData?.totalIncome || 0)}
            color="bg-orange-500"
          />

          <InfoCard 
            icon={<LuWalletMinimal />}
            label="Total Expence"
            value={addThousandSeperator(dashboardData?.totalExpence || 0)}
            color="bg-red-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTransactions 
            transactions={dashboardData?.recentTransaction}
            onSeeMore={()=> navigate("/expence")}
          />

          <FinanceOverview 
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpence={dashboardData?.totalExpence || 0}
          />

          <ExpenceTransaction 
            transactions={dashboardData?.last30DaysExpence?.transactions || []}
            onSeeMore={()=>navigate("/expence")}
          />

          <Last30DaysExpence 
            data={dashboardData?.last30DaysExpence?.transactions || []}
          />

          <RecentIncomeWithChart 
            data={dashboardData?.last60DaysIncome?.transaction?.slice(0,4) || []}
            totalIncome={dashboardData?.totalIncome || 0}
          />

          <RecentIncome 
            transaction={dashboardData?.last60DaysIncome?.transaction || []}
            onSeeMore={()=>navigate("/income")}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
