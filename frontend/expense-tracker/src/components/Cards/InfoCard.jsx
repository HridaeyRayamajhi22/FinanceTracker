import React from 'react'

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="p-5 rounded-2xl shadow-lg bg-white flex items-center gap-4">
      
      {/* Icon container */}
      <div className={`p-3 rounded-full flex items-center justify-center ${color}`}>
        {icon}
      </div>

      {/* Text content */}
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <h2 className="text-2xl font-semibold text-gray-800">{value}</h2>
      </div>

    </div>
  )
}

export default InfoCard;

