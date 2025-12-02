import {
  CSidebar,
  CSidebarBrand,
  CSidebarHeader,
  CSidebarNav,
  CSidebarToggler,
  CNavTitle,
} from '@coreui/react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'

import CIcon from '@coreui/icons-react'
import { cilSpeedometer, cilUser, cilHome } from '@coreui/icons'

export const Sidebar = () => {
  const user = useAuthStore((state) => state.user)
  return (
    <CSidebar className="border-end bg-dark-subtle">
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand>ProLINK</CSidebarBrand>
      </CSidebarHeader>
      <CSidebarNav>
        <CNavTitle>Dashboard</CNavTitle>
        <li className="nav-item">
          <Link to="/" className="nav-link">
            <CIcon customClassName="nav-icon" icon={cilHome} /> Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/my-account" className="nav-link">
            <CIcon customClassName="nav-icon" icon={cilUser} /> My Account
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/bookings" className="nav-link">
            <CIcon customClassName="nav-icon" icon={cilSpeedometer} />
            Bookings
          </Link>
        </li>
        {user.role === 'admin' && (
          <>
            <li className="nav-item">
              <Link to="/admin/users" className="nav-link">
                <CIcon customClassName="nav-icon" icon={cilUser} /> Users
              </Link>
            </li>
          </>
        )}
      </CSidebarNav>
      <CSidebarHeader className="border-top">
        <CSidebarToggler />
      </CSidebarHeader>
    </CSidebar>
  )
}
