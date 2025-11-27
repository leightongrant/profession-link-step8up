import Stack from 'react-bootstrap/esm/Stack'
import Container from 'react-bootstrap/esm/Container'
import { Link } from 'react-router-dom'
import './HomePage.css'

const Hero = () => {
  return (
    <Stack
      className="hero-container bg-secondary-subtle justify-content-center"
      style={{ maxHeight: 500 }}
    >
      <Container>
        <Stack className="gap-3">
          <span className="display-3 fw-bold">
            Welcome to
            <br /> Profession Link
          </span>
          <span className="display-6 fs-4">
            Where you find the best lawyers and accountants
          </span>
          <Link
            to="#"
            className="btn btn-lg btn-outline-dark"
            style={{ width: 'fit-content' }}
          >
            About Us
          </Link>
        </Stack>
      </Container>
    </Stack>
  )
}

export const Homepage = () => {
  return (
    <Stack as="main">
      <Hero />
    </Stack>
  )
}
