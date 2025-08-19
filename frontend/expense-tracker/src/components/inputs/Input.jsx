import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, placeholder, label, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="flex flex-col gap-1 w-full">
      {/* Label */}
      {label && (
        <label className="text-sm font-semibold text-gray-800">
          {label}
        </label>
      )}

      {/* Input Wrapper */}
      <div className="flex items-center gap-2 px-3 py-2 border rounded-lg border-gray-300 bg-white focus-within:ring-2 focus-within:ring-purple-500 transition">
        <input
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-400"
          value={value}
          onChange={(e) => onChange(e)}
        />

        {/* Password Toggle */}
        {type === "password" && (
          showPassword ? (
            <FaRegEye
              size={20}
              className="text-purple-500 cursor-pointer hover:opacity-80 transition"
              onClick={toggleShowPassword}
            />
          ) : (
            <FaRegEyeSlash
              size={20}
              className="text-gray-400 cursor-pointer hover:opacity-80 transition"
              onClick={toggleShowPassword}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Input;
