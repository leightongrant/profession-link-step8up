import Stack from 'react-bootstrap/esm/Stack'
import Container from 'react-bootstrap/esm/Container'
import Button from 'react-bootstrap/esm/Button'
import Card from 'react-bootstrap/esm/Card'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import { Link } from 'react-router-dom';

export const About = () => {
  return (
    <Stack className="about-page py-5" as="main">
      <Container>
        <h2 className="text-center mb-5">About</h2>
        <Row>
          <div className="shadow-lg p-4 mb-5 mt-3 bg-white rounded">
            <Col className="text-center text-justify mb-3">About Us</Col>
            <Col>
              <div> At ProfessionalLink, we empower lawyers and accountants to showcase their expertise, build trust, and connect with clients who need their services most. Our platform is designed to highlight professional skills, credentials, and achievements while giving clients the chance to share authentic reviews.
                  By combining transparent feedback with tailored profiles, we make it easy for professionals to stand out and for clients to make confident, informed choices. Whether you’re a seasoned lawyer or a rising accountant, ProfessionalLink helps you grow your reputation and expand your reach in a competitive marketplace.
              </div>
            </Col>
          <Col>
            <div className="mt-3 text-center">
              <Link to='/signup'>Create an account with us today! </Link>
            </div>
          </Col>
          </div>
        </Row>
        <Row>
        </Row>
      </Container>
    </Stack>
  )
}
