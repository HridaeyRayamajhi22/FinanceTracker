import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

const ExpenseTransactions = ({ transactions = [], onSeeMore }) => {

  const safeTransactions = Array.isArray(transactions) ? transactions : []

  return (
    <div className="card">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold">Expenses</h5>

        <button
          className="card-btn flex items-center gap-1 hover:text-blue-600 transition-colors"
          onClick={onSeeMore}
        >
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      {/* Transaction list */}
      <div className="mt-6">
        {safeTransactions.slice(0, 5).map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            title={expense.category}
            icon={expense.icon}
            date={moment(expense.date)}
            amount={expense.amount}
            type="expense"
            hideDeleteBtn
          />
        ))}

        {/* Handle empty state */}
        {safeTransactions.length === 0 && (
          <p className="text-sm text-gray-500 text-center mt-4">
            No expenses found.
          </p>
        )}
      </div>
    </div>
  )
}

export default ExpenseTransactions
