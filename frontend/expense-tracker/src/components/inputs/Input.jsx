import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, placeholder, label, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col gap-1">
      {/* Label */}
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-100">
          {label}
        </label>
      )}

      {/* Input Wrapper */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-rose-50 focus-within:ring-2 focus-within:ring-purple-500">
        <input
          type={
            type === "password"
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          value={value}
          onChange={(e) => onChange(e)}
        />

        {/* Password Toggle */}
        {type === "password" &&
          (showPassword ? (
            <FaRegEye
              size={20}
              className="text-purple-500 cursor-pointer hover:opacity-80"
              onClick={toggleShowPassword}
            />
          ) : (
            <FaRegEyeSlash
              size={20}
              className="text-gray-400 dark:text-gray-300 cursor-pointer hover:opacity-80"
              onClick={toggleShowPassword}
            />
          ))}
      </div>
    </div>
  );
};

export default Input;
