import { Container, Row, Col, Card, Button, Stack } from 'react-bootstrap'
import { FaStar, FaUserPlus, FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export const CallToAction = () => {
  return (
    <Stack className="bg-light-subtle">
      <Container className="py-5">
        <h2 className="text-center mb-5">
          Your Next Professional Connection Awaits
        </h2>
        <Row>
          <Col md={4} className="mb-4">
            <Card className="h-100 text-center shadow-sm">
              <Card.Img
                variant="top"
                src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
                alt="A person writing a review"
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>Share Your Experience</Card.Title>
                <Card.Text>
                  Have you worked with a great professional? Help others by
                  leaving a review and sharing your valuable feedback with the
                  community.
                </Card.Text>
                <Button
                  as={Link}
                  to="/profiles"
                  variant="outline-primary"
                  className="mt-auto"
                >
                  <FaStar className="me-2" /> Leave a Review
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 text-center shadow-sm">
              <Card.Img
                variant="top"
                src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
                alt="A professional signing up"
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>Are You a Professional?</Card.Title>
                <Card.Text>
                  Join our growing network of trusted lawyers and accountants.
                  Create your profile, showcase your skills, and connect with
                  new clients.
                </Card.Text>
                <Button
                  as={Link}
                  to="/signup"
                  variant="primary"
                  className="mt-auto"
                >
                  <FaUserPlus className="me-2" /> Join Today
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 text-center shadow-sm">
              <Card.Img
                variant="top"
                src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
                alt="People browsing profiles on a laptop"
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>Find an Expert</Card.Title>
                <Card.Text>
                  Looking for legal or financial help? Browse our extensive
                  directory of qualified professionals and find the perfect
                  match for your needs.
                </Card.Text>
                <Button
                  as={Link}
                  to="/profiles"
                  variant="outline-secondary"
                  className="mt-auto"
                >
                  <FaSearch className="me-2" /> Browse Our Profiles
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Stack>
  )
}
