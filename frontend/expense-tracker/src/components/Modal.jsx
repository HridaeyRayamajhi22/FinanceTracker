import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ children, isOpen, onClose, title }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex justify-center items-center bg-black/40 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // close on backdrop click
        >
          <motion.div
            className="relative p-4 w-full max-w-2xl"
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-2xl dark:bg-purple-700 overflow-hidden">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-300 bg-gradient-to-r from-purple-500 to-indigo-500">
                <h3 className="text-xl font-semibold text-white">
                  {title}
                </h3>

                <button
                  className="text-white bg-white/20 hover:bg-white/30 rounded-full w-8 h-8 flex justify-center items-center transition cursor-pointer"
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
              <div className="p-6 space-y-4 text-gray-700 dark:text-gray-100">
                {children}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
