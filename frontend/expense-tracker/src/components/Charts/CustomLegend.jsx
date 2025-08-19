import React from "react";

const CustomLegend = ({ payload = [] }) => {
  if (!payload.length) return null;

  return (
    <div
      className="flex flex-wrap justify-center gap-4 mt-4"
      role="list"
      aria-label="Chart legend"
    >
      {payload.map((entry, index) => (
        <div
          key={`legend-${index}`}
          className="flex items-center space-x-2"
          role="listitem"
        >
          {/* Color dot */}
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: entry.color || "#ccc" }}
            aria-hidden="true"
          />
          {/* Label */}
          <span className="text-xs text-gray-700 font-medium">
            {entry.value || "Unknown"}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
