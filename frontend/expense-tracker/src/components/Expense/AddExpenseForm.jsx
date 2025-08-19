import React, { useState } from "react";
import Input from "../inputs/Input";
import EmojiPickerPopUp from "../EmojiPickerPopUp";

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) =>
    setExpense((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!expense.category.trim()) {
      return alert("Category is required.");
    }
    if (!expense.amount || isNaN(expense.amount) || Number(expense.amount) <= 0) {
      return alert("Amount should be a valid number greater than 0.");
    }
    if (!expense.date) {
      return alert("Date is required.");
    }

    onAddExpense(expense);

    // Reset form after submit
    setExpense({
      category: "",
      amount: "",
      date: "",
      icon: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Emoji Picker */}
      <EmojiPickerPopUp
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      {/* Category */}
      <Input
        value={expense.category}
        onChange={({ target }) => handleChange("category", target.value)}
        label="Category"
        placeholder="Rent, Groceries, etc"
        type="text"
        required
        className="text-gray-700 dark:text-gray-100"
      />

      {/* Amount */}
      <Input
        value={expense.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder="0"
        type="number"
        min="1"
        required
        className="text-gray-700 dark:text-gray-100"
      />

      {/* Date */}
      <Input
        value={expense.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        type="date"
        required
        className="text-gray-700 dark:text-gray-100"
      />

      {/* Submit */}
      <div>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium shadow hover:opacity-90 transition cursor-pointer"
        >
          Add Expense
        </button>
      </div>
    </form>
  );
};

export default AddExpenseForm;
