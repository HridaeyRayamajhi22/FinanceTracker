import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { toast } from "react-hot-toast";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import Modal from "../../components/Modal";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import ExpenseList from "../../components/Expense/ExpenseList";
import DeleteAlert from "../../components/DeleteAlert";

// Skeleton Components
const SkeletonBox = ({ className }) => (
  <div className={`animate-pulse bg-gray-300 rounded-md ${className}`} />
);

const ExpenseOverviewSkeleton = () => (
  <div className="p-6 bg-white shadow rounded-lg space-y-4">
    <SkeletonBox className="h-6 w-32" />
    <div className="grid grid-cols-3 gap-4">
      <SkeletonBox className="h-20 w-full" />
      <SkeletonBox className="h-20 w-full" />
      <SkeletonBox className="h-20 w-full" />
    </div>
  </div>
);

const ExpenseListSkeleton = () => (
  <div className="p-6 bg-white shadow rounded-lg space-y-4 mt-6">
    <SkeletonBox className="h-6 w-48" />
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex justify-between items-center py-2 border-b">
        <SkeletonBox className="h-4 w-24" />
        <SkeletonBox className="h-4 w-16" />
        <SkeletonBox className="h-4 w-20" />
      </div>
    ))}
  </div>
);

const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  // Fetch all expenses
  const fetchExpenseDetails = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);

      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
      toast.error("Something went wrong while fetching expenses.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Add Expense
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    if (!category.trim()) {
      toast.error("Category is required.");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0.");
      return;
    }

    if (!date) {
      toast.error("Date is required.");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });

      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.error(
        "Error adding expense:",
        error.response?.data?.message || error.message
      );
      toast.error(error.response?.data?.message || "Failed to add expense.");
    }
  };

  // Delete Expenses
  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));

      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense details deleted successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.error(
        "Error deleting expense: ",
        error.response?.data?.message || error.message
      );
    }
  };

  // Handle Download expense Details
  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);

      const expenseData = response.data.map((item) => ({
        Category: item.category,
        Amount: item.amount,
        Date: item.date,
      }));

      const worksheet = XLSX.utils.json_to_sheet(expenseData);

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      const data = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });
      saveAs(data, "expense_details.xlsx");

      toast.success("Expense details downloaded successfully!");
    } catch (error) {
      console.error("Error downloading expenses", error);
      toast.error("Failed to download expense details. Please try again.");
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
  }, []);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          {loading ? (
            <ExpenseOverviewSkeleton />
          ) : (
            <ExpenseOverview
              transactions={expenseData}
              onAddExpense={() => setOpenAddExpenseModal(true)}
            />
          )}
        </div>

        {loading ? (
          <ExpenseListSkeleton />
        ) : (
          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDownload={handleDownloadExpenseDetails}
          />
        )}

        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense detail ?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Expense;
