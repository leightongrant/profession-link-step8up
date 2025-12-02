import Stack from 'react-bootstrap/esm/Stack'
import Container from 'react-bootstrap/esm/Container'
import Button from 'react-bootstrap/esm/Button'
import Card from 'react-bootstrap/esm/Card'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import { FaSquareXTwitter } from "react-icons/fa6"
import { FaFacebook } from "react-icons/fa"
import { FaInstagram } from "react-icons/fa"
import { FaLinkedin } from "react-icons/fa"
import heroImageCropped from '../../assets/images/hero-img-cropped4.png'
import './Contact.css'
import jamesChanImage from '../../assets/images/james.chan.png'
import hollyWilloughbyImage from '../../assets/images/holly.willoughby.png'
//Image src={heroImageCropped} className="contact-image" alt="hero image cropped"

export const Contact = () => {
  return (
    <>
      <Stack className="contact-page py-5" as="main">
        <Container>
          <h2 className="text-center mb-5">Contact Us</h2>
          <Row>
            <Col>
              <Row className = "h-50 p-3">
                <h5>We'd love to chat!</h5>
                <h5>Send us a message or contact one of our team</h5>
              </Row>
              <Row>
                <Row className = "h-50 p-3">
                  <Col>
                    <Image src={jamesChanImage} className="profile-image" alt="James Chan customer representative" roundedCircle fluid></Image>
                  </Col>
                  <Col>
                    <Row>James Chan</Row>
                    <Row>Customer Representative</Row>
                    <Row>james.chan@prolink.com</Row>            
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Image src={hollyWilloughbyImage} className="profile-image" alt="Holly Willoughby customer representative" roundedCircle fluid></Image>
                  </Col>
                  <Col>
                    <Row>Holly Willoughby</Row>
                    <Row>Customer Representative</Row>
                    <Row>holly.willoughby@prolink.com</Row>                 
                  </Col>
                </Row>
              </Row>
            </Col>
            <Col>
              <Form>
                <Form.Group className="mb-3" controlId="contactUs.FirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="input" placeholder="Your first name here" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="contactUs.LastName">
                  <Form.Label>Last Name</Form.Label>
                <Form.Control type="input" placeholder="Your surname here" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="contactUs.EmailAddress">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="contactUs.Message">
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Your message here" />
                </Form.Group>
                <Row>
                  <Col>
                    <Button variant="primary" type="submit">
                      Let's chat!
                    </Button>
                  </Col>
                  <Col>
                    <FaFacebook />
                  </Col>
                  <Col>
                    <FaInstagram />
                  </Col>
                  <Col>
                    <FaLinkedin />
                  </Col>
                  <Col>
                    <FaSquareXTwitter />
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </Stack>
    </>
  )
}

