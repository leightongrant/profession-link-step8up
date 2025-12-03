import { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  useColorModes,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilContrast,
  cilMenu,
  cilMoon,
  cilSun,
  cilAccountLogout,
  cilHome,
  cilCommentSquare,
  cilAddressBook,
  cilBookmark,
  cilAppsSettings,
} from '@coreui/icons'

export const AdminHeader = ({ sidebarShow, setbarShow }) => {
  const headerRef = useRef()
  const { colorMode, setColorMode } = useColorModes(
    'coreui-free-react-admin-template-theme'
  )
  const navigate = useNavigate()

  const clearAuth = useAuthStore((state) => state.clearAuth)
  const handleLogout = () => {
    clearAuth()
    navigate('/login')
  }

  // const dispatch = useDispatch()
  // const sidebarShow = useSelector((state) => state.sidebarShow)

  useEffect(() => {
    const handleScroll = () => {
      headerRef.current &&
        headerRef.current.classList.toggle(
          'shadow-sm',
          document.documentElement.scrollTop > 0
        )
    }

    document.addEventListener('scroll', handleScroll)
    return () => document.removeEventListener('scroll', handleScroll)
  }, [])

  // Get current user from zustand
  const user = useAuthStore((state) => state.user)

  return (
    <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
      <CContainer className="border-bottom px-4" fluid>
        <CHeaderToggler
          onClick={() => setbarShow(!sidebarShow)}
          style={{ marginInlineStart: '-14px' }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderNav className="d-none d-md-flex">
          <CNavItem>
            <CNavLink to="/admin/my-account" as={NavLink}>
              <CIcon icon={cilHome} className="me-1" />
              Home
            </CNavLink>
          </CNavItem>
          {user && user.role === 'admin' && (
            <CNavItem>
              <CNavLink to="/admin/users" as={NavLink}>
                <CIcon icon={cilAddressBook} className="me-1" /> Users
              </CNavLink>
            </CNavItem>
          )}
          {user &&
            (user.role === 'accountant' ||
              user.role === 'lawyer' ||
              user.role === 'client') && (
              <CNavItem>
                <CNavLink to="/admin/bookings" as={NavLink}>
                  <CIcon icon={cilBookmark} className="me-1" /> Bookings
                </CNavLink>
              </CNavItem>
            )}
          {user && (user.role === 'accountant' || user.role === 'lawyer') && (
            <>
              <CNavItem>
                <CNavLink to="/admin/services" as={NavLink}>
                  <CIcon icon={cilAppsSettings} className="me-1" /> Services
                </CNavLink>
              </CNavItem>

              <CNavItem>
                <CNavLink to="/admin/reviews" as={NavLink}>
                  <CIcon icon={cilCommentSquare} className="me-1" /> Reviews
                </CNavLink>
              </CNavItem>
            </>
          )}
        </CHeaderNav>
        <CHeaderNav className="ms-auto">
          {/* You can add notification or message icons here in the future if needed */}
        </CHeaderNav>
        <CHeaderNav>
          {/* User dropdown with name and logout */}
          {user && user.name && (
            <CDropdown variant="nav-item" placement="bottom-end">
              <CDropdownToggle
                caret={false}
                className="fw-semibold text-primary d-flex align-items-center"
              >
                {user.name}
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem
                  onClick={() => navigate('/')}
                  className="d-flex align-items-center"
                  as="button"
                  type="button"
                >
                  <CIcon icon={cilHome} className="me-2" />
                  Home
                </CDropdownItem>
                <CDropdownItem
                  onClick={handleLogout}
                  className="d-flex align-items-center text-danger"
                  as="button"
                  type="button"
                >
                  <CIcon icon={cilAccountLogout} className="me-2" />
                  Logout
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          )}
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              {colorMode === 'dark' ? (
                <CIcon icon={cilMoon} size="lg" />
              ) : colorMode === 'auto' ? (
                <CIcon icon={cilContrast} size="lg" />
              ) : (
                <CIcon icon={cilSun} size="lg" />
              )}
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem
                active={colorMode === 'light'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('light')}
              >
                <CIcon className="me-2" icon={cilSun} size="lg" /> Light
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'dark'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('dark')}
              >
                <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'auto'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('auto')}
              >
                <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CHeaderNav>
      </CContainer>
      <CContainer className="px-4" fluid>
        {/* <AppBreadcrumb /> */}
      </CContainer>
    </CHeader>
  )
}
