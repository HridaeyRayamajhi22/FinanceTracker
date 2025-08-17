import React from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'

const Home = () => {
  return (
    <DashboardLayout activeMenu="Dashboard">
       <div className='my-5 mx-auto'>
          {/* <h1 className="text-2xl font-bold">Welcome to Dashboard</h1> */}
       </div>
    </DashboardLayout>
  )
}

export default Home
