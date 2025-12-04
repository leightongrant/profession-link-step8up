import { useState } from 'react'
import Stack from 'react-bootstrap/esm/Stack'
import Container from 'react-bootstrap/esm/Container'
import Button from 'react-bootstrap/esm/Button'
import Card from 'react-bootstrap/esm/Card'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import Badge from 'react-bootstrap/esm/Badge'
import Pagination from 'react-bootstrap/Pagination'
import { useNavigate } from 'react-router-dom'
import { useFetchUsers } from '../../hooks/useFetchUsers.js'
import { LoadingPage } from '../loading/LoadingPage.jsx'
import { ErrorPage } from '../error/ErrorPage.jsx'
import { useLocation } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import { FormControl, FormGroup } from 'react-bootstrap'

const UserCard = ({ user }) => {
  const navigate = useNavigate()
  const handleProfileView = (id) => {
    navigate(
      `/profiles/${user.role}-${user.name.replace(/\s+/g, '-').toLowerCase()}-${id}`
    )
  }

  const truncate = {
    display: '-webkit-box',
    WebkitLineClamp: '3',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  }

  return (
    <Col xs={12} sm={6} lg={4} xl={3} className="mb-4">
      <Card>
        <Card.Img
          variant="top"
          src={`https://i.pravatar.cc/300?u=${user.email}`}
          loading="lazy"
        />
        <Card.Body>
          <Card.Title>
            {user.name}{' '}
            <Badge pill bg={user.role === 'lawyer' ? 'secondary' : 'primary'}>
              {user.role}
            </Badge>
          </Card.Title>
          <Card.Text style={truncate}>{user.Profile.bio}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleProfileView(user.user_id)}
          >
            View Profile
          </Button>
        </Card.Footer>
      </Card>
    </Col>
  )
}

export const Profiles = ({ title = 'Profiles', limit }) => {
  const { data, error, loading } = useFetchUsers()
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')
  const profilesPerPage = 8
  const { pathname } = useLocation()

  let profiles = data
    ? data.filter(
        (user) =>
          user.Profile &&
          (user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.role.toLowerCase().includes(search.toLowerCase()) ||
            user.Profile.bio.toLowerCase().includes(search.toLowerCase()))
      )
    : []

  // If on homepage, sort by rating_avg ascending
  if (pathname === '/') {
    profiles = profiles.slice().sort((a, b) => {
      const aRating = a.Profile.rating_avg ?? 0
      const bRating = b.Profile.rating_avg ?? 0
      return aRating - bRating
    })
  }

  const totalProfiles = profiles.length
  const totalPages = Math.ceil(totalProfiles / profilesPerPage)

  // Get current profiles
  const indexOfLastProfile = currentPage * profilesPerPage
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage
  const currentProfiles = profiles.slice(
    indexOfFirstProfile,
    indexOfLastProfile
  )

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  let items = []
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => paginate(number)}
      >
        {number}
      </Pagination.Item>
    )
  }

  const searchInput = {
    height: '50px',
    borderRadius: '30px',
    paddingLeft: '35px',
    border: 'none',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '800px',
    margin: 'auto',
  }

  // const searchIcon = {
  //   position: 'absolute',
  //   top: '50%',
  //   left: '400px',
  //   transform: 'translateY(-50%)',
  //   color: '#888',
  // }
  // if (data) {
  //   console.log(data)
  // }
  if (error) return <ErrorPage />
  if (loading) return <LoadingPage />

  return (
    <>
      <Stack className="profiles py-5">
        <Container>
          {' '}
          <h2 className="text-center mb-5">{title}</h2>
          {pathname === '/profiles' && (
            <Row className="justify-content-center d-flex my-5">
              <Col className="position-relative">
                <FormGroup>
                  <FormControl
                    type="text"
                    style={searchInput}
                    placeholder="Search profiles by name, role, or bio..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  {/* <FaSearch style={searchIcon} /> */}
                </FormGroup>
              </Col>
            </Row>
          )}
          <Row className="mt-5">
            {currentProfiles.length === 0 && (
              <p className="text-center fs-3 text-muted">No Results Found</p>
            )}
            {currentProfiles &&
              currentProfiles
                .map((user) => {
                  return <UserCard key={user.user_id} user={user} />
                })
                .slice(0, limit)}
          </Row>
        </Container>
      </Stack>
      {pathname === '/profiles' && (
        <Pagination className="justify-content-center">{items}</Pagination>
      )}
    </>
  )
}
