import Stack from 'react-bootstrap/esm/Stack'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import { Link } from 'react-router-dom'

export const SignupRequest = () => {
  return (
    <Stack className="about-page py-5" as="main">
      <Container className="h-100">
        <Stack
          className="gap-4 align-items-center justify-content-center"
          style={{ height: '100%' }}
        >
          <h2 className="text-center mb-5">Signup or login to view profiles</h2>
          <Stack
            direction="horizontal"
            className="gap-4 justify-content-center"
          >
            <Link to="/signup" className="btn btn-primary">
              Signup
            </Link>
            <Link to="/login" className="btn btn-secondary">
              Login
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  )
}
