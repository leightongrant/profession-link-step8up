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
          <h2 className="mb-5">Contact Us</h2>
          <Row className="contact-us-main p-3">
            <Col className="contact-us-left p-3">
              <Row className = "g-0">
                <h5 className="pt-3 pb-3">We'd love to chat!</h5>
                <h5 className="pt-3 pb-3">Send us a message, or contact one of our team...</h5>
              </Row>
              <Row className="profile-container">
                <Card className="profile">
                  <Image src={jamesChanImage} className="profile-image" alt="James Chan customer representative" roundedCircle fluid></Image>
                  <Col className="profile-details">
                    <Row className="profile-detail">James Chan</Row>
                    <Row className="profile-detail">Customer Representative</Row>
                    <Row className="profile-detail">james.chan@prolink.com</Row>            
                  </Col>
                </Card>
                <Card className="profile">
                  <Image src={hollyWilloughbyImage} className="profile-image" alt="Holly Willoughby customer representative" roundedCircle fluid></Image>
                  <Col className="profile-details">
                    <Row className="profile-detail">Holly Willoughby</Row>
                    <Row className="profile-detail">Customer Representative</Row>
                    <Row className="profile-detail">holly.willoughby@prolink.com</Row>                 
                  </Col>
                </Card>
              </Row>
              <Row className = "g-0">
                <h5 className="pt-3 pb-3">...and follow us on social media:</h5>
              </Row>
              <Row className = "socials">
                  <Col className = "social-icon">
                    <FaFacebook />
                  </Col>
                  <Col className = "social-icon">
                    <FaInstagram />
                  </Col>
                  <Col className = "social-icon">
                    <FaLinkedin />
                  </Col>
                  <Col className = "social-icon">
                    <FaSquareXTwitter />
                  </Col>
              </Row>
            </Col>
            <Col className="contact-us-right p-3">
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
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </Stack>
    </>
  )
}

