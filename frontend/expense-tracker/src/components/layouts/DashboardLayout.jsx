import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import SideMenu from './SideMenu'
import Navbar from './Navbar'

const DashboardLayout = ({ children, activeMenu }) => {
    const { user, loading } = useContext(UserContext);

    if (loading) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    return (
  <div>
    <Navbar activeMenu={activeMenu} />
    {user ? (
      <div className="flex">
        <div className="max-[1080px]:hidden">
          <SideMenu activeMenu={activeMenu} />
        </div>
        <div className="grow mx-5">{children}</div>
      </div>
    ) : (
      <p className="text-center mt-10">Not logged in</p>
    )}
  </div>
)
}
export default DashboardLayout
