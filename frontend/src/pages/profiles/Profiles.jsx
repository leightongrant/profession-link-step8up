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
import { shuffle } from 'moderndash'
import { useLocation } from 'react-router-dom'

const UserCard = ({ user }) => {
  const navigate = useNavigate()
  const handleProfileView = (id) => {
    navigate(
      `/profiles/${user.role}-${user.name.replace(/\s+/g, '-').toLowerCase()}-${id}`
    )
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
          <Card.Text>{user.Profile.bio}</Card.Text>
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
  const profilesPerPage = 8
  const { pathname } = useLocation()

  if (error) return <ErrorPage />
  if (loading) return <LoadingPage />

  const profiles = data ? shuffle(data).filter((user) => user.Profile) : [] // Filter out users without profiles
  const totalProfiles = profiles.length // Total number of profiles
  const totalPages = Math.ceil(totalProfiles / profilesPerPage) // Total number of pages

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

  return (
    <>
      <Stack className="profiles py-5">
        <Container>
          {' '}
          <h2 className="text-center mb-5">{title}</h2>
          <Row>
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
