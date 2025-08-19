import React from "react";

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null; // Don't render if modal is closed

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-white/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        {/* Modal Content */}
        <div className="relative bg-white rounded-2xl shadow-lg dark:bg-gray-800">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>

            <button
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
              type="button"
              onClick={onClose}
              aria-label="Close modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1l6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-4 md:p-5 text-white">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
