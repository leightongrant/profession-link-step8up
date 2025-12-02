import { Outlet } from 'react-router-dom'
import { Sidebar } from './SideBar'
import { AdminHeader } from './AdminHeader'
import AdminFooter from './AdminFooter'

export const AdminDashboard = () => {
  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <AdminHeader />
        <div className="p-4">
          <Outlet />
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}
