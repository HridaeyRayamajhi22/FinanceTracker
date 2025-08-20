import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverview from '../../components/Income/IncomeOverview'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import Modal from '../../components/Modal'
import AddIncomeForm from '../../components/Income/AddIncomeForm'
import toast from 'react-hot-toast'
import IncomeList from '../../components/Income/IncomeList'
import DeleteAlert from '../../components/DeleteAlert'
import { useUserAuth } from '../../hooks/useUserAuth'
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// Skeleton Components
const SkeletonBox = ({ height = "h-40" }) => (
  <div className={`animate-pulse rounded-2xl bg-gray-200 ${height} w-full`} />
);

const Income = () => {
  useUserAuth();

  const [incomeData, setIncomeData] = useState([])
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null
  });

  const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false)

  // Get All Income Details
  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );

      if (response.data) {
        setIncomeData(response.data)
      }
    }
    catch (error) {
      console.log("Something went wrong. Please try again later", error)
    }
    finally {
      setLoading(false);
    }
  };

  // Handle Add Income
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    // Validate Checks
    if (!source.trim()) {
      toast.error("Source is required.")
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0. ")
      return;
    }

    if (!date) {
      toast.error("Date is required")
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      });

      setOpenAddIncomeModel(false);
      toast.success("Income added successfully")
      fetchIncomeDetails();
    } catch (error) {
      console.error(
        "Error adding income:",
        error.response?.data?.message || error.message
      );
    }
  }

  // Delete Income
  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id))

      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income details deleted successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.error("Error deleting income: ",
        error.response?.data?.message || error.message
      )
    }
  }
  
  // Handle Download income Details
  const handleDownloadIncomeDetails = async () => {
    try {
      // pick only source, amount, date from incomeData
      const filteredData = incomeData.map((item) => ({
        Source: item.source,
        Amount: item.amount,
        Date: item.date,
      }));

      const worksheet = XLSX.utils.json_to_sheet(filteredData);

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Income");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      const data = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });
      saveAs(data, "income_details.xlsx");

      toast.success("Income details downloaded successfully!");
    } catch (error) {
      console.error("Error downloading income", error);
      toast.error("Failed to download income details. Please try again.");
    }
  };


  useEffect(() => {
    fetchIncomeDetails();
  }, [])

  return (
    <DashboardLayout activeMenu="Income">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          {/* Income Overview */}
          <div>
            {loading ? (
              <SkeletonBox height="h-40" />
            ) : (
              <IncomeOverview
                transactions={incomeData}
                onAddIncome={() => setOpenAddIncomeModel(true)}
              />
            )}
          </div>

          {/* Income List */}
          <div>
            {loading ? (
              <SkeletonBox height="h-80" />
            ) : (
              <IncomeList
                transactions={incomeData}
                onDelete={(id) => {
                  setOpenDeleteAlert({ show: true, data: id });
                }}
                onDownload={handleDownloadIncomeDetails}
              />
            )}
          </div>
        </div>

        {/* Add Income Modal */}
        <Modal
          isOpen={openAddIncomeModel}
          onClose={() => setOpenAddIncomeModel(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        {/* Delete Alert Modal */}
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income detail ?"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income
