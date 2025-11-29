import {
  CSidebar,
  CSidebarBrand,
  CSidebarHeader,
  CSidebarNav,
  CSidebarToggler,
  CNavTitle,
} from '@coreui/react'
import { Link } from 'react-router-dom'

import CIcon from '@coreui/icons-react'
import { cilSpeedometer, cilUser } from '@coreui/icons'

export const Sidebar = () => {
  return (
    <CSidebar className="border-end">
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand>CoreUI</CSidebarBrand>
      </CSidebarHeader>
      <CSidebarNav>
        <CNavTitle>Admin Dashboard</CNavTitle>
        <li className="nav-item">
          <Link to="/admin" className="nav-link">
            <CIcon customClassName="nav-icon" icon={cilSpeedometer} /> Admin
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/my-account" className="nav-link">
            <CIcon customClassName="nav-icon" icon={cilUser} /> My Account
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/users" className="nav-link">
            <CIcon customClassName="nav-icon" icon={cilUser} /> Users
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/requests" className="nav-link">
            <CIcon customClassName="nav-icon" icon={cilSpeedometer} /> Requests
          </Link>
        </li>
      </CSidebarNav>
      <CSidebarHeader className="border-top">
        <CSidebarToggler />
      </CSidebarHeader>
    </CSidebar>
  )
}
