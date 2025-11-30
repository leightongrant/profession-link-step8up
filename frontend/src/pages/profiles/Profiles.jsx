import { useFetchUsers } from '../../hooks/useFetchUsers.js'
import Stack from 'react-bootstrap/esm/Stack'
import Container from 'react-bootstrap/esm/Container'
import Button from 'react-bootstrap/esm/Button'
import Card from 'react-bootstrap/esm/Card'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import Badge from 'react-bootstrap/esm/Badge'
import { useNavigate } from 'react-router-dom'
import { ErrorPage } from '../error/ErrorPage.jsx'
import { LoadingPage } from '../loading/LoadingPage.jsx'
import { shuffle } from 'moderndash'

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
          src={`https://i.pravatar.cc/150?u=${user.email}`}
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

  if (error) return <ErrorPage />
  if (loading) return <LoadingPage />

  return (
    <Stack className="profiles py-5">
      <Container>
        <h2 className="text-center mb-5">{title}</h2>
        <Row>
          {data &&
            shuffle(data)
              .filter((user) => user.Profile)
              .map((user) => {
                return <UserCard key={user.user_id} user={user} />
              })
              .slice(0, limit)}
        </Row>
      </Container>
    </Stack>
  )
}
