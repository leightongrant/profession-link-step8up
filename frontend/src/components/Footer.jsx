import { Container, Row, Col } from 'react-bootstrap'
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa'
import { MdLocationOn, MdPhone, MdEmail } from 'react-icons/md'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5">
      <Container>
        <Row>
          <Col md={3} lg={4} xl={3} className="mx-auto mb-4">
            <h6 className="text-uppercase fw-bold">ProfessionLink</h6>
            <hr
              className="mb-4 mt-0 d-inline-block mx-auto"
              style={{
                width: '60px',
                backgroundColor: '#7c4dff',
                height: '2px',
              }}
            />
            <p>
              Connecting clients with trusted legal and financial professionals.
              Find the expert you need, right when you need them.
            </p>
          </Col>

          <Col md={2} lg={2} xl={2} className="mx-auto mb-4">
            <h6 className="text-uppercase fw-bold">Quick Links</h6>
            <hr
              className="mb-4 mt-0 d-inline-block mx-auto"
              style={{
                width: '60px',
                backgroundColor: '#7c4dff',
                height: '2px',
              }}
            />
            <p>
              <Link to="/" className="text-white">
                Home
              </Link>
            </p>
            <p>
              <Link to="/profiles" className="text-white">
                Profiles
              </Link>
            </p>
            <p>
              <Link to="/about" className="text-white">
                About
              </Link>
            </p>
            <p>
              <Link to="/contact" className="text-white">
                Contact
              </Link>
            </p>
          </Col>

          <Col md={3} lg={2} xl={2} className="mx-auto mb-4">
            <h6 className="text-uppercase fw-bold">Contact</h6>
            <hr
              className="mb-4 mt-0 d-inline-block mx-auto"
              style={{
                width: '60px',
                backgroundColor: '#7c4dff',
                height: '2px',
              }}
            />
            <p>
              <MdLocationOn /> London, W1 1AA, UK
            </p>
            <p>
              <MdEmail /> info@professionlink.com
            </p>
            <p>
              <MdPhone /> + 44 20 7123 4567
            </p>
          </Col>

          <Col md={4} lg={3} xl={3} className="mx-auto mb-md-0 mb-4">
            <h6 className="text-uppercase fw-bold">Follow us</h6>
            <hr
              className="mb-4 mt-0 d-inline-block mx-auto"
              style={{
                width: '60px',
                backgroundColor: '#7c4dff',
                height: '2px',
              }}
            />
            <a href="#!" className="text-white me-4">
              <FaFacebookF />
            </a>
            <a href="#!" className="text-white me-4">
              <FaTwitter />
            </a>
            <a href="#!" className="text-white me-4">
              <FaInstagram />
            </a>
            <a href="#!" className="text-white me-4">
              <FaLinkedinIn />
            </a>
          </Col>
        </Row>
      </Container>
      <div
        className="text-center p-3"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
      >
        © {new Date().getFullYear()} Copyright:
        <a className="text-white" href="https://professionlink.com/">
          {' '}
          ProfessionLink.com
        </a>
      </div>
    </footer>
  )
}
