import { Outlet } from 'react-router-dom'
import { AdminSideBar } from './AdminSideBar'
import { AdminHeader } from './AdminHeader'
import AdminFooter from './AdminFooter'
import { AdminWelcome } from './AdminWelcome'
import { useState } from 'react'

export const AdminDashboard = () => {
  const [sidebarShow, setbarShow] = useState(true)
  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <AdminSideBar sidebarShow={sidebarShow} />
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <AdminHeader sidebarShow={sidebarShow} setbarShow={setbarShow} />
        <div className="p-4" style={{ flex: 1 }}>
          <AdminWelcome />
          <Outlet />
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}
