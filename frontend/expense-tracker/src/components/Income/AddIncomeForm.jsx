import React, { useState } from "react";
import Input from "../inputs/Input";
import EmojiPickerPopUp from "../EmojiPickerPopUp";

const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) =>
    setIncome({ ...income, [key]: value });

  return (
    <div className="space-y-4">
      <EmojiPickerPopUp
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
        
      />
      <Input
        value={income.source}
        onChange={({ target }) => handleChange("source", target.value)}
        label="Income Source"
        placeholder="Freelance, Salary, etc"
        type="text"
        className="text-gray-700 dark:text-gray-100"
      />

      <Input
        value={income.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder=" "
        type="number"
        className="text-gray-700 dark:text-gray-100"
      />

      <Input
        value={income.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeholder=""
        type="date"
        className="text-gray-700 dark:text-gray-100"
      />

      <div>
        <button
          type="button"
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium shadow hover:opacity-90 transition cursor-pointer"
          onClick={() => onAddIncome(income)}
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
