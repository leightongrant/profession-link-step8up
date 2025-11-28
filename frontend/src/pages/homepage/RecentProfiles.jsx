import { useFetchUsers } from '../../hooks/useFetchUsers'
import Stack from 'react-bootstrap/esm/Stack'
import Container from 'react-bootstrap/esm/Container'
import Button from 'react-bootstrap/esm/Button'
import Card from 'react-bootstrap/esm/Card'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import Badge from 'react-bootstrap/esm/Badge'
import md5 from 'md5'

const UserCard = ({ user }) => {
  return (
    <Col xs={12} sm={6} lg={4} xl={3} className="mb-4">
      <Card>
        <Card.Img variant="top" src={getGravatarUrl(user.email)} />
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
          <Button variant="primary" size="sm">
            View Profile
          </Button>
        </Card.Footer>
      </Card>
    </Col>
  )
}

function getGravatarUrl(email, size = 200) {
  const hash = md5(email.trim().toLowerCase())
  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=monsterid`
}

export const RecentProfiles = () => {
  const { data, error, loading } = useFetchUsers()

  if (error) return <p>{JSON.stringify(error)}</p>
  if (loading) return <p>Loading...</p>

  return (
    <Stack className="recent-profiles py-5">
      <Container>
        <h2 className="text-center mb-5">Recent Profiles</h2>
        <Row>
          {data &&
            data
              .filter((user) => user.Profile)
              .map((user) => {
                return <UserCard key={user.user_id} user={user} />
              })}
        </Row>
      </Container>
    </Stack>
  )
}
