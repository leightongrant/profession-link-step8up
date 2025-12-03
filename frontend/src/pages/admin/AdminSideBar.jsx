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
import {
  cilUser,
  cilCommentSquare,
  cilAddressBook,
  cilApplicationsSettings,
  cilBookmark,
} from '@coreui/icons'

export const AdminSideBar = ({ sidebarShow }) => {
  const user = useAuthStore((state) => state.user)
  return (
    <CSidebar className="border-end bg-dark-subtle" visible={sidebarShow}>
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand as={Link} to="/admin/my-account">
          ProLINK
        </CSidebarBrand>
      </CSidebarHeader>
      <CSidebarNav>
        <CNavTitle>Dashboard</CNavTitle>

        <li className="nav-item">
          <Link to="/admin/my-account" className="nav-link">
            <CIcon customClassName="nav-icon" icon={cilUser} /> My Account
          </Link>
        </li>
        {user.role === 'admin' && (
          <>
            <li className="nav-item">
              <Link to="/admin/users" className="nav-link">
                <CIcon customClassName="nav-icon" icon={cilAddressBook} /> Users
              </Link>
            </li>
          </>
        )}

        {(user.role === 'accountant' ||
          user.role === 'lawyer' ||
          user.role === 'client') && (
          <li className="nav-item">
            <Link to="/admin/bookings" className="nav-link">
              <CIcon customClassName="nav-icon" icon={cilBookmark} />
              Bookings
            </Link>
          </li>
        )}
        {user.role === 'accountant' ||
          (user.role === 'lawyer' && (
            <>
              <li className="nav-item">
                <Link to="/admin/services" className="nav-link">
                  <CIcon
                    customClassName="nav-icon"
                    icon={cilApplicationsSettings}
                  />{' '}
                  Services
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/reviews" className="nav-link">
                  <CIcon customClassName="nav-icon" icon={cilCommentSquare} />
                  Reviews
                </Link>
              </li>
            </>
          ))}
      </CSidebarNav>
      <CSidebarHeader className="border-top">
        <CSidebarToggler />
      </CSidebarHeader>
    </CSidebar>
  )
}
