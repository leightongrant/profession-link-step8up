import Stack from 'react-bootstrap/Stack'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { PiSignOut } from 'react-icons/pi'
import { MdAccountBox } from 'react-icons/md'
import { LinkContainer } from 'react-router-bootstrap'

const DropDown = () => {
  const user = useAuthStore((state) => state.user)
  const clearAuth = useAuthStore((state) => state.clearAuth)

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    clearAuth()
  }

  return (
    <NavDropdown title={user.name} id="collapsible-nav-dropdown">
      <LinkContainer to="/admin/my-account">
        <NavDropdown.Item>
          <MdAccountBox /> My Account
        </NavDropdown.Item>
      </LinkContainer>

      <NavDropdown.Divider />
      <NavDropdown.Item onClick={handleLogout}>
        <PiSignOut /> Logout
      </NavDropdown.Item>
    </NavDropdown>
  )
}

export const Header = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  return (
    <Stack as="header" className="sticky-top shadow-lg">
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            <Link
              to="/"
              className="fw-bold fs-3 text-decoration-none text-light bg-dark rounded px-1"
            >
              ProLINK
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/profiles">
                <Nav.Link>Profiles</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/about">
                <Nav.Link>About</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/contact">
                <Nav.Link>Contact</Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav>
              {isAuthenticated ? (
                <DropDown />
              ) : (
                <Link
                  to="/login"
                  role="button"
                  className="btn btn-dark"
                  aria-disabled="true"
                  tabIndex="0"
                >
                  Login
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Stack>
  )
}
