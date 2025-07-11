import { useEffect, useState } from "react"
import DashboardLayout from "../../components/layouts/DashboardLayout"
import { useUserAuth } from "../../hooks/useUserAuth"
import axiosInstance from "../../utils/axiosInstance"
import { API_PATHS } from "../../utils/apiPath"
import toast from "react-hot-toast"
import ExpenceOverview from "../../components/Expence/ExpenceOverview"
import AddExpenceForm from "../../components/Expence/AddExpenceForm"
import Modal from "../../components/Modal"
import ExpenceList from "../../components/Expence/ExpenceList"
import DeleteAlert from "../../components/DeleteAlert"

const Expence = () => {
  useUserAuth()

    const[expenceData,setExpenceData] = useState([])
    const[OpenAddExpenceModal,setOpenAddExpenceModal] = useState(false)
    const[loading,setLoading] = useState(false)
    const[openDeleteAlert,setOpenDeleteAlter]=useState({
      show: false,
      data: null,
    });

  //Get All Expence Data
  const fetchExpenceDetails = async() => {
    if(loading) return;

    try{
      const response = await axiosInstance.get(`${API_PATHS.EXPENCE.GET_ALL_EXPENCE}`);

      if(response.data){
        setExpenceData(response.data)
      }
    }
    catch(error){
      console.log("Something went wrong. Please try again.",error)
    }
    finally{
      setLoading(false);
    }
  }

  //Handle Add Expence
  const handleAddExpence = async(expence) => {
    const { category, amount, date, icon} = expence;

    //Validate Check
    if(!category.trim()){
      toast.error("Category is required")
      return;
    }

    if(!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a vaild number greater than 0.")
      return;
    }

    if(!date){
      toast.error("Date is required")
    }

    try{
      await axiosInstance.post(API_PATHS.EXPENCE.ADD_EXPENCE,{
        category,
        amount,
        date,
        icon
      })

      setOpenAddExpenceModal(false);
      toast.success("Expence added successfully")
      fetchExpenceDetails();
    }
    catch(error){
      console.error("Error adding expence: ",error.response?.data?.message || error.message)
    }
  }

  //Delete Expence
  const deleteExpence = async(id) => {
    try{
      await axiosInstance.delete(API_PATHS.EXPENCE.DELETE_EXPENCE(id));

      setOpenDeleteAlter({ show:false, data:null });
      toast.success("Expence details deleted successfull");
      fetchExpenceDetails()
      
    }catch(error){
      console.error(
        "Error deleting expence",
        error.response?.data?.message || error.message
      );
    }
  }

  //Handle download expence
  const handleDownloadExpenceDetails = async () => {
    try{
      const response = await axiosInstance.get(
        API_PATHS.EXPENCE.DOWNLOAD_EXPENCE,
        {
          responseType: "blob",
        }
      )

      //Creating URL for blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const Link = document.createElement("a");
      Link.href = url;
      Link.setAttribute("download", "expence_details.xlsx")
      document.body.appendChild(Link)
      Link.click()
      Link.parentNode.removeChild(Link)
      window.URL.revokeObjectURL(url)
    }
    catch(error){
      console.error("Error downloading expence details: ",error)
      toast.error("Fail to download expence details. Please try again")
    }
  }

  useEffect(()=>{
    fetchExpenceDetails()

    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
     <DashboardLayout activeMenu="Expence">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <ExpenceOverview 
              transactions={expenceData}
              onExpenceIncome={()=>setOpenAddExpenceModal(true)}
            />
          </div>

          <ExpenceList 
            transactions={expenceData}
            onDelete={(id)=>{setOpenDeleteAlter({show: true, data:id})}}
            onDownload={handleDownloadExpenceDetails}
          />
        </div>

      <Modal
        isOpen={OpenAddExpenceModal}
        onClose={()=>setOpenAddExpenceModal(false)}
        title="Add Expence"
      >
        <AddExpenceForm onAddExpence={handleAddExpence} />
      </Modal>

      <Modal
          isOpen={openDeleteAlert.show}
          onClose={()=>setOpenDeleteAlter({show:false, data:null})}
          title="Delete Expence"
        >
          <DeleteAlert 
            content="Are you sure you want to delete this expence"
            onDelete={() => deleteExpence(openDeleteAlert.data)}
          />
        </Modal>

      </div>
     </DashboardLayout> 
  )
}

export default Expence
