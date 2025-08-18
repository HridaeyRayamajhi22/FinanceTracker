import React, { useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverview from '../../components/Income/IncomeOverview'

const Income = () => {

  const [incomeData, setIncomeData] = useState([])
    const [loading, setLoading] = useState(false)
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
      show: false,
      data:null
    });

  const [openAddIncomeModel,setOpenAddIncomeModel] = useState(false)

  // GEt All Income Details
  const fetchIncomeDetails = async () => {};

  // Handle Add Income
  const handleAddIncome = async (income) => {

  }

  // Handle Download income Details
  return (
     <DashboardLayout activeMenu="Income">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
           <div className=''> 
            <IncomeOverview
               transactions={incomeData}
               onAddIncome={() => setOpenAddIncomeModel(true)}      
            />
           </div>
        </div>
      </div>
      </DashboardLayout>
  )
}

export default Income
