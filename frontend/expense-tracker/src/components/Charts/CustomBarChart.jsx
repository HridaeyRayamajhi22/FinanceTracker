import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CustomBarChart = ({ data }) => {
  // Softer gradient colors
  const barColors = ["#a78bfa", "#c4b5fd"]; 

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const entry = payload[0].payload;
      return (
        <div className="bg-white shadow-sm rounded-lg p-2 border border-gray-200">
          <p className="text-xs font-semibold text-purple-800 mb-1">{entry.name}</p>
          <p className="text-sm text-gray-600">
            Amount{" "}
            <span className="text-sm font-medium text-gray-900">
              रु {entry.amount.toLocaleString("en-US")}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white mt-6 p-4 rounded-lg shadow-sm">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 10 }}>
          <CartesianGrid stroke="#f0f0f0" strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="none"
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="none"
            width={40}
          />
          <Tooltip content={<CustomTooltip />} />

          <Bar dataKey="amount" radius={[6, 6, 0, 0]} animationDuration={800}>
            {data.map((entry, index) => (
              <Cell
                key={entry.name || index}
                fill={barColors[index % barColors.length]}
                style={{ transition: "all 0.3s ease" }}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
