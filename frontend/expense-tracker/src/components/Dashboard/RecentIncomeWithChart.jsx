import React, { useEffect, useState } from 'react'
import CustomPieChart from '../Charts/CustomPieChart'

const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4f39f6"]

const RecentIncomeWithChart = ({ data = [], totalIncome = 0 }) => {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    if (Array.isArray(data)) {
      const dataArr = data.map((item) => ({
        name: item?.source || "Unknown",
        amount: item?.amount || 0,
      }))
      setChartData(dataArr)
    } else {
      setChartData([])
    }
  }, [data])

  // format income nicely
  const formattedIncome = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NPR",
  }).format(totalIncome)

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold">Last 60 Days Income</h5>
      </div>

      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={formattedIncome}
        showTextAnchor
        colors={COLORS}
      />
    </div>
  )
}

export default RecentIncomeWithChart
